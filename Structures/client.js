const { Client, Collection } = require('discord.js')
const { LoadCommands, LoadEvents, LoadPlayerEvents, LoadButtons } = require('../Loader');

require('../Structures/database');

class Bot extends Client {

    /**
     * @param { import ('discord.js').ClientOptions } props;
     */

    constructor(props) {
        if (!props) props = {}

        props.partials = ['MESSAGE', 'CHANNEL', 'REACTION'];
        super(props)
    };


    _init() {
        this.config = require('../Configs/config');

        if (!this.config.token)
            return logger.error(`[ERROR]: No Token Provided in Config File!`);

        if (!this.config.devs.length) {
            return logger.error(`[ERROR]: No Dev ID Provided`);
        }

        if (!this.config.database) {
            return logger.error(`[ERROR]: No Database URL Provided.!`);
        }

        this.commands = new Collection();

        this.aliases = new Collection();

        LoadCommands(this);

        LoadEvents(this);

        LoadPlayerEvents(this);

        LoadButtons(this);
        
        
        };
    };


module.exports.Bot = Bot;