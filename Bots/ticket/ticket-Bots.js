
  const { Client,Discord, Collection, AuditLogEvent,discord,GatewayIntentBits, Partials , EmbedBuilder, ApplicationCommandOptionType , Events , ActionRowBuilder , ButtonBuilder ,MessageAttachment, ButtonStyle , Message, Embed } = require("discord.js");
const { Database } = require("st.db")
const ticketDB = new Database("/Json-db/Bots/ticketDB.json")
const tokens = new Database("/tokens/tokens")
const tier1subscriptions = new Database("/database/makers/tier1/subscriptions")


  let ticket = tokens.get('ticket')
if(!ticket) return;
const path = require('path');
const { readdirSync } = require("fs");
let theowner;
ticket.forEach(async(data) => {
  const { REST } = require('@discordjs/rest');
  const { Routes } = require('discord-api-types/v10');
  const { prefix , token , clientId , owner } = data;
  theowner = owner
  const client7 = new Client({intents: 32767, shards: "auto", partials: [Partials.Message, Partials.Channel, Partials.GuildMember,]});
  client7.commands = new Collection();
  require(`./handlers/events`)(client7);
  require(`./handlers/ticketClaim`)(client7);
  require(`./handlers/ticketCreate`)(client7);
  require(`./handlers/ticketDelete`)(client7);
  require(`./handlers/ticketSubmitCreate`)(client7);
  require(`./handlers/ticketUnclaim`)(client7);
  client7.events = new Collection();
  require(`../../events/requireBots/ticket-commands`)(client7);
  const rest = new REST({ version: '10' }).setToken(token);
  client7.on("ready" , async() => {

      try {
        await rest.put(
          Routes.applicationCommands(client7.user.id),
          { body: ticketSlashCommands },
          );
          
        } catch (error) {
          console.error(error)
        }

    });
    require(`./handlers/events`)(client7)

  const folderPath = path.join(__dirname, 'slashcommand7');
  client7.ticketSlashCommands = new Collection();
  const ticketSlashCommands = [];
  const ascii = require("ascii-table");
  const table = new ascii("ticket commands").setJustify();
  for (let folder of readdirSync(folderPath).filter(
    (folder) => !folder.includes(".")
    )) {
      for (let file of readdirSync(`${folderPath}/` + folder).filter((f) =>
      f.endsWith(".js")
      )) {
        let command = require(`${folderPath}/${folder}/${file}`);
        if (command) {
          ticketSlashCommands.push(command.data.toJSON());
          client7.ticketSlashCommands.set(command.data.name, command);
          if (command.data.name) {
            table.addRow(`/${command.data.name}`, "🟢 Working");
          } else {
            table.addRow(`/${command.data.name}`, "🔴 Not Working");
          }
        }
  }
}



const folderPath2 = path.join(__dirname, 'commands7');

for(let foldeer of readdirSync(folderPath2).filter((folder) => !folder.includes("."))) {
  for(let fiee of(readdirSync(`${folderPath2}/${foldeer}`).filter((fi) => fi.endsWith(".js")))) {
    const commander = require(`${folderPath2}/${foldeer}/${fiee}`)
  }
}

require(`../../events/requireBots/ticket-commands`)(client7)
require("./handlers/events")(client7)

	for (let file of readdirSync('./events/').filter(f => f.endsWith('.js'))) {
		const event = require(`./events/${file}`);
	if (event.once) {
		client7.once(event.name, (...args) => event.execute(...args));
	} else {
		client7.on(event.name, (...args) => event.execute(...args));
	}
	}

client7.on('ready' , async() => {
  setInterval(async() => {
    let ticketTokenss = tokens.get(`ticket`)
    let thiss = ticketTokenss.find(br => br.token == token)
    if(thiss) {
      if(thiss.timeleft <= 0) {
        await client7.destroy();
        console.log(`${clientId} Ended`)
      }
    }
  }, 1000);
})


  client7.on("interactionCreate" , async(interaction) => {
    if (interaction.isChatInputCommand()) {
      
	    if(interaction.user.bot) return;

      
      const command = client7.ticketSlashCommands.get(interaction.commandName);
	    
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

  client7.on("messageCreate" , async(message) => {
    let client = message.client;
  if (message.author.bot) return;
  if (message.channel.type === 'dm') return;


  if(!message.content.startsWith(prefix)) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/g); 
  const cmd = args.shift().toLowerCase();
  if(cmd.length == 0 ) return;
  let command = client.commands.get(cmd)
  if(!command) command = client7.commands.get(client.commandaliases.get(cmd));

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





   client7.login(token)
   .catch(async(err) => {
    const filtered = ticket.filter(bo => bo != data)
			await tokens.set(`ticket` , filtered)
      console.log(`${clientId} Not working and removed `)
   });


})
