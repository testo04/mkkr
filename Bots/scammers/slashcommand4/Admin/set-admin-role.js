const { SlashCommandBuilder, EmbedBuilder , PermissionsBitField } = require("discord.js");
const { Database } = require("st.db")
const db = new Database("/Json-db/Bots/scamDB.json")
module.exports = {
    ownersOnly:true,
    data: new SlashCommandBuilder()
    .setName('set-admin-role')
    .setDescription('تحديد رتبة الادمن')
    .addRoleOption(Option => 
        Option
        .setName('role')
        .setDescription('role')
        .setRequired(true)), // or false
async execute(interaction) {
const role = interaction.options.getRole(`role`)
await db.set(`scammer_admin_${interaction.guild.id}` , role.id)
return interaction.reply({content:`**تم تحديد رتبة الادمن بنجاح**`})

}
}