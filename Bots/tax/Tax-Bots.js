
  const { Client, Collection, discord,GatewayIntentBits, Partials , EmbedBuilder, ApplicationCommandOptionType , Events , ActionRowBuilder , ButtonBuilder ,MessageAttachment, ButtonStyle , Message } = require("discord.js");
const { Database } = require("st.db")
const taxDB = new Database("/Json-db/Bots/taxDB.json")
const tokens = new Database("/tokens/tokens")
const tier1subscriptions = new Database("/database/makers/tier1/subscriptions")

let tax = tokens.get('tax')
if(!tax) return;

const path = require('path');
const { readdirSync } = require("fs");
let theowner;
tax.forEach(async(data) => {
  const { REST } = require('@discordjs/rest');
  const { Routes } = require('discord-api-types/v10');
  const { prefix , token , clientId , owner } = data;
  theowner = owner
  const client3 = new Client({intents: [GatewayIntentBits.Guilds,GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.MessageContent], shards: "auto", partials: [Partials.Message, Partials.Channel, Partials.GuildMember,]});
  client3.commands = new Collection();
  require(`./handlers/events`)(client3);
  client3.events = new Collection();
  require(`../../events/requireBots/Tax-Commands`)(client3);
  const rest = new REST({ version: '10' }).setToken(token);
  client3.on("ready" , async() => {

      try {
        await rest.put(
          Routes.applicationCommands(client3.user.id),
          { body: taxSlashCommands },
          );
          
        } catch (error) {
          console.error(error)
        }

    });
    require(`../tax/handlers/events`)(client3)

  const folderPath = path.join(__dirname, 'slashcommand3');
  client3.taxSlashCommands = new Collection();
  const taxSlashCommands = [];
  const ascii = require("ascii-table");
  const table = new ascii("tax commands").setJustify();
  for (let folder of readdirSync(folderPath).filter(
    (folder) => !folder.includes(".")
    )) {
      for (let file of readdirSync(`${folderPath}/` + folder).filter((f) =>
      f.endsWith(".js")
      )) {
        let command = require(`${folderPath}/${folder}/${file}`);
        if (command) {
          taxSlashCommands.push(command.data.toJSON());
          client3.taxSlashCommands.set(command.data.name, command);
          if (command.data.name) {
            table.addRow(`/${command.data.name}`, "🟢 Working");
          } else {
            table.addRow(`/${command.data.name}`, "🔴 Not Working");
          }
        }
  }
}



const folderPath2 = path.join(__dirname, 'commands3');

for(let foldeer of readdirSync(folderPath2).filter((folder) => !folder.includes("."))) {
  for(let fiee of(readdirSync(`${folderPath2}/${foldeer}`).filter((fi) => fi.endsWith(".js")))) {
    const commander = require(`${folderPath2}/${foldeer}/${fiee}`)
  }
}

require(`../../events/requireBots/Tax-Commands`)(client3)
require("./handlers/events")(client3)

	for (let file of readdirSync('./events/').filter(f => f.endsWith('.js'))) {
		const event = require(`./events/${file}`);
	if (event.once) {
		client3.once(event.name, (...args) => event.execute(...args));
	} else {
		client3.on(event.name, (...args) => event.execute(...args));
	}
	}

client3.on('ready' , async() => {
  setInterval(async() => {
    let BroadcastTokenss = tokens.get(`tax`)
    let thiss = BroadcastTokenss.find(br => br.token == token)
    if(thiss) {
      if(thiss.timeleft <= 0) {
        await client3.destroy();
        console.log(`${clientId} Ended`)
      }
    }
  }, 1000);
})

client3.on('messageCreate' , async(message) => {
  if(message.author.bot) return;
  let roomid = taxDB.get(`tax_room_${message.guild.id}`)
  if(roomid) {
    if(message.channel.id == roomid) {
      if(message.author.bot) return;
      let number = message.content
    if(number.endsWith("k")) number = number.replace(/k/gi, "") * 1000;
else if(number.endsWith("K")) number = number.replace(/K/gi, "") * 1000;
    else if(number.endsWith("m")) number = number.replace(/m/gi, "") * 1000000;
  else if(number.endsWith("M")) number = number.replace(/M/gi, "") * 1000000;
      let number2 = parseInt(number)
    let tax = Math.floor(number2 * (20) / (19) + 1) // المبلغ مع الضريبة
    let tax2 = Math.floor(tax - number2) // الضريبة
    let tax3 = Math.floor(tax * (20) / (19) + 1) // المبلغ مع ضريبة الوسيط
    let tax4 = Math.floor(tax3 - tax) // ضريبة الوسيط
let embed1 = new EmbedBuilder()
.setFooter({text:message.author.username , iconURL:message.author.displayAvatarURL({dynamic:true})})
    .setAuthor({name:message.guild.name , iconURL:message.guild.iconURL({dynamic:true})})
    .setTimestamp(Date.now())
    .setColor('#000000')
    .addFields([
        {
            name:`**المبلغ**` , value:`**\`${number2}\`**` , inline:true
        },
        {
            name:`**المبلغ مع الضريبة**` , value:`**\`${tax}\`**` , inline:true
        },
        {
            name:`**المبلغ مع ضريبة الوسيط**` , value:`**\`${tax3}\`**` , inline:false
        },
        {
            name:`**الضريبة**` , value:`**\`${tax2}\`**` , inline:true
        },
        {
            name:`**ضريبة الوسيط**` , value:`**\`${tax4}\`**` , inline:true
        }
    ])
    return message.reply({embeds:[embed1]})
    }
  }
})

  client3.on("interactionCreate" , async(interaction) => {
    if (interaction.isChatInputCommand()) {
      
	    if(interaction.user.bot) return;

      
      const command = client3.taxSlashCommands.get(interaction.commandName);
	    
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

  client3.on("messageCreate" , async(message) => {
    let client = message.client;
  if (message.author.bot) return;
  if (message.channel.type === 'dm') return;


  if(!message.content.startsWith(prefix)) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/g); 
  const cmd = args.shift().toLowerCase();
  if(cmd.length == 0 ) return;
  let command = client.commands.get(cmd)
  if(!command) command = client3.commands.get(client.commandaliases.get(cmd));

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









   client3.login(token)
   .catch(async(err) => {
    const filtered = tax.filter(bo => bo != data)
			await tokens.set(`tax` , filtered)
      console.log(`${clientId} Not working and removed `)
   });


})
