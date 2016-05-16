# BREW
BREW is a front-end CSS/HTML framework for building real estate websites.

### What's included

    dist/
    ├── brew.css
    ├── brew.css.map
    ├── brew.min.css
    └── brew.min.css.map
    
### Installation

    git clone https://github.com/Real-Estate-Webmasters/brew
    cd brew && npm install
    
### Documentation

BREW's documentation is included in this repo in the [`docs/`](/docs) folder and is generated
using [styledown](https://www.npmjs.com/package/styledown) to parse inline CSS comments.
The style guide is created using the command:

    npm run docs

### Building stylesheets
[Gulp](https://www.npmjs.com/package/gulp) is used to build BREW's distributed stylesheet.
View the [gulpfile.js](/gulpfile.js) file to see exactly how the stylesheets are built and compressed.
The [`dist/`](/dist) source code can be built using the command:

    npm run build

### Watching for changes
Gulp can watch for changes made to [`src/*.css`](/src) and automatically re-build as needed: 

    npm run watch
