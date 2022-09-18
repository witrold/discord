const { booleanTrue } = require('@sapphire/shapeshift')
const Discord = require('discord.js')


module.exports = {
    
    name: "kick",
    description: "kick",
    permisson: Discord.PermissionFlagsBits.kickMembers,
    dm: false,
    options: [
        {
            type: "user",
            name: "membre",
            description: "le membre a kick",
            required: true
        }, {
            type: "string",
            name: "raison",
            description: "la raison du kick",
            required: true
        }
    ],

    async run(bot, message, args) {
            
        let user = args.getUser("membre")
        if(!user) return message.reply("Pas de membre a kick")
        let member = message.guild.members.cache.get(user.id)
        if(!user) return message.reply("Pas de membre a kick")
            
        let reason = args.getString("raison")
        if(!reason) reason = "pas de raison fournit";

        if(message.user.id === user.id) return message.reply("essaie pas de te kick")
        if((await message.guild.fetchOwner()).id === user.id) return message.reply("Ne peux pas kick le propriéter du serveur !!!")
        if(member && !member.kickable) return message.reply("Je ne peux pas kick ce membre !!!")
        if(member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("Tu peux pas kick cette personne !!!")

        try {await user.send(`Tu as été kick du serveur ${message.guild.name} par ${message.user.tag} pour la raison : \`${reason}\``)} catch(err) {}

        await message.reply(`${message.user} a kick ${user.tag} pour la raison : \`${reason}\``)

        await member.kick(reason)
    }
}