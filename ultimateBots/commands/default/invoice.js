const { SlashCommandBuilder, EmbedBuilder , PermissionsBitField, ActionRowBuilder,ButtonBuilder,MessageComponentCollector,ButtonStyle, Embed } = require("discord.js");const { Database } = require("st.db")
const db = new Database("/database/settings")
const tokens = new Database("/database/tokens")
const invoices = new Database("/database/settingsdata/invoices");

module.exports = {
    data: new SlashCommandBuilder()
    .setName('invoice')
    .setDescription('الاستعلام عن فاتورة')
    .addStringOption(Option => Option
        .setName(`theinvoice`)
        .setDescription(`الفاتورة`)
        .setRequired(true))
    ,
    async execute(interaction) {
            const invoice = interaction.options.getString(`theinvoice`)
            const theinv = invoices.get(`${invoice}_${interaction.guild.id}`)
            if(!theinv) return interaction.reply({content:`**هذه الفاتورة غير متوفرة**`})
            const embed = new EmbedBuilder()
        .setTitle(`**معلومات الفاتورة**`)
        .setFooter({text:interaction.user.username , iconURL:interaction.user.displayAvatarURL({dynamic:true})})
        .setAuthor({name:interaction.guild.name , iconURL:interaction.guild.iconURL({dynamic:true})})
        .setTimestamp(Date.now())
        .setColor('#000000')
        .addFields(
            {
                name:`**المشتري**`,value:`**<@${theinv.userid}>**`,inline:false
            },
            {
                name:`**السيرفر**`,value:`**\`\`\`${interaction.guild.name}\`\`\`**`,inline:false
            },
            {
                name:`**البوت**`,value:`**\`\`\`${theinv.type}\`\`\`**`,inline:false
            },
            {
                name:`**التوكن**`,value:`**\`\`\`${theinv.token}\`\`\`**`,inline:false
            },
            {
                name:`**البريفكس**`,value:`**\`\`\`${theinv.prefix}\`\`\`**`,inline:false
            },
            {
                name:`**ايدي السيرفر**`,value:`**\`\`\`${theinv.serverid}\`\`\`**`,inline:false
            },
            {
                name:`**السعر**`,value:`**\`\`\`${theinv.price}\`\`\`**`,inline:false
            }
        )
        return interaction.reply({embeds:[embed]})
    }
}