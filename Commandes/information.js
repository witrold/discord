const Discord = require('discord.js')
const { EmbedBuilder } = require('discord.js')

const exampleEmbed = new EmbedBuilder()
	.setColor(0xFF0000)
	.setTitle('Information')
	.setAuthor({ name: 'Multibot'})
	.setDescription('Bot créer pars Witrold#6969. Le bot est en version 0,1. Le bot est un bot multifonction sont objectif est de faire le travaille de plusieurs bot en un seul que ça soit la sécurité, la modération, les jeux ou autre.')

module.exports = {
    name: "information",
    description: "affiche des information sur le bot",
    permisson: "Aucune",
    dm: true,

    async run(bot, message) {
        
        await message.reply({ embeds: [exampleEmbed] })
    }
}