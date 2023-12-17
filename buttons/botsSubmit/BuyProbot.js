const { Client, Collection, discord,GatewayIntentBits, Partials , EmbedBuilder, ApplicationCommandOptionType , Events , ActionRowBuilder , ButtonBuilder ,MessageAttachment, ButtonStyle , Message } = require("discord.js");
const { Database } = require("st.db")
const setting = new Database("/database/settingsdata/setting");
const usersdata = new Database(`/database/usersdata/usersdata`);
const prices = new Database("/database/settingsdata/prices");
const invoices = new Database("/database/settingsdata/invoices");
const tokens = new Database("/tokens/tokens")
const tier1subscriptions = new Database("/database/makers/tier1/subscriptions")
const probotDB = new Database("/Json-db/Bots/probotDB.json")
let Broadcast = tokens.get(`probot`)
const path = require('path');
const { readdirSync } = require("fs");
;module.exports = {
  name: Events.InteractionCreate,
  /**
   * @param {Interaction} interaction
  */
  async execute(interaction){
    if (interaction.isModalSubmit()) {
        if(interaction.customId == "BuyProbot_Modal") {
            await interaction.deferReply({ephemeral:true})
            let userbalance = parseInt(usersdata.get(`balance_${interaction.user.id}_${interaction.guild.id}`))
            const Bot_token = interaction.fields.getTextInputValue(`Bot_token`)
            const Bot_prefix = interaction.fields.getTextInputValue(`Bot_prefix`)
            const client9 = new Client({intents: [GatewayIntentBits.Guilds,GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.MessageContent], shards: "auto", partials: [Partials.Message, Partials.Channel, Partials.GuildMember,]});
            try{
              const owner = interaction.user.id
                let price1 = prices.get(`probot_price_${interaction.guild.id}`) || 15;
                price1 = parseInt(price1)
                
                function generateRandomCode() {
                    const characters = 'AprobotDEFGHIJKLMNOPQRSTUVWXYZaprobotdefghijklmnopqrstuvwxyz0123456789';
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
                let doneembeduser = new EmbedBuilder()
                .setTitle(`**تم انشاء بوتك بنجاح**`)
                .setDescription(`**معلومات الفاتورة :**`)
                .addFields(
                    {
                        name:`**الفاتورة**`,value:`**\`${invoice}\`**`,inline:false
                    },
                    {
                        name:`**نوع البوت**`,value:`**\`بروبوت بريميوم وهمي\`**`,inline:false
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
                    type:`بروبوت بريميوم وهمي`,
                    token:`${Bot_token}`,
                    prefix:`${Bot_prefix}`,
                    userid:`${interaction.user.id}`,
                    guildid:`${interaction.guild.id}`,
                    serverid:`عام`,
                    price:price1
                })
                const { REST } = require('@discordjs/rest');
                const rest = new REST({ version: '10' }).setToken(Bot_token);
                const { Routes } = require('discord-api-types/v10');
                const newbalance = parseInt(userbalance) - parseInt(price1)
                client9.on('ready' , async() => {
                  const newbalance = parseInt(userbalance) - parseInt(price1)
                  await usersdata.set(`balance_${interaction.user.id}_${interaction.guild.id}` , newbalance)
                  const thebut = new ButtonBuilder().setLabel(`دعوة البوت`).setStyle(ButtonStyle.Link).setURL(`https://discord.com/api/oauth2/authorize?client_id=${client9.user.id}&permissions=8&scope=bot%20applications.commands`);const rowss = new ActionRowBuilder().addComponents(thebut);
                 await interaction.user.send({embeds:[doneembeduser] , components:[rowss]})
                })
                let doneembedprove = new EmbedBuilder()
                .setColor(`Gold`)
                .setDescription(`**تم شراء بوت \`بروبوت بريميوم وهمي\` بواسطة : ${interaction.user}**`)
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
                await usersdata.set(`balance_${interaction.user.id}_${interaction.guild.id}` , newbalance)
                client9.commands = new Collection();
            client9.events = new Collection();
            require("../../Bots/probot/handlers/events")(client9)
            require("../../events/requireBots/probot-Commands")(client9);
            const folderPath = path.resolve(__dirname, '../../Bots/probot/slashcommand9');
            const prefix = Bot_prefix
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

const folderPath3 = path.resolve(__dirname, '../../Bots/probot/handlers');
for (let file of readdirSync(folderPath3).filter(f => f.endsWith('.js'))) {
    const event = require(path.join(folderPath3, file))(client9);
}
require('../../Bots/probot/probot-Bots')
client9.on('ready' , async() => {
  setInterval(async() => {
    let BroadcastTokenss = tokens.get(`probot`)
    let thiss = BroadcastTokenss.find(br => br.token == Bot_token)
    if(thiss) {
      if(thiss.timeleft <= 0) {
        console.log(`${client9.user.id} Ended`)
        await client9.destroy();
      }
    }
  }, 1000);
})
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
              const folderPath2 = path.resolve(__dirname, '../../Bots/probot/events');

            for (let file of readdirSync(folderPath2).filter(f => f.endsWith('.js'))) {
                const event = require(path.join(folderPath2, file));
            }
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
                  await client9.login(Bot_token)
                  if(!Broadcast) {
                      await tokens.set(`probot` , [{token:Bot_token,prefix:Bot_prefix,clientId:client9.user.id,owner:interaction.user.id,timeleft:2629744}])
                  }else {
                      await tokens.push(`probot` , {token:Bot_token,prefix:Bot_prefix,clientId:client9.user.id,owner:interaction.user.id,timeleft:2629744})
                  }
        
            
            }catch(error){
                console.error(error)
                return interaction.editReply({content:`**قم بتفعيل الخيارات الثلاثة او التاكد من توكن البوت ثم اعد المحاولة**`})
            }
        }
    }
  }
}