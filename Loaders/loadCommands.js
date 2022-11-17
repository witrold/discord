const pathJoin = require('node:path').join;
const { readdirSync, lstatSync } = require('node:fs');
const { Collection, Client } = require("discord.js");

/**
 * Load the commands
 * @param {string} basePath
 * @returns {Collection<string, object>}
 * @this Client
 */
module.exports = function loadCommands(basePath) {
    console.log('-----------------Chargement des commande----------------');
    console.log('Loading commands...');
    this.commands = new Collection();
    const scanDir = path => {
        for (const thing of readdirSync(path)) {
            const full = pathJoin(path, thing);
            if (lstatSync(full).isDirectory()) scanDir(full + '\\');
            else {
                const cmd = require(full);
                this.commands.set(cmd.name, cmd);
                console.log('| ' + cmd.name);
            }
        }
    };
    scanDir(pathJoin(process.cwd(), basePath));
    console.log('Commands loaded!');
    return this.commands;
};