# About

We would like to compare some basic concepts and building blocks of redis as a database.


### Repo Overview

This repo starts a sample express server . Currently express server is not functional .

More importantly Repo has

1. models/ user.js file -> Which define the user model
2. tests/usermode.test.js -> There are simple mocha tests

To run test install npm install mocha -g

Then run

mocha tests/usermodel.test.js


### Going further

This repo hopes to demonstrate all what is achieved via jugglingdb as an ORM wrapper for redis can also be designed
using datastructures such as string, list, hash, set, sortedsets which redis provides us.

More importantly not using String datastruture where value maps to a serialised JSON object.






