module.exports =
/******/ (function(modules, runtime) { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		var threw = true;
/******/ 		try {
/******/ 			modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 			threw = false;
/******/ 		} finally {
/******/ 			if(threw) delete installedModules[moduleId];
/******/ 		}
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	__webpack_require__.ab = __dirname + "/";
/******/
/******/ 	// the startup function
/******/ 	function startup() {
/******/ 		// Load entry module and return exports
/******/ 		return __webpack_require__(325);
/******/ 	};
/******/
/******/ 	// run startup
/******/ 	return startup();
/******/ })
/************************************************************************/
/******/ ({

/***/ 82:
/***/ (function(__unusedmodule, exports) {

"use strict";

// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Sanitizes an input into a string so it can be passed into issueCommand safely
 * @param input input to sanitize into a string
 */
function toCommandValue(input) {
    if (input === null || input === undefined) {
        return '';
    }
    else if (typeof input === 'string' || input instanceof String) {
        return input;
    }
    return JSON.stringify(input);
}
exports.toCommandValue = toCommandValue;
//# sourceMappingURL=utils.js.map

/***/ }),

/***/ 87:
/***/ (function(module) {

module.exports = require("os");

/***/ }),

/***/ 102:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";

// For internal use, subject to change.
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
// We use any as a valid input type
/* eslint-disable @typescript-eslint/no-explicit-any */
const fs = __importStar(__webpack_require__(747));
const os = __importStar(__webpack_require__(87));
const utils_1 = __webpack_require__(82);
function issueCommand(command, message) {
    const filePath = process.env[`GITHUB_${command}`];
    if (!filePath) {
        throw new Error(`Unable to find environment variable for file command ${command}`);
    }
    if (!fs.existsSync(filePath)) {
        throw new Error(`Missing file at path: ${filePath}`);
    }
    fs.appendFileSync(filePath, `${utils_1.toCommandValue(message)}${os.EOL}`, {
        encoding: 'utf8'
    });
}
exports.issueCommand = issueCommand;
//# sourceMappingURL=file-command.js.map

/***/ }),

/***/ 163:
/***/ (function(__unusedmodule, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.joinText = exports.trimDedent = exports.dedent = exports.trimLines = void 0;
function trimLines(text) {
    const lines = [];
    for (let line of text.split(/\r?\n/)) {
        line = line.trimRight();
        if (!line.length && !lines.length)
            continue;
        lines.push(line);
    }
    while (lines.length && lines[lines.length - 1].trim().length === 0)
        lines.pop();
    return lines.join("\n");
}
exports.trimLines = trimLines;
function dedent(text) {
    let offset = -1;
    let firstLine = true;
    const lines = text.split(/\r?\n/);
    for (const line of lines) {
        const lineOffset = line.length - line.trimLeft().length;
        if (firstLine) {
            if (lineOffset)
                offset = lineOffset;
            firstLine = false;
            continue;
        }
        if (offset < 0) {
            offset = lineOffset;
            continue;
        }
        if (offset > lineOffset)
            offset = lineOffset;
    }
    if (offset <= 0)
        return text;
    if (lines.length && lines[0].length === lines[0].trimLeft().length) {
        lines[0] = new Array(offset).fill(" ").join("") + lines[0];
    }
    return lines.map(line => line.substr(offset)).join("\n");
}
exports.dedent = dedent;
function trimDedent(text) {
    return dedent(trimLines(text));
}
exports.trimDedent = trimDedent;
function joinText(sep, ...texts) {
    return texts
        .map(x => trimDedent(x))
        .filter(x => x)
        .join(sep);
}
exports.joinText = joinText;


/***/ }),

