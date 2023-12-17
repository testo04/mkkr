const { SlashCommandBuilder, EmbedBuilder , PermissionsBitField, ActionRowBuilder,ButtonBuilder,MessageComponentCollector,ButtonStyle } = require("discord.js");
const settings = require("../../../../database/settings")
const managers = require("../../../../database/managers")


module.exports ={
    ownersOnly:true,
    data: new SlashCommandBuilder()
    .setName('reset')
    .setDescription('تصفير نقاط شخص')
    .addUserOption(Option => Option
        .setName(`user`)
        .setDescription(`الشخص`)
        .setRequired(true)),
    async execute(interaction, client) {
        const sent = await interaction.deferReply({ fetchReply: true , ephemeral:false});
        let embed1 = new EmbedBuilder()
        .setFooter({text:interaction.user.username , iconURL:interaction.user.displayAvatarURL({dynamic:true})})
        .setAuthor({name:interaction.guild.name , iconURL:interaction.guild.iconURL({dynamic:true})})
        .setTimestamp(Date.now())
        .setColor('#000000')
        let user = interaction.options.getUser(`user`)
        let userprofile = await managers.findOne({guildid:interaction.guild.id , id:user.id})
        if(!userprofile) {
            new managers({
                guildid:interaction.guild.id,
                id:user.id,
                points:0,
            }).save();
            embed1.setDescription(`**تم تصفير نقاط ${user} بنجاح**`)
            return interaction.editReply({embeds:[embed1]})
        }
        userprofile.points = 0;
        userprofile.save();
        embed1.setDescription(`**تم تصفير نقاط ${user} بنجاح**`)
            return interaction.editReply({embeds:[embed1]})
    }
}