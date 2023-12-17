const { SlashCommandBuilder,Events , ActivityType,ModalBuilder,TextInputStyle, EmbedBuilder , PermissionsBitField,ButtonStyle, TextInputBuilder, ActionRowBuilder,ButtonBuilder,MessageComponentCollector } = require("discord.js")
const { Database } = require("st.db")
const setting = new Database("/database/settingsdata/setting");
const usersdata = new Database(`/database/usersdata/usersdata`);
const prices = new Database("/database/settingsdata/prices");
const {mainguild} = require('../../config.json')
;module.exports = {
  name: Events.InteractionCreate,
  /**
   * @param {Interaction} interaction
  */
  async execute(interaction){
    if (interaction.isStringSelectMenu()) {
        if(interaction.customId == 'select_bot') {
          let selected = interaction.values[0]
          if(selected == "Bot_Maker_Subscribe") {
            const invitebot = new ButtonBuilder()
            .setLabel('السيرفر الرسمي')
            .setURL(`https://discord.gg/2AQNC5UqDn`)
            .setStyle(ButtonStyle.Link);
            const row2 = new ActionRowBuilder().addComponents(invitebot);
            let price1 = setting.get(`balance_price_${interaction.guild.id}`) ?? 1000;
           let recipient = setting.get(`recipient_${interaction.guild.id}`)
           let transferroom = setting.get(`transfer_room_${interaction.guild.id}`)
           let logroom =  setting.get(`log_room_${interaction.guild.id}`)
           let probot = setting.get(`probot_${interaction.guild.id}`)
           let clientrole = setting.get(`client_role_${interaction.guild.id}`)
           if(interaction.guild.id != mainguild) return interaction.reply({ephemeral:true,content:`**توجه الى السيرفر الرسمي**` , components:[row2]})
           if(!price1 || !recipient || !transferroom || !logroom || !probot || !clientrole) return interaction.reply({content:`**لم يتم تحديد الاعدادات**` , ephemeral:true})
           let BotMakerPrice = prices.get(`bot_maker_price_${interaction.guild.id}`)
           if(!BotMakerPrice) {
            BotMakerPrice = 150;
          }
         let userbalance = parseInt(usersdata.get(`balance_${interaction.user.id}_${interaction.guild.id}`))
		if(!userbalance) {
await usersdata.set(`balance_${interaction.user.id}_${interaction.guild.id}` , 0)
}
userbalance = parseInt(usersdata.get(`balance_${interaction.user.id}_${interaction.guild.id}`))
       
        if(parseInt(userbalance) < parseInt(BotMakerPrice)) { 
           return interaction.reply({content:`**انت لا تمتلك الرصيد الكافي**` , ephemeral:true})
        }
           const modal = new ModalBuilder()
          .setCustomId('BuyMaker_Modal')
       .setTitle('Subscribe To Maker Bot');
          const Server_id = new TextInputBuilder()
          .setCustomId('Server_id')
          .setLabel("ايدي السيرفر")
            .setStyle(TextInputStyle.Short)
            .setMinLength(10)
            .setMaxLength(35)
          const firstActionRow = new ActionRowBuilder().addComponents(Server_id);
          modal.addComponents(firstActionRow)
          await interaction.showModal(modal)
          }
        }
    }
  }
}