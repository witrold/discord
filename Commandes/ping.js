const Discord = require('discord.js')
const { delayMillis } = require('splite')

module.exports = {
    name: "ping",
    description: "affiche le ping",
    permisson: "Aucune",
    dm: true,

    async run(bot, message) {
        
        await message.reply(`Ping : \`${bot.ws.ping}\``)
    }
}