const Discord = require('discord.js')
const { EmbedBuilder } = require('discord.js')
const moment = require('moment')
moment.locale('fr')

module.exports = {
    name: "profilinfo",
    description: "affiche des information sur votre compte",
    permisson: "Aucune",
    dm: true,
    options: [
        {
            type: "user",
            name: "user",
            description: "The user you want to get info",
            required: true
        }
    ],

    async run(bot, message, args) {

        let user = args.getUser("user")

        let userInfoEmbed = new Discord.EmbedBuilder()
        .setTitle(`${user.tag}'s infos`)
        .setThumbnail(user.displayAvatarURL({dynamic: true}))
        .setColor(0xFF0000)
        .setDescription(`
        **__▶ Informations sur l'utilisateur :__**
        
        > 📇 **Nom de l'utilisateur :** \`${user.tag}\`
        > 🏷️ **Tag :** \`${user.discriminator}\`
        > 🔗 **Avatar URL :** **[URL](${user.displayAvatarURL({dynamic: true})})**
        > 🆔 **ID de l'utilisateur :** ${user.id}
        > 👋 **Rejoind discord le :** \`${moment(user.createdAt).format('DD MMMM YYYY : h:mm:ss')}\`
        `)

        await message.reply({embeds: [userInfoEmbed], ephemeral: false})
    }
}