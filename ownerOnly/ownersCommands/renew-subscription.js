const { SlashCommandBuilder, EmbedBuilder , PermissionsBitField, ActionRowBuilder,ButtonBuilder,MessageComponentCollector,ButtonStyle, Embed } = require("discord.js");const { Database } = require("st.db")
const db = new Database("/database/settings")
const tier1subscriptions = new Database("/database/makers/tier1/subscriptions")
const tokens = new Database("/database/tokens")
const { clientId,owner} = require('../../config.json');
module.exports = {
    data: new SlashCommandBuilder()
    .setName('renew-subscription')
    .setDescription('تجديد اشتراك')
    .addStringOption(Option => Option
        .setName(`serverid`)
        .setDescription(`ايدي السيرفر`)
        .setRequired(true))
        .addIntegerOption(Option => Option
            .setName(`days`)
            .setDescription(`الايام`)
            .setRequired(true))
    ,
    async execute(interaction) {
       if(!owner.includes(interaction.user.id)) return;
       const serverid = interaction.options.getString(`serverid`)
       const days = interaction.options.getInteger(`days`)
       const subsearch = tier1subscriptions.get(`tier1_subs`)
       const serversearch = subsearch.find(su => su.guildid == serverid)
       if(!serversearch) {
        return interaction.reply({content:`**لم يتم العثور على اشتراك بهذا الايدي**`})
       }
       const daysByHours = Math.floor(parseInt(days) * 24)
       const daysByMins = Math.floor(parseInt(daysByHours) * 60)
       const daysBySecs = Math.floor(parseInt(daysByMins) * 60)
       let {ownerid , guildid , timeleft} = serversearch;
       timeleft = timeleft + daysBySecs
       serversearch.timeleft = timeleft
       await tier1subscriptions.set(`tier1_subs` , subsearch)
       const doneembed = new EmbedBuilder()
       .setFooter({text:interaction.user.username , iconURL:interaction.user.displayAvatarURL({dynamic:true})})
        .setAuthor({name:interaction.guild.name , iconURL:interaction.guild.iconURL({dynamic:true})})
        .setTimestamp(Date.now())
        .setColor('#000000')
        .setTitle(`**تم تجديد الاشتراك واضافة الوقت بنجاح**`)
        .setDescription(`**عدد الايام المتبقية الأن : \`${Math.floor((timeleft / 60) / (60) / (24))}\`**`)
       return interaction.reply({embeds:[doneembed]})
    }
}