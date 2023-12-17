const { SlashCommandBuilder, EmbedBuilder , PermissionsBitField, ActionRowBuilder,ButtonBuilder,MessageComponentCollector,ButtonStyle } = require("discord.js");
const { Database } = require("st.db")
const applyDB = new Database("/Json-db/Bots/applyDB.json")
const tokens = new Database("/tokens/tokens")
const tier1subscriptions = new Database("/database/makers/tier1/subscriptions")

module.exports ={
    ownersOnly:true,
    data: new SlashCommandBuilder()
    .setName('setup-apply')
    .setDescription('تسطيب نظام التقديم')
    .addChannelOption(Option => Option
        .setName(`applyroom`)
        .setDescription(`روم التقديم`)
        .setRequired(true))
        .addChannelOption(Option => Option
            .setName(`appliesroom`)
            .setDescription(`روم وصول التقديمات`)
            .setRequired(true))
            .addChannelOption(Option => Option
                .setName(`resultsroom`)
                .setDescription(`روم النتائج`)
                .setRequired(true))
                .addRoleOption(Option => Option
                    .setName(`adminrole`)
                    .setDescription(`رتبة الادارة`)
                    .setRequired(true)),
    async execute(interaction, client) {
        const sent = await interaction.deferReply({ fetchReply: true , ephemeral:false});
        let embed1 = new EmbedBuilder()
        .setFooter({text:interaction.user.username , iconURL:interaction.user.displayAvatarURL({dynamic:true})})
        .setAuthor({name:interaction.guild.name , iconURL:interaction.guild.iconURL({dynamic:true})})
        .setTimestamp(Date.now())
        .setColor('#000000')
        let applyroom = interaction.options.getChannel(`applyroom`)
        let appliesroom = interaction.options.getChannel(`appliesroom`)
        let resultsroom = interaction.options.getChannel(`resultsroom`)
        let adminrole = interaction.options.getRole(`adminrole`)
            await applyDB.set(`apply_settings_${interaction.guild.id}` , {
                applyroom:applyroom.id,
                appliesroom:appliesroom.id,
                resultsroom:resultsroom.id,
                adminrole:adminrole.id,})
            embed1.setTitle(`**تم تحديد نظام التقديمات بنجاح**`)
            let theapplyroom = interaction.guild.channels.cache.find(ch => ch.id == applyroom.id)
            const applybutton = new ButtonBuilder()
    .setCustomId(`apply_button`)
    .setLabel(`التقديم`)
    .setStyle(ButtonStyle.Secondary)
    const row = new ActionRowBuilder()
    .addComponents(applybutton);
    await theapplyroom.send({components:[row]})
    return interaction.editReply({embeds:[embed1]})
    }
}