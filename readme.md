# µLearn Website

This repository contains the source code files for the µLearn Frontend Project. Kindly go through the following to get a hold of the naming and contributions standards.

## Git Commands and Naming Etiquette

To clone the project

```
git clone https://github.com/your_username/ur_fork_of_mulearn.git
```

Do the necessary changes on the file and add the files.

```
git add -A
```

Commit the changes

```
git commit -m "feat(): Implemented the feature"
```

Pull the changes from the server ( not applicable for the first push )

```
git pull origin branch-name
```

Push the changes to the server for the first time

```
git push origin branch-name
```


Make sure you pull the changes from the repo and keep your branch updated.

## Running the Project Locally

```
git clone https://github.com/gtech-mulearn/mulearn.git
```

The central repository holds three main branches with two branches having infinite lifetime(dev-server & production)

- dev
- dev-server (hosted)
- production (hosted)

dev branch is open for collaboration and serves as the development environment where contributors can work on new features and bug fixes before they are merged into other branches.

dev-server is the main branch where the source code of HEAD always reflects a state with the latest delivered development changes for the next release

origin/production is the main branch where the source code of HEAD always reflects a production-ready state.

## Commit message types
- feat: (adds valuable new features or improvements that directly benefit and engage users.)

   E.g. "feat(column): Added new feature.""
 
- fix: ( resolve user-related issues, improving the software's reliability and providing a smoother user experience.)

   E.g. "fix(case): Fixed case sensitivity issue in search functionality for accurate results."
- docs: (making changes or updates to the documentation for better clarity and understanding.)

  E.g. "docs(readme): Updated README file with installation instructions and usage examples."
- style: ( focus on improving code appearance, such as formatting and fixing missing semicolons, without affecting functionality.)

  E.g. "style(format): Corrected indentation and added missing semicolons for consistent code style."
- refactor: (modifying the production code, such as renaming variables, to improve its structure and maintainability.)

  E.g. "refactor(variables): Renamed variables for improved code clarity and maintainability."
- test: (adding tests that were missing and improving existing tests, without changing the production code.)

  E.g. "test(login): Added tests for user login functionality and refactored existing login tests."
- chore: (updating build tasks and other non-production code aspects, without changing the actual software.)

  E.g. "chore(grunt): Updated Grunt tasks for better task automation and build process efficiency."

## Contributing

Contributions are always welcome!

See `contributing.md` for ways to get started.

## Maintainer

- If you are the maintainer of this project, you will be responsible for reviewing the pull request and merging them.

### Pull Request Flow

- The pull request from the developers can be received only on the **dev**(feature, bug-fix) branch.
- After reviewing the request, you can merge them to the dev-server/production depending upon the type of request.

## Quality Tester

- If you are a Quality Tester, you can verify the dev-server branch for testing the upcoming features and the production branch for features which are already in production.
