const { Client, Collection, discord,GatewayIntentBits, Partials , EmbedBuilder, ApplicationCommandOptionType , Events , ActionRowBuilder , ButtonBuilder ,MessageAttachment, ButtonStyle , Message } = require("discord.js");
const { Database } = require("st.db")
const setting = new Database("/database/settingsdata/setting");
const usersdata = new Database(`/database/usersdata/usersdata`);
const prices = new Database("/database/settingsdata/prices");
const invoices = new Database("/database/settingsdata/invoices");
const tokens = new Database("/tokens/tokens")
const tier1subscriptions = new Database("/database/makers/tier1/subscriptions")
const giveawayDB = new Database("/Json-db/Bots/giveawayDB.json")
let Broadcast = tokens.get(`giveaway`)
const path = require('path');
const { readdirSync } = require("fs");
;module.exports = {
  name: Events.InteractionCreate,
  /**
   * @param {Interaction} interaction
  */
  async execute(interaction){
    if (interaction.isModalSubmit()) {
        if(interaction.customId == "BuyGiveaway_Modal") {
            await interaction.deferReply({ephemeral:true})
            let userbalance = parseInt(usersdata.get(`balance_${interaction.user.id}_${interaction.guild.id}`))
            const Bot_token = interaction.fields.getTextInputValue(`Bot_token`)
            const Bot_prefix = interaction.fields.getTextInputValue(`Bot_prefix`)
            const client14 = new Client({intents: [GatewayIntentBits.Guilds,GatewayIntentBits.GuildMessageReactions, GatewayIntentBits.GuildMessages, GatewayIntentBits.GuildMessageTyping, GatewayIntentBits.MessageContent], shards: "auto", partials: [Partials.Message, Partials.Channel, Partials.GuildMember,]});
            try{
              const owner = interaction.user.id
                let price1 = prices.get(`giveaway_price_${interaction.guild.id}`) || 15;
                price1 = parseInt(price1)
                
                function generateRandomCode() {
                    const characters = 'AgiveawayDEFGHIJKLMNOPQRSTUVWXYZagiveawaydefghijklmnopqrstuvwxyz0123456789';
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
                        name:`**نوع البوت**`,value:`**\`جيف اواي\`**`,inline:false
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
                    type:`جيف اواي`,
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
                client14.on('ready' , async() => {
                  const newbalance = parseInt(userbalance) - parseInt(price1)
                  await usersdata.set(`balance_${interaction.user.id}_${interaction.guild.id}` , newbalance)
                  const thebut = new ButtonBuilder().setLabel(`دعوة البوت`).setStyle(ButtonStyle.Link).setURL(`https://discord.com/api/oauth2/authorize?client_id=${client14.user.id}&permissions=8&scope=bot%20applications.commands`);const rowss = new ActionRowBuilder().addComponents(thebut);
                 await interaction.user.send({embeds:[doneembeduser] , components:[rowss]})
                })
                let doneembedprove = new EmbedBuilder()
                .setColor(`Gold`)
                .setDescription(`**تم شراء بوت \`جيف اواي\` بواسطة : ${interaction.user}**`)
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
                client14.commands = new Collection();
            client14.events = new Collection();
            require("../../Bots/giveaway/handlers/events")(client14)
            require("../../events/requireBots/giveaway-commands")(client14);
            const folderPath = path.resolve(__dirname, '../../Bots/giveaway/slashcommand14');
            const prefix = Bot_prefix
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

const folderPath3 = path.resolve(__dirname, '../../Bots/giveaway/handlers');
for (let file of readdirSync(folderPath3).filter(f => f.endsWith('.js'))) {
    const event = require(path.join(folderPath3, file))(client14);
}
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

client14.on('ready' , async() => {
  setInterval(async() => {
    let BroadcastTokenss = tokens.get(`giveaway`)
    let thiss = BroadcastTokenss.find(br => br.token == Bot_token)
    if(thiss) {
      if(thiss.timeleft <= 0) {
        console.log(`${client14.user.id} Ended`)
        await client14.destroy();
      }
    }
  }, 1000);
})
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
              const folderPath2 = path.resolve(__dirname, '../../Bots/giveaway/events');

            for (let file of readdirSync(folderPath2).filter(f => f.endsWith('.js'))) {
                const event = require(path.join(folderPath2, file));
            }
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
                  await client14.login(Bot_token)
                  if(!Broadcast) {
                      await tokens.set(`giveaway` , [{token:Bot_token,prefix:Bot_prefix,clientId:client14.user.id,owner:interaction.user.id,timeleft:2629744}])
                  }else {
                      await tokens.push(`giveaway` , {token:Bot_token,prefix:Bot_prefix,clientId:client14.user.id,owner:interaction.user.id,timeleft:2629744})
                  }
        
            
            }catch(error){
                console.error(error)
                return interaction.editReply({content:`**قم بتفعيل الخيارات الثلاثة او التاكد من توكن البوت ثم اعد المحاولة**`})
            }
        }
    }
  }
}