# duckiesay :duck: [![build status](https://badgen.net/travis/vladimyr/duckiesay/master)](https://travis-ci.com/vladimyr/duckiesay) [![npm package version](https://badgen.net/npm/v/duckiesay)](https://npm.im/duckiesay) [![github license](https://badgen.net/github/license/vladimyr/duckiesay)](https://github.com/vladimyr/duckiesay/blob/master/LICENSE) [![js semistandard style](https://badgen.net/badge/code%20style/semistandard/pink)](https://github.com/Flet/semistandard)

>Speaking duckie inside your terminal

Like cowsay but uses duck and optionally [duckiesays](http://duckiesays.com).

## Installation

```    
$ npm install -g duckiesay
```

Or for a one-time run:

```    
$ npx duckiesay
```

## Usage

```
$ duckiesay --help

Speaking duckie inside your terminal

╭───────────────────────────────╮
│                               │
│   What does the duckie say?   │
│   Quack, quack.               │
│                               │
╰───────────────────────────────╯
   \
    \   _
      >(·)__
       (___/
  ~ ~~~~~~~~~~~~~ ~
 ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
  ~ ~ ~ ~ ~ ~ ~ ~ ~
     ~ ~ ~ ~ ~ ~

Usage
  $ duckiesay <input>

Options
  --no-color      Use black'n'white duck
  --no-animation  Use still duck
  --help, -h      Show help
  --version, -v   Show version number

Examples
  $ duckiesay  # gets random quote from remote api
  $ duckiesay quack quack
  $ echo 'quack quack' | duckiesay
  $ npx samuel-ipsum -t header | duckiesay

Homepage:     https://github.com/vladimyr/duckiesay
Report issue: https://github.com/vladimyr/duckiesay/issues
