/* eslint-disable operator-linebreak */
require('dotenv').config();

const Discord = require('discord.js');
const fetch = require('node-fetch');

const client = new Discord.Client();

const self = 'Gif Bot';
const commandChar = '?';

const API_URL = `https://g.tenor.com/v1/search?key=${process.env.TENOR_KEY}&limit=100&media_filter=gif&q=`;

client.on('ready', () => {
  console.log('🤖 Beep Boop we are ready! 🤖');
});

client.on('message', (msg) => {
  if (msg.author.username !== self) {
    const content = msg.content.toLowerCase();
    if (content.startsWith(commandChar)) {
      // Check through our list of commands
      const command = content
        .replace(new RegExp(`\\${commandChar}`), '')
        .split(/\s/)[0];
      const commandContent = content
        .split(commandChar + command)
        .pop()
        .replace(/\s/, '');
      if (
        command === 'gif' ||
        command === 'sendgif' ||
        command === 'iwantagif'
      ) {
        const url = `${API_URL}${
          commandContent.length > 0 ? commandContent : 'robot'
        }`;
        fetch(url)
          .then((res) => res.json())
          .then(({ results }) => {
            const data = results[Math.floor(Math.random() * results.length)];
            const gifUrl = data.media.shift().gif.url;
            msg.channel.send(gifUrl);
          });
      }
    }
  }
});

client.login(process.env.BOT_TOKEN);
