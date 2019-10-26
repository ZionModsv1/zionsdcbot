//Daddy's Money Bot created by Zion

const botconfig = require("./botconfig.json");
const Discord = require("discord.js");
const fs = require("fs");
const bot = new Discord.Client({disableEveryone: true});



bot.on('guildMemberAdd', member => {
    console.log('user ' + member.user.username + 'Has joined the server!')

    var role = member.guild.roles.find('name', 'Connected To Rust');

    member.addRole(role)

});






bot.on("ready", async () => {
  console.log(`${bot.user.username} is online!`);

  bot.user.setActivity("/auth ingame and pm me code", {type: "PLAYING"});

});

bot.on("message", async message => {
  if(message.author.bot) return;
  if(message.channel.type === "dm") return;

  let prefix = botconfig.prefix;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];
  let args = messageArray.slice(1);

  if(cmd === `${prefix}say`){
  
    const sayMessage = args.join(" ");
    
    message.delete().catch(O_o=>{}); 
   
    message.channel.send(sayMessage);
  }


  



  if(cmd === `${prefix}kick`){

    

    let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!kUser) return message.channel.send("You Must Enter a Name!");
    let kReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You do no have Permission to do this!");
    if(kUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be kicked!");

    let kickEmbed = new Discord.RichEmbed()
    .setDescription("~Kick~")
    message.delete()
    .setColor("#e56b00")
    .addField("Kicked User", `${kUser} with ID ${kUser.id}`)
    .addField("Kicked By", `<@${message.author.id}> with ID ${message.author.id}`)
    .addField("Kicked In", message.channel)
    .addField("Reason", kReason)
    .setTimestamp();

    let kickChannel = message.guild.channels.find(`name`, "incidents");
    if(!kickChannel) return message.channel.send("Can't find incidents channel.");

    message.guild.member(kUser).kick(kReason);
    kickChannel.send(kickEmbed);

    return;
  }

  if(cmd === `${prefix}ban`){
    message.delete()



    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send("[You Must Enter a Name!]");
    let bReason = args.join(" ").slice(22);
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("You do no have Permission to do this!");
    if(bUser.hasPermission("MANAGE_MESSAGES")) return message.channel.send("That person can't be banned!");


    
    let banEmbed = new Discord.RichEmbed()
    .setDescription("🛡Discord Bans🛡")
    .setColor("#bc0000")
    .addField("Banned User", `✅ <@${bUser}> Was Banned 👋 `)
    .addField("Banned By", `Banned By <@${message.author}>`)
    .addField("Reason", bReason)
    .addField("Banned In", message.channel)
    .setFooter("Executed By Zions 1000000x Security!", "")
    .setTimestamp();
    


    let incidentchannel = message.guild.channels.find(`name`, "incidents");
    if(!incidentchannel) return message.channel.send("Can't find incidents channel.");
   
    message.guild.member(bUser).ban(bReason);
    incidentchannel.send(banEmbed);



    return;
  
  }


  if(cmd === `${prefix}report`){
    message.delete()

  

    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!rUser) return message.channel.send("Couldn't find user.");
    let rreason = args.join(" ").slice(22);

    let reportEmbed = new Discord.RichEmbed()
    .setDescription("Reports")
    .setColor("#15f153")
    .addField("Reported User", `${rUser} Was Reported By: ${message.author}`)
    .addField("Reason", rreason)
    .addField("Time", message.createdAt)
    .setTimestamp();


    let reportschannel = message.guild.channels.find(`name`, "reports");
    if(!reportschannel) return message.channel.send("Couldn't find reports channel.");


    message.delete().catch(O_o=>{});
    reportschannel.send(reportEmbed);

    return;
  }

  if(cmd === `${prefix}dm`){       
    let dUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if (!dUser) return message.channel.send("Can't find user!")
    message.delete();
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("You can't use that command!")
    let dMessage = args.join(" ").slice(22);
    if(dMessage.length < 1) return message.reply('You must supply a message!')

    dUser.send(`${dUser}  ${dMessage}`)

  
}


  if(cmd === `${prefix}serverinfo`){
    message.delete();
    let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()
    .setDescription("✩Server Information✩")
    .setColor("#15f153")
    .setThumbnail(sicon)
    .addField("Server Name", message.guild.name)
    .addField("Total Members", message.guild.memberCount);

    return message.channel.send(serverembed);
  }



  if(cmd === `${prefix}botinfo`){
    message.delete();
    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
    .setDescription("★Bot Information★")
    .setColor("#f4fc00")
    .setThumbnail(bicon)
    .addField("Bot Name", bot.user.username)
    .addField("Created On", bot.user.createdAt)
    .addField("Server",  message.guild.name)

    return message.channel.send(botembed);
  }


  mention = message.mentions.users.first();

  if(cmd === `${prefix}send`){

    if(mention == null) { return; }
    message.delete();
    mentionMessage = message.content.slice (8);
    mention.sendMessage (mentionMessage);
  }

  if(cmd === `${prefix}ping`){
   
    const m = await message.channel.send("Ping?");
    m.edit(`Pong! Latency is ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  }


 
  if(cmd === `${prefix}purge`){
    

    const deleteCount = parseInt(args[0], 10);
    
 
    if(!deleteCount || deleteCount < 2 || deleteCount > 100)
      return message.reply("Please provide a number between 2 and 100 for the number of messages to delete");
    
    
    const fetched = await message.channel.fetchMessages({limit: deleteCount});
    message.channel.bulkDelete(fetched)
      .catch(error => message.reply(`Couldn't delete messages because of: ${error}`));
  }
    


  if (!message.content.startsWith(prefix) || message.author.bot) return;
 

  if (message.content.startsWith(prefix + "serverip")) {
    message.delete();
    message.channel.send("```Client.connect 147.135.8.227:28158 ```");
  } 


  if(cmd === `${prefix}commands`){
    message.delete();
    let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()

    .setDescription("✩Help✩")
    .setColor("#15f153")
    .addField("!report", "Reports a user", true)
    .addField("!serverip", "Show's the IP for our Rust Server!", true)
    .setThumbnail(sicon)
    .setTimestamp();

    return message.channel.send(serverembed);
  }



  if(cmd === `${prefix}help`){
    message.delete();
    let sicon = message.guild.iconURL;
    let serverembed = new Discord.RichEmbed()

    .setDescription("✩Bot Commands✩")
    .setColor("#15f153")
    .addField("!report", "Reports a user", true)
    .addField("!serverip", "Show's the IP for our Rust Server!", true)
    .addField("!botinfo", "Shows our bots info", true)
    .addField("!serverinfo", "Shows our server info", true)
    .setThumbnail(sicon)
    .setTimestamp();
 
    return message.channel.send(serverembed);
  }


  



});

bot.login(botconfig.token);