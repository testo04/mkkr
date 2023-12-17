const { SlashCommandBuilder,Events , ActivityType,ModalBuilder,TextInputStyle, EmbedBuilder , PermissionsBitField,ButtonStyle, TextInputBuilder, ActionRowBuilder,ButtonBuilder,MessageComponentCollector, Embed } = require("discord.js");
const { Database } = require("st.db")

const applyDB = new Database("/Json-db/Bots/applyDB.json")
const tokens = new Database("/tokens/tokens")
const tier1subscriptions = new Database("/database/makers/tier1/subscriptions")
module.exports = (client13) => {
    client13.on(Events.InteractionCreate , async(interaction) =>{
    if(interaction.isModalSubmit()) {
        const settings =  applyDB.get(`apply_settings_${interaction.guild.id}`)
        let appliesroom = settings.appliesroom
        let ask_1 = interaction.fields.getTextInputValue(`ask_1`)
        let ask_2 = interaction.fields.getTextInputValue(`ask_2`)
        let ask_3 = interaction.fields.getTextInputValue(`ask_3`)
        let ask_4 = interaction.fields.getTextInputValue(`ask_4`)
        let ask_5 = interaction.fields.getTextInputValue(`ask_5`)
        let appliesroomsend = interaction.guild.channels.cache.find(ch => ch.id == appliesroom)
        let embedsend = new EmbedBuilder()
        .setTitle(`${interaction.user.id}`)
        .addFields(
            {
                name:`**صاحب التقديم : **` , value:`**${interaction.user}**`,inline:false
            },
            {
                name:`**ايدي صاحب التقديم :**`,value:`${interaction.user.id}`,inline:false
            },
            {
                name:`**السوال الاول : **`,value:`\`\`\`${ask_1}\`\`\``,inline:false
            },
            {
                name:`**السوال الثاني : **`,value:`\`\`\`${ask_2}\`\`\``,inline:false
            },
            {
                name:`**السوال الثالث : **`,value:`\`\`\`${ask_3}\`\`\``,inline:false
            },
            {
                name:`**السوال الرابع : **`,value:`\`\`\`${ask_4}\`\`\``,inline:false
            },
            {
                name:`**السوال الخامس : **`,value:`\`\`\`${ask_5}\`\`\``,inline:false
            }
        )
        .setTimestamp(Date.now())
        .setAuthor({name:interaction.user.username, iconURL:interaction.user.displayAvatarURL({dynamic:true})})
        const accpet = new ButtonBuilder()
        .setCustomId(`apply_accept`)
        .setLabel(`Accept`)
        .setStyle(ButtonStyle.Success)
        const reject = new ButtonBuilder()
        .setCustomId(`apply_reject`)
        .setLabel(`Reject`)
        .setStyle(ButtonStyle.Danger)
        const row = new ActionRowBuilder()
        .addComponents(accpet , reject);
        await interaction.reply({content:`**تم ارسال تقديمك بنجاح**` , ephemeral:true})
        return appliesroomsend.send({embeds:[embedsend] , components:[row]});
    }
})
};