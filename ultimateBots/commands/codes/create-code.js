const { SlashCommandBuilder, EmbedBuilder , PermissionsBitField } = require("discord.js");
const { Database } = require("st.db")
const db = new Database("/database/usersdata/codes")
module.exports = {
    ownersOnly:true,
    data: new SlashCommandBuilder()
    .setName('create-code')
    .setDescription('انشاء كود خصم')
        .addStringOption(Option => Option
            .setName(`code`)
            .setDescription(`الكود`)
            .setRequired(true))
        .addIntegerOption(Option => Option
            .setName(`usergift`)
            .setDescription(`هدية مستخدم الكود`)
            .setRequired(true))
                .addIntegerOption(Option => Option
                    .setName(`maxuse`)
                    .setDescription(`اقصى عدد من المستخدمين`)
                    .setRequired(true)), // or false
async execute(interaction) {
    await interaction.deferReply({ephemeral:false})
    const code = interaction.options.getString(`code`)
    const usergift = interaction.options.getInteger(`usergift`)
    const maxuse = interaction.options.getInteger(`maxuse`)
    let codes = db.get(`codes_${interaction.guild.id}`)
    if(!codes) {
        await db.set(`codes_${interaction.guild.id}` , [])
    }
    codes = await db.get(`codes_${interaction.guild.id}`)
     await codes.push({
        code:code,
        usergift:usergift,
        maxuse:maxuse,
        users:[],
        usersnow:0
    })
    await db.set(`codes_${interaction.guild.id}` , codes)
    return interaction.editReply({content:`**تم انشاء كود الخصم بنجاح**`})

}
}