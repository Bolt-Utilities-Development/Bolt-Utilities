const { MessageEmbed } = require("discord.js");

module.exports = {
    name: 'removetimeout',
    aliases: ["rtmute", "rtm"],
    utilisation: '{prefix}rtimeout',

    async run(client, message, args) {

      const fetch = require('node-fetch');
      const ms = require('ms');



      if (!message.member.permissions.has('TIMEOUT_MEMBERS')) {

        message.delete()
      
      } else {
      
        const user = message.mentions.users.first();

        const embed1 = new MessageEmbed()
          .setDescription("Please provide the user.")
          .setColor("RED");

        if(!user) return message.reply({ embeds: [embed1] });

        const milliseconds = ms("0s"); // Just set this to "0s" to remove the timeout, not hard XD.

        const iosTime = new Date(Date.now() + milliseconds).toISOString();

            await fetch(`https://discord.com/api/guilds/${message.guild.id}/members/${user.id}`, {
                method: 'PATCH',
              body: JSON.stringify({ communication_disabled_until: iosTime }),
              headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bot ${client.token}`,
                },
            });

        const embed4 = new MessageEmbed()
          .setDescription(`${user}'s Timeout has **Removed.** | \`${user.id}\``)
          .setColor("GREEN");

        message.channel.send({ embeds: [embed4] })

      }
          
    },
};