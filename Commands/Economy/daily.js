const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const db = require("quick.db");
const ms = require("ms");

module.exports = {
	name: 'daily',
	aliases: [],
	category: "Economy",
	description: "",
	usage: "",
	examples: [],
	permissions: ['SEND_MESSAGES'],
	owner: false,
	run: async (client, message, args, prefix) => {

		const timeout = 86400000;

		let bump = await db.fetch(`cooldown_daily_command_${message.author.id}`);

		if (bump !== null && timeout - (Date.now() - bump) > 0) {
			let time = ms(timeout - (Date.now() - bump), { long: true });

			const embed = new MessageEmbed()
				.setDescription(`**Timed out!** You have to wait \`${time}\` to use this command again.`)
				.setColor("RED");

			return message.reply({ embeds: [embed] });

		} else {

			const amount = Math.floor(Math.random() * 250) + 1;

			const embed = new MessageEmbed()
				.setDescription(`${config.emojis.check} You've been received **${amount}** ${config.emojis.coin}!`)
				.setColor("GREEN");

			message.reply({ embeds: [embed] });

			db.add(`money_${message.author.id}`, amount);

			db.set(`cooldown_daily_command_${message.author.id}`, Date.now());

		}

	}
}