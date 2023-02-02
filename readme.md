
# µLearn Website
This repository contains the the source code files for the µLearn Frontend Project. Kindly read through the following to get a hold on the naming and contributions standards


## Git Commands and Naming Etiquette

To clone a project

  ```bash
  git clone git@github.com:gtech-mulearn/mulearnfrontend.git
  ```

Create a new feature branch  

  ```
  git branch feature-loginpage
  ```

Switch to the new branch

  ```
  git checkout feature-loginpage
  ```

Do the necessary changes on the files, add the files

  ```
  git add -A
  ```

Commit the changes

  ```
  git commit -m "Implemented the login feature"
  ```

Pull the changes from the server ( not applicable for the first push )

  ```
  git pull origin feature-loginpage
  ```

Push the changes to server for the first time

  ```
  git push origin feature-loginpage
  ```

Once the feature is complete, merge the changes to the develop branch ( the team lead does this )

  ```
  git checkout dev
  ```

  ```
  git merge feature-loginpage
  ```

Make sure you pull the changes from the required repo and keep your branch updated. 

The central repository holds four main branches with two branches having infinte lifetime(dev-server & production)
  - dev
  - dev-server (hosted)
  - staging
  - production (hosted)


origin/production is the main branch where the source code of HEAD always reflects a production-ready state.

origin/staging is the main branch where the source code of HEAD always reflects a state with the latest delivered development changes for the next release

## Supporting branches
  - Feature branches
  - Staging branches
  - Hotfix branches

## Feature Branch
  - May branch off from: `dev`
  - Must merge back into: `dev`
  - Branches should be prefixed with `feature-`
  - They should be in small letter casing with multiple words separated by `-`

Eg: feature-signuppage, feature-igpage
## Bugfix Branch
  - May branch off from: `dev`
  - Must merge back into: `dev`
  - Branch naming convention: `bugfix-*`
  - Branches should be prefixed with `bugfix-*`
  - They should be in small letter casing with multiple words separated by `-`

## Hotfix Branch
  - May branch off from: `staging`
  - Must merge back into: `staging`, `dev`, `dev-server`
  - Branch naming convention: `hotfix-*`
  - Branches should be prefixed with `hotfix-*`
  - They should be in small letter casing with multiple words separated by `-`

Eg: hotfix-signup-failure, hotfix-taskid123

## Contributors

- To contribure to this project you can create new branches from either the `dev` or the `staging` branch, make required changes and create a new pull request as per the below given structure.
```
- feature-* : Create new branch from the dev branch and merge back into the dev branch

- bugfix-* : Create new branch from the dev branch and merge back into the dev branch

- hotfix-* : Create new branch from the staging branch and merge back into the staging branch.
```


## Maintainer

- If you are a maintainer of the project, you will be the person responsible for reviewing the pull request and merging them.

### Pull Request Flow
- The pull request from the developers can only be received on the **dev**(feature, bugfix) and the **staging**(hotfix) branch.

- After reviewing the request you can merge them to the dev-server/production depending upon the type of request

## Quality Tester
- If you are a Quality Tester you can verify the dev-server for testing the upcoming features and the production for features which are already in release.
    
