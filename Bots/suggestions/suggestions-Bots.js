
  const { Client, Collection, discord,GatewayIntentBits, Partials , EmbedBuilder, ApplicationCommandOptionType , Events , ActionRowBuilder , ButtonBuilder ,MessageAttachment, ButtonStyle , Message, Attachment } = require("discord.js");
const { Database } = require("st.db")
const suggestionsDB = new Database("/Json-db/Bots/suggestionsDB.json")
const tokens = new Database("/tokens/tokens")
const tier1subscriptions = new Database("/database/makers/tier1/subscriptions")

let suggestions = tokens.get('suggestions')
if(!suggestions) return;

const path = require('path');
const { readdirSync } = require("fs");
let theowner;
suggestions.forEach(async(data) => {
  const { REST } = require('@discordjs/rest');
  const { Routes } = require('discord-api-types/v10');
  const { prefix , token , clientId , owner } = data;
  theowner = owner
  const client12 = new Client({intents: [GatewayIntentBits.Guilds,GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.MessageContent], shards: "auto", partials: [Partials.Message, Partials.Channel, Partials.GuildMember,]});
  client12.commands = new Collection();
  require(`./handlers/events`)(client12);
  client12.events = new Collection();
  require(`../../events/requireBots/suggestions-commands`)(client12);
  const rest = new REST({ version: '10' }).setToken(token);
  client12.on("ready" , async() => {

      try {
        await rest.put(
          Routes.applicationCommands(client12.user.id),
          { body: suggestionsSlashCommands },
          );
          
        } catch (error) {
          console.error(error)
        }

    });
    require(`./handlers/events`)(client12)

  const folderPath = path.join(__dirname, 'slashcommand12');
  client12.suggestionsSlashCommands = new Collection();
  const suggestionsSlashCommands = [];
  const ascii = require("ascii-table");
  const table = new ascii("suggestions commands").setJustify();
  for (let folder of readdirSync(folderPath).filter(
    (folder) => !folder.includes(".")
    )) {
      for (let file of readdirSync(`${folderPath}/` + folder).filter((f) =>
      f.endsWith(".js")
      )) {
        let command = require(`${folderPath}/${folder}/${file}`);
        if (command) {
          suggestionsSlashCommands.push(command.data.toJSON());
          client12.suggestionsSlashCommands.set(command.data.name, command);
          if (command.data.name) {
            table.addRow(`/${command.data.name}`, "🟢 Working");
          } else {
            table.addRow(`/${command.data.name}`, "🔴 Not Working");
          }
        }
  }
}



const folderPath2 = path.join(__dirname, 'commands12');

for(let foldeer of readdirSync(folderPath2).filter((folder) => !folder.includes("."))) {
  for(let fiee of(readdirSync(`${folderPath2}/${foldeer}`).filter((fi) => fi.endsWith(".js")))) {
    const commander = require(`${folderPath2}/${foldeer}/${fiee}`)
  }
}

require(`../../events/requireBots/suggestions-commands`)(client12)
require("./handlers/events")(client12)
require("./handlers/suggest")(client12)

	for (let file of readdirSync('./events/').filter(f => f.endsWith('.js'))) {
		const event = require(`./events/${file}`);
	if (event.once) {
		client12.once(event.name, (...args) => event.execute(...args));
	} else {
		client12.on(event.name, (...args) => event.execute(...args));
	}
	}

client12.on('ready' , async() => {
  setInterval(async() => {
    let BroadcastTokenss = tokens.get(`suggestions`)
    let thiss = BroadcastTokenss.find(br => br.token == token)
    if(thiss) {
      if(thiss.timeleft <= 0) {
        await client12.destroy();
        console.log(`${clientId} Ended`)
      }
    }
  }, 1000);
})

client12.on("messageCreate" , async(message) => {
  if(message.author.bot) return;
  const line = suggestionsDB.get(`line_${message.guild.id}`)
  const chan = suggestionsDB.get(`suggestions_room_${message.guild.id}`)
  if(line && chan) {
    const embed = new EmbedBuilder()
    .setTimestamp()
    .setTitle(`**${message.content}**`)
    .setAuthor({name:message.author.username , iconURL:message.author.displayAvatarURL({dynamic:true})})
    .setFooter({text:message.guild.name , iconURL:message.guild.iconURL({dynamic:true})})
    const button1 = new ButtonBuilder()
    .setCustomId(`ok_button`)
    .setLabel(`0`)
    .setEmoji("✅")
    .setStyle(ButtonStyle.Success)
    const button2 = new ButtonBuilder()
    .setCustomId(`no_button`)
    .setLabel(`0`)
    .setEmoji("❌")
    .setStyle(ButtonStyle.Danger)
    const row = new ActionRowBuilder().addComponents(button1 , button2)
    let send = await message.channel.send({embeds:[embed] , components:[row]})
    await suggestionsDB.set(`${send.id}_ok` , 0)
    await suggestionsDB.set(`${send.id}_no` , 0)
    return message.delete();

  }
})
  client12.on("interactionCreate" , async(interaction) => {
    if (interaction.isChatInputCommand()) {
      
	    if(interaction.user.bot) return;

      
      const command = client12.suggestionsSlashCommands.get(interaction.commandName);
	    
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

  client12.on("messageCreate" , async(message) => {
    let client = message.client;
  if (message.author.bot) return;
  if (message.channel.type === 'dm') return;


  if(!message.content.startsWith(prefix)) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/g); 
  const cmd = args.shift().toLowerCase();
  if(cmd.length == 0 ) return;
  let command = client.commands.get(cmd)
  if(!command) command = client12.commands.get(client.commandaliases.get(cmd));

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

   client12.login(token)
   .catch(async(err) => {
    const filtered = suggestions.filter(bo => bo != data)
			await tokens.set(`suggestions` , filtered)
      console.log(`${clientId} Not working and removed `)
   });


})
