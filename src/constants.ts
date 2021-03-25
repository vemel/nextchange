export enum Inputs {
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

export enum Outputs {
    Titles = "titles",
    Label = "label",
    Result = "result"
}

export enum SectionTitles {
    Added = "added",
    Changed = "changed",
    Deprecated = "deprecated",
    Removed = "removed",
    Fixed = "fixed",
    Security = "security"
}

export enum Labels {
    Major = "major",
    Minor = "minor",
    Patch = "patch"
}

export const SECTION_TITLES: Array<string> = Object.values(SectionTitles);
export const UNRELEASED = "unreleased";
export const HEADER = `# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).`;
export const ENCODING = "utf-8";
