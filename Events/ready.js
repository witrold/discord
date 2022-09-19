const Discord = require('discord.js')
const loadSlashCommands = require('../Loaders/loadSlashCommands')

module.exports = async (bot, client) => {

    await loadSlashCommands(bot)

    console.log(`${bot.user.tag} est bien en ligne`)

}

