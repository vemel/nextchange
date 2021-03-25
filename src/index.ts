import * as core from "@actions/core";

import ChangeLog from "./changelog";
import { ENCODING, Inputs, Outputs } from "./constants";
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
        const getBody = core.getInput(Inputs.Get) || "";
        const appendBody = core.getInput(Inputs.Append);
        const clear = isTrue(core.getInput(Inputs.Clear) || "false");
        const sanitize = isTrue(core.getInput(Inputs.Sanitize) || "false");
        const changeLog = ChangeLog.readOrCreate(path, encoding);
        let hasChanged = false;
        let release = new Release("output");
        if (releaseName) {
            release = changeLog.getOrCreateRelease(releaseName);
            core.debug(`Selected release ${release.version}`);
            hasChanged = true;
        }
        core.debug(`Target release is ${release.version}`);
        if (clear && !release.body.isEmpty()) {
            core.debug(`Clearing up ${release.version}`);
            release.body.clear();
        }
        if (getBody) {
            const getRelease = changeLog.getRelease(getBody);
            if (getRelease) {
                core.debug(
                    `Replacing notes in ${release.version} with notes from ${getBody}`
                );
                release.body.replace(getRelease.body);
            }
        }
        if (setBody) {
            core.debug(`Replacing notes in ${release.version}`);
            release.body = ReleaseBody.parse(setBody);
        }
        if (appendBody) {
            core.debug(`Updating notes in ${release.version}`);
            if (sectionSuffix) {
                core.debug(`Adding suffix: ${sectionSuffix}`);
            }
            release.body.merge(
                ReleaseBody.parse(appendBody)
                    .sanitize()
                    .addSectionSuffix(sectionSuffix)
            );
            core.debug(`Updated notes in ${release.version}`);
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
