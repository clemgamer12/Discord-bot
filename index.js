const Discord = require("discord.js");
const ytdl = require("ytdl-core");


const Client = new Discord.Client;

Client.on("ready", () => {
    console.log("bot by Le Soldat opérationnel!");
});

Client.on("guildMemberAdd", member => {
    console.log("Un Membre est arrivé");
    member.guild.channels.cache.find(channel => channel.id === "785913129481535529").send(`${member.displayName} Bonjour a toi !\nNous sommes desormais **${member.guild.memberCount}** sur le serveur`);
    member.roles.add("786714423481991214");
});

Client.on("guildMemberRemove", member => {
    console.log("Un membre vient de partir");
    member.guild.channels.cache.find(channel => channel.id === "785913130433642508").send(`${member.displayName} Au revoir... \nNous sommes desormais **${member.guild.memberCount}** sur le serveur`);
});

Client.on("message", message => {
    if(message.author.bot) return;
  
    if(message.channel.type == "dm") return;

    if(message.content == prefix + "salut"){
        message.reply("Bonjour :)");
    }
});

const prefix = "*";

Client.on("message", message => {
    if(message.content.startsWith(prefix + "play")){
        if(message.member.voice.channel){
            message.member.voice.channel.join().then(connection => {
                let args = message.content.split(" ");

                if(!args[1]){
                    message.reply("lien de la vidéo non ou mal mentionné deconnection du bot");
                    connection.disconnect();

                }
                else {
                let dispatcher = connection.play(ytdl(args[1], {quality: "highestaudio" }));

                dispatcher.on("finish", () => {
                    dispatcher.destroy();
                    connection.disconnect();
                });

                dispatcher.on("error", err => {
                    console.log("erreur de dispatcheur : " + err);
                });
                }
            }).catch(err => {
                message.reply("erreur lors de la connection du bot au salon : " + err);
            });
        
        }
        else {
            message.reply("vous n'êtes pas dans un salon vocal");
        }
    }
});
    
Client.login(process.env.TOKEN);


