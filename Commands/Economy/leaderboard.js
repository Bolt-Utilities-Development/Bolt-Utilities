const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const db = require('quick.db');

module.exports = {
	name: 'leaderboard',
	aliases: ['ld'],
	category: "Economy",
	description: "A list shows the top 10 richest members on the economy system!",
	usage: "leaderboard",
	examples: [],
	permissions: ['SEND_MESSAGES'],
	owner: false,
	run: async (client, message, args, prefix) => {

		const top = db.all().filter(data => data.ID.startsWith(`money_`)).sort((a, b) => b.data - a.data);

		if (!top.length) {
			const noEmbed = new MessageEmbed()
				.setDescription("No one is the richest member.")
				.setColor("RED");

			return message.reply({ embeds: [embed] });
		};

		top.length = 10;
		var finalLb = "";
		for (var i in top) {
			if (top[i].data === null) top[i].data = 0
			finalLb += `**${top.indexOf(top[i]) + 1}. ${client.users.cache.get(top[i].ID.split('_')[1]) ? client.users.cache.get(top[i].ID.split('_')[1]) : "Unknown user#0000"}** - \`${top[i].data}\` ${config.emojis.coin}\n`;
		};

		const embed = new MessageEmbed()
			.setAuthor({ name: client.user.username, iconURL: client.user.displayAvatarURL() })
			.setTitle(`Top richest members on the Economy system:`)
			.setDescription(finalLb)
			.setColor("GREEN");

		message.channel.send({ embeds: [embed] });

	}
}