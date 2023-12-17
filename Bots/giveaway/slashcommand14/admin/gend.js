const { SlashCommandBuilder, EmbedBuilder ,ButtonStyle, PermissionsBitField, ButtonBuilder, ActionRowBuilder } = require("discord.js");
const { Database } = require("st.db")
const giveawayDB = new Database("/Json-db/Bots/giveawayDB.json")
const db = new Database("/database/data")
const moment = require('moment');
const ms = require('ms')
module.exports = {
    ownersOnly:true,
    data: new SlashCommandBuilder()
    .setName('gend')
    .setDescription('انهاء جيف اواي')
    .addStringOption(Option => 
        Option
        .setName('giveawayid')
        .setDescription('ايدي رسالة الجيف اواي')
        .setRequired(true))
        , // or false
async execute(interaction) {
    await interaction.deferReply({ephemeral:true})
const giveawayid = interaction.options.getString(`giveawayid`)
let giveaways = giveawayDB.get(`giveaways_${interaction.guild.id}`)
if(!giveaways) {
    await giveawayDB.set(`giveaways_${interaction.guild.id}` , [])
} 
giveaways = giveawayDB.get(`giveaways_${interaction.guild.id}`)
const giveawayFind = giveaways.find(gu => gu.messageid == giveawayid)
if(!giveawayFind) return interaction.editReply({content:`**لم يتم العثور على جيف اواي بهذا الايدي**`, ephemeral:true})
let {messageid , channelid , entries , winners , prize , duration,dir1,dir2,host,ended} = giveawayFind;
if(ended == true) return interaction.editReply({content:`**هذا الجيف اواي انتهى بالفعل**` , ephemeral:true})
giveawayFind.duration = 0;
giveawayFind.ended = true;
giveawayDB.set(`giveaways_${interaction.guild.id}` , giveaways)
return interaction.editReply({content:`**تم انهاء هذا الجيف اواي بنجاح**`})
}
}