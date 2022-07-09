const { MessageActionRow, MessageSelectMenu, MessageEmbed } = require('discord.js');
const config = require("../../config.json");
const db = require("quick.db");

module.exports = {
    name: "role",
    aliases: ['r'],
    description: "Just a command that gives you a role from a dropdown menu message!",
    usage: "role",
    run: async (client, message, args) => {

      const dp = db.fetch(`dropdown_roles_system_${message.guild.id}_role`);

      const embedSystemIsNotReady = new MessageEmbed()
        .setDescription(`${config.emojis.wrong} This system is not ready yet!`)
        .setColor(config.messages.embeds.colors.no);
      
      if(dp === null) return message.reply({ embeds: [embedSystemIsNotReady] });

      const rowRoles = new MessageActionRow()
			  .addComponents(
				  new MessageSelectMenu()
				  	.setCustomId('rolesdropdown')
				  	.setPlaceholder('Click here to Add or Remove the Role.')
				  	.addOptions([
						  {
							  label: 'Add The Role',
						  	description: 'Adds the role to your account on this server.',
							  value: 'addR',
                emoji: '955439733868224562',
						  },
              {
							  label: 'Remove The Role',
						  	description: 'Removes the role to your account on this server.',
							  value: 'removeR',
                emoji: '955439768370569288',
						  },
					  ]),
			  );

      const embed = new MessageEmbed()
        .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
        .setTitle(client.user.username + " - DropDown Role:")
        .setDescription(`• The current role on the Database is: <@&${dp}> (\`${dp}\`).\n\n**Click on the Select menu below to __add__ or __remove__ the role.**`)
        .setTimestamp()
        .setColor("BLUE");

		await message.reply({ embeds: [embed], components: [rowRoles] });

      const embedGiven = new MessageEmbed()
        .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
        .setDescription(`${config.emojis.success} Successfully added the role to your account!`)
        .setColor(config.messages.embeds.colors.yes);

      const embedAlreadyGiven = new MessageEmbed()
        .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
        .setDescription(`${config.emojis.wrong} You already have the role.`)
        .setColor(config.messages.embeds.colors.no);
      
      const embedRemoved = new MessageEmbed()
        .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
        .setDescription(`${config.emojis.success} Successfully removed the role to your account!`)
        .setColor(config.messages.embeds.colors.yes);

      const embedAlreadyRemoved = new MessageEmbed()
        .setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
        .setDescription(`${config.emojis.wrong} You already don't have the role.`)
        .setColor(config.messages.embeds.colors.no);

      const collectorRoles = message.channel.createMessageComponentCollector({
        componentType: "SELECT_MENU"
      })

      collectorRoles.on("collect", async (collectedRoles) => {

        const value = collectedRoles.values[0]

        const user = collectedRoles.member;

        if(value === "addR"){

          let role = message.guild.roles.cache.find(r => r.id === dp);

          if (!user.roles.cache.has(role.id)){

            collectedRoles.member.roles.add(role).catch(() => { });
          
            collectedRoles.reply({ embeds: [embedGiven], ephemeral: true }).catch(() => { });
        
          } else {

            collectedRoles.reply({ embeds: [embedAlreadyGiven], ephemeral: true }).catch(() => { });
            
          }
          
        }

        if(value === "removeR"){

          let role = message.guild.roles.cache.find(r => r.id === dp);

          if (user.roles.cache.has(role.id)){

            collectedRoles.member.roles.remove(role).catch(() => { });
          
            collectedRoles.reply({ embeds: [embedRemoved], ephemeral: true }).catch(() => { });
        
          } else {

            collectedRoles.reply({ embeds: [embedAlreadyRemoved], ephemeral: true }).catch(() => { });
            
          }
          
        }
        
      })
      
    },
};