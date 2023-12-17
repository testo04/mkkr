const { SlashCommandBuilder,SelectMenuBuilder,StringSelectMenuBuilder, StringSelectMenuOptionBuilder, EmbedBuilder , PermissionsBitField, ActionRowBuilder,ButtonBuilder,MessageComponentCollector,ButtonStyle, Embed } = require("discord.js");
const { Database } = require("st.db")
const db = new Database("/database/data")
const { clientId , owner , mainguild} = require('../../config.json');
const setting = new Database("/database/settingsdata/setting")

module.exports = {
    ownersOnly:true,
    data: new SlashCommandBuilder()
    .setName('send-buy-bot-panel')
    .setDescription(`ارسال بانل شراء البوتات`),
async execute(interaction) {
    await interaction.deferReply({ephemeral:false})
    let price1 = await setting.get(`balance_price_${interaction.guild.id}`) ?? 5000;
    let recipient = await setting.get(`recipient_${interaction.guild.id}`)
    let transferroom = await setting.get(`transfer_room_${interaction.guild.id}`)
    let logroom =  await setting.get(`log_room_${interaction.guild.id}`)
    let probot = await setting.get(`probot_${interaction.guild.id}`)
    let clientrole = await setting.get(`client_role_${interaction.guild.id}`)
    let panelroom = await setting.get(`panel_room_${interaction.guild.id}`)
    let buybotroom = await setting.get(`buy_bot_room${interaction.guild.id}`)
    if(!price1 || !recipient || !transferroom || !logroom || !probot || !clientrole || !buybotroom) return interaction.editReply({content:`**لم يتم تحديد الاعدادات**`})
    let theroom = interaction.guild.channels.cache.find(ch => ch.id == buybotroom)
    let embed = new EmbedBuilder()
    .setTitle(`**بانل شراء بوت**`)
    .setDescription(`**يمكنك شراء بوت عن طريق الضغط على البوت من القائمة**`)
    .setTimestamp()
    const select = new StringSelectMenuBuilder()
    .setCustomId('select_bot')
    .setPlaceholder('قم بأختيار البوت من القائمة')
    .addOptions(
        new StringSelectMenuOptionBuilder()
            .setLabel('Apply')
            .setDescription('شراء بوت تقديمات')
            .setValue('BuyApply'),
            new StringSelectMenuOptionBuilder()
            .setLabel('AutoLine')
            .setDescription('شراء بوت خط تلقائي')
            .setValue('BuyAutoline'),
            new StringSelectMenuOptionBuilder()
            .setLabel('Blacklist')
            .setDescription('شراء بوت بلاك ليست')
            .setValue('BuyBlacklist'),
            new StringSelectMenuOptionBuilder()
            .setLabel('Broadcast')
            .setDescription('شراء بوت برودكاست')
            .setValue('BuyBroadcast'),
            new StringSelectMenuOptionBuilder()
            .setLabel('Feedback')
            .setDescription('شراء بوت اراء')
            .setValue('BuyFeedback'),
            new StringSelectMenuOptionBuilder()
            .setLabel('Giveaway')
            .setDescription('شراء بوت جيف اواي')
            .setValue('BuyGiveaway'),
            new StringSelectMenuOptionBuilder()
            .setLabel('Logs')
            .setDescription('شراء بوت لوج')
            .setValue('BuyLogs'),
            new StringSelectMenuOptionBuilder()
            .setLabel('Probot')
            .setDescription('شراء بوت  بروبوت بريميوم وهمي')
            .setValue('BuyProbot'),
            new StringSelectMenuOptionBuilder()
            .setLabel('Scammers')
            .setDescription('شراء بوت نصابين')
            .setValue('BuyScammers'),
            new StringSelectMenuOptionBuilder()
            .setLabel('Suggestions')
            .setDescription('شراء بوت اقتراحات')
            .setValue('BuySuggestions'),
            new StringSelectMenuOptionBuilder()
            .setLabel('Tax')
            .setDescription('شراء بوت ضريبة')
            .setValue('BuyTax'),
            new StringSelectMenuOptionBuilder()
            .setLabel('Ticket')
            .setDescription('شراء بوت تكت')
            .setValue('BuyTicket'),
            new StringSelectMenuOptionBuilder()
            .setLabel('Reset')
            .setDescription('عمل اعادة تعيين للاختيار')
            .setValue('Reset_Selected'),
    );
    const row = new ActionRowBuilder()
    .addComponents(select);
    theroom.send({embeds:[embed] , components:[row]})
    if(setting.has(`subscribe_room_${interaction.guild.id}`)) {
        let subscriberoo = setting.get(`subscribe_room_${interaction.guild.id}`)
        let subscriberoom = interaction.guild.channels.cache.find(ch => ch.id == subscriberoo)
        let embed2 = new EmbedBuilder()
    .setTitle(`**بانل اشتراك في بوت الميكر**`)
    .setDescription(`**يمكنك الاشتراك في بوت الميكر عن طريق القائمة**`)
    .setTimestamp()
        const select2 = new StringSelectMenuBuilder()
        .setCustomId('select_bot')
        .setPlaceholder('الاشتراك في بوت الميكر')
        .addOptions(
            new StringSelectMenuOptionBuilder()
            .setLabel('Prime')
            .setDescription('الاشتراك في بوت الميكر برايم')
            .setValue('Bot_Maker_Subscribe'),
            new StringSelectMenuOptionBuilder()
            .setLabel('Premium')
            .setDescription('الاشتراك في بوت الميكر بريميوم')
            .setValue('Bot_Maker_Premium_Subscribe'),
            new StringSelectMenuOptionBuilder()
            .setLabel('Reset')
            .setDescription('عمل اعادة تعيين للاختيار')
            .setValue('Reset_Selected'),);
            const row2 = new ActionRowBuilder().addComponents(select2)
        subscriberoom.send({embeds:[embed2],components:[row2]})
    }
    return interaction.editReply({content:`**تم ارسال الرسالة بنجاح**`})
}
}