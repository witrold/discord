const { booleanTrue } = require('@sapphire/shapeshift')
const Discord = require('discord.js')


module.exports = {
    
    name: "ban",
    description: "ban un membre",
    permisson: Discord.PermissionFlagsBits.BanMembers,
    dm: false,
    options: [
        {
            type: "user",
            name: "membre",
            description: "le membre a bannir",
            required: true
        }, {
            type: "string",
            name: "raison",
            description: "la raison du ban",
            required: true
        }
    ],

    async run(bot, message, args) {

        try {
            
            let user = await bot.users.fetch(args._hoistedOptions[0].value)
            if(!user) return message.reply("Pas de membre a banir")
            let member = message.guild.members.cache.get(user.id)
            
            let reason = args.getString("raison")
            if(!reason) reason = "pas de raison fournit";

            if(message.user.id === user.id) return message.reply("essaie pas de te banir")
            if((await message.guild.fetchOwner()).id === user.id) return message.reply("Ne peux pas ban le propriéter du serveur !!!")
            if(member && !member.bannable) return message.reply("Je ne peux pas bannir ce membre !!!")
            if(member && message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("Tu peux pas bannir cette personne !!!")
            if((await message.guild.bans.fetch()).get(user.id)) return message.reply("Ce membre est déja ban !!!")

            try {await user.send(`Tu as été banni du serveur ${message.guild.name} par ${message.user.tag} pour la raison : \`${reason}\``)} catch(err) {}

            await message.reply(`${message.user} a banni ${user.tag} pour la raison : \`${reason}\``)

            await message.guild.bans.create(user.id, {reason: reason})

        } catch (err) {
            
            return message.reply("Pas de membre a banir")
        }
        
    }
}