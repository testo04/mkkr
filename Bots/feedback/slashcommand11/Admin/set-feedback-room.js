const { SlashCommandBuilder, EmbedBuilder , PermissionsBitField } = require("discord.js");
const { Database } = require("st.db")
const feedbackDB = new Database("/Json-db/Bots/feedbackDB.json")
module.exports = {
    ownersOnly:true,
    data: new SlashCommandBuilder()
    .setName('set-feedback-room')
    .setDescription('تحديد روم الاراء')
    .addChannelOption(Option => 
        Option
        .setName('room')
        .setDescription('الروم')
        .setRequired(true)), // or false
async execute(interaction) {
    const room = interaction.options.getChannel(`room`)
    await feedbackDB.set(`feedback_room_${interaction.guild.id}` , room.id)
    return interaction.reply({content:`**تم تحديد الروم بنجاح**`})
}
}