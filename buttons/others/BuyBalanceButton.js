const { SlashCommandBuilder,TextInputStyle,TextInputBuilder,ModalBuilder,Events, EmbedBuilder , PermissionsBitField, ActionRowBuilder,ButtonBuilder,MessageComponentCollector,ButtonStyle } = require("discord.js");
const { Database } = require("st.db");
const setting = new Database("/database/settingsdata/setting")
module.exports = {
  name: Events.InteractionCreate,
    /**
    * @param {Interaction} interaction
  */
  async execute(interaction){
    if(interaction.isButton()) {
        if(interaction.customId == "BuyBalanceButton") {
            let price1 = setting.get(`balance_price_${interaction.guild.id}`) ?? 1000;
            let recipient = setting.get(`recipient_${interaction.guild.id}`)
            let transferroom = setting.get(`transfer_room_${interaction.guild.id}`)
            let logroom =  setting.get(`log_room_${interaction.guild.id}`)
            let probot = setting.get(`probot_${interaction.guild.id}`)
            let clientrole = setting.get(`client_role_${interaction.guild.id}`)
            if(!price1 || !recipient || !transferroom || !logroom || !probot || !clientrole) return interaction.reply({content:`**لم يتم تحديد الاعدادات**` , ephemeral:true})
            const modal = new ModalBuilder()
            .setCustomId('BuyBalanceModal')
			.setTitle('Buy Balance');
            const quantity = new TextInputBuilder()
            .setCustomId('balance_quantity')
            .setLabel("الكمية")
            .setStyle(TextInputStyle.Short);
            const firstActionRow = new ActionRowBuilder().addComponents(quantity);
            modal.addComponents(firstActionRow)
            await interaction.showModal(modal)
        }
    }
}
};