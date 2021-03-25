export declare enum Inputs {
    Path = "path",
    Encoding = "encoding",
    Release = "release",
    Get = "get",
    Set = "set",
    Append = "append",
    SectionSuffix = "suffix",
    Save = "save",
    Sanitize = "sanitize",
    Clear = "clear"
}
export declare enum Outputs {
    Titles = "titles",
    Label = "label",
    Result = "result"
}
export declare enum SectionTitles {
    Added = "added",
    Changed = "changed",
    Deprecated = "deprecated",
    Removed = "removed",
    Fixed = "fixed",
    Security = "security"
}
export declare enum Labels {
    Major = "major",
    Minor = "minor",
    Patch = "patch"
}
export declare const SECTION_TITLES: Array<string>;
export declare const UNRELEASED = "unreleased";
export declare const HEADER = "# Changelog\nAll notable changes to this project will be documented in this file.\n\nThe format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),\nand this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).";
export declare const ENCODING = "utf-8";
