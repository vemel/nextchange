import Release from "../src/release";
import ReleaseBody from "../src/releaseBody";

test("render", () => {
    expect(new Release("1.2.3").render()).toBe("## [1.2.3]");
    expect(new Release("1.2.3", "2020-05-06").render()).toBe(
        "## [1.2.3] - 2020-05-06"
    );
    expect(
        new Release(
            "1.2.3",
            "2020-05-06",
            new ReleaseBody([], "prefix")
        ).render()
    ).toBe("## [1.2.3] - 2020-05-06\nprefix");
});

test("parse", () => {
    const release = Release.parse("## [1.2.3] - 2020-05-06\nprefix");
    expect(release.version).toBe("1.2.3");
    expect(release.createdAt).toBe("2020-05-06");
    expect(release.body.prefix).toBe("prefix");
    const unreleased = Release.parse("## [Unreleased]\nnotes");
    expect(unreleased.version).toBe("Unreleased");
    expect(unreleased.createdAt).toBe("");
    expect(unreleased.body.prefix).toBe("notes");
});
