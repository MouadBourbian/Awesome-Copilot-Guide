---
description: "A standardized format for Git commit messages maintains a clear and searchable project history."
applyTo: "**"
---

# Git Commit Message Strategy

A standardized format for Git commit messages maintains a clear and searchable project history. It also allows for the automation of tasks such as generating changelogs and determining software version bumps. The convention structures each commit message into a header, an optional body, and an optional footer.

## 1. Structure

The commit message follows a specific format:

<pre>
<b><a href="#21-type">&lt;type&gt;</a></b></font>(<b><a href="#22-scope">&lt;optional scope&gt;</a></b>): <b><a href="#23-description">&lt;description&gt;</a></b>
<sub>empty line as separator</sub>
<b><a href="#3-body">&lt;optional body&gt;</a></b>
<sub>empty line as separator</sub>
<b><a href="#4-footer">&lt;optional footer&gt;</a></b>
</pre>

## 2. Header

The header is a single line containing the type, an optional scope, and a description. It is the only mandatory part of the message.

### 2.1. Type

The type is a required prefix that categorizes the change. Common types include:

- **feat**: A new feature is introduced. This corresponds to a minor version increase in semantic versioning.
- **fix**: A bug in the code is corrected. This corresponds to a patch version increase.
- **docs**: Changes are made only to documentation.
- **style**: Code formatting changes are made that do not affect logic (e.g., white-space, semi-colons).
- **refactor**: The code structure is changed without altering its external behavior.
- **perf**: A code change improves performance.
- **test**: Tests are added or existing tests are corrected.
- **build**: Changes affect the build system, continuous integration configuration, or external dependencies.
- **chore**: Miscellaneous changes are made that do not modify source or test files (e.g., updating `.gitignore`).

### 2.2. Scope

The scope is an optional noun inside parentheses that provides context for the change, such as the name of a component, module, or package.

- _Example_: `feat(auth): add password strength indicator`

### 2.3. Description

The description is a concise summary of the change that follows the type and scope. It should:

- Be written in the imperative mood (e.g., "add feature" not "added feature").
- Begin with a lowercase letter.
- Not end with a period.
- Be limited to 50 characters.

## 3. Body

The body is an optional section used to provide additional context. It explains the motivation for the change and contrasts the new behavior with the old. The body must be separated from the header by a blank line. Lines in the body should be wrapped at 72 characters.

## 4. Footer

The footer is an optional section that follows the body, separated by a blank line. It is used to provide metadata, such as issue tracker references or information about breaking changes.

- _Issue Reference Example_: `Closes #123`
- _Breaking Change Example_: `BREAKING CHANGE: The 'user' endpoint now requires an API key.`

## 5. Breaking Changes

A breaking change is a modification that is not backward-compatible. It must be clearly indicated in the commit message to signal a major version increase. There are two ways to denote a breaking change:

1.  Append an exclamation mark (`!`) to the header before the colon.
2.  Add a `BREAKING CHANGE:` section at the beginning of the footer.

If an `!` is used in the header, the commit description is used to describe the breaking change.

## 6. Examples

**Commit for a new feature**

```
feat: allow users to upload a profile picture
```

**Commit for a bug fix with a scope**

```
fix(api): prevent duplicate entries on user registration
```

**Commit with a body for context**

```
refactor(database): migrate user authentication to a separate table

The user table was becoming too large and contained mixed concerns.
This change isolates authentication credentials, improving security
and simplifying future schema modifications.
```

**Commit indicating a breaking change**

```
feat(api)!: replace user ID with UUID in public endpoints

BREAKING CHANGE: The `id` field in the `/users/{id}` endpoint response
is now a UUID string instead of an integer. Consumers of the API
must update their data models to handle the new format.
```
