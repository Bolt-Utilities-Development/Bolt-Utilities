const { MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const config = require("../../config.json");
const db = require('quick.db');

module.exports = {
	name: 'pay',
	aliases: [],
	category: "Economy",
	description: "Give a user some of your money.",
	usage: "pay [user] [amount]",
	examples: [],
	permissions: ['SEND_MESSAGES'],
	owner: false,
	run: async (client, message, args, prefix) => {

		if (!args[0]) {
			const embed = new MessageEmbed()
				.setDescription(`${config.emojis.cross} Please provide the member.`)
				.setColor("RED");

			return message.reply({ embeds: [embed] });
		}

		const member = message.mentions.members.first() || message.guild.members.cache.get(args[0]);

		if (!member) {
			const embed = new MessageEmbed()
				.setDescription(`${config.emojis.cross} Invalid member.`)
				.setColor("RED");

			return message.reply({ embeds: [embed] });
		};

		const authorMoney = db.fetch(`money_${message.member.id}`);
		const memberMoney = db.fetch(`money_${member.id}`)

		if (!args[1]) {
			const embed = new MessageEmbed()
				.setDescription(`${config.emojis.cross} Please provide the amount to give to that user.`)
				.setColor("RED");

			return message.reply({ embeds: [embed] });
		};

		if (isNaN(args[1])) {
			const embed = new MessageEmbed()
				.setDescription(`${config.emojis.cross} Amount should be a number.`)
				.setColor("RED");

			return message.reply({ embeds: [embed] });
		};

		if (args[1] < 0) {
			const embed = new MessageEmbed()
				.setDescription(`${config.emojis.cross} Amount should be not negative.`)
				.setColor("RED");

			return message.reply({ embeds: [embed] });
		};

		if (authorMoney < args[1]) {
			const embed = new MessageEmbed()
				.setDescription(`${config.emojis.cross} You don't have that enough of money!`)
				.setColor("RED");

			return message.reply({ embeds: [embed] });
		};

		const embed = new MessageEmbed()
			.setDescription(`${config.emojis.warning} Are you sure that you want to give to the user ${member} **${args[1]}** ${config.emojis.coin}?`)
			.setFooter({ text: "This will not gives you back the amount of your money if you click on the button \"Yes\"." })
			.setColor("YELLOW");

		const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('pay_yes')
					.setLabel('Yes, I will')
					.setStyle('DANGER'),
				new MessageButton()
					.setCustomId('pay_no')
					.setLabel('Cancel')
					.setStyle('SUCCESS'),
			);

		const rowDis = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('pay_yes')
					.setLabel('Yes, I will')
					.setDisabled(true)
					.setStyle('SECONDARY'),
				new MessageButton()
					.setCustomId('pay_no')
					.setLabel('Cancel')
					.setDisabled(true)
					.setStyle('SECONDARY'),
			);

		message.reply({ embeds: [embed], components: [row] }).then(async (msg) => {

			const filter = i => i.user.id === message.member.id;

			const collector = await message.channel.createMessageComponentCollector({
				filter: filter,
				type: "BUTTON",
				time: 100000
			});

			collector.on("collect", async (i) => {
				if (i.customId === "pay_yes") {

					db.add(`money_${member.id}`, args[1]);

					await db.subtract(`money_${message.member.id}`, args[1]);

					const embedSuccess = new MessageEmbed()
						.setDescription(`${config.emojis.check} Successfully given **${args[1]}** ${config.emojis.coin} to ${member}.`)
						.setFooter({ text: `Your new balance is: ${db.fetch(`money_${message.member.id}`)}` })
						.setColor("GREEN");

					i.update({ embeds: [embedSuccess], components: [rowDis] }).catch(() => { });
				}

				if (i.customId === "pay_no") {

					const embedSuccess = new MessageEmbed()
						.setDescription(`${config.emojis.check} Nothing has changed.`)
						.setColor("GREEN");

					i.update({ embeds: [embedSuccess], components: [rowDis] }).catch(() => { });

				}
			});

		});

	}
}