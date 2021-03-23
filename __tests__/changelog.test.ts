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
