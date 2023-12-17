const { SlashCommandBuilder, EmbedBuilder , PermissionsBitField } = require("discord.js");
const { Database } = require("st.db")
const suggestionsDB = new Database("/Json-db/Bots/suggestionsDB.json")
module.exports = {
    ownersOnly:true,
    data: new SlashCommandBuilder()
    .setName('set-line')
    .setDescription('تحديد الخط')
    .addAttachmentOption(Option => 
        Option
        .setName('line')
        .setDescription('الخط')
        .setRequired(true)), // or false
async execute(interaction) {
    const line = interaction.options.getAttachment(`line`)
    await suggestionsDB.set(`line_${interaction.guild.id}` , line.url)
    return interaction.reply({content:`**تم تحديد الخط**`})
}
}