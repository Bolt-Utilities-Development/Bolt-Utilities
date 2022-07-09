const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const db = require("quick.db");

module.exports = {
    name: "setdropdownrole",
    aliases: ['setdr'],
    description: "Set the dropdown role system on the server.",
    usage: "set-dropdown-role [role]",
    run: async (client, message, args) => {

      if(!message.member.permissions.has("ADMINISTRATOR")) return message.delete();

      const embed1 = new MessageEmbed()
        .setDescription(`${config.emojis.wrong} Please mention a role.`)
        .setColor(config.messages.embeds.colors.no);

      if(!args[0]) return message.reply({ embeds: [embed1] });

      const role = message.mentions.roles.first();

      const embed2 = new MessageEmbed()
        .setDescription(`${config.emojis.wrong} That role does not exists on this server.`)
        .setColor(config.messages.embeds.colors.no);

      if(!role) return message.reply({ embeds: [embed2] });

      db.set(`dropdown_roles_system_${message.guild.id}_role`, role.id)
      
      const embedDone = new MessageEmbed()
        .setDescription(`${config.emojis.success} Dropdown role system is now **ready!**`)
        .setTimestamp()
        .setColor(config.messages.embeds.colors.yes);

      message.reply({ embeds: [embedDone] });
      
    },
};