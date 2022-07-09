const { MessageActionRow, MessageButton, MessageEmbed } = require("discord.js");
const fetch = require("node-fetch");
const embed = MessageEmbed;
const component = MessageActionRow;
const button =  MessageButton;

module.exports = {
    name: "meme",
    aliases: ['me'],
    description: "Generate a random meme.",
    usage: "meme",
    run: async (client, message, args) => {

      const row = new component().addComponents(
        new button()
         .setLabel("New Meme")
         .setStyle("SECONDARY")
         .setCustomId("memerate")
         .setEmoji("🔁"),
       
        new button()
         .setLabel("Exit")
         .setStyle("DANGER")
         .setCustomId("memeclose")
         .setEmoji("🔒")
       )
   
       const dis = new component().addComponents(
         new button()
         .setLabel("Generate")
         .setStyle("SECONDARY")
          .setCustomId("memerate")
         .setEmoji("🔁")
         .setDisabled(true),
       
        new button()
         .setLabel("Exit")
         .setStyle("DANGER")
         .setCustomId("memeclose")
          .setEmoji("🔒")
         .setDisabled(true)
      )
   
      let meme = await fetch("https://meme-api.herokuapp.com/gimme").then(r => r.json())
  
      const emb = new embed()
       .setAuthor({ name: `${client.user.username}`, iconURL: client.user.displayAvatarURL() })
       .setTitle(meme.title)
       .setURL(meme.postLink)
       .setImage(meme.url)
       .setColor("RANDOM")
       .setFooter(`${meme.ups}👍 || r/${meme.subreddit}`);
   
      let msg = await message.reply({ embeds: [emb], components: [row] });
  
      let filter = (i) => i.user.id === message.author.id;
       
      const collector = await msg.createMessageComponentCollector({
        filter,
        type: "BUTTON"
      })       
  
    collector.on("collect", async (i) =>{
      if(i.customId === "memerate") {
        let meme2 = await fetch("https://meme-api.herokuapp.com/gimme").then(r => r.json())
  
        const emb2 = new embed()
         .setAuthor({ name: `${client.user.username}`, iconURL: client.user.displayAvatarURL() })
         .setTitle(meme2.title)
         .setURL(meme2.postLink)
         .setImage(meme2.url)
         .setColor("RANDOM")
         .setFooter(`${meme2.ups}👍 || r/${meme2.subreddit}`);
        
        return msg.edit({ embeds: [emb2] });
      }
      
      if(i.customId === "memeclose") {
        return msg.edit({ components: [dis] });
      }
    })
      
    },
};