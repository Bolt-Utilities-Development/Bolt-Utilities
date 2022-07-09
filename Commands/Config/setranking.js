const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const db = require("quick.db");

module.exports = {
    name: "set-ranking",
    aliases: ['setr'],
    description: "Set the ranking system on the server.",
    usage: "set-ranking [enable/disable]",
    run: async (client, message, args) => {

      if(!message.member.permissions.has("ADMINISTRATOR")) return message.delete();

      const embed1 = new MessageEmbed()
        .setDescription(`${config.emojis.warning} Do you want to **enable** or **disable** the ranking system? Please use: \`${config.prefix}set-ranking [enable/disable]\``)
        .setColor(config.messages.embeds.colors.error);

      if(!args[0]) return message.reply({ embeds: [embed1] });

      const check = args[0];

      if(check.toLowerCase() === "enable") {

        db.set(`rank_system_${message.guild.id}`, true);

        const embedDone = new MessageEmbed()
          .setDescription(`${config.emojis.success} Successfully **enabled** the ranking system.`)
          .setTimestamp()
          .setColor(config.messages.embeds.colors.yes);

        return message.reply({ embeds: [embedDone] });
        
      }

      if(check.toLowerCase() === "disable") {

        db.set(`rank_system_${message.guild.id}`, false);

        const embedDone = new MessageEmbed()
          .setDescription(`${config.emojis.success} Successfully **disabled** the ranking system.`)
          .setTimestamp()
          .setColor(config.messages.embeds.colors.yes);

        return message.reply({ embeds: [embedDone] });
        
      }

      const embed2 = new MessageEmbed()
        .setDescription(`${config.emojis.wrong} Invalid choice, try to use the command again.`)
        .setColor(config.messages.embeds.colors.no);
      
      message.reply({ embeds: [embed2] });
      
    },
};