/***/ 211:
/***/ (function(__unusedmodule, exports) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
exports.ENCODING = exports.HEADER = exports.UNRELEASED = exports.SECTION_TITLES = exports.Labels = exports.SectionTitles = exports.Outputs = exports.Inputs = void 0;
var Inputs;
(function (Inputs) {
    Inputs["Path"] = "path";
    Inputs["Encoding"] = "encoding";
    Inputs["Release"] = "release";
    Inputs["Get"] = "get";
    Inputs["Set"] = "set";
    Inputs["Append"] = "append";
    Inputs["SectionSuffix"] = "suffix";
    Inputs["Save"] = "save";
    Inputs["Sanitize"] = "sanitize";
})(Inputs = exports.Inputs || (exports.Inputs = {}));
var Outputs;
(function (Outputs) {
    Outputs["Titles"] = "titles";
    Outputs["Label"] = "label";
    Outputs["Result"] = "result";
})(Outputs = exports.Outputs || (exports.Outputs = {}));
var SectionTitles;
(function (SectionTitles) {
    SectionTitles["Added"] = "added";
    SectionTitles["Changed"] = "changed";
    SectionTitles["Deprecated"] = "deprecated";
    SectionTitles["Removed"] = "removed";
    SectionTitles["Fixed"] = "fixed";
    SectionTitles["Security"] = "security";
})(SectionTitles = exports.SectionTitles || (exports.SectionTitles = {}));
var Labels;
(function (Labels) {
    Labels["Major"] = "major";
    Labels["Minor"] = "minor";
    Labels["Patch"] = "patch";
})(Labels = exports.Labels || (exports.Labels = {}));
exports.SECTION_TITLES = Object.values(SectionTitles);
exports.UNRELEASED = "unreleased";
exports.HEADER = `# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).`;
exports.ENCODING = "utf-8";


/***/ }),

/***/ 312:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = __webpack_require__(211);
const utils_1 = __webpack_require__(163);
class Section {
    constructor(title, body = "") {
        this.title = title.toLowerCase();
        this.body = utils_1.trimDedent(body);
    }
    static isValidTitle(title) {
        const titles = Object.values(constants_1.SectionTitles);
        return titles.includes(title.toLowerCase());
    }
    renderTitle() {
        return `### ${this.title[0].toUpperCase()}${this.title.substr(1)}`;
    }
    render() {
        if (this.body) {
            return `${this.renderTitle()}\n${this.body}`;
        }
        return this.renderTitle();
    }
    isEmpty() {
        return this.body.length === 0;
    }
    append(text) {
        this.body = `${this.body}${text}`;
        return this;
    }
    appendLines(text) {
        this.body = utils_1.joinText("\n", this.body, text);
        return this;
    }
    set(text) {
        this.body = utils_1.trimDedent(text);
        return this;
    }
}
exports.default = Section;


/***/ }),

/***/ 325:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";

var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const core = __importStar(__webpack_require__(470));
const changelog_1 = __importDefault(__webpack_require__(361));
const constants_1 = __webpack_require__(211);
const release_1 = __importDefault(__webpack_require__(484));
const releaseBody_1 = __importDefault(__webpack_require__(866));
function isTrue(value) {
    return !["no", "off", "false"].includes(value.toLowerCase());
}
function run() {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const path = core.getInput(constants_1.Inputs.Path) || "./CHANGELOG.md";
            const encoding = core.getInput(constants_1.Inputs.Encoding) || constants_1.ENCODING;
            const releaseName = core.getInput(constants_1.Inputs.Release);
            const saveChangelog = isTrue(core.getInput(constants_1.Inputs.Save) || "true");
            const sectionSuffix = core.getInput(constants_1.Inputs.SectionSuffix) || "";
            const setBody = core.getInput(constants_1.Inputs.Set);
            const getRelease = core.getInput(constants_1.Inputs.Get) || constants_1.UNRELEASED;
            const appendBody = core.getInput(constants_1.Inputs.Append);
            const sanitize = isTrue(core.getInput(constants_1.Inputs.Sanitize) || "false");
            const changeLog = changelog_1.default.readOrCreate(path, encoding);
            let hasChanged = false;
            let release = changeLog.getRelease(getRelease) || new release_1.default(getRelease);
            core.debug(`Target release is ${release.version}`);
            if (setBody) {
                core.debug(`Replacing notes in ${release.version}`);
                release.body = releaseBody_1.default.parse(setBody).addSectionSuffix(sectionSuffix);
                hasChanged = true;
            }
            if (appendBody) {
                core.debug(`Updating notes in ${release.version}`);
                release.body.merge(releaseBody_1.default.parse(appendBody)
                    .sanitize()
                    .addSectionSuffix(sectionSuffix));
                hasChanged = true;
                core.debug(`Updated notes in ${release.version}`);
            }
            if (releaseName) {
                const newRelease = changeLog.getOrCreateRelease(releaseName);
                core.debug(`Releasing ${newRelease.version}`);
                newRelease.body = release.body;
                core.debug(`Cleaning up ${release.version}`);
                release.body = new releaseBody_1.default();
                release = newRelease;
                hasChanged = true;
            }
            if (sanitize) {
                release.body.sanitize();
            }
            if (saveChangelog && hasChanged) {
                core.debug(`Saving changes to ${path}`);
                changeLog.write(path, encoding);
            }
            core.setOutput(constants_1.Outputs.Result, release.body.render());
            core.setOutput(constants_1.Outputs.Label, release.body.getLabel());
            core.setOutput(constants_1.Outputs.Titles, release.body.getTitles().join(","));
        }
        catch (error) {
            core.setFailed(error.message);
        }
    });
}
run();
exports.default = run;


