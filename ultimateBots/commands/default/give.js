const { SlashCommandBuilder, EmbedBuilder , PermissionsBitField, ActionRowBuilder,ButtonBuilder,MessageComponentCollector,ButtonStyle } = require("discord.js");
const { Database } = require("st.db");

const usersdata = new Database(`/database/usersdata/usersdata`)
module.exports ={
    ownersOnly:true,
    data: new SlashCommandBuilder()
    .setName('give')
    .setDescription('اعطاء لشخص رصيد')
    .addUserOption(Option => Option
        .setName(`user`)
        .setDescription(`الشخص المراد اعطائه الرصيد`)
        .setRequired(true))
        .addIntegerOption(Option => Option
            .setName(`quantity`)
            .setDescription(`الكمية`)
            .setRequired(true)),
    async execute(interaction, client) {
        await interaction.deferReply({ephemeral:false})
        let user = interaction.options.getUser(`user`)
        let quantity = interaction.options.getInteger(`quantity`)
        let userbalance = usersdata.get(`balance_${user.id}_${interaction.guild.id}`);
        if(!userbalance) {
           await usersdata.set(`balance_${user.id}_${interaction.guild.id}` , quantity)
        }else {
            let newuserbalance = parseInt(userbalance) + parseInt(quantity)
            await usersdata.set(`balance_${user.id}_${interaction.guild.id}` , newuserbalance)
        }
        userbalance = usersdata.get(`balance_${user.id}_${interaction.guild.id}`)
        let balanceembed = new EmbedBuilder()
        .setDescription(`**تم اعطاء ${user} الرصيد بنجاح\nرصيده الحالي هو : \`${userbalance}\`**`)
        .setColor(`Gold`)
        .setTimestamp()
        return interaction.editReply({embeds:[balanceembed]})
 
    }
}