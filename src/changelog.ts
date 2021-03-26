import fs from "fs";

import { HEADER, UNRELEASED, UTF8 } from "./constants";
import Release from "./release";
import ReleaseBody from "./releaseBody";
import { trimDedent } from "./utils";

export default class ChangeLog {
    header: string;
    unreleased: Release;
    releases: Array<Release>;
    isCRLF: boolean;
    constructor(
        header = "",
        unreleased: Release = new Release("Unreleased"),
        releases: Array<Release> = []
    ) {
        this.header = header;
        this.unreleased = unreleased;
        this.releases = releases;
        this.isCRLF = false;
    }

    static parse(text: string): ChangeLog {
        const [header, ...sections] = text.split(/^## \[/m);
        const releases = sections.map(x => Release.parse(`## [${x}`));
        const unreleasedItems = releases.filter(
            x => x.version.toLowerCase() === UNRELEASED
        );
        const released = releases.filter(
            x => x.version.toLowerCase() !== UNRELEASED
        );
        const unreleased = unreleasedItems.length
            ? unreleasedItems[0]
            : new Release("Unreleased");
        const result = new ChangeLog(trimDedent(header), unreleased, released);
        return result;
    }

    static read(path: string, encoding = UTF8): ChangeLog {
        let text = fs.readFileSync(path, { encoding });
        let isCRLF = false;
        if (text.includes("\r\n")) {
            text = text.replace(/\r?\n/g, "\n");
            isCRLF = true;
        }
        const result = ChangeLog.parse(text);
        result.isCRLF = isCRLF;
        return result;
    }

    getRelease(version: string): Release | null {
        if (version.toLowerCase() === "unreleased") return this.unreleased;
        const found = this.releases.filter(x => x.version === version);
        if (found.length) return found[0];
        return null;
    }

    getOrCreateRelease(version: string): Release {
        const release = this.getRelease(version);
        if (release) return release;
        const newRelease = new Release(version, "", new ReleaseBody());
        this.releases = [newRelease, ...this.releases];
        return newRelease;
    }

    renderReleases(): string {
        return this.releases.map(x => x.render()).join("\n\n");
    }

    render(): string {
        return [this.header, this.unreleased.render(), this.renderReleases()]
            .filter(x => x)
            .join("\n\n");
    }

    write(path: string, encoding = UTF8): void {
        let text = this.render() + "\n";
        if (this.isCRLF) {
            text = text.replace(/\r?\n/g, "\r\n");
        }
        fs.writeFileSync(path, text, { encoding });
    }

    static readOrCreate(path: string, encoding = UTF8): ChangeLog {
        if (!fs.existsSync(path)) return new ChangeLog(HEADER);
        return ChangeLog.read(path, encoding);
    }
}
