const { SlashCommandBuilder,Events , ActivityType,ModalBuilder,TextInputStyle, EmbedBuilder , PermissionsBitField,ButtonStyle, TextInputBuilder, ActionRowBuilder,ButtonBuilder,MessageComponentCollector } = require("discord.js")
const { Database } = require("st.db")
const setting = new Database("/database/settingsdata/setting");
const usersdata = new Database(`/database/usersdata/usersdata`);
const prices = new Database("/database/settingsdata/prices");
;module.exports = {
  name: Events.InteractionCreate,
  /**
   * @param {Interaction} interaction
  */
  async execute(interaction){
    if (interaction.isStringSelectMenu()) {
        if(interaction.customId == 'select_bot') {
          let selected = interaction.values[0]
          if(selected == "BuyFeedback") {
            let price1 = setting.get(`balance_price_${interaction.guild.id}`) ?? 1000;
           let recipient = setting.get(`recipient_${interaction.guild.id}`)
           let transferroom = setting.get(`transfer_room_${interaction.guild.id}`)
           let logroom =  setting.get(`log_room_${interaction.guild.id}`)
           let probot = setting.get(`probot_${interaction.guild.id}`)
           let clientrole = setting.get(`client_role_${interaction.guild.id}`)
           if(!price1 || !recipient || !transferroom || !logroom || !probot || !clientrole) return interaction.reply({content:`**لم يتم تحديد الاعدادات**` , ephemeral:true})
          let BroadcastPrice = parseInt(prices.get(`feedback_price_${interaction.guild.id}`))
          if(!BroadcastPrice) BroadcastPrice = 15;
        let userbalance = parseInt(usersdata.get(`balance_${interaction.user.id}_${interaction.guild.id}`))
		if(!userbalance) {
await usersdata.set(`balance_${interaction.user.id}_${interaction.guild.id}` , 0)
}
userbalance = parseInt(usersdata.get(`balance_${interaction.user.id}_${interaction.guild.id}`))
        if(userbalance < BroadcastPrice) return interaction.reply({content:`**انت لا تمتلك الرصيد الكافي**` , ephemeral:true})
           const modal = new ModalBuilder()
          .setCustomId('BuyFeedback_Modal')
       .setTitle('Make Feedback Bot');
          const Bot_token = new TextInputBuilder()
          .setCustomId('Bot_token')
          .setLabel("توكن البوت")
            .setStyle(TextInputStyle.Short)
            .setMinLength(40)
            .setMaxLength(90)
          const Bot_prefix = new TextInputBuilder()
          .setCustomId('Bot_prefix')
          .setLabel("البريفكس")
            .setStyle(TextInputStyle.Short)
            .setMinLength(1)
            .setMaxLength(3)
          const firstActionRow = new ActionRowBuilder().addComponents(Bot_token);
          const firstActionRow2 = new ActionRowBuilder().addComponents(Bot_prefix);
          modal.addComponents(firstActionRow,firstActionRow2)
          await interaction.showModal(modal)
          }
        }
    }
  }
}