const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const db = require("quick.db");

module.exports = {
    name: "unlock",
    aliases: ['unl'],
    description: "Unlock a channel.",
    usage: "unlock (channel)",
    run: async (client, message, args) => {

      if(!message.member.permissions.has("MANAGE_MESSAGES")) return message.delete();

      const rr = db.fetch(`lock_system_${message.guild.id}`);

      const channel = message.mentions.channels.first() || message.channel;



      

      /*await channel.permissionOverwrites.edit(rr.id, { 
        SEND_MESSAGE: true,
        ADD_REACTIONS: true
      }).catch(() => {})*/

      await channel.permissionOverwrites.edit(rr,{ 'SEND_MESSAGES': true });

      const embed = new MessageEmbed()
        .setDescription(`${config.emojis.success} ${message.channel} has been **unlocked.**`)
        .setTimestamp()
        .setColor(config.messages.embeds.colors.yes);

      message.channel.send({ embeds: [embed] });
        
    },
};