const Discord = require('discord.js')
const loadDatabase = require('../Loaders/loadDatabase')
const loadSlashCommands = require('../Loaders/loadSlashCommands')

module.exports = async (bot, client) => {

    bot.db = await loadDatabase()
    bot.db.connect(function () {

        console.log("base de données connectée avec succés")
    })
    
    await loadSlashCommands(bot)

    console.log(`${bot.user.tag} est bien en ligne`)

}

