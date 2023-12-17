const { SlashCommandBuilder, EmbedBuilder , PermissionsBitField } = require("discord.js");
const { Database } = require("st.db")
const db = new Database("/database/usersdata/codes")
module.exports = {
    ownersOnly:true,
    data: new SlashCommandBuilder()
    .setName('delete-code')
    .setDescription('حذف كود خصم')
    .addStringOption(Option => 
        Option
        .setName('code')
        .setDescription('الكود')
        .setRequired(true)), // or false
async execute(interaction) {
    await interaction.deferReply({ephemeral:false})
    const thecode = interaction.options.getString(`code`)
    let codes = db.get(`codes_${interaction.guild.id}`)
    if(!codes) {
        await db.set(`codes_${interaction.guild.id}` , [])
    }
    codes = await db.get(`codes_${interaction.guild.id}`)
    let ownerFind = codes.find(re => re.code == thecode)
    if(!ownerFind) return interaction.editReply({content:`**هذا الكود غير متوفر للازالة**`})
    const filtered = codes.filter(re => re.code != thecode)
    await db.set(`codes_${interaction.guild.id}` , filtered)
    return interaction.editReply({content:`**تم حذف الكود بنجاح**`})

}
}