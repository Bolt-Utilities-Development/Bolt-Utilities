const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const db = require("quick.db");

module.exports = {
	name: 'inventory',
	aliases: ['inv'],
	category: "Economy",
	description: "",
	usage: "",
	examples: [],
	permissions: ['SEND_MESSAGES'],
	owner: false,
	run: async (client, message, args, prefix) => {

		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;

		let bal = db.fetch(`money_${member.id}`)

		if (bal === null) bal = 0;

		let items = db.get(`items_${message.member.id}.items`)

		const embed = new MessageEmbed()
			.setDescription(`${config.emojis.info} **__Information about ${member}:__**\n\nBalance: **${bal}** ${config.emojis.coin}\nItems: (\`${db.fetch(`items_count_${message.member.id}`) ? db.fetch(`items_count_${message.member.id}`) : 0}\`)\n ${items ? items.join(", ") : "Nothing."}`)
			.setColor("BLUE");

		return message.reply({ embeds: [embed] });

	}
}