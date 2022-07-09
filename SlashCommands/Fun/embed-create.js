const { SlashCommandBuilder } = require('@discordjs/builders');
const { Modal, TextInputComponent, showModal } = require('discord-modals')

module.exports = {
	 name: "embed-create",
  description: "Create an embed message",
	run: async (client, interaction) => {

    const modal = new Modal()
      .setCustomId('embed_create_system')
      .setTitle('Create your Embed Message:')
      .addComponents(
    new TextInputComponent()
      .setCustomId('embed_create_system_title')
      .setLabel('Embed Title:')
      .setStyle('SHORT')
      .setMaxLength(256)
      .setPlaceholder('Embed Title text goes here...'),
    new TextInputComponent()
      .setCustomId('embed_create_system_description')
      .setLabel('Embed Description:')
      .setStyle('LONG')
      .setPlaceholder('Embed Description text goes here...')
      .setMaxLength(4000)
      .setRequired(true),
    new TextInputComponent()
      .setCustomId('embed_create_system_footer')
      .setLabel('Embed Footer:')
      .setStyle('SHORT')
      .setMaxLength(2048)
      .setPlaceholder('Embed Footer text goes here...'),
    new TextInputComponent()
      .setCustomId('embed_create_system_color')
      .setLabel('Embed Color:')
      .setStyle('SHORT')
      .setMaxLength(6)
      .setPlaceholder('Embed Color HEX code or Name goes here...'),
    new TextInputComponent()
      .setCustomId('embed_create_system_image')
      .setLabel('Embed Image URL:')
      .setStyle('SHORT')
      .setPlaceholder('Embed Image URL goes here...')
    )

    await showModal(modal, {
      client: client,
      interaction: interaction
    });
	},
};