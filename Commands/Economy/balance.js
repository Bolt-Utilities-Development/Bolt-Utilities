const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const db = require("quick.db");

module.exports = {
	name: 'balance',
	aliases: ['bal'],
	category: "Economy",
	description: "See how much money you have",
	usage: "!bal",
	examples: [],
	permissions: ['SEND_MESSAGES'],
	owner: false,
	run: async (client, message, args, prefix) => {

		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

		let bal = db.fetch(`money_${member.id}`)

		if (bal === null) bal = 0;

		if (member === message.member) {

			const embed = new MessageEmbed()
				.setDescription(`${config.emojis.info} You currently have **${bal}** ${config.emojis.coin}.`)
				.setColor("BLUE");

			return message.reply({ embeds: [embed] });

		} else {

			const embed = new MessageEmbed()
				.setDescription(`${config.emojis.info} ${member} is currently having **${bal}** ${config.emojis.coin}.`)
				.setColor("BLUE");

			return message.reply({ embeds: [embed] });

		}

	}
}