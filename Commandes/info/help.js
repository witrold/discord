const Discord = require('discord.js');
const { ActionRowBuilder, EmbedBuilder, Events, SelectMenuBuilder } = require('discord.js');

module.exports = {
    name: "help",
    description: "affiche toute les commande",
    permission: "Aucune",
    dm: true,
    category: "Information",
    options: [
        {
            type: "string",
            name: "commande",
            description: "La commande a afficher",
            required: false,
            autocomplete: true
        }
    ],
    
    async run(bot, message, args) {
        let command;
        if(args.getString("commande")) {
            command = bot.commands.get(args.getString("commande"));
            if(!command) return message.reply("Pas de commande !")
        }

        let categories = [];
            bot.commands.forEach(command => {
                if(!categories.includes(command.category)) categories.push(command.category)
            })
        

        if(!command) {

            const row = new ActionRowBuilder()
            .addComponents(
                new SelectMenuBuilder()
                    .setCustomId('helpmenu')
                    .setPlaceholder('Catégorie')
                    .addOptions(
                        {
                            label: 'Acceuil',
                            description: "Pour revenir a l'acceuil",
                            value: 'menu_option',
                        },
                        {
                            label: 'Information',
                            description: 'Pour choisir la catégorie Information',
                            value: 'first_option',
                        },
                        {
                            label: 'Fun',
                            description: 'Pour choisir la catégorie Fun',
                            value: 'second_option',
                        },
                        {
                            label: 'Modération',
                            description: 'Pour choisir la catégorie Modération',
                            value: 'third_option',
                        },
                    ),
            );

            const embed1 = new Discord.EmbedBuilder()
                .setColor(bot.color)
                .setTitle(`Commandes bot`)
                .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
                .setDescription(`Commandes disponibles: \`${bot.commands.size}\`\nCatégories disponibles: \`${categories.length}\``)
                .setTimestamp()
                .setFooter({text: "Commandes du robot"})

            const embed2 = new Discord.EmbedBuilder()
                .setColor(bot.color)
                .setTitle(`Commandes bot`)
                .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
                .setTimestamp()
                .setFooter({text: "Commandes du robot"})
    
            
                let commands = bot.commands.filter(cmd => cmd.category === "Information")
                embed2.addFields({name : `Information`, value: `${commands.map(cmd => `\`${cmd.name}\` : ${cmd.description}`).join("\n")}`})

            const embed3 = new Discord.EmbedBuilder()
                .setColor(bot.color)
                .setTitle(`Commandes bot`)
                .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
                .setTimestamp()
                .setFooter({text: "Commandes du robot"})

                let commands2 = bot.commands.filter(cmd => cmd.category === "fun")
                embed3.addFields({name : `fun`, value: `${commands2.map(cmd => `\`${cmd.name}\` : ${cmd.description}`).join("\n")}`})
            
            const embed4 = new Discord.EmbedBuilder()
                .setColor(bot.color)
                .setTitle(`Commandes bot`)
                .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
                .setTimestamp()
                .setFooter({text: "Commandes du robot"})

                let commands3 = bot.commands.filter(cmd => cmd.category === "Modération")
                embed4.addFields({name : `Modération`, value: `${commands3.map(cmd => `\`${cmd.name}\` : ${cmd.description}`).join("\n")}`})
            
            
            await message.reply({embeds: [embed1], components: [row] })
            
            bot.on(Events.InteractionCreate, async interaction => {
                if (!interaction.isSelectMenu())  return;
        
                const selected = interaction.values[0];
            
                if (selected === 'first_option') {
                    await interaction.update({embeds: [embed2]})
                } else if (selected === 'second_option') {
                    await interaction.update({embeds: [embed3]})
                } else if (selected === 'third_option') {
                    await interaction.update({embeds: [embed4]})
                } else if (selected === 'menu_option') {
                    await interaction.update({embeds: [embed1]})
                }
            });

        } else {

            let Embed = new Discord.EmbedBuilder()
            .setColor(bot.color)
            .setTitle(`Commandes ${command.name}`)
            .setThumbnail(bot.user.displayAvatarURL({dynamic: true}))
            .setDescription(`Nom : \`${command.name}\`\nDescription : \`${command.description}\`\nPermission requise : \`${typeof command.permission !== "bigint" ? command.permission : new Discord.PermissionsBitField(command.permission).toArray(false)}\`\nCommande en DM : \`${command.dm ? "Oui" : "Non"}\`\nCatégorie : \`${command.category}\``)
            .setTimestamp()
            .setFooter({text: "Commandes du robot"})

            await message.reply({embeds: [Embed]})
        }
    }
}