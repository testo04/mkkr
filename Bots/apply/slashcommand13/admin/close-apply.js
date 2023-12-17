const { SlashCommandBuilder, EmbedBuilder , PermissionsBitField, ActionRowBuilder,ButtonBuilder,MessageComponentCollector,ButtonStyle } = require("discord.js");
const { Database } = require("st.db")
const applyDB = new Database("/Json-db/Bots/applyDB.json")
const tokens = new Database("/tokens/tokens")
const tier1subscriptions = new Database("/database/makers/tier1/subscriptions")
module.exports ={
    ownersOnly:true,
    data: new SlashCommandBuilder()
    .setName('close-apply')
    .setDescription('انهاء التقديم المفتوح')
    ,
    async execute(interaction, client) {
        const sent = await interaction.deferReply({ fetchReply: true , ephemeral:false});
        let embed1 = new EmbedBuilder()
        .setFooter({text:interaction.user.username , iconURL:interaction.user.displayAvatarURL({dynamic:true})})
        .setAuthor({name:interaction.guild.name , iconURL:interaction.guild.iconURL({dynamic:true})})
        .setTimestamp(Date.now())
        .setColor('#000000')
        let apply = await applyDB.get(`apply_${interaction.guild.id}`)
        if(!apply) {
            embed1.setTitle(`** لا يوجد تقديم مفتوح حاليا**`)
            return interaction.editReply({embeds:[embed1]})
        }
        await applyDB.delete(`apply_${interaction.guild.id}`)
        embed1.setTitle(`**تم انهاء التقديم بنجاح**`)
        return interaction.editReply({embeds:[embed1]})
    }
}