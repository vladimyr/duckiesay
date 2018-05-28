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

const trimLines = str => str.replace(/^\n+/, '').replace(/\n+$/, '');
const splitSentences = str => str.replace(/(\.\s*)(?!$)/g, '.\n');

const beaks = ['>', '='];

let i = 0;

const duck = frame => trimLines(chalk`
   \\
    \\  {yellow _
      {red ${frame}}(.)__
       (___/}
{blue    ~ ~~~~~~~~~~~~~ ~
  ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
   ~ ~ ~ ~ ~ ~ ~ ~ ~
      ~ ~ ~ ~ ~ ~}
`);

const bwDuck = frame => trimLines(`
   \\
    \\   _
      ${frame}(.)__
       (___/
  ~ ~~~~~~~~~~~~~ ~
 ~ ~ ~ ~ ~ ~ ~ ~ ~ ~
  ~ ~ ~ ~ ~ ~ ~ ~ ~
     ~ ~ ~ ~ ~ ~
`);

const banner = chalk`
{red What does the {bold.yellow duckie} say?}
{yellow Quack, quack.}`;

const help = chalk`
${messageBox(banner)}
${duck(beaks[0])}

Usage
  $ ${pkg.name} <input>

Options
  --no-color     Use black'n'white duck
  --no-animation Use still duck
  -h, --help     Show help
  -v, --version  Show version number

Examples
  $ duckiesay  # gets random quote from remote api
  $ ${pkg.name} quack quack
  $ echo 'quack quack' | duckiesay

Homepage:     {green ${pkg.homepage}}
Report issue: {green ${pkg.bugs.url}}`;

const flags = {
  help: { alias: 'h' },
  version: { alias: 'v' },
  color: { type: 'boolean', default: true },
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
  duckiesay(message, cli.flags.color, cli.flags.animation);
})();

function duckiesay(message, color = true, animation = true) {
  const duckie = color ? duck : bwDuck;
  console.log(messageBox(message));
  if (!animation) return console.log(duckie(beaks[0]));

  const interval = setInterval(() => {
    const beak = beaks[i = ++i % beaks.length];
    logUpdate(duckie(beak));
  }, 200);

  setTimeout(() => clearInterval(interval), 3000);
}

function messageBox(message) {
  return boxen(message.trim(), { padding: 1, borderStyle: 'round' });
}

async function getQuote(quote = '') {
  const url = urlJoin(pkg.config.apiUrl, `/says/${quote}`);
  const { id, says } = (await got(url, { json: true })).body;
  return [splitSentences(says), id];
}
