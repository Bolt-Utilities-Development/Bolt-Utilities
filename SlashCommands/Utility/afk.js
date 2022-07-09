const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const db = require("quick.db");

module.exports = {
		name: 'afk',
		description: "Set yourself AFK on the server.",
		options: [
  {
			name: "reason",
			description: ("The reason for the AFK. (Not required)"),
				required: (false),
    type: "INTEGER"
}],
	run: async(client, interaction) => {

		const reason = interaction.options.getString('reason');

		db.set(`afk_${interaction.guild.id}_${interaction.member.id}`, true);

		interaction.member.setNickname(`[AFK] ${interaction.user.username}`).catch(() => { });

		if(reason) {
			const embed = new MessageEmbed()
				.setDescription(`${config.emojis.check} I have set you AFK for: **${reason}**`)
				.setColor("GREEN");

			db.set(`afk_reason_${interaction.guild.id}_${interaction.member.id}`, reason);

			return interaction.reply({ embeds: [embed], ephemeral: true });
		} else {
			const embed = new MessageEmbed()
				.setDescription(`${config.emojis.check} I have set you AFK.`)
				.setColor("GREEN");

			return interaction.reply({ embeds: [embed], ephemeral: true });
		}
		
	},
};