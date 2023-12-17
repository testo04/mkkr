
  const { Client, Collection, discord,GatewayIntentBits, Partials , EmbedBuilder, ApplicationCommandOptionType , Events , ActionRowBuilder , ButtonBuilder ,MessageAttachment, ButtonStyle , Message } = require("discord.js");
const { Database } = require("st.db")
const giveawayDB = new Database("/Json-db/Bots/giveawayDB.json")
const tokens = new Database("/tokens/tokens")
const tier1subscriptions = new Database("/database/makers/tier1/subscriptions")

let giveaway = tokens.get('giveaway')
if(!giveaway) return;

const path = require('path');
const { readdirSync } = require("fs");
let theowner;
giveaway.forEach(async(data) => {
  const { REST } = require('@discordjs/rest');
  const { Routes } = require('discord-api-types/v10');
  const { prefix , token , clientId , owner } = data;
  theowner = owner
  const client14 = new Client({intents: [GatewayIntentBits.Guilds,GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.MessageContent], shards: "auto", partials: [Partials.Message, Partials.Channel, Partials.GuildMember,]});
  client14.commands = new Collection();
  require(`./handlers/events`)(client14);
  client14.events = new Collection();
  require(`../../events/requireBots/giveaway-commands`)(client14);
  const rest = new REST({ version: '10' }).setToken(token);
  client14.on("ready" , async() => {

      try {
        await rest.put(
          Routes.applicationCommands(client14.user.id),
          { body: giveawaySlashCommands },
          );
          
        } catch (error) {
          console.error(error)
        }

    });
    require(`../giveaway/handlers/events`)(client14)
    require('../giveaway/handlers/joinGiveaway')(client14)
client14.on("ready" , async() => {
  let theguild = client14.guilds.cache.first();
  setInterval(() => {
    let giveaways = giveawayDB.get(`giveaways_${theguild.id}`)
    if(!giveaways) return;
    giveaways.forEach(async(giveaway) => {
      let {messageid , channelid , entries , winners , prize , duration,dir1,dir2,ended} = giveaway;
      if(duration > 0) {
        duration = duration - 1
        giveaway.duration = duration;
        await giveawayDB.set(`giveaways_${theguild.id}` , giveaways)
      }else if(duration == 0) {
        duration = duration - 1
        giveaway.duration = duration;
        await giveawayDB.set(`giveaways_${theguild.id}` , giveaways)
        const theroom = theguild.channels.cache.find(ch => ch.id == channelid)
        const themsg = await theroom.messages.cache.find(msg => msg.id == messageid)
        if(entries.length > 0 && entries.length >= winners) {
          const theWinners = [];
          for(let i = 0; i < winners; i++) {
            let winner = Math.floor(Math.random() * entries.length);
            let winnerExcept = entries.splice(winner, 1)[0];
            theWinners.push(winnerExcept);
          }
          const button = new ButtonBuilder()
.setEmoji(`🎉`)
.setStyle(ButtonStyle.Primary)
.setCustomId(`join_giveaway`)
.setDisabled(true)
const row = new ActionRowBuilder().addComponents(button)
          themsg.edit({components:[row]})
          themsg.reply({content:`Congratulations ${theWinners}! You won the **${prize}**!`})
          giveaway.ended = true;
          await giveawayDB.set(`giveaways_${theguild.id}` , giveaways)
        }else{
          const button = new ButtonBuilder()
.setEmoji(`🎉`)
.setStyle(ButtonStyle.Primary)
.setCustomId(`join_giveaway`)
.setDisabled(true)
const row = new ActionRowBuilder().addComponents(button)
          themsg.edit({components:[row]})
          themsg.reply({content:`**لا يوجد عدد من المشتركين كافي**`})
          giveaway.ended = true;
          await giveawayDB.set(`giveaways_${theguild.id}` , giveaways)
        }
      }
    })
  }, 1000);

})
  const folderPath = path.join(__dirname, 'slashcommand14');
  client14.giveawaySlashCommands = new Collection();
  const giveawaySlashCommands = [];
  const ascii = require("ascii-table");
  const table = new ascii("giveaway commands").setJustify();
  for (let folder of readdirSync(folderPath).filter(
    (folder) => !folder.includes(".")
    )) {
      for (let file of readdirSync(`${folderPath}/` + folder).filter((f) =>
      f.endsWith(".js")
      )) {
        let command = require(`${folderPath}/${folder}/${file}`);
        if (command) {
          giveawaySlashCommands.push(command.data.toJSON());
          client14.giveawaySlashCommands.set(command.data.name, command);
          if (command.data.name) {
            table.addRow(`/${command.data.name}`, "🟢 Working");
          } else {
            table.addRow(`/${command.data.name}`, "🔴 Not Working");
          }
        }
  }
}



const folderPath2 = path.join(__dirname, 'commands14');

for(let foldeer of readdirSync(folderPath2).filter((folder) => !folder.includes("."))) {
  for(let fiee of(readdirSync(`${folderPath2}/${foldeer}`).filter((fi) => fi.endsWith(".js")))) {
    const commander = require(`${folderPath2}/${foldeer}/${fiee}`)
  }
}

require(`../../events/requireBots/giveaway-commands`)(client14)
require("./handlers/events")(client14)

	for (let file of readdirSync('./events/').filter(f => f.endsWith('.js'))) {
		const event = require(`./events/${file}`);
	if (event.once) {
		client14.once(event.name, (...args) => event.execute(...args));
	} else {
		client14.on(event.name, (...args) => event.execute(...args));
	}
	}

client14.on('ready' , async() => {
  setInterval(async() => {
    let BroadcastTokenss = tokens.get(`giveaway`)
    let thiss = BroadcastTokenss.find(br => br.token == token)
    if(thiss) {
      if(thiss.timeleft <= 0) {
        await client14.destroy();
        console.log(`${clientId} Ended`)
      }
    }
  }, 1000);
})


  client14.on("interactionCreate" , async(interaction) => {
    if (interaction.isChatInputCommand()) {
      
	    if(interaction.user.bot) return;

      
      const command = client14.giveawaySlashCommands.get(interaction.commandName);
	    
      if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
      }
      if (command.ownersOnly === true) {
        if (owner != interaction.user.id) {
          return interaction.reply({content: `❗ ***لا تستطيع استخدام هذا الامر***`, ephemeral: true});
        }
      }
      try {

        await command.execute(interaction);
      } catch (error) {
			console.error(`Error executing ${interaction.commandName}`);
			console.error(error);
		}
    }
  } )

  client14.on("messageCreate" , async(message) => {
    let client = message.client;
  if (message.author.bot) return;
  if (message.channel.type === 'dm') return;


  if(!message.content.startsWith(prefix)) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/g); 
  const cmd = args.shift().toLowerCase();
  if(cmd.length == 0 ) return;
  let command = client.commands.get(cmd)
  if(!command) command = client14.commands.get(client.commandaliases.get(cmd));

  if(command) {
    if(command.ownersOnly) {
			if (owner != message.author.id) {
			  return message.reply({content: `❗ ***لا تستطيع استخدام هذا الامر***`, ephemeral: true});
			}
    }
    if(command.cooldown) {
        
      if(cooldown.has(`${command.name}${message.author.id}`)) return message.reply({ embeds:[{description:`**عليك الانتظار\`${ms(cooldown.get(`${command.name}${message.author.id}`) - Date.now(), {long : true}).replace("minutes", `دقيقة`).replace("seconds", `ثانية`).replace("second", `ثانية`).replace("ms", `ملي ثانية`)}\` لكي تتمكن من استخدام الامر مجددا.**`}]}).then(msg => setTimeout(() => msg.delete(), cooldown.get(`${command.name}${message.author.id}`) - Date.now()))
      command.run(client, message, args)
      cooldown.set(`${command.name}${message.author.id}`, Date.now() + command.cooldown)
      setTimeout(() => {
        cooldown.delete(`${command.name}${message.author.id}`)
      }, command.cooldown);
  } else {
    command.run(client, message, args)
  }}});








   client14.login(token)
   .catch(async(err) => {
    const filtered = giveaway.filter(bo => bo != data)
			await tokens.set(`giveaway` , filtered)
      console.log(`${clientId} Not working and removed `)
   });


})
