const WarnSchema = require('../../models/WarnSchema');

module.exports = {
   name: 'remove-warn',
   description: 'Removes a warn from a user',
   options: [
      { name: 'ID', description: 'Warn Token required for removing the warning.', type: 'STRING', required: true }
   ],
   run: async (client, interaction ) => {
      const warnId = interaction.options.getString('ID');

      const data = await WarnSchema.findOne({ pass: warnId });
      if(!data) return interaction.reply({ content: 'The ID you gave is not a valid token to remove.', ephemeral: true });

      data.delete();

      const user = await interaction.guild.members.fetch(data.userId);
      return interaction.reply({ content: `Removed 1 of ${user}'s warnings. Please type \`/warnings\` to display the remaining warnings.`, ephemeral: true })
         .catch((error) => console.log(error));

   }
}