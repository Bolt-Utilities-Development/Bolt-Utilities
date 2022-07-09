const { MessageEmbed } = require('discord.js');
const config = require("../../config.json");
const Levels = require("discord-xp");

module.exports = {
    name: "set-rank",
    aliases: ['xp-set', 'setxp', 'level-set', 'lvl-set', 'setlevel', 'setlvl', 'setrank'],
    description: "Set a user's level or xp.",
    usage: "set-rank [user] [setlevel/setxp] [amount]",
    run: async (client, message, args) => {

      if(!message.member.permissions.has("ADMINISTRATOR")) return message.delete();

      const user = message.mentions.members.first() ||  message.guild.members.cache.find(r => r.user.id === args[0]);

      const embed1 = new MessageEmbed()
        .setDescription(`${config.emojis.wrong} Please mention the user.`)
        .setColor(config.messages.embeds.colors.no);

      if(!args[0]) return message.reply({ embeds: [embed1] });

      const embed2 = new MessageEmbed()
        .setDescription(`${config.emojis.wrong} Couldn't find that user on this server.`)
        .setColor(config.messages.embeds.colors.no);

      if(!user) return message.reply({ embeds: [embed2] });

      const embed3 = new MessageEmbed()
        .setDescription(`${config.emojis.warning} What do you want to do with ${user}? Here are the choices:`)
        .addFields(
          {
            name: "• setLevel:",
            value: "Set the user's level.",
            inline: true
          },
          {
            name: "• setXP:",
            value: "Set the user's xp.",
            inline: true
          },
        )
        .setColor(config.messages.embeds.colors.error);

      if(!args[1]) return message.reply({ embeds: [embed3] });

      if(args[1].toLowerCase() === "setlevel") {

        const embedNoAmount = new MessageEmbed()
        .setDescription(`${config.emojis.wrong} Please specify the amount for the level.`)
        .setColor(config.messages.embeds.colors.no);

        const embedNotNumber = new MessageEmbed()
        .setDescription(`${config.emojis.wrong} Amount should be a number.`)
        .setColor(config.messages.embeds.colors.no);

        if(!args[2]) return message.reply({ embeds: [embedNoAmount] });

        if(isNaN(args[2])) return message.reply({ embeds: [embedNotNumber]});

        Levels.setLevel(user.id, message.guild.id, args[2]).then(() => {
          
          const embedDone = new MessageEmbed()
            .setDescription(`${config.emojis.success} Done!`)
            .setColor(config.messages.embeds.colors.yes);

          return message.reply({ embeds: [embedDone] });
          
        })
        
      }

      if(args[1].toLowerCase() === "setxp") {

        const embedNoAmount = new MessageEmbed()
        .setDescription(`${config.emojis.wrong} Please specify the amount for the xp.`)
        .setColor(config.messages.embeds.colors.no);

        const embedNotNumber = new MessageEmbed()
        .setDescription(`${config.emojis.wrong} Amount should be a number.`)
        .setColor(config.messages.embeds.colors.no);

        if(!args[2]) return message.reply({ embeds: [embedNoAmount] });

        if(isNaN(args[2])) return message.reply({ embeds: [embedNotNumber]});

        Levels.setXp(user.id, message.guild.id, args[2]).then(() => {
          
          const embedDone = new MessageEmbed()
            .setDescription(`${config.emojis.success} Done!`)
            .setColor(config.messages.embeds.colors.yes);

          return message.reply({ embeds: [embedDone] });
          
        })
        
      }

      const embedInvalidChoice = new MessageEmbed()
        .setDescription(`${config.emojis.wrong} Invalid choice.`)
        .setColor(config.messages.embeds.colors.no);

      return message.reply({ embeds: [embedInvalidChoice]})
      
    },
};