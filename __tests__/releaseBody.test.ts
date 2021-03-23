import ReleaseBody from "../src/releaseBody";
import Section from "../src/section";

test("render", () => {
    expect(new ReleaseBody().render()).toBe("");
    expect(new ReleaseBody([], "prefix", "postfix").render()).toBe(
        "prefix\n\npostfix"
    );
});

test("parse", () => {
    const releaseBody = ReleaseBody.parse(
        "prefix\n\n\n### Added\ntest\nadded2\n\n### fixed\n\nfixed2\n##Notes\npostfix"
    );
    expect(releaseBody.prefix).toBe("prefix");
    expect(releaseBody.postfix).toBe("##Notes\npostfix");
    expect(releaseBody.getSection("added").body).toBe("test\nadded2");
    expect(releaseBody.getSection("fixed").body).toBe("fixed2");
    expect(releaseBody.render()).toBe(
        "prefix\n\n### Added\ntest\nadded2\n\n### Fixed\nfixed2\n\n##Notes\npostfix"
    );
});

test("is empty", () => {
    expect(new ReleaseBody().isEmpty()).toBe(true);
    expect(new ReleaseBody([]).isEmpty()).toBe(true);
    expect(new ReleaseBody([new Section("added", "")]).isEmpty()).toBe(true);
    expect(new ReleaseBody([], "prefix").isEmpty()).toBe(false);
    expect(new ReleaseBody([new Section("added", "asd")]).isEmpty()).toBe(
        false
    );
});

test("get label", () => {
    expect(ReleaseBody.parse("").getLabel()).toBe("patch");
    expect(
        ReleaseBody.parse(
            "prefix\n\n\n### Added\ntest\nadded2\n\n### Removed\n##Notes\npostfix"
        ).getLabel()
    ).toBe("minor");
    expect(
        ReleaseBody.parse(
            "prefix\n\n\n### Added\ntest\nadded2\n\n### removed\n\nfixed2\n##Notes\npostfix"
        ).getLabel()
    ).toBe("major");
    expect(ReleaseBody.parse("### fixed\n\nfixed2").getLabel()).toBe("patch");
});
