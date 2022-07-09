const client = require("../../index");
const { MessageEmbed } = require('discord.js');
const config = require("../../config.json");
const db = require("quick.db");

client.on('modalSubmit', async (modal) => {
  console.log("Testing")

  // SUGGESTION SYSTEM:
  if(modal.customId === 'suggestion_system'){

    const message = modal;
    
    const response = modal.getTextInputValue('suggestion_system_message')
    
    await modal.deferReply({ ephemeral: true })
    
    modal.followUp({ content: '**Congrats!** Your suggestion was successfully submitted.', ephemeral: true })

    const ch = db.fetch(`suggest_system_${message.guild.id}_channel`);

    if(ch === null) return;

    const channel = client.channels.cache.get(ch);

    const embed = new MessageEmbed()
      .setAuthor({ name: `${client.user.username}`, iconURL: client.user.displayAvatarURL() })
      .setTitle("New Suggestion!")
      .addFields(
        {
          name: "• Author:",
          value: `${modal.member || "ERR"}`
        },
        {
          name: "• Suggestion:",
          value: `${response || "ERR"}`
        },
      )
      .setColor("BLUE")
      .setFooter("You can share your ideas by using: /suggest")  
      .setTimestamp();

    var r = await channel.send({ embeds: [embed] });

    r.react(config.systems.suggestion.reacts.reaction_1).catch(e => console.log(e));
    r.react(config.systems.suggestion.reacts.reaction_2).catch(e => console.log(e))
    
  }
  
  // EMBED CREATE SYSTEM:
  if(modal.customId === 'embed_create_system'){
    
    const title = modal.getTextInputValue('embed_create_system_title');

    console.log(title)

    const desc = modal.getTextInputValue('embed_create_system_description')

    const footer = modal.getTextInputValue('embed_create_system_footer')

    const color = modal.getTextInputValue('embed_create_system_color')

    const image = modal.getTextInputValue('embed_create_system_image')
    
    await modal.deferReply({ ephemeral: true })
    
    const embed = new MessageEmbed();

    try {
      embed.setAuthor({ name: `${client.user.username}`, iconURL: client.user.displayAvatarURL()})
      if(title) embed.setTitle(title)
      embed.setDescription(desc)
      if(footer) embed.setFooter(footer)
      if(color) embed.setColor(color.toUpperCase())
      if(image) embed.setImage(image)
    } catch(e) {
      modal.channel.send(`:warning: **Error Handled:**\nThere is an error while creating the embed message, Here is the error: \n\`${e}\``)
      console.log(e)
    }

    modal.reply({ embeds: [embed] }).catch(e => {console.log(e)})

    modal.followUp({ content: `**Congrats!** Your embed message was successfully created.`, ephemeral: true })
    
  } 
  
});