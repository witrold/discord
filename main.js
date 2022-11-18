const Discord = require('discord.js')
const intents = new Discord.IntentsBitField(3276799)
const bot = new Discord.Client({intents})
const loadCommands = require('./Loaders/loadCommands')
const loadEvents = require('./Loaders/loadEvents')
const config = require('./config')
require(`./anti-crash.js`)();

bot.version = "0.7"
bot.color = "#FF0000";
bot.function = {
    createId : require("./Fonctions/createID")
}

bot.login(config.token)
loadCommands.bind(bot)('./Commandes/');
loadEvents(bot)
