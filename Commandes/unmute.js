const Discord = require('discord.js')
const ms = require('ms')
const { EmbedBuilder } = require('discord.js')

module.exports = {

    name: "unmute",
    description: "Unmute un membre",
    permission: Discord.PermissionFlagsBits.ModerateMembers,
    dm: false,
    options: [
        {
            type: "user",
            name: "membre",
            description: "le membre a unmute",
            required: true
        }, {
            type: "string",
            name: "raison",
            description: "raison du unmute",
            required: true
        }  
    ],

    async run(bot, message, args) {
        
        let user = args.getUser("membre")
        if(!user) return message.reply("Pas de membre !")
        let member = message.guild.members.cache.get(user.id)
        if(!member) return message.reply("Pas de membre !")

        let reason = args.getString("raison")
        if(!reason) reason = "Pas de raion fournis";

        if(!member.moderatable) return message.reply("ne peux pas unmute ce membre !")
        if(message.member.roles.highest.comparePositionTo(member.roles.highest) <= 0) return message.reply("Tu peux pas unmute cette personne !")
        if(!member.isCommunicationDisabled()) return message.reply("Ce membre n'est pas mute !")

        //////////////////////////////////////////// Mise en place des embed /////////////////////////////////////////////////////////// 
        
        const unmuteserveur = new EmbedBuilder()
        .setColor(0xFF0000)
        .setDescription(`${message.user} a unmute ${user.tag} pour la raison : \`${reason}\``)

        const unmutepriver = new EmbedBuilder()
        .setColor(0xFF0000)
        .setDescription(`Vous as été unmute du serveur ${message.guild.name} par ${message.user.tag} pour la raison : \`${reason}\``)
    
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

        try {await user.send({ embeds: [unmuteserveur] })} catch(err) {}

        await message.reply({ embeds: [unmuteserveur] })

        await member.timeout(null, reason)

    }
}