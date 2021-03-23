import Section from "../src/section";

test("render", () => {
    expect(new Section("added").render()).toBe("### Added");
    expect(new Section("added", "test").render()).toBe("### Added\ntest");
    expect(new Section("added", "\n  test\n").render()).toBe("### Added\ntest");
});

test("append", () => {
    expect(new Section("added").append("body").body).toBe("body");
    expect(new Section("added").append("body").append("2").body).toBe("body2");
    expect(new Section("added", "body").append("2").body).toBe("body2");
});

test("append lines", () => {
    expect(new Section("added").appendLines("body").body).toBe("body");
    expect(new Section("added").appendLines("\n\nbody\n").body).toBe("body");
    expect(
        new Section("added").appendLines("body").appendLines("2\n").body
    ).toBe("body\n2");
    expect(new Section("added", "body").appendLines("\n\n\n2").body).toBe(
        "body\n2"
    );
});

test("set", () => {
    expect(new Section("added").set("body").body).toBe("body");
    expect(new Section("added").appendLines("\n\nbody\n").body).toBe("body");
});

test("is empty", () => {
    expect(new Section("added").isEmpty()).toBe(true);
    expect(new Section("added", "body").isEmpty()).toBe(false);
});

test("is valid title", () => {
    expect(Section.isValidTitle("added")).toBe(true);
    expect(Section.isValidTitle("unknown")).toBe(false);
});
