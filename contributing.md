## Contributor Readme

To contribure to this project you can create new branches from either the dev or the staging branch, make required changes and create a new pull request as per the below given structure.

feature-\* : Create new branch from the dev branch and merge back into the dev branch

bugfix-\* : Create new branch from the dev branch and merge back into the dev branch

hotfix-\* : Create new branch from the staging branch and merge back into the staging branch.

Running Code Locally
Clone the Git repository to your local machine.

git clone https://github.com/gtech-mulearn/mulearn.git
Change into the project directory.

cd mulearn
Install the dependencies using npm or yarn.

```
npm install

# or

yarn install
Start the development server.

npm run dev

# or

yarn dev
```

Access the project at http://localhost:3000 in your web browser.

## Creating New Branch

To clone the project

```bash
git clone https://github.com/gtech-mulearn/mulearn.git
```

Checkout to dev branch
feature and bugfix branches of and merges to the dev branch
```
git checkout dev
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
