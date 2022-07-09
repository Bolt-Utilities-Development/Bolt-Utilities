const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");

module.exports = {
    name: "slowmode",
    aliases: ['sm'],
    description: "Sets the channel's slowmode.",
    usage: "slowmode [time]",
    run: async (client, message, args) => {
  
      if(!message.member.permissions.has("BAN_MEMBERS")) return message.delete();

      const embed1 = new MessageEmbed()
        .setDescription(` <:no:935337773815181333> Please provide the time for slowmode.`)
        
      
      const embed2 = new MessageEmbed()
        .setDescription(`<:no:935337773815181333> Please specify a number.`)


      const embed3 = new MessageEmbed()
        .setDescription(`<a:yes:934051517986656256> Slowmode has been disabled.`)
        .setTimestamp()
        

      const embed4 = new MessageEmbed()
        .setDescription(` <:no:935337773815181333> Slowmode cannot be Negative.`)
  
      
      const embed5 = new MessageEmbed()
        .setDescription(` <a:yes:934051517986656256> Successfully changed ${message.channel}'s slowmode to ${args[0]}.`)
        .setTimestamp()


      const embedError = new MessageEmbed()
        .setDescription(`<:no:935337773815181333> An error has occured while executing the command. I need Administrator Permissions for this Command`)


      if (!args[0]) return message.reply({ embeds: [embed1]});
      
      if (isNaN(args[0])) return message.reply({ embeds: [embed2]});

      if(args[0] == 0) return message.reply({ embeds: [embed3]}).then( message.channel.setRateLimitPerUser(null).catch(err => message.channel.send({ embeds: [embedError]})) )

      if(args[0] < 0) return message.reply({ embeds: [embed4]});
    
      message.channel.setRateLimitPerUser(args[0]).catch(err => message.channel.send({ embeds: [embedError]}));
        
      message.reply({ embeds: [embed5]});

    },
};