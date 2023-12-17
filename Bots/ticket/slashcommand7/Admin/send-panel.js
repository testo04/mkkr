const { SlashCommandBuilder, EmbedBuilder , PermissionsBitField, ActionRowBuilder,ButtonBuilder,MessageComponentCollector,ButtonStyle } = require("discord.js");
const { Database } = require("st.db")
const settings = require("../../../../database/settings")
const managers = require("../../../../database/managers")
module.exports = {
    ownersOnly:true,
    data: new SlashCommandBuilder()
    .setName('send-panel')
    .setDescription('ارسال بانل التكت'), // or false
async execute(interaction) {
    let reply = await interaction.deferReply({ephemeral:true})
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
    if(!guilddata || !panelsRoom || !panel1Category || !panel1Role || !panel1Welcome || !panel1Name || !panel2Category || !panel2Role || !panel1Role || !panel2Welcome || !panel2Name) return interaction.editReply({content:`**لم يتم تحديد الاعدادات**`})
    let panelroom = await interaction.guild.channels.cache.find(i => i.id == panelsRoom)
    if (!panelroom) return interaction.editReply({content:`**لا استطيع العثور على روم البانل**`})
    const panel1button = new ButtonBuilder()
    .setCustomId(`panel_1_button`)
    .setLabel(`${panel1Name}`)
    .setStyle(ButtonStyle.Secondary)
    const panel2button = new ButtonBuilder()
    .setCustomId(`panel_2_button`)
    .setLabel(`${panel2Name}`)
    .setStyle(ButtonStyle.Secondary)
    const panel3button = new ButtonBuilder()
    .setCustomId(`panel_3_button`)
    .setLabel(`${panel3Name}`)
    .setStyle(ButtonStyle.Secondary)
    const panel4button = new ButtonBuilder()
    .setCustomId(`panel_4_button`)
    .setLabel(`${panel4Name}`)
    .setStyle(ButtonStyle.Secondary)
    const row = new ActionRowBuilder()
    .addComponents(panel1button , panel2button , panel3button , panel4button);
    await panelroom.send({components:[row]})
    return interaction.editReply({content:`**تم ارسال البانل بنجاح**`}) 
}
}