/***/ }),

/***/ 361:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(__webpack_require__(747));
const constants_1 = __webpack_require__(211);
const release_1 = __importDefault(__webpack_require__(484));
const releaseBody_1 = __importDefault(__webpack_require__(866));
const utils_1 = __webpack_require__(163);
class ChangeLog {
    constructor(header = "", unreleased = new release_1.default("Unreleased"), releases = []) {
        this.header = header;
        this.unreleased = unreleased;
        this.releases = releases;
        this.isCRLF = false;
    }
    static parse(text) {
        const [header, ...sections] = text.split(/^## \[/m);
        const releases = sections.map(x => release_1.default.parse(`## [${x}`));
        const unreleasedItems = releases.filter(x => x.version.toLowerCase() === constants_1.UNRELEASED);
        const released = releases.filter(x => x.version.toLowerCase() !== constants_1.UNRELEASED);
        const unreleased = unreleasedItems.length
            ? unreleasedItems[0]
            : new release_1.default("Unreleased");
        const result = new ChangeLog(utils_1.trimDedent(header), unreleased, released);
        return result;
    }
    static read(path, encoding = constants_1.ENCODING) {
        let text = fs_1.default.readFileSync(path, { encoding });
        let isCRLF = false;
        if (text.includes("\r\n")) {
            text = text.replace(/\r?\n/g, "\n");
            isCRLF = true;
        }
        const result = ChangeLog.parse(text);
        result.isCRLF = isCRLF;
        return result;
    }
    getRelease(version) {
        if (version.toLowerCase() === "unreleased")
            return this.unreleased;
        const found = this.releases.filter(x => x.version === version);
        if (found.length)
            return found[0];
        return null;
    }
    getOrCreateRelease(version) {
        const release = this.getRelease(version);
        if (release)
            return release;
        const newRelease = new release_1.default(version, "", new releaseBody_1.default());
        this.releases = [newRelease, ...this.releases];
        return newRelease;
    }
    renderReleases() {
        return this.releases.map(x => x.render()).join("\n\n");
    }
    render() {
        return [this.header, this.unreleased.render(), this.renderReleases()]
            .filter(x => x)
            .join("\n\n");
    }
    write(path, encoding = constants_1.ENCODING) {
        let text = this.render();
        if (this.isCRLF) {
            text = text.replace(/\r?\n/g, "\r\n");
        }
        fs_1.default.writeFileSync(path, text, { encoding });
    }
    static readOrCreate(path, encoding = constants_1.ENCODING) {
        if (!fs_1.default.existsSync(path))
            return new ChangeLog(constants_1.HEADER);
        return ChangeLog.read(path, encoding);
    }
}
exports.default = ChangeLog;


/***/ }),

/***/ 431:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";

var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const os = __importStar(__webpack_require__(87));
const utils_1 = __webpack_require__(82);
/**
 * Commands
 *
 * Command Format:
 *   ::name key=value,key=value::message
 *
 * Examples:
 *   ::warning::This is the message
 *   ::set-env name=MY_VAR::some value
 */
