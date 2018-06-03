#!/usr/bin/env node

'use strict';

const boxen = require('boxen');
const chalk = require('chalk');
const getStdin = require('get-stdin');
const got = require('got');
const logUpdate = require('log-update');
const meow = require('meow');
const pkg = require('./package.json');
const urlJoin = require('url-join');
const wrapAnsi = require('wrap-ansi');

const normalize = str => str.trim().replace(/\t/g, '    ');
const splitSentences = str => str.replace(/(\.\s*)(?!$)/g, '.\n');
const trimLines = str => str.replace(/^\n+/, '').replace(/\n+$/, '');

const beaks = ['>', '='];
let i = 0;
beaks.next = () => {
  i = ++i % beaks.length;
  return beaks[i];
};

const duck = frame => trimLines(chalk`
   \\
    \\   {yellow _}
      {red ${frame}}{yellow (·)__}
       {yellow (___/}
  {blue ~ ~~~~~~~~~~~~~ ~}
 {blue ~ ~ ~ ~ ~ ~ ~ ~ ~ ~}
  {blue ~ ~ ~ ~ ~ ~ ~ ~ ~}
     {blue ~ ~ ~ ~ ~ ~}
`);

const banner = chalk`
{red What does the {bold.yellow duckie} say?}
{yellow Quack, quack.}`;

const help = chalk`
${messageBox(banner, { margin: 0 })}
${duck(beaks[0])}

Usage
  $ ${pkg.name} <input>

Options
  --no-color      Use black'n'white duck
  --no-animation  Use still duck
  --help, -h      Show help
  --version, -v   Show version number

Examples
  $ duckiesay  # gets random quote from remote api
  $ ${pkg.name} quack quack
  $ echo 'quack quack' | duckiesay
  $ npx samuel-ipsum -t header | duckiesay

Homepage:     {green ${pkg.homepage}}
Report issue: {green ${pkg.bugs.url}}`;

const flags = {
  help: { alias: 'h' },
  version: { alias: 'v' },
  animation: { type: 'boolean', default: true }
};

(async () => {
  const cli = meow(help, { flags });
  const input = cli.input.join(' ') || await getStdin();
  const [message, id] = input ? [input] : await getQuote();
  if (id) {
    console.log(urlJoin(pkg.config.url, `/${id}`));
    console.log();
  }
  duckiesay(message, cli.flags.animation);
})();

function duckiesay(message, animation = true) {
  console.log(messageBox(message));
  if (!animation) return console.log(duck(beaks[0]));
  const keyframe = () => logUpdate(duck(beaks.next()));
  const interval = setInterval(() => keyframe(), 200);
  setTimeout(() => clearInterval(interval), 3000);
}

function messageBox(message, options = {}) {
  const text = wrapAnsi(normalize(message), 72);
  return boxen(text, {
    margin: { left: 1 },
    padding: 1,
    borderStyle: 'round',
    ...options
  });
}

async function getQuote(quote = '') {
  const url = urlJoin(pkg.config.apiUrl, `/says/${quote}`);
  const { id, says } = (await got(url, { json: true })).body;
  return [splitSentences(says), id];
}
