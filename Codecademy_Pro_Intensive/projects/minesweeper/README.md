Here are the steps for setting up transpilation in your project:

Initialize your project using `npm init`
Install babel dependencies by running
```
npm install babel-cli -D
npm install babel-preset-env -D
```
Create a `.babelrc` file inside your project and add the following code inside it:
```
{
  "presets": ["env"]
}
```
Add the following script to your scripts object in `package.json`:
```
"build": "babel src -d lib"
```
Run `npm run build` whenever you want to transpile your code from your src to lib directories.
