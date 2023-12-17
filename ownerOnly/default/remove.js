const { SlashCommandBuilder, EmbedBuilder , PermissionsBitField, ActionRowBuilder,ButtonBuilder,MessageComponentCollector,ButtonStyle } = require("discord.js");
const { Database } = require("st.db");

const usersdata = new Database(`/database/usersdata/usersdata`)
module.exports ={
    ownersOnly:true,
    data: new SlashCommandBuilder()
    .setName('remove')
    .setDescription('حذف رصيد من شخص')
    .addUserOption(Option => Option
        .setName(`user`)
        .setDescription(`الشخص المراد حذف منه الرصيد الرصيد`)
        .setRequired(true))
        .addIntegerOption(Option => Option
            .setName(`quantity`)
            .setDescription(`الكمية`)
            .setRequired(true)),
    async execute(interaction, client) {
        await interaction.deferReply({ephemeral:false})
        let balanceembed = new EmbedBuilder()
        .setColor(`Gold`)
        .setTimestamp()
        let user = interaction.options.getUser(`user`)
        let quantity = interaction.options.getInteger(`quantity`)
        let userbalance = usersdata.get(`balance_${user.id}_${interaction.guild.id}`);
        if(!userbalance) {
            await usersdata.set(`balance_${user.id}_${interaction.guild.id}` , 0)
            balanceembed.setDescription(`**هذا الشخص رصيده اقل من الرصيد المراد ازالته**`)
        }else if(parseInt(userbalance) < parseInt(quantity)){
            balanceembed.setDescription(`**هذا الشخص رصيده اقل من الرصيد المراد ازالته**`)
        }else {
            let newuserbalance = parseInt(userbalance) - parseInt(quantity)
            await usersdata.set(`balance_${user.id}_${interaction.guild.id}` , newuserbalance)
            userbalance = usersdata.get(`balance_${user.id}_${interaction.guild.id}`)
            balanceembed.setDescription(`**تم خصم من ${user} الرصيد بنجاح\nرصيده الحالي هو : \`${userbalance}\`**`)
        }
        return interaction.editReply({embeds:[balanceembed]})
 
    }
}