const { SlashCommandBuilder, EmbedBuilder , PermissionsBitField } = require("discord.js");
const { Database } = require("st.db")
const { ChannelType } = require("discord-api-types/v9");
const settings = require("../../../../database/settings")
const managers = require("../../../../database/managers")
module.exports = {
    ownersOnly:true,
    data: new SlashCommandBuilder()
    .setName('setup')
    .setDescription('تسطيب نظام التكت')
    .addChannelOption(Option => 
        Option
        .setName('panelsroom')
        .setDescription('روم ارسال رسالة البانل')
        .setRequired(false))
    .addChannelOption(Option => 
        Option
        .setName('transcripts')
        .setDescription('روم ارسال رسالة اللوج')
        .setRequired(false))
    .addChannelOption(Option => 
        Option
        .setName('panel1cat')
        .setDescription('كاتيجوري البانل الاول')
        .addChannelTypes(ChannelType.GuildCategory)
        .setRequired(false))
        .addRoleOption(Option => 
            Option
            .setName('panel1role')
            .setDescription('رتبة دعم البانل الاول')
            .setRequired(false))
        .addStringOption(Option => 
            Option
            .setName('panel1welcome')
            .setDescription('رسالة البانل الاول')
            .setRequired(false))
            .addStringOption(Option => 
                Option
                .setName('panel1name')
                .setDescription('اسم البانل الاول')
                .setRequired(false))
                
                .addChannelOption(Option => 
                    Option
                    .setName('panel2cat')
                    .setDescription('كاتيجوري البانل الثاني')
                    .addChannelTypes(ChannelType.GuildCategory)
                    .setRequired(false))
                    .addRoleOption(Option => 
                        Option
                        .setName('panel2role')
                        .setDescription('رتبة دعم البانل الثاني')
                        .setRequired(false))
                    .addStringOption(Option => 
                        Option
                        .setName('panel2welcome')
                        .setDescription('رسالة البانل الثاني')
                        .setRequired(false))
                        .addStringOption(Option => 
                            Option
                            .setName('panel2name')
                            .setDescription('اسم البانل الثاني')
                            .setRequired(false))
                           .addChannelOption(Option => 
    Option
    .setName('panel3cat')
    .setDescription('كاتيجوري البانل الثالث')
    .addChannelTypes(ChannelType.GuildCategory)
    .setRequired(false))
    .addRoleOption(Option => 
        Option
        .setName('panel3role')
        .setDescription('رتبة دعم البانل الثالث')
        .setRequired(false))
    .addStringOption(Option => 
        Option
        .setName('panel3welcome')
        .setDescription('رسالة البانل الثالث')
        .setRequired(false))
        .addStringOption(Option => 
            Option
            .setName('panel3name')
            .setDescription('اسم البانل الثالث')
            .setRequired(false))
            
            .addChannelOption(Option => 
                Option
                .setName('panel4cat')
                .setDescription('كاتيجوري البانل الرابع')
                .addChannelTypes(ChannelType.GuildCategory)
                .setRequired(false))
                .addRoleOption(Option => 
                    Option
                    .setName('panel4role')
                    .setDescription('رتبة دعم البانل الرابع')
                    .setRequired(false))
                .addStringOption(Option => 
                    Option
                    .setName('panel4welcome')
                    .setDescription('رسالة البانل الرابع')
                    .setRequired(false))
                    .addStringOption(Option => 
                        Option
                        .setName('panel4name')
                        .setDescription('اسم البانل الرابع')
                        .setRequired(false))
                           
                            , 
async execute(interaction) {
    let reply = await interaction.deferReply({ephemeral:false})

    let panelsroom = interaction.options.getChannel(`panelsroom`)
    let transcripts = interaction.options.getChannel(`transcripts`)

    let panel1cat = interaction.options.getChannel(`panel1cat`)
    let panel2cat = interaction.options.getChannel(`panel2cat`)
    let panel3cat = interaction.options.getChannel(`panel3cat`)
    let panel4cat = interaction.options.getChannel(`panel4cat`)

    let panel1welcome = interaction.options.getString(`panel1welcome`)
    let panel1name = interaction.options.getString(`panel1name`)
    let panel2welcome = interaction.options.getString(`panel2welcome`)
    let panel2name = interaction.options.getString(`panel2name`)
    let panel3welcome = interaction.options.getString(`panel3welcome`)
    let panel3name = interaction.options.getString(`panel3name`)
    let panel4welcome = interaction.options.getString(`panel4welcome`)
    let panel4name = interaction.options.getString(`panel4name`)

    let panel1role = interaction.options.getRole(`panel1role`)
    let panel2role = interaction.options.getRole(`panel2role`)
    let panel3role = interaction.options.getRole(`panel3role`)
    let panel4role = interaction.options.getRole(`panel4role`)

    let settingss = await settings.findOne({guildid:interaction.guild.id})
    if(!settingss) {
        await new settings({
            guildid:interaction.guild.id
        }).save();
        settingss = await settings.findOne({guildid:interaction.guild.id})
    }
    if(panelsroom) {
        settingss.panelsRoom = panelsroom.id
    }
    if(transcripts) {
        settingss.transcripts = transcripts.id
    }
    if(panel1cat) {
        settingss.panel1Category = panel1cat.id
    }
    if(panel2cat) {
        settingss.panel2Category = panel2cat.id
    }
    if(panel3cat) {
        settingss.panel3Category = panel3cat.id
    }
    if(panel4cat) {
        settingss.panel4Category = panel4cat.id
    }
    if(panel1welcome) {
        settingss.panel1Welcome = panel1welcome
    }
    if(panel2welcome) {
        settingss.panel2Welcome = panel2welcome
    }
    if(panel3welcome) {
        settingss.panel3Welcome = panel3welcome
    }
    if(panel4welcome) {
        settingss.panel4Welcome = panel4welcome
    }

    if(panel1name) {
        settingss.panel1Name = panel1name
    }
    if(panel2name) {
        settingss.panel2Name = panel2name
    }
    if(panel3name) {
        settingss.panel3Name = panel3name
    }
    if(panel4name) {
        settingss.panel4Name = panel4name
    }
    if(panel1role) {
        settingss.panel1Role = panel1role.id
    }
    if(panel2role) {
        settingss.panel2Role = panel2role.id
    }
    if(panel3role) {
        settingss.panel3Role = panel3role.id
    }
    if(panel4role) {
        settingss.panel4Role = panel4role.id
    }
    settingss.save();
    return interaction.editReply({content:`**تم تحديد الاعدادات بنجاح**`})

}
}