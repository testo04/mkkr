const { SlashCommandBuilder, EmbedBuilder , PermissionsBitField } = require("discord.js");
const { Database } = require("st.db")
const autolineDB = new Database("/Json-db/Bots/autolineDB.json")
module.exports = {
    ownersOnly:true,
    data: new SlashCommandBuilder()
    .setName('remove-autoline-channel')
    .setDescription('اضافة روم خط تلقائي')
    .addChannelOption(Option => 
        Option
        .setName('room')
        .setDescription('الروم')
        .setRequired(true)), // or false
async execute(interaction) {
    const room = interaction.options.getChannel(`room`)
    let db = autolineDB.get(`line_channels_${interaction.guild.id}`)
    if(!autolineDB.has(`line_channels_${interaction.guild.id}`)) {
        await autolineDB.set(`line_channels_${interaction.guild.id}` , [])
    }
    db = autolineDB.get(`line_channels_${interaction.guild.id}`)
    const filtered = db.filter(ch => ch != room.id)
    
    await autolineDB.set(`line_channels_${interaction.guild.id}` , filtered)
    return interaction.reply({content:`**تم ازالة الروم بنجاح**`})
}
}