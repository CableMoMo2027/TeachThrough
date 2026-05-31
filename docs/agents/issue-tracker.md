# Issue Tracker: GitHub

Issues and PRDs for this repo live in GitHub Issues for `CableMoMo2027/TeachThrough`. Use the `gh` CLI for issue operations.

## Conventions

- **Create an issue**: `gh issue create --repo CableMoMo2027/TeachThrough --title "..." --body "..."`
- **Read an issue**: `gh issue view <number> --repo CableMoMo2027/TeachThrough --comments`
- **List issues**: `gh issue list --repo CableMoMo2027/TeachThrough --state open`
- **Comment on an issue**: `gh issue comment <number> --repo CableMoMo2027/TeachThrough --body "..."`
- **Apply labels**: `gh issue edit <number> --repo CableMoMo2027/TeachThrough --add-label "..."`
- **Remove labels**: `gh issue edit <number> --repo CableMoMo2027/TeachThrough --remove-label "..."`
- **Close an issue**: `gh issue close <number> --repo CableMoMo2027/TeachThrough --comment "..."`

## When a skill says "publish to the issue tracker"

Create a GitHub issue in `CableMoMo2027/TeachThrough`.

## When a skill says "fetch the relevant ticket"

Run `gh issue view <number> --repo CableMoMo2027/TeachThrough --comments`.