function issueCommand(command, properties, message) {
    const cmd = new Command(command, properties, message);
    process.stdout.write(cmd.toString() + os.EOL);
}
exports.issueCommand = issueCommand;
function issue(name, message = '') {
    issueCommand(name, {}, message);
}
exports.issue = issue;
const CMD_STRING = '::';
class Command {
    constructor(command, properties, message) {
        if (!command) {
            command = 'missing.command';
        }
        this.command = command;
        this.properties = properties;
        this.message = message;
    }
    toString() {
        let cmdStr = CMD_STRING + this.command;
        if (this.properties && Object.keys(this.properties).length > 0) {
            cmdStr += ' ';
            let first = true;
            for (const key in this.properties) {
                if (this.properties.hasOwnProperty(key)) {
                    const val = this.properties[key];
                    if (val) {
                        if (first) {
                            first = false;
                        }
                        else {
                            cmdStr += ',';
                        }
                        cmdStr += `${key}=${escapeProperty(val)}`;
                    }
                }
            }
        }
        cmdStr += `${CMD_STRING}${escapeData(this.message)}`;
        return cmdStr;
    }
}
function escapeData(s) {
    return utils_1.toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A');
}
function escapeProperty(s) {
    return utils_1.toCommandValue(s)
        .replace(/%/g, '%25')
        .replace(/\r/g, '%0D')
        .replace(/\n/g, '%0A')
        .replace(/:/g, '%3A')
        .replace(/,/g, '%2C');
}
//# sourceMappingURL=command.js.map

/***/ }),

/***/ 470:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";

var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const command_1 = __webpack_require__(431);
const file_command_1 = __webpack_require__(102);
const utils_1 = __webpack_require__(82);
const os = __importStar(__webpack_require__(87));
const path = __importStar(__webpack_require__(622));
/**
 * The code to exit an action
 */
var ExitCode;
(function (ExitCode) {
    /**
     * A code indicating that the action was successful
     */
    ExitCode[ExitCode["Success"] = 0] = "Success";
    /**
     * A code indicating that the action was a failure
     */
    ExitCode[ExitCode["Failure"] = 1] = "Failure";
})(ExitCode = exports.ExitCode || (exports.ExitCode = {}));
//-----------------------------------------------------------------------
// Variables
//-----------------------------------------------------------------------
/**
 * Sets env variable for this action and future actions in the job
 * @param name the name of the variable to set
 * @param val the value of the variable. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function exportVariable(name, val) {
    const convertedVal = utils_1.toCommandValue(val);
    process.env[name] = convertedVal;
    const filePath = process.env['GITHUB_ENV'] || '';
    if (filePath) {
        const delimiter = '_GitHubActionsFileCommandDelimeter_';
        const commandValue = `${name}<<${delimiter}${os.EOL}${convertedVal}${os.EOL}${delimiter}`;
        file_command_1.issueCommand('ENV', commandValue);
    }
    else {
        command_1.issueCommand('set-env', { name }, convertedVal);
    }
}
exports.exportVariable = exportVariable;
/**
 * Registers a secret which will get masked from logs
 * @param secret value of the secret
 */
function setSecret(secret) {
    command_1.issueCommand('add-mask', {}, secret);
}
exports.setSecret = setSecret;
/**
 * Prepends inputPath to the PATH (for this action and future actions)
 * @param inputPath
 */
function addPath(inputPath) {
    const filePath = process.env['GITHUB_PATH'] || '';
    if (filePath) {
        file_command_1.issueCommand('PATH', inputPath);
    }
    else {
        command_1.issueCommand('add-path', {}, inputPath);
    }
    process.env['PATH'] = `${inputPath}${path.delimiter}${process.env['PATH']}`;
}
exports.addPath = addPath;
/**
 * Gets the value of an input.  The value is also trimmed.
 *
 * @param     name     name of the input to get
 * @param     options  optional. See InputOptions.
 * @returns   string
 */
function getInput(name, options) {
    const val = process.env[`INPUT_${name.replace(/ /g, '_').toUpperCase()}`] || '';
    if (options && options.required && !val) {
        throw new Error(`Input required and not supplied: ${name}`);
    }
    return val.trim();
}
exports.getInput = getInput;
/**
 * Sets the value of an output.
 *
 * @param     name     name of the output to set
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function setOutput(name, value) {
    command_1.issueCommand('set-output', { name }, value);
}
exports.setOutput = setOutput;
/**
 * Enables or disables the echoing of commands into stdout for the rest of the step.
 * Echoing is disabled by default if ACTIONS_STEP_DEBUG is not set.
 *
 */
