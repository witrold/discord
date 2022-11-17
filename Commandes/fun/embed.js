const Discord = require('discord.js')
const { EmbedBuilder } = require("discord.js")
const { color } = require('../../config')

module.exports = {

  name: "embed",
  description: "Permet d'envoyer un message en embed",
  permission: Discord.PermissionFlagsBits.ManageMessages,
  dm: false,
  category: "Modération",
  options: [
    {
        type: "string",
        name: "text",
        description: "Le message a envoyer.",
        required: true,
        autocomplete: false
    }
],

async run(bot, message, args) {
    let msg = args.getString("text");

        const EmbedMessage  = new EmbedBuilder()
            .setColor(bot.color)
            .setDescription(`${msg}`)

            
            message.channel.send({ embeds: [EmbedMessage ] });
            message.reply({content: "l'embed a ete envoyer avec succes !", ephemeral: true});
  }
}