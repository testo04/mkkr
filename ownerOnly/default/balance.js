const { SlashCommandBuilder, EmbedBuilder , PermissionsBitField, ActionRowBuilder,ButtonBuilder,MessageComponentCollector,ButtonStyle } = require("discord.js");
const { Database } = require("st.db");

const usersdata = new Database(`/database/usersdata/usersdata`)
module.exports ={
    ownersOnly:false,
    data: new SlashCommandBuilder()
    .setName('balance')
    .setDescription('روئية رصيدك'),
    async execute(interaction, client) {
        await interaction.deferReply({ephemeral:false})
        let userbalance = usersdata.get(`balance_${interaction.user.id}_${interaction.guild.id}`) ?? 0;
        let balanceembed = new EmbedBuilder()
        .setTitle(`**رصيدك الحالي هو : \`${userbalance}\`**`)
        .setColor(`Gold`)
        .setTimestamp()
        return interaction.editReply({embeds:[balanceembed]})
 
    }
}