const { SlashCommandBuilder, EmbedBuilder , PermissionsBitField, ActionRowBuilder,ButtonBuilder,MessageComponentCollector,ButtonStyle } = require("discord.js");
const settings = require("../../../../database/settings")
const managers = require("../../../../database/managers")


module.exports ={
    ownersOnly:true,
    data: new SlashCommandBuilder()
    .setName('reset-all')
    .setDescription('تصفير نقاط الكل'),
    async execute(interaction, client) {
        const sent = await interaction.deferReply({ fetchReply: true , ephemeral:false});
        let embed1 = new EmbedBuilder()
        .setFooter({text:interaction.user.username , iconURL:interaction.user.displayAvatarURL({dynamic:true})})
        .setAuthor({name:interaction.guild.name , iconURL:interaction.guild.iconURL({dynamic:true})})
        .setTimestamp(Date.now())
        .setColor('#000000')
       let profiles = await managers.find({guildid:interaction.guild.id})
       if(!profiles) {
        embed1.setTitle(`**لا يوجد نقاط لأي شخص ليتم التصفير**`)
        return interaction.editReply({embeds:[embed1]})
       }
       profiles.forEach(async(profile) => {
        profile.points = 0;
        profile.save();
       })
       embed1.setTitle(`**تم تصفير نقاط الجميع بنجاح**`)
       return interaction.editReply({embeds:[embed1]})
    }
}