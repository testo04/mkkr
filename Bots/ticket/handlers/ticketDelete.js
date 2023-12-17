const { SlashCommandBuilder,Events , ActivityType,ModalBuilder,TextInputStyle, EmbedBuilder , PermissionsBitField,ButtonStyle, TextInputBuilder, ActionRowBuilder,ButtonBuilder,MessageComponentCollector, Embed } = require("discord.js");
const settings = require("../../../database/settings")
const managers = require("../../../database/managers")
const { Database } = require("st.db")
const ticketsManager = new Database("/Json-db/Bots/ticketDB.json")
const sourcebin = require('sourcebin_js');
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
      let transcripts = guilddata.transcripts
      let panel1Number = guilddata.panel1Number;
      let panel2Number = guilddata.panel2Number;
      let panel3Number = guilddata.panel3Number;
      let panel4Number = guilddata.panel4Number;
      if(!guilddata || !panelsRoom ||!panel3Category || !panel3Role || !panel3Welcome || !panel3Name || !panel4Category || !panel4Role || !panel4Welcome || !panel4Name || !panel1Category || !panel1Role || !panel1Welcome || !panel1Name || !panel2Category || !panel2Role || !panel1Role || !panel2Welcome || !panel2Name) return;
      if(interaction.customId == "delete_ticket") {
            let deleteembed = new EmbedBuilder()
            .setTitle(`**سيتم حذف التكت بعد 5 ثواني**`)
            await interaction.reply({embeds:[deleteembed]})
            if(transcripts) {
            interaction.channel.messages.fetch().then(async(messages) => {
             let output = Array.from(messages.values()).reverse();
              output = output.map((m) => `${new Date(m.createdTimestamp).toLocaleString('en-US')} - ${m.author.tag}: ${m.attachments.size > 0 ? m.attachments.first().proxyURL : m.content}`).join('\n');
              let response;
                response = await sourcebin.create([
                  {
                    name: ' ',
                    content: output,
                    languageId: 'text',
                  },
                ], {
                  title: `Chat transcript for ${interaction.channel.name}`,
                  description: ' ',
                });
                const embed = new EmbedBuilder()
                .setTitle(`**Transcripts For : ${interaction.channel.name}**`)
                .setURL(`${response.url}`)
                const thechannel = interaction.guild.channels.cache.find(ch => ch.id == transcripts)
                try {
                  thechannel.send({embeds:[embed]})
                } catch (error) {
                  setTimeout(() => {
                    return interaction.channel.delete();
                }, 5000);
                }
            })
            setTimeout(() => {
                return interaction.channel.delete();
            }, 5000);
        }
      }
    }
  }
  )}