function setCommandEcho(enabled) {
    command_1.issue('echo', enabled ? 'on' : 'off');
}
exports.setCommandEcho = setCommandEcho;
//-----------------------------------------------------------------------
// Results
//-----------------------------------------------------------------------
/**
 * Sets the action status to failed.
 * When the action exits it will be with an exit code of 1
 * @param message add error issue message
 */
function setFailed(message) {
    process.exitCode = ExitCode.Failure;
    error(message);
}
exports.setFailed = setFailed;
//-----------------------------------------------------------------------
// Logging Commands
//-----------------------------------------------------------------------
/**
 * Gets whether Actions Step Debug is on or not
 */
function isDebug() {
    return process.env['RUNNER_DEBUG'] === '1';
}
exports.isDebug = isDebug;
/**
 * Writes debug message to user log
 * @param message debug message
 */
function debug(message) {
    command_1.issueCommand('debug', {}, message);
}
exports.debug = debug;
/**
 * Adds an error issue
 * @param message error issue message. Errors will be converted to string via toString()
 */
function error(message) {
    command_1.issue('error', message instanceof Error ? message.toString() : message);
}
exports.error = error;
/**
 * Adds an warning issue
 * @param message warning issue message. Errors will be converted to string via toString()
 */
function warning(message) {
    command_1.issue('warning', message instanceof Error ? message.toString() : message);
}
exports.warning = warning;
/**
 * Writes info to log with console.log.
 * @param message info message
 */
function info(message) {
    process.stdout.write(message + os.EOL);
}
exports.info = info;
/**
 * Begin an output group.
 *
 * Output until the next `groupEnd` will be foldable in this group
 *
 * @param name The name of the output group
 */
function startGroup(name) {
    command_1.issue('group', name);
}
exports.startGroup = startGroup;
/**
 * End an output group.
 */
function endGroup() {
    command_1.issue('endgroup');
}
exports.endGroup = endGroup;
/**
 * Wrap an asynchronous function call in a group.
 *
 * Returns the same type as the function itself.
 *
 * @param name The name of the group
 * @param fn The function to wrap in the group
 */
function group(name, fn) {
    return __awaiter(this, void 0, void 0, function* () {
        startGroup(name);
        let result;
        try {
            result = yield fn();
        }
        finally {
            endGroup();
        }
        return result;
    });
}
exports.group = group;
//-----------------------------------------------------------------------
// Wrapper action state
//-----------------------------------------------------------------------
/**
 * Saves state for current action, the state can only be retrieved by this action's post job execution.
 *
 * @param     name     name of the state to store
 * @param     value    value to store. Non-string values will be converted to a string via JSON.stringify
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function saveState(name, value) {
    command_1.issueCommand('save-state', { name }, value);
}
exports.saveState = saveState;
/**
 * Gets the value of an state set by this action's main execution.
 *
 * @param     name     name of the state to get
 * @returns   string
 */
function getState(name) {
    return process.env[`STATE_${name}`] || '';
}
exports.getState = getState;
//# sourceMappingURL=core.js.map

/***/ }),

/***/ 484:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const releaseBody_1 = __importDefault(__webpack_require__(866));
class Release {
    constructor(version, createdAt = "", body = null) {
        this.version = version;
        this.createdAt = createdAt;
        this.body = body || new releaseBody_1.default();
    }
    static parseTitle(title) {
        const titleParts = title
            .split(" ")
            .map(x => x.trim())
            .filter(x => x);
        if (titleParts.length < 2)
            return ["", ""];
        const version = titleParts[1].replace("[", "").replace("]", "").trim();
        if (titleParts.length < 3)
            return [version, ""];
        const createdAt = titleParts.slice(3).join(" ");
        return [version, createdAt];
    }
    static parse(text) {
        const [title, ...bodyParts] = text.split(/\r?\n/);
        const body = bodyParts.join("\n");
        const [version, createdAt] = Release.parseTitle(title);
        return new Release(version, createdAt, releaseBody_1.default.parse(body));
    }
    renderTitle() {
        if (this.createdAt)
            return `## [${this.version}] - ${this.createdAt}`;
        return `## [${this.version}]`;
    }
    render() {
        return [this.renderTitle(), this.body.render()]
            .filter(x => x)
            .join("\n");
    }
}
exports.default = Release;


