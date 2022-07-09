/**
* READ THIS BEFORE YOU CHANGE THE CONTENT OF THIS COMMAND!
* You are not allowed to change lines about this repo in this command.
* You can change bot name and owner name, but not the source of this bot.
* You are also not allowed to remove the credits from the footer to the orginal owner from this bot.
* If you want to change the description, you will have to add the line that: "[YOUR BOT NAME] is an modified instance of Bolt Utilities bot made by Unbannable.
* These points are not optional, but remarks from the dev team of Bolt Utilities.
*/

const Discord = require("discord.js");
const moment = require("moment");
require("moment-duration-format");
module.exports = {
  name: "botinfo",
  description: "Shows the bot info",
  botPerms: ["EMBED_LINKS"],
  run: async (client, message, args) => {
    const duration = moment
      .duration(client.uptime)
      .format(" D [days], H [hrs], m [mins], s [secs]");

    let embed = new Discord.MessageEmbed()
      .setAuthor("Bolts Stats!" , client.user.avatarURL())
      .setColor("RANDOM")
      .setDescription(
        `**Bot Name: **Bolt Utilities ** \n **Bot Owner:** Unbannable \n**Total Categories: **8 \n**Total Commands: **${client.commands.size} \n**Users:** ${
          client.users.cache.size
        } \n**Servers:** ${client.guilds.cache.size} \n**Channels: **${
          client.channels.cache.size
        }**`
      )
      .addField(
        "Bolt Utilities",
        "Bolt Utlities is an open-source multi-purpose discord bot with features like moderation, music, logging, welcomer and so much more!\nYou can find the link to the [GitHub Repo Here](https://github.com/Minion9113/Bolt-Utilities)"
      )
      .addField(
        "Some Useful Links",
        "**Get your own bot!** **[Here](https://github.com/Minion9113/Bolt-Utilities)** \n**Need Help? Join our ** **[Support/Development Server](https://discord.gg/2SfcKxNt4G)** **for assistance**"
      )
      .setFooter("Regards, Bolt Utilities  Development Team");
    message.channel.send({ embeds: [embed] });
  },
};
