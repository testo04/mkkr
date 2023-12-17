const { SlashCommandBuilder,Events , ActivityType,ModalBuilder,TextInputStyle, EmbedBuilder , PermissionsBitField,ButtonStyle, TextInputBuilder, ActionRowBuilder,ButtonBuilder,MessageComponentCollector, Embed } = require("discord.js");
const { Database } = require("st.db")

const applyDB = new Database("/Json-db/Bots/applyDB.json")
const tokens = new Database("/tokens/tokens")
const tier1subscriptions = new Database("/database/makers/tier1/subscriptions")
module.exports = (client13) => {
    client13.on(Events.InteractionCreate , async(interaction) =>{
    if(interaction.isButton()) {
        if(interaction.customId == "apply_button") {
            const settings =  applyDB.get(`apply_settings_${interaction.guild.id}`)
            if(!settings) return interaction.reply({content:`**لم يتم تحديد الاعدادات**` , ephemeral:true})
            const findApply = await applyDB.get(`apply_${interaction.guild.id}`)
        if(!findApply) return interaction.reply({content:`**لا يوجد تقديم مفتوح في الوقت الحالي**` , ephemeral:true})
        const {ask1,ask2,ask3,ask4,ask5} = findApply;
        const modal = new ModalBuilder()
        .setCustomId('modal_apply')
  .setTitle(`التقديم على رتبة`);
          const ask_1 = new TextInputBuilder()
          .setCustomId('ask_1')
          .setLabel(`${ask1}`)
          .setStyle(TextInputStyle.Short);
          const ask_2 = new TextInputBuilder()
          .setCustomId('ask_2')
          .setLabel(`${ask2}`)
          .setStyle(TextInputStyle.Short);
          const ask_3 = new TextInputBuilder()
          .setCustomId('ask_3')
          .setLabel(`${ask3}`)
          .setStyle(TextInputStyle.Short);
          const ask_4 = new TextInputBuilder()
          .setCustomId('ask_4')
          .setLabel(`${ask4}`)
          .setStyle(TextInputStyle.Short);
          const ask_5 = new TextInputBuilder()
          .setCustomId('ask_5')
          .setLabel(`${ask5}`)
          .setStyle(TextInputStyle.Short);
          const ActionRow1 = new ActionRowBuilder()
          .addComponents(ask_1);
          const ActionRow2 = new ActionRowBuilder()
          .addComponents(ask_2);
          const ActionRow3 = new ActionRowBuilder()
          .addComponents(ask_3);
          const ActionRow4 = new ActionRowBuilder()
          .addComponents(ask_4);
          const ActionRow5 = new ActionRowBuilder()
          .addComponents(ask_5);
          modal.addComponents(ActionRow1,ActionRow2,ActionRow3,ActionRow4,ActionRow5)
          await interaction.showModal(modal)
        }
    }
    })
};