/***/ }),

/***/ 622:
/***/ (function(module) {

module.exports = require("path");

/***/ }),

/***/ 747:
/***/ (function(module) {

module.exports = require("fs");

/***/ }),

/***/ 866:
/***/ (function(__unusedmodule, exports, __webpack_require__) {

"use strict";

var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const constants_1 = __webpack_require__(211);
const section_1 = __importDefault(__webpack_require__(312));
const utils_1 = __webpack_require__(163);
const RE_SECTION = /^### (\S+)/;
class ReleaseBody {
    constructor(sections = [], prefix = "", postfix = "") {
        this.sectionTitles = Object.values(constants_1.SectionTitles);
        this.prefix = utils_1.trimDedent(prefix);
        this.postfix = utils_1.trimDedent(postfix);
        this.sections = this.sectionTitles.map(title => new section_1.default(title, ""));
        sections.map(section => {
            this.getSection(section.title).appendLines(section.body);
        });
    }
    static parse(text) {
        let isCodeblock = false;
        let sectionTitle = "prefix";
        const sectionsMap = new Map([
            ["prefix", []],
            ["postfix", []]
        ]);
        constants_1.SECTION_TITLES.forEach(title => sectionsMap.set(title, []));
        for (const line of text.split(/\r?\n/)) {
            if (line.trim().startsWith("```")) {
                isCodeblock = !isCodeblock;
            }
            if (!isCodeblock && line.startsWith("#")) {
                const titleMatch = line.match(RE_SECTION);
                if (titleMatch) {
                    sectionTitle = titleMatch[1].toLowerCase();
                    continue;
                }
                if (sectionTitle !== "prefix")
                    sectionTitle = "postfix";
            }
            const section = sectionsMap.get(sectionTitle);
            if (section)
                section.push(line);
        }
        const sections = constants_1.SECTION_TITLES.map(title => new section_1.default(title, (sectionsMap.get(title) || []).join("\n")));
        return new ReleaseBody(sections, (sectionsMap.get("prefix") || []).join("\n"), (sectionsMap.get("postfix") || []).join("\n"));
    }
    getSection(title) {
        const found = this.sections.filter(x => x.title === title);
        if (found.length)
            return found[0];
        throw new Error(`Section title ${title} is invalid`);
    }
    getExistingSections() {
        return this.sections.filter(section => !section.isEmpty());
    }
    renderSections() {
        return this.getExistingSections()
            .map(section => section.render())
            .join("\n\n");
    }
    render() {
        return [this.prefix, this.renderSections(), this.postfix]
            .filter(x => x.length)
            .join("\n\n");
    }
    isEmpty() {
        if (this.prefix || this.postfix)
            return false;
        return this.getExistingSections().length === 0;
    }
    getTitles() {
        return this.getExistingSections().map(x => x.title);
    }
    getLabel() {
        const titles = this.getTitles();
        if (titles.includes(constants_1.SectionTitles.Removed))
            return constants_1.Labels.Major;
        if (titles.includes(constants_1.SectionTitles.Added) ||
            titles.includes(constants_1.SectionTitles.Changed) ||
            titles.includes(constants_1.SectionTitles.Deprecated))
            return constants_1.Labels.Minor;
        return constants_1.Labels.Patch;
    }
    sanitize() {
        this.prefix = "";
        this.postfix = "";
        return this;
    }
    merge(other) {
        this.prefix = utils_1.joinText("\n", this.prefix, other.prefix);
        this.postfix = utils_1.joinText("\n", this.postfix, other.postfix);
        other.sections.map(section => {
            this.getSection(section.title).appendLines(section.body);
        });
        return this;
    }
    addSectionSuffix(suffix) {
        if (!suffix)
            return this;
        this.getExistingSections().forEach(section => section.append(suffix));
        return this;
    }
}
exports.default = ReleaseBody;


/***/ })

/******/ });