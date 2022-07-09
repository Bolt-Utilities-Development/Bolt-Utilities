const { MessageEmbed, MessageActionRow, MessageSelectMenu } = require('discord.js');

module.exports = {
    name: "dashboard",
    description: "View the dashboard for the required category.",
    botPerms: ["MANAGE_GUILD"],
    userPerms: ["ADMINISITRATOR"],
    run: async(client, message, args)=>{
        if (!args[0]){
            return await message.reply({embeds: [new MessageEmbed({title: "Invalid Arguments", description: "Please provide an argument, options are:", fields: [{name: "Config", value: "!dashboard config"}, {name: "Welcomer", value: "!dashboard welcomer"}, {name: "Logging", value: "!dashboard logging"}], color: "#2f3136"})]})
        }
        if (args[0] === "config") {
            const adminMenu = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                .setCustomId("ConfigMenu")
                .setPlaceholder("Config Menu")
                .setMinValues(1)
                .setMaxValues(1)
                .addOptions([
                    {
                        label: "Antilink",
                        description: "Enable or Disable Antilink System!",
                        value: "antilink",
                    },
                    {
                        label: "AutoRole",
                        description: "Enable or Disable AutoRole System!",
                        value: "autorole",
                    },
                    {
                        label: "AutoMod",
                        description: "Enable or Disable AutoMod System!",
                        value: "automod",
                    },
                    {
                        label: "Prefix",
                        description: "Change the bot's prefix for your server!",
                        value: "prefix"
                    }
                ])
            )

            return message.channel.send({ content: "Config Settings", components: [adminMenu]})

        } else if (args[0] === "welcomer") {
            const welcomerMenu = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                .setCustomId("welcomerMenu")
                .setPlaceholder("Welcomer Menu")
                .setMinValues(1)
                .setMaxValues(1)
                .addOptions([
                    {
                        label: "Welcome Channel",
                        description: "Set the welcome channel for the server!",
                        value: "welcome_channel",
                    },
                    {
                        label: "Leave Channel",
                        description: "Set the leave channel for the server!",
                        value: "leave_channel",
                    },
                    {
                        label: "Welcome Message",
                        description: "Set the welcome message for the server!",
                        value: "welcome_message",
                    },
                    {
                        label: "Leave Message",
                        description: "Set the leave message for the server!",
                        value: "leave_message",
                    },
                    {
                        label: "Variables for Welcomer",
                        description: "Shows all the available variables for use in custom messages",
                        value: "variables",
                    }
                ])
            )

            return message.channel.send({ content: "Welcomer Settings" ,components: [welcomerMenu]})

        } else if (args[0] === "logging") {
            const loggingMenu = new MessageActionRow()
            .addComponents(
                new MessageSelectMenu()
                .setCustomId("loggingMenu")
                .setPlaceholder("Logging Menu")
                .setMinValues(1)
                .setMaxValues(1)
                .addOptions([
                    {
                        label: "Channel Updates",
                        description: "Set the channel for logging channel updates",
                        value: "channel_logs",
                    },
                    {
                        label: "Member Updates",
                        description: "Set the channel for logging member updates",
                        value: "member_updates",
                    },
                    {
                        label: "Message Logs",
                        description: "Set the channel for message logs",
                        value: "message_logs",
                    },
                    {
                        label: "Role Updates",
                        description: "Set the channel for logging role updates",
                        value: "role_updates",
                    },
                    {
                        label: "Server Updates",
                        description: "Set the channel for logging the server updates",
                        value: "server_updates",
                    },
                    {
                        label: "Voice State Updates",
                        description: "Set the channel for logging voice state updates",
                        value: "voice_state_updates",
                    }
                ])
            )

            return message.channel.send({ content: "Logging Settings" ,components: [loggingMenu]})
        } else {
            return message.channel.send("That option doesn't seem to exist!")
        }
    }
}