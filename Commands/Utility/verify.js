const { MessageEmbed } = require("discord.js");
const db = require("quick.db");
const config = require("../../config.json");
const wait = require('node:timers/promises').setTimeout;

module.exports = {
    name: "verify",
    aliases: [],
    description: "Verify yourself on the server (If you are unverified).",
    usage: "verify",
    run: async (client, message, args) => {

      const r = db.fetch(`verification_system_${message.guild.id}_role`);

      const c = db.fetch(`verification_system_${message.guild.id}_channel`);

      const rr = message.guild.roles.cache.find(role => role.id === r);

      if(message.channel.id != c) return message.delete();

      const embed0 = new MessageEmbed()
        .setDescription(`${config.emojis.wrong} Verification system is not ready! Please contact the administrators to fix this error.`)
        .setColor(config.messages.embeds.colors.no);

      if(r === null) return message.reply({ embeds: [embed0] }).catch(() => { });

      if(message.member.roles.cache.has(rr.id)) {
        
        const embed1 = new MessageEmbed()
          .setDescription(`${config.emojis.wrong} Already verified.`)
          .setColor(config.messages.embeds.colors.no);

        return message.reply({ embeds: [embed1] }).then(async msg => {
          await wait(3000);
          msg.delete().catch(() => { });
          message.delete().catch(() => { });
        });
        
      }

      message.member.roles.add(rr)
        .catch(() => {
          const embed2 = new MessageEmbed()
            .setDescription(`${config.emojis.wrong} Cannot add the role to you, probably the role is above from mine!`)
            .setColor(config.messages.embeds.colors.no);

          return message.reply({ embeds: [embed2] });
        })

      const embed3 = new MessageEmbed()
        .setDescription(`${config.emojis.success} You have been verified.`)
        .setColor(config.messages.embeds.colors.yes);

      message.reply({ embeds: [embed3] })
        .then(async msg => {
          await wait(3000);
          msg.delete().catch(() =>{ });
          message.delete().catch(() =>{ });
        });
      
    },
};