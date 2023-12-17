const { SlashCommandBuilder, EmbedBuilder , PermissionsBitField } = require("discord.js");
const { Database } = require("st.db")
const db = new Database("/database/usersdata/referral")
module.exports = {
    ownersOnly:true,
    data: new SlashCommandBuilder()
    .setName('create-referral')
    .setDescription('انشاء كود دعوة')
    .addUserOption(Option => 
        Option
        .setName('owner')
        .setDescription('صاحب الكود')
        .setRequired(true))
        .addStringOption(Option => Option
            .setName(`code`)
            .setDescription(`الكود`)
            .setRequired(true))
        .addIntegerOption(Option => Option
            .setName(`usergift`)
            .setDescription(`هدية مستخدم الكود`)
            .setRequired(true))
            .addIntegerOption(Option => Option
                .setName(`ownergift`)
                .setDescription(`هدية صاحب الكود`)
                .setRequired(true))
                .addIntegerOption(Option => Option
                    .setName(`maxuse`)
                    .setDescription(`اقصى عدد من المستخدمين`)
                    .setRequired(true)), // or false
async execute(interaction) {
    await interaction.deferReply({ephemeral:false})
    const owner = interaction.options.getUser(`owner`)
    const code = interaction.options.getString(`code`)
    const usergift = interaction.options.getInteger(`usergift`)
    const ownergift = interaction.options.getInteger(`ownergift`)
    const maxuse = interaction.options.getInteger(`maxuse`)
    let referrals = db.get(`referrals_${interaction.guild.id}`)
    if(!referrals) {
        await db.set(`referrals_${interaction.guild.id}` , [])
    }
    referrals = await db.get(`referrals_${interaction.guild.id}`)
    let ownerFind = referrals.find(re => re.owner == owner.id)
    if(ownerFind) return interaction.editReply({content:`**هذا الشخص يمتلك كود بالفعل**`})
     await referrals.push({
        owner:owner.id,
        code:code,
        usergift:usergift,
        ownergift:ownergift,
        maxuse:maxuse,
        users:[],
        usersnow:0
    })
    await db.set(`referrals_${interaction.guild.id}` , referrals)
    return interaction.editReply({content:`**تم انشاء كود الدعوة بنجاح**`})

}
}