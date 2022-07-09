
const mongoose = require("mongoose"); 
/**
* -Roles structure 
* - roleld: string; 
* - roleDescription: string 
* - roleEmoji: string 
*/
  
const Schema = new mongoose. Schema({ 
guildld: String, 
roles: Array 
});

module.exports = mongoose.model("reaction-roles" , Schema);
