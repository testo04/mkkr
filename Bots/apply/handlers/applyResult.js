const { SlashCommandBuilder,Events , ActivityType,ModalBuilder,TextInputStyle, EmbedBuilder , PermissionsBitField,ButtonStyle, TextInputBuilder, ActionRowBuilder,ButtonBuilder,MessageComponentCollector, Embed } = require("discord.js");
const { Database } = require("st.db")

const applyDB = new Database("/Json-db/Bots/applyDB.json")
const tokens = new Database("/tokens/tokens")
const tier1subscriptions = new Database("/database/makers/tier1/subscriptions")

module.exports = (client13) => {
  client13.on(Events.InteractionCreate , async(interaction) =>{
    if(interaction.isButton()) {
      if(interaction.customId == "apply_accept") {
          const settings =  applyDB.get(`apply_settings_${interaction.guild.id}`)
          let applyroom = settings.applyroom;
        let appliesroom = settings.appliesroom;
        let resultsroom = settings.resultsroom;
        let adminrole = settings.adminrole;
            if(!interaction.member.roles.cache.has(`${adminrole}`)) return interaction.reply({content:`**لا تمتلك الصلاحية لفعل هذا**` , ephemeral:true})
            const receivedEmbed = interaction.message.embeds[0];
            const exampleEmbed = EmbedBuilder.from(receivedEmbed)
            const user = exampleEmbed.data.title
            let user2 = interaction.guild.members.cache.find(us => us.id == user)
            const findApply = await applyDB.get(`apply_${interaction.guild.id}`)
            let roleid = parseInt(findApply.roleid);
            let therole = interaction.guild.roles.cache.find(ro => ro.id == roleid);
            await user2.roles.add(therole);
            let theresultsroom = interaction.guild.channels.cache.find(ch => ch.id == resultsroom);
            let embed = new EmbedBuilder()
            .setTimestamp()
            .setColor(`#008000`)
            .setTitle(`**تم قبول تقديم**`)
            .setDescription(`**صاحب التقديم : ${user2} \n الاداري : ${interaction.user}**`)
            theresultsroom.send({embeds:[embed]})
            const buttons = interaction.message.components[0].components;
            console.log(buttons)
            const accpet = new ButtonBuilder()
            .setCustomId(`apply_accept`)
            .setLabel(`Accept`)
            .setStyle(ButtonStyle.Success)
            .setDisabled(true)
            const reject = new ButtonBuilder()
            .setCustomId(`apply_reject`)
            .setLabel(`Reject`)
            .setStyle(ButtonStyle.Danger)
            .setDisabled(true)
            const row = new ActionRowBuilder()
            .addComponents(accpet , reject);
            interaction.reply({content:`**تم قبول التقديم بنجاح**`})
            interaction.message.edit({components:[row]})
        }
        if(interaction.customId == "apply_reject") {
          const settings =  applyDB.get(`apply_settings_${interaction.guild.id}`)
          let applyroom = settings.applyroom;
        let appliesroom = settings.appliesroom;
        let resultsroom = settings.resultsroom;
        let adminrole = settings.adminrole;
          const receivedEmbed = interaction.message.embeds[0];
          const exampleEmbed = EmbedBuilder.from(receivedEmbed)
          const user = exampleEmbed.data.title
            let user2 = interaction.guild.members.cache.find(us => us.id == user)
            let theresultsroom = interaction.guild.channels.cache.find(ch => ch.id == resultsroom);
            let embed = new EmbedBuilder()
            .setTimestamp()
            .setColor(`#FF0000`)
            .setTitle(`**تم رفض تقديم**`)
            .setDescription(`**صاحب التقديم : ${user2} \n الاداري : ${interaction.user}**`)
            theresultsroom.send({embeds:[embed]})
            const buttons = interaction.message.components[0].components;
            const accpet = new ButtonBuilder()
            .setCustomId(`apply_accept`)
            .setLabel(`Accept`)
            .setStyle(ButtonStyle.Success)
            .setDisabled(true)
            const reject = new ButtonBuilder()
            .setCustomId(`apply_reject`)
            .setLabel(`Reject`)
            .setStyle(ButtonStyle.Danger)
            .setDisabled(true)
            const row = new ActionRowBuilder()
            .addComponents(accpet , reject);
            interaction.reply({content:`**تم رفض التقديم بنجاح**`})
            interaction.message.edit({components:[row]})
        }
    }
})
};  