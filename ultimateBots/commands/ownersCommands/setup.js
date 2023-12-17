const { SlashCommandBuilder, EmbedBuilder , PermissionsBitField, ActionRowBuilder,ButtonBuilder,MessageComponentCollector,ButtonStyle } = require("discord.js");
const { Database } = require("st.db")
const setting = new Database("/database/settingsdata/setting")
module.exports = {
    ownersOnly:true,
    data: new SlashCommandBuilder()
    .setName('setup')
    .setDescription('تسطيب النظام')
    .addUserOption(Option => Option
        .setName(`recipient`)
        .setDescription(`مستلم الارباح`)
        .setRequired(false))
        .addChannelOption(Option => Option
            .setName(`transferroom`)
            .setDescription(`روم تحويل من اجل شراء الرصيد`)
            .setRequired(false))
            .addChannelOption(Option => Option
                .setName(`logroom`)
                .setDescription(`روم لوج شراء البوتات`)
                .setRequired(false))
            .addChannelOption(Option => Option
                .setName(`panelroom`)
                .setDescription(`روم بانل شراء الرصيد`)
                .setRequired(false))
                .addChannelOption(Option => Option
                    .setName(`buybotroom`)
                    .setDescription(`روم بانل شراء البوتات`)
                    .setRequired(false))
                    .addChannelOption(Option => Option
                        .setName(`subscriberoom`)
                        .setDescription(`روم بانل شراءاشتراك ميكر`)
                        .setRequired(false))
                .addRoleOption(Option => Option
                    .setName(`clientrole`)
                    .setDescription(`رول العملاء`)
                    .setRequired(false))
                .addUserOption(Option => Option
                    .setName(`probot`)
                    .setDescription(`البروبوت`)
                    .setRequired(false))
        , // or false
async execute(interaction) {
    await interaction.deferReply({ephemeral:true})
   let recipient = interaction.options.getUser(`recipient`)
   let transferroom = interaction.options.getChannel(`transferroom`)
   let logroom = interaction.options.getChannel(`logroom`)
   let panelroom = interaction.options.getChannel(`panelroom`)
   let subscriberoom = interaction.options.getChannel(`subscriberoom`)
   let buybotroom = interaction.options.getChannel(`buybotroom`)
   let clientrole = interaction.options.getRole(`clientrole`)
   let probot = interaction.options.getUser(`probot`)
   if(recipient) {
   await setting.set(`recipient_${interaction.guild.id}` , recipient.id)
   }
   if(transferroom) {
    await setting.set(`transfer_room_${interaction.guild.id}` , transferroom.id)
   }
   if(logroom) {
    await setting.set(`log_room_${interaction.guild.id}` , logroom.id)
   }
   if(clientrole) {
    await setting.set(`client_role_${interaction.guild.id}` , clientrole.id)
   }
   if(probot) {
    await setting.set(`probot_${interaction.guild.id}` , probot.id)
}
if(panelroom) {
    await setting.set(`panel_room_${interaction.guild.id}` , panelroom.id)
   }
if(buybotroom) {
    await setting.set(`buy_bot_room${interaction.guild.id}` , buybotroom.id)
   }
   if(subscriberoom) {
      await setting.set(`subscribe_room_${interaction.guild.id}` , subscriberoom.id)
   }
   
   if(!recipient && !subscriberoom && !transferroom && !logroom && !clientrole && !probot && !panelroom && !buybotroom) return interaction.editReply({content:`**الرجاء تحديد اعداد واحد على الاقل**`})
   return interaction.editReply({content:`**تم تحديد الاعدادات بنجاح**`})
}
}