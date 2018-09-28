# Frontend Frameowrk, Patterns, Widgets

************
## ABOUT
************

The Frontend Framework (FW) is a SCSS based framework and patten library created to help maintain consistency within and across projects. It is a focal point for referencing reusable components that are frequently found across projects that can be easily customised by changing just a few values.
FW is split into a number of different .scss files each containing styles for a particular component or styleset. These can be included as per the projects requirements in styles.scss resulting in a single styles.css and styles.min.css for use within the project.
FW is source controlled using GIT and can be cloned from the GIT Repo.
It also makes use of the [Grunt](http://gruntjs.com/) task runner, and includes the necessary gruntfile.js and package.json files to get started with grunt

To clone, initialise and install the required node modules for grunt dependancy follow the steps below:

1. Install [Git](https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)
2. Install [Ruby](https://www.ruby-lang.org/en/documentation/installation/)
3. Install [Node.js](https://nodejs.org/en/download/)
4. Open CMD prompt with ruby
5. Install grunt globally with the cmd: npm install -g grunt-cli
6. Navigate to your FW or project directory where FW sits
7. Type: **npm install** to install node modules for the grunt packages

## Using Grunt
Grunt is a javascript task runner that runs a variety of node packages to help improve your development workflow.
There are a number of node packages at work within FW. Each detailed below:

1. grunt sass: This is the preprocessor being used to process the .scss files into css files
2. autoprefixer: This adds any relevant vendor prefixes required to any shorthand css properties using within the .scss files
3. cssmin: minifies the compiled styles.css file to styles.min.css
4. concat: concatinates any JS files within the library/js directory into a single JS file
5. uglify: takes the concatenated scripts.js file and minifies it
6. qunit: TBC
7. jshint: javascript linter for validating JS being written
8. watch: a node service running in the package, capable of running a number of other node packages when certain events are triggered
9. browsersync: launches a local server for the FW directory in your browser
10. tinyimg: image optimisation

Within the FW there are many grunt commands you can use, cmd:'grunt', cmd:'grunt serve', cmd:'grunt watch' and cmd:'grunt compress'
### grunt
Running the cmd 'grunt' from the cmd prompt with ruby will run the following tasks sass, autoprefixer, jshint, qunit, concat, cssmin, uglify, tinyimg
### grunt serve
Running the cmd 'grunt serve' from the cmd prompt with ruby will run the following tasks browsersync, watch. The watch task itself watches any files for changes and runs sass, autoprefixer, cssmin, jshint, concat, uglify on the files that are changes.
### grunt watch
Running the cmd 'grunt watch' does all the watch tasks that the serve cmd does but doesn't launch a local node server
### grunt compress
Running the cmd 'grunt compress' from the cmd prompt with ruby will execute the tinyimg task to run. This will attempt to compress any jpg, png and svg files within the library/images folder. It report back with any savings made on the images and ones which it either couldn't compress or couldn't save anything further.


************
## CHANGE LOG
************
1. 0.1. Added intial framework setup, scss, js, gruntfile, package.json
************
