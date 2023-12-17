
  const { Client, Collection, discord,GatewayIntentBits, Partials , EmbedBuilder, ApplicationCommandOptionType , Events , ActionRowBuilder , ButtonBuilder ,MessageAttachment, ButtonStyle , Message } = require("discord.js");
const { Database } = require("st.db")
const probotDB = new Database("/Json-db/Bots/probotDB.json")
const tokens = new Database("/tokens/tokens")
const tier1subscriptions = new Database("/database/makers/tier1/subscriptions")

let probot = tokens.get('probot')
if(!probot) return;

const path = require('path');
const { readdirSync } = require("fs");
let theowner;
probot.forEach(async(data) => {
  const { REST } = require('@discordjs/rest');
  const { Routes } = require('discord-api-types/v10');
  const { prefix , token , clientId , owner } = data;
  theowner = owner
  const client9 = new Client({intents: [GatewayIntentBits.Guilds,GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.MessageContent], shards: "auto", partials: [Partials.Message, Partials.Channel, Partials.GuildMember,]});
  client9.commands = new Collection();
  require(`./handlers/events`)(client9);
  client9.events = new Collection();
  require(`../../events/requireBots/probot-Commands`)(client9);
  const rest = new REST({ version: '10' }).setToken(token);
  client9.on("ready" , async() => {

      try {
        await rest.put(
          Routes.applicationCommands(client9.user.id),
          { body: probotSlashCommands },
          );
          
        } catch (error) {
          console.error(error)
        }

    });
    require(`../probot/handlers/events`)(client9)

  const folderPath = path.join(__dirname, 'slashcommand9');
  client9.probotSlashCommands = new Collection();
  const probotSlashCommands = [];
  const ascii = require("ascii-table");
  const table = new ascii("probot commands").setJustify();
  for (let folder of readdirSync(folderPath).filter(
    (folder) => !folder.includes(".")
    )) {
      for (let file of readdirSync(`${folderPath}/` + folder).filter((f) =>
      f.endsWith(".js")
      )) {
        let command = require(`${folderPath}/${folder}/${file}`);
        if (command) {
          probotSlashCommands.push(command.data.toJSON());
          client9.probotSlashCommands.set(command.data.name, command);
          if (command.data.name) {
            table.addRow(`/${command.data.name}`, "🟢 Working");
          } else {
            table.addRow(`/${command.data.name}`, "🔴 Not Working");
          }
        }
  }
}



const folderPath2 = path.join(__dirname, 'commands9');

for(let foldeer of readdirSync(folderPath2).filter((folder) => !folder.includes("."))) {
  for(let fiee of(readdirSync(`${folderPath2}/${foldeer}`).filter((fi) => fi.endsWith(".js")))) {
    const commander = require(`${folderPath2}/${foldeer}/${fiee}`)
  }
}

require(`../../events/requireBots/probot-Commands`)(client9)
require("./handlers/events")(client9)

	for (let file of readdirSync('./events/').filter(f => f.endsWith('.js'))) {
		const event = require(`./events/${file}`);
	if (event.once) {
		client9.once(event.name, (...args) => event.execute(...args));
	} else {
		client9.on(event.name, (...args) => event.execute(...args));
	}
	}

client9.on('ready' , async() => {
  setInterval(async() => {
    let BroadcastTokenss = tokens.get(`probot`)
    let thiss = BroadcastTokenss.find(br => br.token == token)
    if(thiss) {
      if(thiss.timeleft <= 0) {
        await client9.destroy();
        console.log(`${clientId} Ended`)
      }
    }
  }, 1000);
})


  client9.on("interactionCreate" , async(interaction) => {
    if (interaction.isChatInputCommand()) {
      
	    if(interaction.user.bot) return;

      
      const command = client9.probotSlashCommands.get(interaction.commandName);
	    
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

  client9.on("messageCreate" , async(message) => {
    let client = message.client;
  if (message.author.bot) return;
  if (message.channel.type === 'dm') return;


  if(!message.content.startsWith(prefix)) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/g); 
  const cmd = args.shift().toLowerCase();
  if(cmd.length == 0 ) return;
  let command = client.commands.get(cmd)
  if(!command) command = client9.commands.get(client.commandaliases.get(cmd));

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




  client9.on('messageCreate', async (message) => {
    const status = 'on'
    if (status === "on") {
      if (message.content.includes('type these numbers to confirm')) return;

      if (message.author.id === '282859044593598464') {
        try {
          if (message.content.includes('You are eligible to receive your daily for the bot!')) {
            const buttonComponent = message.components.find(component => component.type === 'ACTION_ROW')?.components.find(component => component.type === 'BUTTON');
            await message.delete();
            const lastMessage = message.channel.messages.cache.last();
            const row = new MessageActionRow()
              .addComponents(buttonComponent);
            return lastMessage.reply({
              content: `${message.content}`,
              components: [row]
            }).catch(async() => {
              return message.channel.send({
                content: `${message.content}`,
              components: [row]
              })
            })
          }
          if (message.content.includes('You can get up to 2600 credits if you vote for ProBot!')) {
            const buttonComponent = message.components.find(component => component.type === 'ACTION_ROW')?.components.find(component => component.type === 'BUTTON');
            await message.delete();
            const lastMessage = message.channel.messages.cache.last();
            const row = new MessageActionRow()
              .addComponents(buttonComponent);
            return lastMessage.reply({
              content: `${message.content}`,
              components: [row]
            }).catch(async() => {
              return message.channel.send({
                content: `${message.content}`,
              components: [row]
              })
            })
          }
          if (message.author.bot && message.embeds.length > 0) {
            await message.delete();
            const lastMessage = message.channel.messages.cache.last();
            const embed = new EmbedBuilder(message.embeds[0]);
            return lastMessage.reply({ embeds: [embed] }).catch(async() => {
              return message.channel.send({
                embeds:[embed]
              })
            })
          }

          if (message.content && message.attachments.size > 0) {
            const attach = message.attachments.first();
            await message.delete();
            const lastMessage = message.channel.messages.cache.last();
            return lastMessage.reply({ content: `${message}`, files: [{ name: `'pic.png'`, attachment: attach.url }] }).catch(async() => {
              message.channel.send({content: `${message}`, files: [{ name: `'pic.png'`, attachment: attach.url }]})
            })
          }

          if (message.attachments.size > 0) {
            const attach = message.attachments.first();
            await message.delete();
            const lastMessage = message.channel.messages.cache.last();
            return lastMessage.reply({ files: [{ name: 'pic.png', attachment: attach.url }] }).catch(async() => {
              message.channel.send({ files: [{ name: 'pic.png', attachment: attach.url }] })
            })
          }

          await message.delete().catch(err => { })
          const lastMessage = message.channel.messages.cache.last();
          let sentMessage;
            sentMessage = await lastMessage.reply({ content: `${message}` }).catch(async() => {
             sentMessage = message.channel.send({content:`${message}`})
          })

         
        } catch (error) {
          console.log(error)
        }
      }
    } else {
      return;
    }
  });

  client9.on("messageCreate" , async(message) => {
      if(message.author.id != client9.user.id) return;
       if (message.content.includes('Cool down')) {
            setTimeout(() => {
              message.delete();
            }, 3000);
          }
          if (message.content.includes(`Deleting messages`)) {
            setTimeout(() => {
              message.delete();
            }, 3000);
          }
})




   client9.login(token)
   .catch(async(err) => {
    const filtered = probot.filter(bo => bo != data)
			await tokens.set(`probot` , filtered)
      console.log(`${clientId} Not working and removed `)
   });


})
