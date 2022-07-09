const Discord = require("discord.js"); module.exports = { name: "invite", description: "Get the bot's invite link",
botPerms: ["EMBED_LINKS"], 
run: async (client, message, args) => { 
let embed = new Discord.MessageEmbed() .setTitle("Invite Me") .setColor("RANDOM") 
.setDescription( "**Get Bolt's Invite Link [Here](https://discord.com/api/oauth2/authorize?client_id=951123818343202817&permissions=1073081719&redirect_uri=https%3A%2F%2Fminion911.me%2FVibe-City&response_type=code&scope=bot%20applications.commands%20messages.read)**\n**Need assistance? Join our [Support Server](https://discord.gg/YXUxDXz3Me) now!**" ) 
.setFooter(`Requested By: ${message.author.username}`); message.channel.send({ embeds: [embed] }); },};


