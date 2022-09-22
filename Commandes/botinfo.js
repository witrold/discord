const Discord = require('discord.js')
const { EmbedBuilder } = require('discord.js');
const { cp } = require('fs');
const moment = require('moment')

module.exports = {
    name: "botinfo",
    description: "affiche des information sur le bot",
    permission: "Aucune",
    dm: true,
    category: "Information",

    async run(bot, message, client) {
 
        const moment = require("moment");
        require("moment-duration-format");
        const duration = moment.duration(bot.uptime).format(" D [d] H [h] m [m] s [s]");

        moment.locale('fr')

        const EmbedServeurCount = new EmbedBuilder()
    .setColor(bot.color)
    .addFields({ name: "Le bot est on depuis :", value: `⏲️ ${duration}`, inline: false })
    .addFields({ name: "Le bot est en version :", value: `📒 ${`V : 0.4`}`, inline: false })
    await message.reply({embeds: [EmbedServeurCount]})
        
    }
}