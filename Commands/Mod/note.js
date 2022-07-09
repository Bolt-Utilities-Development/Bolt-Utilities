const { MessageEmbed } = require("discord.js");
const Database = require("@replit/database");
const config = require("../../config.json");

module.exports = {
    name: "note",
    aliases: ['n'],
    description: "Add or Delete a user's note.",
    usage: "note [user] (add/del) [note]",
    run: async (client, message, args) => {

      if(!message.member.permissions.has("BAN_MEMBERS")) return message.delete();

      const db = new Database();

      const embed0 = new MessageEmbed()
        .setDescription(`<:no:935337773815181333> Please mention the user.`)
        

      if(!args[0]) return message.reply({ embeds: [embed0] });

      const user = message.mentions.members.first() ||  message.guild.members.cache.find(r => r.user.id === args[0]);

      const embed1 = new MessageEmbed()
        .setDescription(`<:no:935337773815181333> Couldn't find that user on this server.`)
        

      if(!user) return message.reply({ embeds: [embed1] });

      const type = args[1];
      
      // If type "add", Then:
      if(type === "add") {

        const msg = args.slice(2).join(" ");

        const embed2 = new MessageEmbed()
          .setDescription(`<:no:935337773815181333> Please provide the message.`)
          

        if(!msg) return message.reply({ embeds: [embed2] });

        db.set(`note_${user.id}`, msg).then(() => {

          const embedDone = new MessageEmbed()
            .setDescription(`<a:yes:934051517986656256> Successfully added the note for ${user}.`)
            .setTimestamp()
            
          
          return message.reply({ embeds: [embedDone] });
        });
        
      }

      // If type "del", Then:
      if(type === "del") {
   
        db.delete(`note_${user.id}`).then(() => {

          const embedDone = new MessageEmbed()
            .setDescription(`<a:yes:934051517986656256> Successfully deleted the note for ${user}.`)
          .setTimestamp()
          
          
          return message.reply({ embeds: [embedDone] });
        });
        
      }

      // If no type, Then:
      if(!type) {
        db.get(`note_${user.id}`).then(value => {

          const embedNoNoteFound = new MessageEmbed()
            .setDescription(`<:no:935337773815181333> No note was found for that user!`)
           
        
          if(!value) return message.reply({ embeds: [embedNoNoteFound] });

          const embedNote = new MessageEmbed()
            .setAuthor({ name: `${client.user.username}`, iconURL: client.user.displayAvatarURL() })
            .setDescription(`To Add/Edit a note, Use:\`${config.prefix}note [user] add [message]\`.\nTo Delete a note, Use:\`${config.prefix}note [user] del\`.`)
            .setThumbnail("https://images-ext-2.discordapp.net/external/b3J3bObQQDw3XB5udYFYreMmKZGbUZ036Nli25nKYfE/https/icons-for-free.com/download-icon-notes%2Bpaper%2Bsheet%2Btext%2Bicon-1320165690990995610_512.png?width=406&height=406")
            .addFields(
              {
                name: "• User:",
                value: `<@${user.id}> (\`${user.id}\`)`
              },
              {
                name: "• Note:",
                value: value
              },
            )
            .setColor("BLUE");
        
          message.reply({ embeds: [embedNote] });
        
        });
      }
        
    },
};