# Next Change

Parse and update `CHANGELOG.md` action

- [Next Change](#next-change)
  - [Usage](#usage)
    - [Pre-requisites](#pre-requisites)
    - [Inputs](#inputs)
    - [Outputs](#outputs)
  - [Examples](#examples)
    - [Easy CI/CD for JavaScript/TypeScript and Python projects](#easy-cicd-for-javascripttypescript-and-python-projects)
  - [Contributing](#contributing)
  - [License](#license)

## Usage
### Pre-requisites
Create a workflow `.yml` file in your repositories `.github/workflows` directory. Check [Examples](#examples) below. For more information, reference the GitHub Help Documentation for [Creating a workflow file](https://help.github.com/en/articles/configuring-a-workflow#creating-a-workflow-file).

### Inputs
| Name | Default | Description |
| - | - | - |
| `path` | `"./CHANGELOG.md"` | Path to `CHANGELOG.md` file |
| `release` | `""` | Get or create a release to edit, set it as target |
| `clear` | `false` | Delete everything from target release notes if it exists and not empty |
| `get` | `""` | Replace target release notes with notes of release provided here, e.g. `Undefined` |
| `set` | `""` | Fully replace target release notes with parameter value |
| `append` | `""` | Append new lines to target release notes from parameter value |
| `suffix` | `""` | Add suffix to each section of `append` notes, good for pasting a link to PR |
| `save` | `true` | Whether to save changes back to `CHANGELOG.md` path |
| `sanitize` | `false` | Keep only `Keep a Changelog` sections in target release notes |
| `encoding` | `"utf-8"` | Encoding for `CHANGELOG.md` |

### Outputs
| Name | Example | Description |
| - | - | - |
| `result` | `"### Added ..."` | Target Release notes |
| `label` | `"minor"` | Release label based on release notes: `major`, `minor`, or `patch` |
| `titles` | `"added,removed,fixed"` | Comma-separated `Keep a Changelog` titles from release notes |

## Examples
### Easy CI/CD for JavaScript/TypeScript and Python projects
https://github.com/vemel/github_actions_js/

## Contributing
I would love for you to contribute to `actions/nextchange`, pull requests are welcome! Please see the [CONTRIBUTING.md](CONTRIBUTING.md) for more information.

## License
The scripts and documentation in this project are released under the [MIT License](LICENSE)
