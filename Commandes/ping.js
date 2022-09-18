const Discord = require('discord.js')
const { delayMillis } = require('splite')
const { EmbedBuilder } = require('discord.js')

module.exports = {
    name: "ping",
    description: "affiche le ping",
    permisson: "Aucune",
    dm: true,

    async run(bot, message) {

        const exampleEmbed = new EmbedBuilder()
	.setColor(0xFF0000)
	.setTitle('Ping')
	.setAuthor({ name: 'Multibot'})
	.setDescription(`Le ping est de \`${bot.ws.ping}\` ms`)
        
        await message.reply({ embeds: [exampleEmbed] })
    }
}