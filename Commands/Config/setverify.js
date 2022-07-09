const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const db = require("quick.db");

module.exports = {
    name: "setverify",
    aliases: ['setv'],
    description: "Set the verification system on the server.",
    usage: "set-verify [channel] [role]",
    run: async (client, message, args) => {

      if(!message.member.permissions.has("ADMINISTRATOR")) return message.delete();

      const embed1 = new MessageEmbed()
        .setDescription(`${config.emojis.wrong} Please mention a channel.`)
        .setColor(config.messages.embeds.colors.no);

      if(!args[0]) return message.reply({ embeds: [embed1] });

      const channel = message.mentions.channels.first();

      const embed2 = new MessageEmbed()
        .setDescription(`${config.emojis.wrong} That channel is not on this server.`)
        .setColor(config.messages.embeds.colors.no);

      if(!channel) return message.reply({ embeds: [embed2] });

      const embed3 = new MessageEmbed()
        .setDescription(`${config.emojis.wrong} Please mention a role.`)
        .setColor(config.messages.embeds.colors.no);

      if(!args[1]) return message.reply({ embeds: [embed3] });

      const role = message.mentions.roles.first();

      const embed4 = new MessageEmbed()
        .setDescription(`${config.emojis.wrong} That role is probably invalid, or does not exist on this server.`)
        .setColor(config.messages.embeds.colors.no);

      if(!role) return message.reply({ embeds: [embed4] });

      db.set(`verification_system_${message.guild.id}_channel`, channel.id)

      db.set(`verification_system_${message.guild.id}_role`, role.id)
      
      const embedDone = new MessageEmbed()
        .setDescription(`${config.emojis.success} Verification system is now **ready!**`)
        .setTimestamp()
        .setColor(config.messages.embeds.colors.yes);

      message.reply({ embeds: [embedDone] });
      
    },
};