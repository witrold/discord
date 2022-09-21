const Discord = require('discord.js')
const { EmbedBuilder } = require('discord.js')

module.exports = {
    name: "ping",
    description: "affiche le ping",
    permission: "Aucune",
    dm: true,
    

    async run(bot, message, args) {

        const exampleEmbed = new EmbedBuilder()
	.setColor(0xFF0000)
	.setDescription(`Le ping est de \`${bot.ws.ping}\` ms`)
        
        await message.reply({ embeds: [exampleEmbed] })
    }
}