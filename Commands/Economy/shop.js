const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const db = require("quick.db");

module.exports = {
	name: 'shop',
	aliases: [],
	category: "Economy",
	description: "Buy something on the shop!",
	usage: "shop (item)",
	examples: [],
	permissions: ['SEND_MESSAGES'],
	owner: false,
	run: async (client, message, args, prefix) => {

		let items = Object.keys(client.shop);
		let content = "";

		for (var i in items) {
			content += `${items[i]} - Cost: ${client.shop[items[i]].cost} ${config.emojis.coin}\n`
		}

		if (!args[0]) {
			const embed = new MessageEmbed()
				.setDescription(`${config.emojis.info} Here are the items and their cost in the shop!\n\n${content}`)
				.setColor("BLUE");

			return message.reply({ embeds: [embed] });
		} else {
			const userBalance = db.fetch(`money_${message.member.id}`);
			const item = args[0];
			const hasItem = client.shop[item.toLowerCase()];

			if (!hasItem || hasItem == undefined) {
				const embed = new MessageEmbed()
					.setDescription(`${config.emojis.cross} Invalid item, try to run the command \`${prefix}shop\` to see the shop.`)
					.setColor("RED");

				return message.reply({ embeds: [embed] });
			};

			const isBalanceEnough = (userBalance >= hasItem.cost);

			if (!isBalanceEnough) {
				const needed = hasItem.cost - userBalance;

				const embed = new MessageEmbed()
					.setDescription(`${config.emojis.cross} Sorry but you can't buy this item! You need **${hasItem.cost}** ${config.emojis.coin} to buy this item!`)
					.setFooter({ text: `If you want this item, you have to collect more ${needed} coins to buy this item.` })
					.setColor("RED");

				return message.reply({ embeds: [embed] });
			};

			await db.subtract(`money_${message.member.id}`, hasItem.cost);

			await db.push(`items_${message.member.id}.items`, `${item}`);

			await db.add(`items_count_${message.member.id}`, 1);

			if (item === "fishing_rod") {
				db.set(`fishing_rod_${message.member.id}`, true);
				db.set(`op_fishing_rod_${message.member.id}`, false)
			};

			if (item === "op_fishing_rod") {
				db.set(`fishing_rod_${message.member.id}`, false);
				db.set(`op_fishing_rod_${message.member.id}`, true);
			};

			const embed = new MessageEmbed()
				.setDescription(`${config.emojis.check} Successfully bought **${item}** for **${hasItem.cost}** ${config.emojis.coin}!`)
				.setFooter({ text: `Your new balance is: ${db.fetch(`money_${message.member.id}`)}` })
				.setColor("GREEN");

			message.reply({ embeds: [embed] });

		}

	}
}