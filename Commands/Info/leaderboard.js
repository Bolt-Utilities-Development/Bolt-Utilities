const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const Levels = require("discord-xp");
const db = require("quick.db");

module.exports = {
    name: "leaderboard",
    aliases: ['lb'],
    description: "Shows the top members who reached the maximum level on this server.",
    usage: "leaderboard",
    run: async (client, message, args) => {

      const ch = db.fetch(`rank_system_${message.guild.id}`);

      const embedRankSysDis = new MessageEmbed()
        .setDescription(`${config.emojis.wrong} Ranking system is currently disabled.`)
        .setColor(config.messages.embeds.colors.no);

      if(ch === null) return message.reply({ embeds: [embedRankSysDis] });

      if(ch == false) return message.reply({ embeds: [embedRankSysDis] });

      const raw = await Levels.fetchLeaderboard(message.guild.id, 10)

      const embed1 = new MessageEmbed()
        .setDescription(`${config.emojis.wrong} No members was found for the leaderboard.`)
        .setColor(config.messages.embeds.colors.no);
    
      if(raw.ength < 1) return message.reply({ embeds: [embed1] });
      
      const leaderboard = await Levels.computeLeaderboard(client, raw, true)

      const rankMap = leaderboard.map((rank)=> `Rank \`#${rank.position}\` - ${rank.username}\n> **Level:** ${rank.level} - **XP:** ${rank.xp.toString()}`)

      const embed = new MessageEmbed()
        .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
        .setTitle(`${message.guild.name}'s Leveling Leaderboard:`)
        .setDescription(rankMap.join("\n"))
        .setColor("BLUE");
      
      message.reply({ embeds: [embed] });
      
    },
};