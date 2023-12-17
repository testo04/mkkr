const { SlashCommandBuilder, EmbedBuilder ,ButtonStyle, PermissionsBitField, ButtonBuilder, ActionRowBuilder } = require("discord.js");
const { Database } = require("st.db")
const db = new Database("/Json-db/Bots/taxDB")
module.exports = {
    ownersOnly:true,
    data: new SlashCommandBuilder()
    .setName('set-tax-room')
    .setDescription('تحديد روم الضريبة التلقائية')
    .addChannelOption(Option => 
        Option
        .setName('room')
        .setDescription('الروم')
        .setRequired(true)), // or false
async execute(interaction) {
    let room = interaction.options.getChannel(`room`)
    await db.set(`tax_room_${interaction.guild.id}` , room.id)
  
    return interaction.reply({content:`**تم تحديد الروم بنجاح**`})
}
}