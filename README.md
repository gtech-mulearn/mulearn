# GTech µLearn

![GTech µLearn Logo](public/helpers/µLearn-banner.png)

### µLearn is a synergic philosophy of education, with a culture of mutual learning through micro groups of peers. µLearn is here to assist you in breaking through the echo chambers and free you from the shackles that have you grounded.

<br>
<br>

Working with Git
=================
## Git Basic Commands

To clone a project

  ```git clone git@github.com:gtech-mulearn/mulearn.git```

**Note:** Project url can be obtained from www.mulearn.org

Create a new feature branch  

  ```git branch feature-login```

Switch to the new branch

  ```git checkout feature-login```

Do the necessary changes on the files, add the files

  ```git add -A```

Commit the changes

  ```git commit -m "Implemented the login feature"```

Pull the changes from the server ( not applicable for the first push )

  ```git pull origin feature-login```

Push the changes to server for the first time

  ```git push origin feature-login```

Once the feature is complete, merge the changes to the develop branch ( the team lead does this )

  ```git checkout develop```

  ```git merge feature-login```

Make sure you pull the changes from the required repo and keep your branch updated. 

![Gitdashflow](public/helpers/flow.png)

The central repository holds two main branches with an infinite lifetime:
  - master
  - develop

origin/master is the main branch where the source code of HEAD always reflects a production-ready state.
origin/develop is the main branch where the source code of HEAD always reflects a state with the latest delivered development changes for the next release

## Supporting branches
  - Feature branches
  - Release branches
  - Hotfix branches

## Feature Branch
  - May branch off from: ```develop```
  - Must merge back into: ```develop```
  - Branch naming convention: anything except ```master```, ```develop```, ```release-*```, or ```hotfix-*```
  - Branches should be prefixed with ```feature-```
  - They should be in small letter casing with multiple words separated by ```-```

Eg: feature-signup, feature-taskid123
## Bugfix Branch
  - May branch off from: ```develop```
  - Must merge back into: ```develop```
  - Branch naming convention: ```bugfix-*```
  - Branches should be prefixed with ```bugfix-*```
  - They should be in small letter casing with multiple words separated by ```-```

## Release Branch
  - May branch off from: ```develop```
  - Must merge back into: ```develop```
  - Branch naming convention: anything except ```master```, ```develop```, ```release-*```, or ```hotfix-*```
  - Branches should be prefixed with ```release-*```
  - They should be in small letter casing with multiple words separated by ```-```

Eg: release-v1.1

## Hotfix Branch
  - May branch off from: ```master```
  - Must merge back into: ```develop``` and ```master```
  - Branch naming convention: ```hotfix-*```
  - Branches should be prefixed with ```hotfix-*```
  - They should be in small letter casing with multiple words separated by ```-```

Eg: hotfix-signup-failure, hotfix-taskid123

## Simultaneous Multiple Versions

If your project has multiple versions which are live simultaneously, you would need multiple master and develop branches for them .

For example, If your project has a lite and a standard version. Suppose the light version has reduced feature set than the standard version. In that case, you would need to create two master branches and two develop branches individually for them
- master-lite
- master-standard
- develop-lite
- develop-standard



## Further References
  - https://www.conventionalcommits.org/en/v1.0.0/
  - http://www.gitimmerssion.com
  - http://git-scm.com/
  - https://fayausa.github.io/Git-commands/
