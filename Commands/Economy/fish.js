const { MessageEmbed } = require("discord.js");
const config = require("../../config.json");
const db = require("quick.db");
const ms = require("ms");

module.exports = {
	name: 'fish',
	aliases: [],
	category: "Economy",
	description: "",
	usage: "",
	examples: [],
	permissions: ['SEND_MESSAGES'],
	owner: false,
	run: async (client, message, args, prefix) => {

		const timeout = 300000;

		let bump = await db.fetch(`cooldown_fish_command_${message.author.id}`);

		if (bump !== null && timeout - (Date.now() - bump) > 0) {
			let time = ms(timeout - (Date.now() - bump), { long: true });

			const embed = new MessageEmbed()
				.setDescription(`**Timed out!** You have to wait \`${time}\` to use this command again.`)
				.setColor("RED");

			return message.reply({ embeds: [embed] });

		} else {

			const fish = [
				"**🐠 `(Tropical Fish)`**",
				"**🐟 `(Fish)`**",
				"**🐡 `(Blow Fish)`**",
				"**🐬 `(Dolphin)`**",
				"**🦐 `(Shrimp)`**",
				"**🦈 `(Shark)`**",
				"**🔋 `(Battery)`**",
				"**🦂 `(Scorpion)`**",
				"**⛸ `(Ice Skate)`**",
				"**👕 `(Shirt)`**",
				"**📦 `(Package)`**",
				"**🏓 `(Ping Pong)`**",
				"**🦑 `(Squid)`**",
				"**⚽ `(Soccer)`**"
			]

			const fishresult = Math.floor((Math.random() * fish.length));

			const fishingRod = db.fetch(`fishing_rod_${message.member.id}`);
			const OPFishingRod = db.fetch(`op_fishing_rod_${message.member.id}`);

			if (fishingRod == true) {
				const amount = Math.floor(Math.random() * 2000) + 1000;

				await db.add(`money_${message.author.id}`, amount);

				await db.set(`cooldown_fish_command_${message.author.id}`, Date.now());

				return message.reply(`**FISH MINIGAME:** - 🎣\n**${message.member.user.tag}** fished a ${fish[fishresult]} by using the item \`Fishing Rod\` and earned \`${amount}\` ${config.emojis.coin}!`);
			} else {

				if (OPFishingRod == true) {
					const amount = Math.floor(Math.random() * 5000) + 1000;

					await db.add(`money_${message.author.id}`, amount);

					await db.set(`cooldown_fish_command_${message.author.id}`, Date.now());

					return message.reply(`**FISH MINIGAME:** - 🎣\n**${message.member.user.tag}** fished a ${fish[fishresult]} by using the item \`OP Fishing Rod\` and earned \`${amount}\` ${config.emojis.coin}!`);
				}
			}

			const amount = Math.floor(Math.random() * 200) + 1;

			await db.add(`money_${message.author.id}`, amount);

			await db.set(`cooldown_fish_command_${message.author.id}`, Date.now());

			return message.reply(`**FISH MINIGAME:** - 🎣\n**${message.member.user.tag}** fished a ${fish[fishresult]} and earned \`${amount}\` ${config.emojis.coin}!\n${config.emojis.info} You can buy a better fishing rod by using the command: \`${prefix}shop\``);

		}

	}
}