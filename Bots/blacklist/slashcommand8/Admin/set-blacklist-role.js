const { SlashCommandBuilder, EmbedBuilder , PermissionsBitField } = require("discord.js");
const { Database } = require("st.db")
const blacklistDB = new Database("/Json-db/Bots/blacklistDB.json")
module.exports = {
    ownersOnly:true,
    data: new SlashCommandBuilder()
    .setName('set-blacklist-role')
    .setDescription('تحديد رتبة البلاك ليست')
    .addRoleOption(Option => 
        Option
        .setName('role')
        .setDescription('الرتبة')
        .setRequired(true)), // or false
async execute(interaction) {
    const role = interaction.options.getRole(`role`)
    await blacklistDB.set(`blacklist_role_${interaction.guild.id}` , role.id)
    return interaction.reply({content:`**تم تحديد الرتبة بنجاح**`})

}
}