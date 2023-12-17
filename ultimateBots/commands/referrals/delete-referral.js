const { SlashCommandBuilder, EmbedBuilder , PermissionsBitField } = require("discord.js");
const { Database } = require("st.db")
const db = new Database("/database/usersdata/referral")
module.exports = {
    ownersOnly:true,
    data: new SlashCommandBuilder()
    .setName('delete-referral')
    .setDescription('حذف كود دعوة')
    .addUserOption(Option => 
        Option
        .setName('owner')
        .setDescription('صاحب الكود')
        .setRequired(true)), // or false
async execute(interaction) {
    await interaction.deferReply({ephemeral:false})
    const owner = interaction.options.getUser(`owner`)
    let referrals = db.get(`referrals_${interaction.guild.id}`)
    if(!referrals) {
        await db.set(`referrals_${interaction.guild.id}` , [])
    }
    referrals = await db.get(`referrals_${interaction.guild.id}`)
    let ownerFind = referrals.find(re => re.owner == owner.id)
    if(!ownerFind) return interaction.editReply({content:`**هذا الشخص لا يمتلك كود**`})
    const filtered = referrals.filter(re => re.owner != owner.id)
    await db.set(`referrals_${interaction.guild.id}` , filtered)
    return interaction.editReply({content:`**تم حذف كود الدعوة الخاص بهذا الشخص بنجاح**`})

}
}