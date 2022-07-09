const WarnSchema = require('../../models/WarnSchema');
const moment = require('moment');
const { MessageEmbed } = require( 'discord.js' );

module.exports = {
   name: 'warnings',
   description: 'View all the warnings a user has.',
   options: [
      { name: 'target', description: 'The user you want to view the warnings on.', type: 'USER', required: true }
   ],
   run: async ( client, interaction ) => {
      const user = interaction.options.getUser('target');

      const Warnings = await WarnSchema.find({ userId: user.id, guildId: interaction.guildId });

      if(!Warnings?.length) {
         return interaction.reply({ content: `${user} has no warnings in ${interaction.guild.name}` });
      };

      const Description = Warnings.map((warn) => {
         const moderator = interaction.guild.members.cache.get(
            warn.modId
         );

         return [
            `Ward ID: ${warn.pass}`,
            `Moderator: ${moderator}` || 'Has Left',
            `Date: <t:${moment(warn.timestamp).unix()}:R>`,
            `Reason: ${warn.reason}`
         ].join('\n')
      })
      .join('\n\n');

      const Display = new MessageEmbed({
         color: '#2f3136',
         title: `${user.tag}'s Warnings`,
         description: `${Description}`
      }).setTimestamp();

      interaction.reply({ embeds: [Display] });
   }
};