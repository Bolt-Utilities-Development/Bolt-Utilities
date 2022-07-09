const { MessageAttachment, MessageEmbed } = require("discord.js");
const canvacord = require("canvacord");
const Levels = require("discord-xp");

module.exports = {
    name: "rank",
    aliases: [],
    description: "Check your rank on this server.",
    usage: "rank",
    run: async (client, message, args) => {

      let rank = await Levels.fetch(message.author.id, message.guild.id);

      const embed1 = new MessageEmbed()
        .setDescription(`You are having 0 xp!`)
        .setColor("RED");

      if(!rank) return message.reply({ embeds: [embed1] });

    let requiredXp =await Levels.xpFor(Number(rank.level)+ 1);

    let rankCard = new canvacord.Rank()
      .setAvatar(message.author.displayAvatarURL({ dynamic : false,format : "png" }))
      .setCurrentXP(rank.xp)
      .setRequiredXP(requiredXp)
      .setLevel(rank.level)
      .setStatus(message.member.presence.status)
      .setProgressBar("GOLD", "COLOR")
      .setUsername(message.author.username)
      .setDiscriminator(message.author.discriminator)
      .setRank(rank.rank + 1);

    rankCard.build().then((data) => {

      let attach = new MessageAttachment(data, 'rank.png');

      message.reply({ files: [attach] });

    });

    },
}; 
