const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const db = require("quick.db");

module.exports = {
    name: "lock",
    aliases: ['l'],
    description: "Lock a channel.",
    usage: "lock (channel)",
    run: async (client, message, args) => {

      if(!message.member.permissions.has("MANAGE_MESSAGES")) return message.delete();

      const rr = db.fetch(`lock_system_${message.guild.id}`);

      const channel = message.mentions.channels.first() || message.channel;




      /*await channel.permissionOverwrites.edit(rr.id, { 
        SEND_MESSAGE: false,
        ADD_REACTIONS: false
      }).catch(() => {})*/

      await channel.permissionOverwrites.edit(rr,{ 'SEND_MESSAGES': false });

      const embed = new MessageEmbed()
        .setDescription(`${config.emojis.success} ${channel} has been **locked.**`)
        .setTimestamp()
        .setColor(config.messages.embeds.colors.yes);

      message.channel.send({ embeds: [embed] });
        
    },
};
