const Discord = require('discord.js')
const intents = new Discord.IntentsBitField(3276799)
const bot = new Discord.Client({intents})
const loadCommands = require('./Loaders/loadCommands')
const loadEvents = require('./Loaders/loadEvents')
const config = require('./config')
require(`./anti-crash.js`)();

bot.version = "0.9"
bot.color = "DarkBlue";
bot.function = {
    generateCaptcha: require("./Fonctions/generateCaptcha")
}

bot.login(config.token)
loadCommands.bind(bot)('./Commandes/');
loadEvents(bot)
