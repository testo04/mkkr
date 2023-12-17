
  const { Client,Discord, Collection, AuditLogEvent,discord,GatewayIntentBits, Partials , EmbedBuilder, ApplicationCommandOptionType , Events , ActionRowBuilder , ButtonBuilder ,MessageAttachment, ButtonStyle , Message, Embed } = require("discord.js");
const { Database } = require("st.db")
const logsDB = new Database("/Json-db/Bots/logsDB.json")
const tokens = new Database("/tokens/tokens")
const tier1subscriptions = new Database("/database/makers/tier1/subscriptions")


  let logs = tokens.get('logs')
if(!logs) return;
const path = require('path');
const { readdirSync } = require("fs");
let theowner;
logs.forEach(async(data) => {
  const { REST } = require('@discordjs/rest');
  const { Routes } = require('discord-api-types/v10');
  const { prefix , token , clientId , owner } = data;
  theowner = owner
  const client6 = new Client({intents: 32767, shards: "auto", partials: [Partials.Message, Partials.Channel, Partials.GuildMember,]});
  client6.commands = new Collection();
  require(`./handlers/events`)(client6);
  client6.events = new Collection();
  require(`../../events/requireBots/logs-commands`)(client6);
  const rest = new REST({ version: '10' }).setToken(token);
  client6.on("ready" , async() => {

      try {
        await rest.put(
          Routes.applicationCommands(client6.user.id),
          { body: logsSlashCommands },
          );
          
        } catch (error) {
          console.error(error)
        }

    });
    require(`./handlers/events`)(client6)

  const folderPath = path.join(__dirname, 'slashcommand6');
  client6.logsSlashCommands = new Collection();
  const logsSlashCommands = [];
  const ascii = require("ascii-table");
  const table = new ascii("logs commands").setJustify();
  for (let folder of readdirSync(folderPath).filter(
    (folder) => !folder.includes(".")
    )) {
      for (let file of readdirSync(`${folderPath}/` + folder).filter((f) =>
      f.endsWith(".js")
      )) {
        let command = require(`${folderPath}/${folder}/${file}`);
        if (command) {
          logsSlashCommands.push(command.data.toJSON());
          client6.logsSlashCommands.set(command.data.name, command);
          if (command.data.name) {
            table.addRow(`/${command.data.name}`, "🟢 Working");
          } else {
            table.addRow(`/${command.data.name}`, "🔴 Not Working");
          }
        }
  }
}



const folderPath2 = path.join(__dirname, 'commands6');

for(let foldeer of readdirSync(folderPath2).filter((folder) => !folder.includes("."))) {
  for(let fiee of(readdirSync(`${folderPath2}/${foldeer}`).filter((fi) => fi.endsWith(".js")))) {
    const commander = require(`${folderPath2}/${foldeer}/${fiee}`)
  }
}

require(`../../events/requireBots/logs-commands`)(client6)
require("./handlers/events")(client6)

	for (let file of readdirSync('./events/').filter(f => f.endsWith('.js'))) {
		const event = require(`./events/${file}`);
	if (event.once) {
		client6.once(event.name, (...args) => event.execute(...args));
	} else {
		client6.on(event.name, (...args) => event.execute(...args));
	}
	}

client6.on('ready' , async() => {
  setInterval(async() => {
    let logsTokenss = tokens.get(`logs`)
    let thiss = logsTokenss.find(br => br.token == token)
    if(thiss) {
      if(thiss.timeleft <= 0) {
        await client6.destroy();
        console.log(`${clientId} Ended`)
      }
    }
  }, 1000);
})


  client6.on("interactionCreate" , async(interaction) => {
    if (interaction.isChatInputCommand()) {
      
	    if(interaction.user.bot) return;

      
      const command = client6.logsSlashCommands.get(interaction.commandName);
	    
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

  client6.on("messageCreate" , async(message) => {
    let client = message.client;
  if (message.author.bot) return;
  if (message.channel.type === 'dm') return;


  if(!message.content.startsWith(prefix)) return;
  const args = message.content.slice(prefix.length).trim().split(/ +/g); 
  const cmd = args.shift().toLowerCase();
  if(cmd.length == 0 ) return;
  let command = client.commands.get(cmd)
  if(!command) command = client6.commands.get(client.commandaliases.get(cmd));

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




  client6.on('messageDelete' , async(message) => {
      if(message.author.bot) return;
    if (!logsDB.has(`log_messagedelete_${message.guild.id}`)) return;
    let deletelog1 = logsDB.get(`log_messagedelete_${message.guild.id}`)
      let deletelog2 = message.guild.channels.cache.get(deletelog1)
      const fetchedLogs = await message.guild.fetchAuditLogs({
        limit: 1,
        type: AuditLogEvent.MessageDelete
      });
      const deletionLog = fetchedLogs.entries.first();
      const { executor, target } = deletionLog;
    let deleteembed = new EmbedBuilder()
    .setTitle(`**تم حذف رسالة**`)
        .addFields(
          {
            name: `**صاحب الرسالة : **`, value: `**\`\`\`${message.author.tag} - (${message.author.id})\`\`\`**`, inline: false
          },
          {
            name: `**حاذف الرسالة : **`, value: `**\`\`\`${executor.username} - (${executor.id})\`\`\`**`, inline: false
          },
          {
            name: `**محتوى الرسالة : **`, value: `**\`\`\`${message.content}\`\`\`**`, inline: false
          },
          {
            name: `**الروم الذي تم الحذف فيه : **`, value: `${message.channel}`, inline: false
          }
        )
        .setTimestamp();
      await deletelog2.send({ embeds: [deleteembed] })
  })
client6.on('messageUpdate' , async(oldMessage, newMessage) => {
    if(oldMessage.author.bot) return;
  if (!logsDB.has(`log_messageupdate_${oldMessage.guild.id}`)) return;
  const fetchedLogs = await oldMessage.guild.fetchAuditLogs({
    limit: 1,
    type: AuditLogEvent.MessageUpdate
  });
  let updateLog1 = logsDB.get(`log_messageupdate_${oldMessage.guild.id}`);
      let updateLog2 = oldMessage.guild.channels.cache.get(updateLog1); 
  const updateLog = fetchedLogs.entries.first();
  const { executor } = updateLog;
  let updateEmbed = new EmbedBuilder()
  .setTitle(`**تم تعديل رسالة**`)
  .addFields(
    {
      name: "**صاحب الرسالة:**",
      value: `**\`\`\`${oldMessage.author.tag} (${oldMessage.author.id})\`\`\`**`,
      inline: false
    },
    {
      name: "**المحتوى القديم:**",
      value: `**\`\`\`${oldMessage.content}\`\`\`**`,
      inline: false
    },
    {
      name: "**المحتوى الجديد:**",
      value: `**\`\`\`${newMessage.content}\`\`\`**`,
      inline: false
    },
    {
      name: "**الروم الذي تم التحديث فيه:**",
      value: `${oldMessage.channel}`,
      inline: false
    }
  )
  .setTimestamp()
  await updateLog2.send({ embeds: [updateEmbed] });
})
client6.on('roleCreate' , async(role) => {
  if (!logsDB.has(`log_rolecreate_${role.guild.id}`)) return;
  let roleCreateLog1 = logsDB.get(`log_rolecreate_${role.guild.id}`);
      let roleCreateLog2 = role.guild.channels.cache.get(roleCreateLog1);
      const fetchedLogs = await role.guild.fetchAuditLogs({
        limit: 1,
        type: AuditLogEvent.RoleCreate
      });
      const roleCreateLog = fetchedLogs.entries.first();
      const { executor } = roleCreateLog;
      let roleCreateEmbed = new EmbedBuilder()
        .setTitle('**تم انشاء رتبة**')
        .addFields(
          { name: 'اسم الرتبة :', value: `\`\`\`${role.name}\`\`\``, inline: true },
          { name: 'الذي قام بانشاء الرتبة :', value: `\`\`\`${executor.username} (${executor.id})\`\`\``, inline: true }
        )
        .setTimestamp();
      await roleCreateLog2.send({ embeds: [roleCreateEmbed] });
})
client6.on('roleDelete' , async(role) => {
  if (!logsDB.has(`log_roledelete_${role.guild.id}`)) return;
  let roleDeleteLog1 = logsDB.get(`log_roledelete_${role.guild.id}`);
      let roleDeleteLog2 = role.guild.channels.cache.get(roleDeleteLog1);
      const fetchedLogs = await role.guild.fetchAuditLogs({
        limit: 1,
        type: AuditLogEvent.RoleDelete
      });

      const roleDeleteLog = fetchedLogs.entries.first();
      const { executor } = roleDeleteLog;

      let roleDeleteEmbed = new EmbedBuilder()
        .setTitle('**تم حذف رتبة**')
        .addFields({name:'اسم الرتبة :', value:`\`\`\`${role.name}\`\`\``, inline:true},{name:'الذي قام بحذف الرتبة :', value:`\`\`\`${executor.username} (${executor.id})\`\`\``, inline:true})
        .setTimestamp();

      await roleDeleteLog2.send({ embeds: [roleDeleteEmbed] });
})




client6.on('channelCreate', async (channel) => {
  if (logsDB.has(`log_channelcreate_${channel.guild.id}`)) {
    let channelCreateLog1 = logsDB.get(`log_channelcreate_${channel.guild.id}`);
    let channelCreateLog2 = channel.guild.channels.cache.get(channelCreateLog1);




    const fetchedLogs = await channel.guild.fetchAuditLogs({
      limit: 1,
      type: AuditLogEvent.ChannelCreate
    });

    const channelCreateLog = fetchedLogs.entries.first();
    const { executor } = channelCreateLog;

    let channelCategory = channel.parent ? channel.parent.name : 'None';

    let channelCreateEmbed = new EmbedBuilder()
      .setTitle('**تم انشاء روم**')
      .addFields(
        { name: 'اسم الروم : ', value: `\`\`\`${channel.name}\`\`\``, inline: true },
        { name: 'كاتيجوري الروم : ', value: `\`\`\`${channelCategory}\`\`\``, inline: true },
        { name: 'الذي قام بانشاء الروم : ', value: `\`\`\`${executor.username} (${executor.id})\`\`\``, inline: true }
      )
      .setTimestamp();

    await channelCreateLog2.send({ embeds: [channelCreateEmbed] });
  }
});




client6.on('channelDelete', async (channel) => {
  if (logsDB.has(`log_channeldelete_${channel.guild.id}`)) {
    let channelDeleteLog1 = logsDB.get(`log_channeldelete_${channel.guild.id}`);
    let channelDeleteLog2 = channel.guild.channels.cache.get(channelDeleteLog1);




    const fetchedLogs = await channel.guild.fetchAuditLogs({
      limit: 1,
      type: AuditLogEvent.ChannelDelete
    });

    const channelDeleteLog = fetchedLogs.entries.first();
    const { executor } = channelDeleteLog;

    let channelDeleteEmbed = new EmbedBuilder()
      .setTitle('**تم حذف روم**')
      .addFields(
        { name: 'اسم الروم : ', value: `\`\`\`${channel.name}\`\`\``, inline: true },
        { name: 'الذي قام بحذف الروم : ', value: `\`\`\`${executor.username} (${executor.id})\`\`\``, inline: true }
      )
      .setTimestamp();

    await channelDeleteLog2.send({ embeds: [channelDeleteEmbed] });
  }
});

client6.on('guildMemberUpdate', async (oldMember, newMember) => {
  const guild = oldMember.guild;
const addedRoles = newMember.roles.cache.filter((role) => !oldMember.roles.cache.has(role.id));
const removedRoles = oldMember.roles.cache.filter((role) => !newMember.roles.cache.has(role.id));




if (addedRoles.size > 0 && logsDB.has(`log_rolegive_${guild.id}`)) {
    let roleGiveLog1 = logsDB.get(`log_rolegive_${guild.id}`);
    let roleGiveLog2 = guild.channels.cache.get(roleGiveLog1);

    const fetchedLogs = await guild.fetchAuditLogs({
      limit: addedRoles.size,
      type: AuditLogEvent.MemberRoleUpdate
    });

    addedRoles.forEach((role) => {
      const roleGiveLog = fetchedLogs.entries.find((log) => log.target.id === newMember.id && log.changes[0].new[0].id === role.id);
      const roleGiver = roleGiveLog ? roleGiveLog.executor : null;
      const roleGiverUsername = roleGiver ? `${roleGiver.username} (${roleGiver.id})` : `UNKNOWN`;



      let roleGiveEmbed = new EmbedBuilder()
        .setTitle('**تم إعطاء رتبة لعضو**')
        .addFields(
          { name: 'اسم الرتبة:', value: `\`\`\`${role.name}\`\`\``, inline: true },
          { name: 'تم إعطاءها بواسطة:', value: `\`\`\`${roleGiverUsername}\`\`\``, inline: true },
          { name: 'تم إعطائها للعضو:', value: `\`\`\`${newMember.user.username} (${newMember.user.id})\`\`\``, inline: true }
        )
        .setTimestamp();

      roleGiveLog2.send({ embeds: [roleGiveEmbed] });
    });
  }

  if (removedRoles.size > 0 && logsDB.has(`log_roleremove_${guild.id}`)) {
    let roleRemoveLog1 = logsDB.get(`log_roleremove_${guild.id}`);
    let roleRemoveLog2 = guild.channels.cache.get(roleRemoveLog1);

    const fetchedLogs = await guild.fetchAuditLogs({
      limit: removedRoles.size,
      type: AuditLogEvent.MemberRoleUpdate
    });




    removedRoles.forEach((role) => {
      const roleRemoveLog = fetchedLogs.entries.find((log) => log.target.id === newMember.id && log.changes[0].new[0].id === role.id);
      const roleRemover = roleRemoveLog ? roleRemoveLog.executor : null;
      const roleRemoverUsername = roleRemover ? `${roleRemover.username} (${roleRemover.id})` : `UNKNOWN`;

      let roleRemoveEmbed = new EmbedBuilder()
        .setTitle('**تم إزالة رتبة من عضو**')
        .addFields(
          { name: 'اسم الرتبة:', value: `\`\`\`${role.name}\`\`\``, inline: true },
          { name: 'تم إزالتها بواسطة:', value: `\`\`\`${roleRemoverUsername}\`\`\``, inline: true },
          { name: 'تم إزالتها من العضو:', value: `\`\`\`${newMember.user.username} (${newMember.user.id})\`\`\``, inline: true }
        )
        .setTimestamp();


      roleRemoveLog2.send({ embeds: [roleRemoveEmbed] });
    });
  }
});
client6.on('guildMemberAdd', async (member) => {
  const guild = member.guild;
  if(!member.bot) return;
  const fetchedLogs = await guild.fetchAuditLogs({
    limit: 1,
    type: AuditLogEvent.BotAdd
  });




  const botAddLog = fetchedLogs.entries.first();
  const { executor, target } = botAddLog;

  if (target.bot) {
    let botAddLog1 = logsDB.get(`log_botadd_${guild.id}`);
    let botAddLog2 = guild.channels.cache.get(botAddLog1);

    let botAddEmbed = new EmbedBuilder()
      .setTitle('**تم اضافة بوت جديد الى السيرفر**')
      .addFields(
        { name: 'اسم البوت :', value: `\`\`\`${member.user.username}\`\`\``, inline: true },
        { name: 'ايدي البوت :', value: `\`\`\`${member.user.id}\`\`\``, inline: true },
        { name: 'هل لدية صلاحية الادمن ستريتور ؟ :', value: member.permissions.has('ADMINISTRATOR') ? `\`\`\`نعم لديه\`\`\`` : `\`\`\`لا ليس لديه\`\`\``, inline: true },
        { name: 'تم اضافته بواسطة :', value: `\`\`\`${executor.username} (${executor.id})\`\`\``, inline: false }
      )
      .setTimestamp();

    botAddLog2.send({ embeds: [botAddEmbed] });
  }
});





client6.on('guildBanAdd', async (guild, user) => {
  if (logsDB.has(`log_banadd_${guild.id}`)) {
    let banAddLog1 = logsDB.get(`log_banadd_${guild.id}`);
    let banAddLog2 = guild.channels.cache.get(banAddLog1);

    const fetchedLogs = await guild.fetchAuditLogs({
      limit: 1,
      type: AuditLogEvent.MemberBanAdd
    });

    const banAddLog = fetchedLogs.entries.first();
    const banner = banAddLog ? banAddLog.executor : null;
    const bannerUsername = banner ? `\`\`\`${banner.username} (${banner.id})\`\`\`` : `\`\`\`UNKNOWN\`\`\``;


    let banAddEmbed = new EmbedBuilder()
      .setTitle('**تم حظر عضو**')
      .addFields(
        { name: 'العضو المحظور:', value: `\`\`\`${user.tag} (${user.id})\`\`\`` },
        { name: 'تم حظره بواسطة:', value: bannerUsername },
      )
      .setTimestamp();

    banAddLog2.send({ embeds: [banAddEmbed] });
  }
});




client6.on('guildBanRemove', async (guild, user) => {
  if (logsDB.has(`log_bandelete_${guild.id}`)) {
    let banRemoveLog1 = logsDB.get(`log_bandelete_${guild.id}`);
    let banRemoveLog2 = guild.channels.cache.get(banRemoveLog1);

    const fetchedLogs = await guild.fetchAuditLogs({
      limit: 1,
      type: AuditLogEvent.MemberBanRemove
    });

    const banRemoveLog = fetchedLogs.entries.first();
    const unbanner = banRemoveLog ? banRemoveLog.executor : null;
    const unbannerUsername = unbanner ? `\`\`\`${unbanner.username} (${unbanner.id})\`\`\`` : `\`\`\`UNKNOWN\`\`\``;

    let banRemoveEmbed = new EmbedBuilder()
      .setTitle('**تم إزالة حظر عضو**')
      .addFields(
        { name: 'العضو المفكّر الحظر عنه:', value: `\`\`\`${user.tag} (${user.id})\`\`\`` },
        { name: 'تم إزالة الحظر بواسطة:', value: unbannerUsername }
      )
      .setTimestamp();


    banRemoveLog2.send({ embeds: [banRemoveEmbed] });
  }
});


client6.on('guildMemberRemove', async (member) => {
  const guild = member.guild;
  if (logsDB.has(`log_kickadd_${guild.id}`)) {
    const kickLogChannelId = logsDB.get(`log_kickadd_${guild.id}`);
    const kickLogChannel = guild.channels.cache.get(kickLogChannelId);

    const fetchedLogs = await guild.fetchAuditLogs({
      limit: 1,
      type: AuditLogEvent.MemberKick,
    });

    const kickLog = fetchedLogs.entries.first();
    const kicker = kickLog ? kickLog.executor : null;
    const kickerUsername = kicker ? `\`\`\`${kicker.username} (${kicker.id})\`\`\`` : 'Unknown';

    const kickEmbed = new EmbedBuilder()
      .setTitle('**تم طرد عضو**')
      .addFields(
        { name: 'العضو المطرود:', value: `\`\`\`${member.user.tag} (${member.user.id})\`\`\`` },
        { name: 'تم طرده بواسطة:', value: kickerUsername },
      )
      .setTimestamp();

    kickLogChannel.send({ embeds: [kickEmbed] });
  }
});

   client6.login(token)
   .catch(async(err) => {
    const filtered = logs.filter(bo => bo != data)
			await tokens.set(`logs` , filtered)
      console.log(`${clientId} Not working and removed `)
   });
})