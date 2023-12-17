const Discord = require('discord.js');
const { MessageEmbed } = require("discord.js");
const djs = require("discord.js"),
  cooldowns = new djs.Collection();


const { Database } = require("st.db")
const prefixDB = new Database("/Json-db/Others/PrefixDB.json")
const ownerDB = new Database("/Json-db/Others/OwnerDB.json")


module.exports.run = async (client, message) => {
  const prefix = prefixDB.get(`Prefix_${client.user.id}_autoline`)
  const owner = ownerDB.get(`Owner_${client.user.id}_autoline`)
  const config = require("../../../config.json");
  const ownerOnly1 = new Discord.MessageEmbed()
    .setColor(`#ff0000`)
    .setDescription(`❌ __**Only the owner can use this Command**__`);

  if (message.author.bot) return;
  if (!message.guild) return;
  if (!message.member.permissions.has(djs.Permissions.FLAGS.ADMINISTRATOR)) {
    message.content.split(' ').forEach(m => { });
  }
  const prefixMention = new RegExp(`^<@!?${message.client.user.id}>`);

  if (message.content.match(prefixMention)) {
    return message.reply(`Welcome im ${client.user.tag} My Prefix is \`${prefix}\``);
  }
  if (!message.content.startsWith(prefix)) return;
  if (!message.member) message.member = await message.guild.fetchMember(message);

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();

  if (cmd.length === 0) return;

  let command = client.commands.get(cmd) || client.commands.find(command => command.aliases && command.aliases.includes(cmd));
  if (!command) return;
  if (!command) command = client.commands.get(client.aliases.get(cmd));

  if (!command) return;
  if (command.botPermission) {
    let neededPerms = [];
    command.botPermission.forEach(p => {
      if (!message.guild.me.permissions.has(p)) neededPerms.push('' + p + '');
    });

    if (neededPerms.length) {
      const botembed = new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setDescription(`❌ ** I don't have Permission - [${neededPerms}]**`);
      return message.channel.send({ embeds: [botembed] });
    }
  }
  if (command.authorPermission) {
    let neededPerms = [];
    command.authorPermission.forEach(p => {
      if (!message.member.permissions.has(p)) neededPerms.push(`${p}`);
    });

    if (neededPerms.length) {
      const premsneeded = new Discord.MessageEmbed()
        .setColor('#ff0000')
        .setDescription(`❌ ** You don't have Permission - [${neededPerms}]**`);
      return message.channel.send({ embeds: [premsneeded] });
    }
  }
  if (command.ownerOnly) {
    if (!owner.includes(message.author.id))
      return message.channel.send({ embeds: [ownerOnly1] });
  }
  if (command.dmOnly) {
    if (message.channel.type !== "DM") return;
  }

  if (!cooldowns.has(command.name)) cooldowns.set(command.name, new djs.Collection());

  const member = message.member,
    now = Date.now(),
    timestamps = cooldowns.get(command.name),
    cooldownAmount = (command.cooldowns || 3) * 1000;

  if (!timestamps.has(member.id)) {
    if (!owner.includes(message.author.id)) {
      timestamps.set(member.id, now);
    }
  } else {
    const expirationTime = timestamps.get(member.id) + cooldownAmount;

    if (now < expirationTime) {
      const timeLeft = (expirationTime - now) / 1000;
      const timeembed = new Discord.MessageEmbed()
        .setTitle(`__**Cooldown**__`)
        .setColor(`GOLD`)
        .setFooter({ text: `${client.user.tag}`, iconURL: `${client.user.avatarURL()}` })
        .setDescription(`**Please Wait Cooldown ${timeLeft.toFixed(0)} Seconds**!`)
        .setAuthor({ name: message.author.tag, iconURL: message.author.avatarURL({ dynamic: true }) });
      return message.channel.send({ embeds: [timeembed] }).then(timeembed => {
        setTimeout(() => {
          timeembed.delete();
          message.delete();
        }, 3000);
      }).catch(async (error) => { return console.log(error.message) });
    }

    timestamps.set(member.id, now);
    setTimeout(() => timestamps.delete(member.id), cooldownAmount);
  }

  if (command) command.run(client, message, args, config);
};