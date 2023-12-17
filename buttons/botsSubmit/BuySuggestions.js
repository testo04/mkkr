const { Client, Collection, discord,GatewayIntentBits, Partials , EmbedBuilder, ApplicationCommandOptionType , Events , ActionRowBuilder , ButtonBuilder ,MessageAttachment, ButtonStyle , Message } = require("discord.js");
const { Database } = require("st.db")
const setting = new Database("/database/settingsdata/setting");
const usersdata = new Database(`/database/usersdata/usersdata`);
const prices = new Database("/database/settingsdata/prices");
const invoices = new Database("/database/settingsdata/invoices");
const tokens = new Database("/tokens/tokens")
const tier1subscriptions = new Database("/database/makers/tier1/subscriptions")
const suggestionsDB = new Database("/Json-db/Bots/suggestionsDB.json")

let suggestions = tokens.get(`suggestions`)
const path = require('path');
const { readdirSync } = require("fs");
;module.exports = {
  name: Events.InteractionCreate,
  /**
   * @param {Interaction} interaction
  */
  async execute(interaction){
    if (interaction.isModalSubmit()) {
        if(interaction.customId == "BuySuggestions_Modal") {
            await interaction.deferReply({ephemeral:true})
            let userbalance = parseInt(usersdata.get(`balance_${interaction.user.id}_${interaction.guild.id}`))
            const Bot_token = interaction.fields.getTextInputValue(`Bot_token`)
            const Bot_prefix = interaction.fields.getTextInputValue(`Bot_prefix`)
            const client12 = new Client({intents: [GatewayIntentBits.Guilds,GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.MessageContent], shards: "auto", partials: [Partials.Message, Partials.Channel, Partials.GuildMember,]});
            try{
                const owner = interaction.user.id
                let price1 = prices.get(`suggestions_price_${interaction.guild.id}`) || 15;
                price1 = parseInt(price1)
                function generateRandomCode() {
                    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
                    let code = '';
                    for (let i = 0; i < 12; i++) {
                      if (i > 0 && i % 4 === 0) {
                        code += '-';
                      }
                      const randomIndex = Math.floor(Math.random() * characters.length);
                      code += characters.charAt(randomIndex);
                    }
                    return code;
                }
                const invoice = generateRandomCode();
                const { REST } = require('@discordjs/rest');
const rest = new REST({ version: '10' }).setToken(Bot_token);
const { Routes } = require('discord-api-types/v10');
               client12.on("ready" , async() => {
                let doneembeduser = new EmbedBuilder()
                .setTitle(`**تم انشاء بوتك بنجاح**`)
                .setDescription(`**معلومات الفاتورة :**`)
                .addFields(
                    {
                        name:`**الفاتورة**`,value:`**\`${invoice}\`**`,inline:false
                    },
                    {
                        name:`**نوع البوت**`,value:`**\`اقتراحات\`**`,inline:false
                    },
                    {
                        name:`**توكن البوت**`,value:`**\`${Bot_token}\`**`,inline:false
                    },
                    {
                        name:`**البريفكس**`,value:`**\`${Bot_prefix}\`**`,inline:false
                    }
                    )
                    await invoices.set(`${invoice}_${interaction.guild.id}` , 
                    {
                        type:`اقتراحات`,
                        token:`${Bot_token}`,
                        prefix:`${Bot_prefix}`,
                        userid:`${interaction.user.id}`,
                        guildid:`${interaction.guild.id}`,
                        serverid:`عام`,
                    price:price1
                })
                const newbalance = parseInt(userbalance) - parseInt(price1)
await usersdata.set(`balance_${interaction.user.id}_${interaction.guild.id}` , newbalance)
                const thebut = new ButtonBuilder().setLabel(`دعوة البوت`).setStyle(ButtonStyle.Link).setURL(`https://discord.com/api/oauth2/authorize?client_id=${client12.user.id}&permissions=8&scope=bot%20applications.commands`);const rowss = new ActionRowBuilder().addComponents(thebut);
                await interaction.user.send({embeds:[doneembeduser] , components:[rowss]})
            })
            
                let doneembedprove = new EmbedBuilder()
                .setColor(`Gold`)
                .setDescription(`**تم شراء بوت \`اقتراحات\` بواسطة : ${interaction.user}**`)
                .setTimestamp()
                let logroom =  setting.get(`log_room_${interaction.guild.id}`)
                let theroom = interaction.guild.channels.cache.find(ch => ch.id == logroom)
                await theroom.send({embeds:[doneembedprove]})
                let userbots = usersdata.get(`bots_${interaction.user.id}_${interaction.guild.id}`);
                if(!userbots) {
                    await usersdata.set(`bots_${interaction.user.id}_${interaction.guild.id}` , 1)
                }else {
                    userbots = userbots + 1
                    await usersdata.set(`bots_${interaction.user.id}_${interaction.guild.id}` , userbots) 
                }
                await interaction.editReply({content:`**تم انشاء بوتك بنجاح وتم خصم \`${price1}\` من رصيدك**`})
               
                client12.commands = new Collection();
                client12.events = new Collection();
                require("../../Bots/suggestions/handlers/events")(client12)
                require("../../events/requireBots/suggestions-commands")(client12);
                const folderPath = path.resolve(__dirname, '../../Bots/suggestions/slashcommand12');
                const prefix = Bot_prefix
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

const folderPath3 = path.resolve(__dirname, '../../Bots/suggestions/handlers');
for (let file of readdirSync(folderPath3).filter(f => f.endsWith('.js'))) {
    const event = require(path.join(folderPath3, file))(client12);
}

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
  
  client12.on("messageCreate" , async(message) => {
    if(message.author.bot) return;
    const autoChannels = suggestionsDB.get(`line_channels_${message.guild.id}`)
      if(autoChannels) {
        if(autoChannels.length > 0) {
          if(autoChannels.includes(message.channel.id)) {
            const line = suggestionsDB.get(`line_${message.guild.id}`)
        if(line) {
          return message.channel.send({content:`${line}`});
          }
        }
        }
      }
  })
client12.on('ready' , async() => {
    setInterval(async() => {
      let BroadcastTokenss = tokens.get(`suggestions`)
      let thiss = BroadcastTokenss.find(br => br.token == Bot_token)
      if(thiss) {
        if(thiss.timeleft <= 0) {
            console.log(`${client12.user.id} Ended`)
          await client12.destroy();
        }
      }
    }, 1000);
  })
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
    const folderPath2 = path.resolve(__dirname, '../../Bots/suggestions/events');
    
    for (let file of readdirSync(folderPath2).filter(f => f.endsWith('.js'))) {
        const event = require(path.join(folderPath2, file));
    }
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
                  
                  await client12.login(Bot_token)
                  if(!suggestions) {
                      await tokens.set(`suggestions` , [{token:Bot_token,prefix:Bot_prefix,clientId:client12.user.id,owner:interaction.user.id,timeleft:2629744}])
                  }else {
                      await tokens.push(`suggestions` , {token:Bot_token,prefix:Bot_prefix,clientId:client12.user.id,owner:interaction.user.id,timeleft:2629744})
                  }
                  
                }catch(error){
                console.error(error)
                return interaction.editReply({content:`**قم بتفعيل الخيارات الثلاثة او التاكد من توكن البوت ثم اعد المحاولة**`})
            }
        }
    }
}
}