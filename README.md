## Warning
This is in its very early stages. Don't think that it can actually do anything interesting yet. 

## Dev setup

For Mac/Linux. I've never run this on Windows, though I believe all of the tools are supported and you probably can get it working. 

1. Install Node and npm, if you haven't already.
2. Install bower if you haven't already: `npm install bower --global`
3. cd to the directory you cloned the repo to. 
3. Run `bower install` to fetch client-side dependencies.
4. Run the bash script `copy_dependencies` which will move only the needed files into the appropriate directory.
5. Run `npm install` to fetch server-side dependencies
6. Run `node server.js`
7. Open localhost:3000 in a browser

It's helpful, but not required, to install [nodemon](https://github.com/remy/nodemon):

`npm install nodemon --global`

You can then run `nodemon server.js` instead of `node server.js`, and nodemon will watch the server file and restart node for you automatically when changes are made. 


