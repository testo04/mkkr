
  const { Client, Collection, discord,GatewayIntentBits, Partials , EmbedBuilder, ApplicationCommandOptionType , Events , ActionRowBuilder , ButtonBuilder ,MessageAttachment, ButtonStyle , Message, Attachment } = require("discord.js");
const { Database } = require("st.db")
const feedbackDB = new Database("/Json-db/Bots/feedbackDB.json")
const tokens = new Database("/tokens/tokens")
const tier1subscriptions = new Database("/database/makers/tier1/subscriptions")

let feedback = tokens.get('feedback')
if(!feedback) return;

const path = require('path');
const { readdirSync } = require("fs");
let theowner;
feedback.forEach(async(data) => {
  const { REST } = require('@discordjs/rest');
  const { Routes } = require('discord-api-types/v10');
  const { prefix , token , clientId , owner } = data;
  theowner = owner
  const client11 = new Client({intents: [GatewayIntentBits.Guilds,GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.MessageContent], shards: "auto", partials: [Partials.Message, Partials.Channel, Partials.GuildMember,]});
  client11.commands = new Collection();
  require(`./handlers/events`)(client11);
  client11.events = new Collection();
  require(`../../events/requireBots/feedback-commands`)(client11);
  const rest = new REST({ version: '10' }).setToken(token);
  client11.on("ready" , async() => {

      try {
        await rest.put(
          Routes.applicationCommands(client11.user.id),
          { body: feedbackSlashCommands },
          );
          
        } catch (error) {
          console.error(error)
        }

    });
    require(`./handlers/events`)(client11)

  const folderPath = path.join(__dirname, 'slashcommand11');
  client11.feedbackSlashCommands = new Collection();
  const feedbackSlashCommands = [];
  const ascii = require("ascii-table");
  const table = new ascii("feedback commands").setJustify();
  for (let folder of readdirSync(folderPath).filter(
    (folder) => !folder.includes(".")
    )) {
      for (let file of readdirSync(`${folderPath}/` + folder).filter((f) =>
      f.endsWith(".js")
      )) {
        let command = require(`${folderPath}/${folder}/${file}`);
        if (command) {
          feedbackSlashCommands.push(command.data.toJSON());
          client11.feedbackSlashCommands.set(command.data.name, command);
          if (command.data.name) {
            table.addRow(`/${command.data.name}`, "🟢 Working");
          } else {
            table.addRow(`/${command.data.name}`, "🔴 Not Working");
          }
        }
  }
}



const folderPath2 = path.join(__dirname, 'commands11');

for(let foldeer of readdirSync(folderPath2).filter((folder) => !folder.includes("."))) {
  for(let fiee of(readdirSync(`${folderPath2}/${foldeer}`).filter((fi) => fi.endsWith(".js")))) {
    const commander = require(`${folderPath2}/${foldeer}/${fiee}`)
  }
}

require(`../../events/requireBots/feedback-commands`)(client11)
require("./handlers/events")(client11)

	for (let file of readdirSync('./events/').filter(f => f.endsWith('.js'))) {
		const event = require(`./events/${file}`);
	if (event.once) {
		client11.once(event.name, (...args) => event.execute(...args));
	} else {
		client11.on(event.name, (...args) => event.execute(...args));
	}
	}

client11.on('ready' , async() => {
  setInterval(async() => {
    let BroadcastTokenss = tokens.get(`feedback`)
    let thiss = BroadcastTokenss.find(br => br.token == token)
    if(thiss) {
      if(thiss.timeleft <= 0) {
        await client11.destroy();
        console.log(`${clientId} Ended`)
      }
    }
  }, 1000);
})

client11.on("messageCreate" , async(message) => {
  const line = feedbackDB.get(`line_${message.guild.id}`)
  const chan = feedbackDB.get(`feedback_room_${message.guild.id}`)
  if(line && chan) {
    const embed = new EmbedBuilder()
    .setTimestamp()
    .setTitle(`**${message.content}**`)
    .setAuthor({name:message.author.username , iconURL:message.author.displayAvatarURL({dynamic:true})})
    await message.delete()
    const themsg = await message.channel.send({embeds:[embed]})
    await themsg.react("❤")
       await message.channel.send({content:`${line}`})

  }
})
  client11.on("interactionCreate" , async(interaction) => {
    if (interaction.isChatInputCommand()) {
      
	    if(interaction.user.bot) return;

      
      const command = client11.feedbackSlashCommands.get(interaction.commandName);
	    
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

  client11.on("messageCreate" , async(message) => {
    let client = message.client;
  if (message.author.bot) return;
  if (message.channel.type === 'dm') return;


  if(!message.content.startsWith(prefix)) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/g); 
  const cmd = args.shift().toLowerCase();
  if(cmd.length == 0 ) return;
  let command = client.commands.get(cmd)
  if(!command) command = client11.commands.get(client.commandaliases.get(cmd));

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

   client11.login(token)
   .catch(async(err) => {
    const filtered = feedback.filter(bo => bo != data)
			await tokens.set(`feedback` , filtered)
      console.log(`${clientId} Not working and removed `)
   });


})
