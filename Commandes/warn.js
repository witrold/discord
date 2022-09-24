const Discord = require('discord.js')
const { EmbedBuilder } = require('discord.js')
const moment = require('moment')
moment.locale('fr')

module.exports = {
    name: "warn",
    description: "warn un membre",
    permisson: Discord.PermissionFlagsBits.ManageMessages,
    dm: true,
    category: "Modération",
    options: [
        {
            type: "user",
            name: "membre",
            description: "le membre a warn",
            required: true,
            autocomplete: false
        }, {
            type: "string",
            name: "raison",
            description: "la raison du warn",
            required: true,
            autocomplete: false
        }
    ],

    async run(bot, message, args, db) {

        let user = args.getUser("membre")
        if(!user) return message.reply("pas de membre !")
        let member = message.guild.members.cache.get(user.id)
        if(!member) return message.reply("Pas de membre !")

        let reason = args.getString("raison")
        if(!reason) reason = "pas de raison fournie";

        if(message.user.id === user.id) return message.reply("Essaie pas de te warn")
        if((await message.guild.fetchOwner()).id === user.id) return message.reply("Ne peux pas warn le propriéter du serveur !!!")
        if((await message.guild.members.fetchMe()).roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("Le robot ne peux pas warn ce membre !!!")

        try { await user.send(`${message.user.tag} vous a warn sur le serveur ${message.guild.name} pour la raison : \`${reason}\` !`) } catch (err) {}

        await message.reply(`Vous avez warn ${user.tag} pour la raison : \`${reason}\` avec succès !`)

        let ID = await bot.function.createId("WARN")

        db.query(`INSERT INTO warns (guild, user, author, warn, reason) VALUES ('${message.guild.id}', '${user.id}', '${ID}', '${reason.replace(/'/g, "\\'")}')`)
    }
}