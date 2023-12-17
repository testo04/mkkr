const { SlashCommandBuilder, EmbedBuilder , PermissionsBitField, ActionRowBuilder,ButtonBuilder,MessageComponentCollector,ButtonStyle } = require("discord.js");
const settings = require("../../../../database/settings")
const managers = require("../../../../database/managers")
module.exports ={
    data: new SlashCommandBuilder()
    .setName('points')
    .setDescription('الاستعلام عن نقاطك او نقاط شخص محدد')
    .addUserOption(Option => Option
        .setName(`user`)
        .setDescription(`الشخص`)
        .setRequired(false)),
    async execute(interaction, client) {
        const sent = await interaction.deferReply({ fetchReply: true , ephemeral:false});
        let embed1 = new EmbedBuilder()
        .setFooter({text:interaction.user.username , iconURL:interaction.user.displayAvatarURL({dynamic:true})})
        .setAuthor({name:interaction.guild.name , iconURL:interaction.guild.iconURL({dynamic:true})})
        .setTimestamp(Date.now())
        .setColor('#000000')
        let user = interaction.options.getUser(`user`)
        if(!user) {
            let userprofile = await managers.findOne({guildid:interaction.guild.id , id:interaction.user.id})
            if(!userprofile) {
                new managers({
                    guildid:interaction.guild.id,
                    id:interaction.user.id
                }).save()
                embed1.setTitle(`**نقاطك هي : \`0\`**`)
                return interaction.editReply({embeds:[embed1]})
            }
            let userpoints = userprofile.points;
            embed1.setTitle(`**نقاطك هي : \`${userpoints}\`**`)
            return interaction.editReply({embeds:[embed1]})
        }else {
            let userprofile = await managers.findOne({guildid:interaction.guild.id , id:user.id})
            if(!userprofile) {
                new managers({
                    guildid:interaction.guild.id,
                    id:user.id,
                }).save()
                embed1.setDescription(`**نقاط ${user} : هي : \`0\`**`)
                return interaction.editReply({embeds:[embed1]})
            }
            let userpoints = userprofile.points;
            embed1.setTitle(`**نقاط ${user} هي : \`${userpoints}\`**`)
            return interaction.editReply({embeds:[embed1]})
        }
    }
}