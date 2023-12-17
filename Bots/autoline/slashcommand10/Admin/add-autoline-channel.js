const { SlashCommandBuilder, EmbedBuilder , PermissionsBitField } = require("discord.js");
const { Database } = require("st.db")
const autolineDB = new Database("/Json-db/Bots/autolineDB.json")
module.exports = {
    ownersOnly:true,
    data: new SlashCommandBuilder()
    .setName('add-autoline-channel')
    .setDescription('اضافة روم خط تلقائي')
    .addChannelOption(Option => 
        Option
        .setName('room')
        .setDescription('الروم')
        .setRequired(true)), // or false
async execute(interaction) {
    const room = interaction.options.getChannel(`room`)
    if(!autolineDB.has(`line_channels_${interaction.guild.id}`)) {
        await autolineDB.set(`line_channels_${interaction.guild.id}` , [])
    }
    await autolineDB.push(`line_channels_${interaction.guild.id}` , room.id)
    return interaction.reply({content:`**تم اضافة الروم بنجاح**`})
}
}