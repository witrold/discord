const Discord = require("discord.js")
const { EmbedBuilder } = require("discord.js")
const { color } = require('../config')

module.exports = {

  name: "member-count",
  description: "Afficher le nombre total de membre",
  permission: "Aucune",
  dm: false,

  async run(bot, message, args) {

    const EmbedMemberCount = new EmbedBuilder()
    .setColor(0xFF0000)
    .addFields({ name: "Membres totaux :", value: `👥 ${message.guild.memberCount}`, inline: false })
    .addFields({ name: "Humain :", value: `👤 ${message.guild.members.cache.filter(member => !member.user.bot).size}`, inline: true })
    .addFields({ name: "Bot :", value: `🤖 ${message.guild.members.cache.filter(member => member.user.bot).size}`, inline: true })
    
    await message.reply({embeds: [EmbedMemberCount]})
  }
} 