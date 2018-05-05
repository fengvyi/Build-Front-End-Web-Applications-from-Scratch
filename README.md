# Build-Front-End-Web-Applications-from-Scratch
Build Front-End Web Apps from Scratch is an Codecademy Pro Intensive program that covers the skills professionals use to develop web applications with React. 

## Minesweeper
A console based minesweeper game.
***
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
***
Below is a list of some potential features to add to Minesweeper game:
* Add validation to ensure that board dimensions make sense. For example, a board should not be able to be created with more bombs than it has tiles.
* Add a timer which lets players know how long it took them to win (or lose).
* Add recursive flipping, when a tile is flipped that isn't touching a bomb (would have the number zero printed on it), all adjacent tiles additionally flip over.
* Add a method to place flags at a tile instead of flipping that tile. If a square has a flag on it, it can't be flipped over.

## Ravenous
"Ravenous" is a Yelp-like web application that allows users to search the Yelp API for restaurants that match a search option.
### Snapshot
![ravenous](https://github.com/fengvyi/Build-Front-End-Web-Applications-from-Scratch/blob/master/Codecademy_Pro_Intensive/projects/ravenous/Screen%20Shot%202018-05-04%20at%2010.20.56%20PM.png)
