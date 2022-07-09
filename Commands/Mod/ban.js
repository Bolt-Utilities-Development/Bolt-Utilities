const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");

module.exports = {
    name: "ban",
    aliases: ['b'],
    description: "Ban a user.",
    usage: "ban [user] (reason)",
    run: async (client, message, args) => {
  
      if(!message.member.permissions.has("BAN_MEMBERS")) return message.delete();

        const embed1 = new MessageEmbed()
          .setDescription(`${config.emojis.wrong} Please mention the user.`)
          .setColor(config.messages.embeds.colors.no);

        const embed2 = new MessageEmbed()
          .setDescription(`${config.emojis.wrong} Couldn't find that user on this server.`)
          .setColor(config.messages.embeds.colors.no);

        const embed3 = new MessageEmbed()
          .setDescription(`${config.emojis.wrong} You can't ban yourself.`)
          .setColor(config.messages.embeds.colors.no);

        const embed4 = new MessageEmbed()
          .setDescription(`${config.emojis.wrong} That user is having the same power as mine.`)
          .setColor(config.messages.embeds.colors.no);

        const user = message.mentions.members.first() ||  message.guild.members.cache.find(r => r.user.id === args[0]);
    
        const reason = args.slice(1).join(" ");
    
        if(!args[0]) return message.reply({ embeds: [embed1]});
    
        if(!user) return message.reply({ embeds: [embed2]});
    
        if(user.id === message.author.id) return message.reply({ embeds: [embed3]});
    
        if(user.bannable) {
      
          const embed = new MessageEmbed()
            .setDescription(`${config.emojis.success} ${user} (\`${user.id}\`) has been **banned**.`)
            .setTimestamp()
            .setColor(config.messages.embeds.colors.yes);

          message.delete().catch(() => { });
      
          message.channel.send({ embeds: [embed] });
      
          user.ban().catch(() => { });
      
        } else {
      
          return message.reply({ embeds: [embed4]});
      
        }

        const embedDM = new MessageEmbed()
          .setAuthor({ name: `${client.user.username}`, iconURL: client.user.displayAvatarURL() })
          .setTitle(`You've been banned on ${message.guild.name}.`)
          .addFields(
            { name: "• Reason:", value: `${reason || "[No reason provided]"}` },
          )
          .setColor("RED")
          .setFooter(`User ID: ${user.id}`)
          .setTimestamp();

        user.send({ embeds: [embedDM] }).catch(e => { });

    },
};