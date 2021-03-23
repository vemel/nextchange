import * as core from "@actions/core";

import ChangeLog from "./changelog";
import { ENCODING, Inputs, Outputs, UNRELEASED } from "./constants";
import Release from "./release";
import ReleaseBody from "./releaseBody";

async function run(): Promise<void> {
    try {
        const path = core.getInput(Inputs.Path) || "./CHANGELOG.md";
        const encoding = core.getInput(Inputs.Encoding) || ENCODING;
        const releaseName = core.getInput(Inputs.Release) || UNRELEASED;
        const saveChangelog = (core.getInput(Inputs.Save) || "true") === "true";
        const sectionSuffix = core.getInput(Inputs.SectionSuffix) || "";
        const setBody = core.getInput(Inputs.Set);
        const getRelease = core.getInput(Inputs.Get) || UNRELEASED;
        const appendBody = core.getInput(Inputs.Append);
        const changeLog = ChangeLog.readOrCreate(path, encoding);
        let release =
            changeLog.getRelease(getRelease) || new Release(getRelease);
        if (setBody) {
            release.body = ReleaseBody.parse(setBody).addSectionSuffix(
                sectionSuffix
            );
        }
        if (appendBody) {
            release.body.merge(
                ReleaseBody.parse(appendBody)
                    .sanitize()
                    .addSectionSuffix(sectionSuffix)
            );
        }
        if (releaseName) {
            const newRelease = changeLog.getOrCreateRelease(releaseName);
            newRelease.body = release.body;
            release.body = new ReleaseBody();
            release = newRelease;
        }
        if (saveChangelog) {
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
