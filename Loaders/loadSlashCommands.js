const Discord = require('discord.js')
const { REST } = require('@discordjs/rest')
const { Routes} = require('discord.js')
const{ ActivityType } = require('discord.js');

module.exports = async bot => {
    
    let commands = [];

    bot.commands.forEach(async command => {
        
        let slashcommand = new Discord.SlashCommandBuilder()
        .setName(command.name)
        .setDescription(command.description)
        .setDMPermission(command.dm)
        .setDefaultMemberPermissions(command.permission === "Aucune" ? null : command.permission)

        if(command.options?.length >= 1) {
            for(let i = 0 ; i < command.options.length; i++) {
                slashcommand[`add${command.options[i].type.slice(0, 1).toUpperCase() + command.options[i].type.slice(1, command.options[i].type.length)}Option`](option => option.setName(command.options[i].name).setDescription(command.options[i].description).setRequired(command.options[i].required))
            }
        }
        
        await commands.push(slashcommand)
    })

    const rest = new REST({version: "10"}).setToken(bot.token)

    //////////////////////////////////////////////////////REGARDE///////////////////////////////////////////////////
    
    await rest.put(Routes.applicationCommands(bot.user.id), {body: commands})
    setInterval(async () => {
        const Statut_Random_AutoChange = [`${bot.users.cache.size} membres`,`${bot.guilds.cache.size} serveurs`][Math.floor(Math.random() * [`${bot.guilds.cache.size} serveurs`,`${bot.users.cache.size} membres`].length)];
        bot.user.setPresence({activities: [{name: `${Statut_Random_AutoChange}`, type: ActivityType.Watching}]})
    }, 5000);

    ////////////////////////////////////////////////////////////////////////////////////////////////////////////////
    
    console.log("Les SlashCommands sont chargé avec succès.")
}