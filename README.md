# duckiesay :duck: [![npm package version](https://img.shields.io/npm/v/duckiesay.svg)](https://npm.im/duckiesay) [![github license](https://img.shields.io/github/license/vladimyr/duckiesay.svg)](https://github.com/vladimyr/duckiesay/blob/master/LICENSE) [![js-semistandard-style](https://img.shields.io/badge/code%20style-semistandard-brightgreen.svg)](https://github.com/Flet/semistandard)

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
      >(.)__
       (___/
  ~ ~~~~~~~~~~~~~ ~
 ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
  ~ ~ ~ ~ ~ ~ ~ ~ ~
     ~ ~ ~ ~ ~ ~

Usage
  $ duckiesay <input>

Options
  --no-color     Use black'n'white duck
  -h, --help     Show help
  -v, --version  Show version number

Examples
  $ duckiesay  # gets random quote from remote api
  $ duckiesay quack quack
  $ echo 'quack quack' | duckiesay
  $ npx samuel-ipsum -t header | duckiesay

Homepage:     https://github.com/vladimyr/duckiesay
Report issue: https://github.com/vladimyr/duckiesay/issues
