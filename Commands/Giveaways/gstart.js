const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const ms = require('ms');

module.exports = {
    name: "gstart",
    aliases: [],
    description: "Starts a giveaway.",
    usage: "gstart [channel] [duration] [winners] [prize]",
    run: async (client, message, args) => {

      if (!message.member.permissions.has("ADMINISTRATOR")) return message.delete();
  
      let giveawayChannel = message.mentions.channels.first();

      const embedNoChannel = new MessageEmbed()  
        .setDescription(`${config.emojis.wrong} Please mention a channel.`)
        .setColor(config.messages.embeds.colors.no);
      
      if (!giveawayChannel) return message.reply({ embeds: [embedNoChannel] });
  
      let giveawayDuration = args[1];

      const embedNoDuration = new MessageEmbed()  
        .setDescription(`${config.emojis.wrong} Please provide the duration of the giveaway.`)
        .setColor(config.messages.embeds.colors.no);

      if (!giveawayDuration || isNaN(ms(giveawayDuration))) return message.reply({ embeds: [embedNoDuration] });
  
      let giveawayNumberWinners = parseInt(args[2]);

      const embedNoWinners = new MessageEmbed()  
        .setDescription(`${config.emojis.wrong} Please specify the number of winners.`)
        .setColor(config.messages.embeds.colors.no);

      if (isNaN(giveawayNumberWinners) || parseInt(giveawayNumberWinners) <= 0) return message.reply({ embeds: [embedNoWinners] });

      let giveawayPrize = args.slice(3).join(" ");

      const embedNoPrize = new MessageEmbed()  
        .setDescription(`${config.emojis.wrong} Please provide the prize for the winners.`)
        .setColor(config.messages.embeds.colors.no);
      
      if (!giveawayPrize) return message.reply({ embeds: [embedNoPrize] });
  
      await client.giveawaysManager.start(giveawayChannel, {
        giveaway: "🎉 **NEW GIVEAWAY!** 🎉",
        giveawayEnded: "🎉 **GIVEAWAY ENDED!** 🎉",
        winMessage: "🎉 Congratulations, {winners}! You won the prize: **{prize}**!",
        noWinner: "⛔ Giveaway has been cancelled by a Staff or no Valid participations.",
        embedFooter: "React below to participate.",
        duration: ms(giveawayDuration),
        prize: giveawayPrize,
        winnerCount: parseInt(giveawayNumberWinners),
        hostedBy: message.author,
      });

      const embedStarted = new MessageEmbed()
        .setAuthor({ name: `${client.user.username}`, iconURL: client.user.displayAvatarURL() })
        .setTitle("Giveaway Started!")
        .setDescription(`Successfully started the giveaway in ${giveawayChannel}.`)
        .addFields(
          { name: "• Channel:", value: `${giveawayChannel}`, inline: true },
          { name: "• Duration:", value: `\`${giveawayDuration}\``, inline: true },
          { name: "• Prize:", value: `${giveawayPrize}`, inline: true },
          { name: "• Number of Winners:", value: `\`${giveawayNumberWinners}\``, inline: true },
        )
        .setColor(config.messages.embeds.colors.yes);
      
      message.reply({ embeds: [embedStarted] });
      
    },
};