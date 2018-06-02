#!/usr/bin/env node

'use strict';

const chalk = require('chalk');
const cowsay = require('cowsay-tag');
const getStdin = require('get-stdin');
const got = require('got');
const meow = require('meow');
const pkg = require('./package.json');
const urlJoin = require('url-join');

const trimLines = str => str.replace(/^\n+/, '').replace(/\n+$/, '');
const splitSentences = str => str.replace(/(\.\s*)(?!$)/g, '.\n');

const bwDuck = trimLines(`
  \\
   \\ >()_
    __(__)__ _
`);

const duck = trimLines(chalk`
  \\
   \\ {red >}{yellow ()_}
    {blue __}{yellow (}{blue __}{yellow )}{blue __ _}
`);

const banner = [
  ['What does the duckie say?', chalk`{red What does the {bold.yellow duckie} say?}`],
  ['Quack, quack.', chalk`{yellow Quack, quack.}`]
];

const help = chalk`
${outputBanner(banner)}

Usage
  $ ${pkg.name} <input>

Options
  --no-color     Use black'n'white duck
  -h, --help     Show help
  -v, --version  Show version number

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
  color: { type: 'boolean', default: true }
};

(async () => {
  const cli = meow(help, { flags });
  const input = cli.input.join(' ') || await getStdin();
  const [message, id] = input ? [input] : await getQuote();
  console.log(duckiesay(message, cli.flags.color));
  if (!id) return;
  console.log();
  console.log(urlJoin(pkg.config.url, `/${id}`));
})();

function duckiesay(message, color = true) {
  const cow = color ? duck : bwDuck;
  return cowsay(cow)`${message.trim()}`;
}

async function getQuote(quote = '') {
  const url = urlJoin(pkg.config.apiUrl, `/says/${quote}`);
  const { id, says } = (await got(url, { json: true })).body;
  return [splitSentences(says), id];
}

// NOTE: This is necessary because `cowsay-tag`
//       does NOT support ansi escape sequences!
function outputBanner(lines) {
  const out = duckiesay(lines.map(it => it[0]).join('\n'));
  return lines.reduce((acc, [str, colorized]) => {
    acc = acc.replace(str, colorized);
    return acc;
  }, out);
}
