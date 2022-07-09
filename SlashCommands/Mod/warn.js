const { MessageEmbed } = require( 'discord.js' );
const Schema = require('../../models/WarnSchema')

module.exports = {
   name: 'warn',
   description: 'Warn a user',
   options: [
      { name: 'target', description: 'Mention the user you want to warn', type: 'USER', required: true },
      { name: 'reason', description: 'Describe the reason for the warn', type: 'STRING', required: true }
   ],
   run: async ( client, interaction ) => {
      const user = interaction.options.getUser('target');
      const reason = interaction.options.getString('reason');

      const pass = gen();

      new Schema({
         pass,
         userId: user.id,
         guildId: interaction.guildId,
         reason,
         modId: interaction.user.id,
         timestamp: Date.now()
      }).save();
      
      const channelMsg = new MessageEmbed({
         color: '#2f3136',
         description: `<:correct:979066496347144222> Successfully warned ${user} (${user.tag}). Reason: ${reason} | ID: ${pass}`
      });

      interaction.reply({ embeds: [channelMsg], fetchReply: true });
   }
}

function gen() {
   var length = 7,
   charset = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890',
   retVal = '';
   for(var i = 0, n = charset.length; i < length; i++) {
      retVal += charset.charAt(Math.floor(Math.random() * n))
   }
   return retVal;
}