const { SlashCommandBuilder, EmbedBuilder , PermissionsBitField, ActionRowBuilder,ButtonBuilder,MessageComponentCollector,ButtonStyle } = require("discord.js");
const settings = require("../../../../database/settings")
const managers = require("../../../../database/managers")

module.exports ={
    ownersOnly:true,
    data: new SlashCommandBuilder()
    .setName('top')
    .setDescription('رؤية نقاط جميع الاعضاء'),
    async execute(interaction, client) {
        const sent = await interaction.deferReply({ fetchReply: true , ephemeral:false});
        let embed1 = new EmbedBuilder()
        .setFooter({text:interaction.user.username , iconURL:interaction.user.displayAvatarURL({dynamic:true})})
        .setAuthor({name:interaction.guild.name , iconURL:interaction.guild.iconURL({dynamic:true})})
        .setTimestamp(Date.now())
        .setColor('#000000')
        let profiles = await managers.find({guildid:interaction.guild.id , points:{$gt:0}}).sort({points:-1}).limit(100);
        profiles.forEach(async(profile) =>{
            embed1.addFields({name:` ` , value:`- **<@${profile.id}> - \`${profile.points}\`**`,inline:false})
        })
        return interaction.editReply({embeds:[embed1]})
    }
}