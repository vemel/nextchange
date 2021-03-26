import fs from "fs";
import path from "path";

import ChangeLog from "../src/changelog";
import Release from "../src/release";

test("render", () => {
    expect(
        new ChangeLog("header", new Release("Unreleased"), [
            new Release("1.2.3"),
            new Release("1.2.2")
        ]).render()
    ).toBe("header\n\n## [Unreleased]\n\n## [1.2.3]\n\n## [1.2.2]");
});
test("parse", () => {
    const changelog = ChangeLog.parse(
        "header\n\n## [Unreleased]\nunreleased\n## [1.2.3]\n\n## [1.2.2]"
    );
    expect(changelog.unreleased.body.prefix).toBe("unreleased");
    expect(changelog.header).toBe("header");
    expect(changelog.releases.length).toEqual(2);
});
test("write", () => {
    const changelog = new ChangeLog("header", new Release("Unreleased"), [
        new Release("1.2.3"),
        new Release("1.2.2")
    ]);
    const tempDir = fs.mkdtempSync("test-");
    const filePath = path.join(tempDir, "CHANGELOG.md");
    changelog.write(filePath, "utf-8");
    expect(fs.readFileSync(filePath, { encoding: "utf-8" })).toBe(
        "header\n\n## [Unreleased]\n\n## [1.2.3]\n\n## [1.2.2]\n"
    );
    fs.rmdirSync(tempDir, { recursive: true });
});
