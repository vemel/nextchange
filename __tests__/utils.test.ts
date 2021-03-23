import { dedent, joinText, trimDedent, trimLines } from "../src/utils";

test("dedent", () => {
    expect(dedent("")).toBe("");
    expect(dedent("test")).toBe("test");
    expect(dedent("  test")).toBe("test");
    expect(dedent("  test\n  test2")).toBe("test\ntest2");
    expect(dedent("test\n  test2")).toBe("test\ntest2");
    expect(dedent(" test\n  test2")).toBe("test\n test2");
    expect(dedent("   test\n  test2")).toBe(" test\ntest2");
    expect(dedent("   test\n test2\n  test3")).toBe("  test\ntest2\n test3");
});

test("trim lines", () => {
    expect(trimLines("")).toBe("");
    expect(trimLines("test")).toBe("test");
    expect(trimLines("\n\ntest\n")).toBe("test");
    expect(trimLines("\n  \ntest\n ")).toBe("test");
    expect(trimLines("\n\ntest\n  \ntest2\n")).toBe("test\n\ntest2");
});

test("trim dedent", () => {
    expect(trimDedent("")).toBe("");
    expect(trimDedent("test")).toBe("test");
    expect(trimDedent(" \n\n  test\n  test2\n")).toBe("test\ntest2");
});

test("join text", () => {
    expect(joinText(" ", "a", "b", "c")).toBe("a b c");
    expect(joinText(" ", "a", "  ", "  c")).toBe("a c");
    expect(joinText(" ")).toBe("");
});
