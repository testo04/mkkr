const { SlashCommandBuilder,Events , ActivityType,ModalBuilder,TextInputStyle, EmbedBuilder , PermissionsBitField,ButtonStyle, TextInputBuilder, ActionRowBuilder,ButtonBuilder,MessageComponentCollector, Embed } = require("discord.js");
const settings = require("../../../database/settings")
module.exports = (client7) => {
  client7.on(Events.InteractionCreate , async(interaction) =>{
    if(interaction.isButton()) {
      let guilddata = await settings.findOne({guildid:interaction.guild.id})
    let panelsRoom = guilddata.panelsRoom;
    let panel1Category = guilddata.panel1Category;
    let panel1Role = guilddata.panel1Role;
    let panel1Welcome = guilddata.panel1Welcome;
    let panel1Name = guilddata.panel1Name;
    let panel2Category = guilddata.panel2Category;
    let panel2Role = guilddata.panel2Role;
    let panel2Welcome = guilddata.panel2Welcome;
    let panel2Name = guilddata.panel2Name;
    let panel3Category = guilddata.panel3Category;
    let panel3Role = guilddata.panel3Role;
    let panel3Welcome = guilddata.panel3Welcome;
    let panel3Name = guilddata.panel3Name;
    let panel4Category = guilddata.panel4Category;
    let panel4Role = guilddata.panel4Role;
    let panel4Welcome = guilddata.panel4Welcome;
    let panel4Name = guilddata.panel4Name;

    let panel1Number = guilddata.panel1Number;
    let panel2Number = guilddata.panel2Number;
    let panel3Number = guilddata.panel3Number;
    let panel4Number = guilddata.panel4Number;
    if(!guilddata || !panelsRoom ||!panel3Category || !panel3Role || !panel3Welcome || !panel3Name || !panel4Category || !panel4Role || !panel4Welcome || !panel4Name || !panel1Category || !panel1Role || !panel1Welcome || !panel1Name || !panel2Category || !panel2Role || !panel1Role || !panel2Welcome || !panel2Name) return interaction.reply({content:`**لم يتم تسطيب الاعدادات**` , ephemeral:true});
    if(interaction.customId == "panel_1_button") {
          const modal = new ModalBuilder()
          .setCustomId('modal_1')
    .setTitle(`${panel1Name}`);
          const reason = new TextInputBuilder()
          .setCustomId('the_problem_1')
          .setLabel("ما هو سبب فتح التكت")
          .setStyle(TextInputStyle.Short);
          const firstActionRow = new ActionRowBuilder().addComponents(reason);
          modal.addComponents(firstActionRow)
          await interaction.showModal(modal)

        }
        if(interaction.customId == "panel_2_button"){
          const modal = new ModalBuilder()
          .setCustomId('modal_2')
    .setTitle(`${panel2Name}`);
          const reason = new TextInputBuilder()
          .setCustomId('the_problem_2')
          .setLabel("ما هو سبب فتح التكت")
          .setStyle(TextInputStyle.Short);
          const firstActionRow = new ActionRowBuilder().addComponents(reason);
          modal.addComponents(firstActionRow)
          await interaction.showModal(modal)
        }
        if(interaction.customId == "panel_3_button") {
          const modal = new ModalBuilder()
          .setCustomId('modal_3')
    .setTitle(`${panel1Name}`);
          const reason = new TextInputBuilder()
          .setCustomId('the_problem_3')
          .setLabel("ما هو سبب فتح التكت")
          .setStyle(TextInputStyle.Short);
          const firstActionRow = new ActionRowBuilder().addComponents(reason);
          modal.addComponents(firstActionRow)
          await interaction.showModal(modal)

        }
        if(interaction.customId == "panel_4_button") {
          const modal = new ModalBuilder()
          .setCustomId('modal_4')
    .setTitle(`${panel1Name}`);
          const reason = new TextInputBuilder()
          .setCustomId('the_problem_4')
          .setLabel("ما هو سبب فتح التكت")
          .setStyle(TextInputStyle.Short);
          const firstActionRow = new ActionRowBuilder().addComponents(reason);
          modal.addComponents(firstActionRow)
          await interaction.showModal(modal)

        }
    }
  
  })};