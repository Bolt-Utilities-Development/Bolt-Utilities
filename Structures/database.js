const { Database } = require('quickmongo');
const db = new Database

db.on('ready', () => {
    logger.success("Database Connected!");
});

module.exports = { db };