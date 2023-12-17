const { SlashCommandBuilder, EmbedBuilder , PermissionsBitField, ActionRowBuilder,ButtonBuilder,MessageComponentCollector,ButtonStyle } = require("discord.js");
const DB = require("../../../../database/settings")

module.exports ={
    ownersOnly:false,
    data: new SlashCommandBuilder()
    .setName('come')
    .setDescription('استدعاء شخص')
    .addUserOption(Option => Option
        .setName(`user`)
        .setDescription(`الشخص المراد استدعائه`)
        .setRequired(true)),
    async execute(interaction, client) {
        try {
        const sent = await interaction.deferReply({ fetchReply: true , ephemeral:false});
        const user = interaction.options.getUser(`user`)
            user.send({content:`**تم استدعائك بواسطة : ${interaction.user}\nفي : ${interaction.channel}**`}).then(async() => {
                return interaction.editReply({content:`**تم الارسال للشخص بنجاح**`})
            }).catch(async() => {
                return interaction.editReply({content:`**لم استطع الارسال للشخص**`})
            })
        } catch {
            return interaction.editReply({content:`**لم استطع الارسال للشخص**`})
        }
    }
}
 