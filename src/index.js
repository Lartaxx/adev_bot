const { ShewenyClient } = require("sheweny");
const config = require("../config.json");
const chalk = require("chalk");
const translate = require("@vitalets/google-translate-api");
const uniqid = require("uniqid");
const schedule = require('node-schedule');
const { format } = require("util");
const mysql = require("mysql");
const pool = mysql.createPool({
  host: '127.0.0.1',
  user: 'u10_V6WtZ5g7Bk',
  port: 3306,
  password: 'I7w^9IAE+YiTfFlAClUVRGoE',
  database: "s10_adev"
});
const { MessageEmbed, MessageActionRow, MessageButton, MessageSelectMenu, Permissions } = require("discord.js");

const client = new ShewenyClient({
  chalk,
  MessageEmbed,
  MessageButton,
  MessageActionRow,
  MessageSelectMenu,
  Permissions,
  format,
  config,
  pool,
  uniqid,
  translate,
  schedule,
  intents: ["GUILDS", "GUILD_MESSAGES", "GUILD_MEMBERS"],
  partials: ["GUILD_MEMBER"],
  handlers: {
    commands: {
      directory: "./commands",
      prefix: "!",
    },
    events: {
      directory: "./events",
    },
  },
  mode : "production", // Change to production for production bot
});

client.login(config.DISCORD_TOKEN);
