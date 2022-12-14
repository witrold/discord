const Discord = require('discord.js')
const { EmbedBuilder } = require('discord.js')
const moment = require('moment')

module.exports = {
    name: "serveurinfo",
    description: "affiche des information sur le serveurs",
    permission: "Aucune",
    dm: false,
    category: "Information",

    async run(bot, message) {

        moment.locale('fr')
        var tempse = moment(message.guild.createdAt).format('DD MMMM YYYY : h:mm:ss');
            
        const EmbedServeurCount = new EmbedBuilder()
    .setColor(bot.color)
    .addFields({ name: "Date de crÃ©ation du serveur :", value: `â²ï¸ ${tempse}`, inline: false })
    .addFields({ name: "Nombre de boost :", value: `ð° ${message.guild.premiumSubscriptionCount}`, inline: false })
    .addFields({ name: "Membres totaux :", value: `ð¥ ${message.guild.memberCount}`, inline: false })
    .addFields({ name: "Nombre de ban :", value: `ð¨ ${(await message.guild.bans.fetch()).size}`, inline: false})
    .addFields({ name: "Humain :", value: `ð¤ ${message.guild.members.cache.filter(member => !member.user.bot).size}`, inline: false })
    .addFields({ name: "Bot :", value: `ð¤ ${message.guild.members.cache.filter(member => member.user.bot).size}`, inline: false })
    .addFields({ name: "Nombre de role :", value: `ð§ð¼ââï¸ ${message.guild.roles.cache.size}`, inline: false })

    await message.reply({embeds: [EmbedServeurCount]})

    }
}