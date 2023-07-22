# µLearn Foundation

#### An informal mechanism for bringing together learners who are interested in the same topic from across different fields and disciplines. A fantastic way to spend a small amount of time learning about new things with a group of people with same interests!

<br/>

# µLearn Website

This repository contains the the source code files for the µLearn Landing Page. Kindly read through the following to get a hold on the naming and contributions standards

The central repository holds four main branches with two branches having infinte lifetime(dev-server & production)

- dev (Open To Contributors)
- dev-server (hosted)
- staging (Open To Contributors, HotFix Only!)
- production (hosted)

origin/production is the main branch where the source code of HEAD always reflects a production-ready state.

origin/staging is the main branch where the source code of HEAD always reflects a state with the latest delivered development changes for the next release

## Supporting branches

- Feature branches
- Staging branches
- QuickUpdate branches
- Hotfix branches

## Feature Branch

- May branch off from: `dev`
- Must merge back into: `dev`
- Branches should be prefixed with `feature-`
- They should be in small letter casing with multiple words separated by `-`

Eg: feature-signup-page, feature-ig-page

## QuickUpdate Branch

- May branch off from: `staging`
- Must merge back into: `staging`, `dev`, `dev-server`
- Branches should be prefixed with `quickupdate-`
- They should be in small letter casing with multiple words separated by `-`

Eg: quickupdate-notifications-page

## Bugfix Branch

- May branch off from: `dev`
- Must merge back into: `dev`
- Branch naming convention: `bugfix-*`
- Branches should be prefixed with `bugfix-*`
- They should be in small letter casing with multiple words separated by `-`

Eg: bugfix-spelling-fix, bugfix-style-correction

## Hotfix Branch

- May branch off from: `staging`
- Must merge back into: `staging`, `dev`, `dev-server`
- Branch naming convention: `hotfix-*`
- Branches should be prefixed with `hotfix-*`
- They should be in small letter casing with multiple words separated by `-`

Eg: hotfix-signup-failure, hotfix-taskid123


## Contributing

Contributions are always welcome!

See [contributing.md](/contributing.md) for ways to get started.

## Maintainer

- If you are a maintainer of the project, you will be the person responsible for reviewing the pull request and merging them to respective branches.

### Pull Request Flow

- The pull request from the developers can only be received on the **dev**(feature, bugfix) and the **staging**(hotfix) branch.

- After reviewing the request you can merge them to the dev-server/production depending upon the type of request

## Quality Tester

- If you are a Quality Tester you can verify the dev-server for testing the upcoming features and the production for features which are already in release.
