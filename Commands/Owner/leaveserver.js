const {
    MessageEmbed
} = require("discord.js")
const rgx = /^(?:<@!?)?(\d+)>?$/;
const OWNER_ID = require("../../config.json").OWNER_ID;

module.exports = {
    name: "leaveserver",
    description: "leaves a server",
    run: async (client, message, args) => {
        const guildId = args[0];
        const guild = message.client.guilds.cache.get(guildId);

        if (!OWNER_ID) return message.channel.send("This command is Owner Only");

        if (!rgx.test(guildId)) return message.channel.send("Please Provide a valid server id!")
        if (!guild) return message.channel.send(message, 0, 'Unable to find server, please check the provided ID');

        await guild.leave();
        
        const embed = new MessageEmbed()
            .setTitle('Leave Guild')
            .setDescription(`I have successfully left **${guild.name}**.`)
            .setFooter({
                text: message.member.displayName,
                iconURL: message.author.displayAvatarURL({
                    dynamic: true
                })
            })
            .setTimestamp()
            .setColor(message.guild.me.displayHexColor)
        message.channel.send({
            embeds: [embed]
        })
    }
}