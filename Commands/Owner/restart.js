const wait = require('util').promisify(setTimeout);
const OWNER_ID = require("../../config.json").OWNER_ID;
const { MessageEmbed }= require('discord.js');
require('dotenv').config();
var token = process.env.BOT_TOKEN;

module.exports = {
     name: "restart",
    description: "restarts the bot",
    async run (interaction, client) {
        const logMsg = `Command Used: \`RESTART\` \nUser: \`${interaction.user.id}\` \nChannel: \`${interaction.channel.id} (${interaction.channel.name})\``;
        client.channels.cache.get(client.config.errorLog).send(logMsg);
        try {
            if (interaction.user.id != OWNER_ID || ID) {
                await interaction.reply({content: "RESTARRR...",ephemeral: true});
                await wait(1000);
                await interaction.editReply({content:"Wait ... What?!",ephemeral: true});
                await wait(2000);
                return await interaction.editReply({content:"Bruh! You are not a developer, this command is not for you : )",ephemeral: true});
            }

            await interaction.reply("RESTARTING FAST AS F BOIIIIII ...").then((m) => {
                client.destroy(BOT_TOKEN);
                });
            await wait(2000).then((m) => {
                client.login(BOT_TOKEN);
            });
            await interaction.editReply("Damn! I'm Back 🔥");
              
        } catch(err) {
            const errTag = client.config.errTag;
            client.channels.cache.get(client.config.ERROR_LOGS_CHANNEL).send(`**ERROR!** ${errTag} \n${err}\nCommand: \`RESTART\` \nChannel: \`${interaction.channel.id} (${interaction.channel.name})\` \n User: \`${interaction.user.id}\`\n`);
        }
        
    },
};