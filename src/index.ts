import * as core from "@actions/core";

import ChangeLog from "./changelog";
import { ENCODING, Inputs, Outputs, UNRELEASED } from "./constants";
import Release from "./release";
import ReleaseBody from "./releaseBody";

function isTrue(value: string): boolean {
    return !["no", "off", "false", false].includes(value.toLowerCase());
}

async function run(): Promise<void> {
    try {
        const path = core.getInput(Inputs.Path) || "./CHANGELOG.md";
        const encoding = core.getInput(Inputs.Encoding) || ENCODING;
        const releaseName = core.getInput(Inputs.Release);
        const saveChangelog = isTrue(core.getInput(Inputs.Save) || "true");
        const sectionSuffix = core.getInput(Inputs.SectionSuffix) || "";
        const setBody = core.getInput(Inputs.Set);
        const getRelease = core.getInput(Inputs.Get) || UNRELEASED;
        const appendBody = core.getInput(Inputs.Append);
        const sanitize = isTrue(core.getInput(Inputs.Sanitize) || "false");
        const changeLog = ChangeLog.readOrCreate(path, encoding);
        let hasChanged = false;
        let release =
            changeLog.getRelease(getRelease) || new Release(getRelease);
        core.debug(`Target release is ${release.version}`);
        if (setBody) {
            core.debug(`Replacing notes in ${release.version}`);
            release.body = ReleaseBody.parse(setBody);
            hasChanged = true;
        }
        if (appendBody) {
            core.debug(`Updating notes in ${release.version}`);
            release.body.merge(
                ReleaseBody.parse(appendBody)
                    .sanitize()
                    .addSectionSuffix(sectionSuffix)
            );
            hasChanged = true;
            core.debug(`Updated notes in ${release.version}`);
        }
        if (releaseName) {
            const newRelease = changeLog.getOrCreateRelease(releaseName);
            core.debug(`Releasing ${newRelease.version}`);
            newRelease.body = release.body;
            core.debug(`Cleaning up ${release.version}`);
            release.body = new ReleaseBody();
            release = newRelease;
            hasChanged = true;
        }
        if (sanitize) {
            release.body.sanitize();
        }
        if (saveChangelog && hasChanged) {
            core.debug(`Saving changes to ${path}`);
            changeLog.write(path, encoding);
        }
        core.setOutput(Outputs.Result, release.body.render());
        core.setOutput(Outputs.Label, release.body.getLabel());
        core.setOutput(Outputs.Titles, release.body.getTitles().join(","));
    } catch (error) {
        core.setFailed(error.message);
    }
}

run();

export default run;
