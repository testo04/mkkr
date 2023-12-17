const { SlashCommandBuilder, EmbedBuilder , PermissionsBitField } = require("discord.js");
const { Database } = require("st.db")
const db = new Database("/Json-db/Bots/scamDB.json")
module.exports = {
    data: new SlashCommandBuilder()
    .setName('remove-scammer')
    .setDescription('ازالة شخص من قائمة النصابين')
    .addStringOption(Option => 
        Option
        .setName('scammer')
        .setDescription('ايدي النصاب المراد ازالته')
        .setRequired(true)), // or false
async execute(interaction) {
              let allowedRoleID = db.get(`scammer_admin_${interaction.guild.id}`)
          if (!interaction.member.roles.cache.some(role => role.id === allowedRoleID)) return;
        let scammer1 = interaction.options.getString(`scammer`)
        let scammer2 = await interaction.client.users.fetch(scammer1).catch()
        let embed1 = new EmbedBuilder()
        .setFooter({text:interaction.user.username , iconURL:interaction.user.displayAvatarURL({dynamic:true})})
        .setAuthor({name:interaction.guild.name , iconURL:interaction.guild.iconURL({dynamic:true})})
        .setTimestamp(Date.now())
        .setColor('#000000')
        .setTitle(`**الرجاء وضع ايدي شخص صالح**`)
        if(!scammer2) return interaction.reply({embeds:[embed1]})
        let embed2 = new EmbedBuilder()
        .setFooter({text:interaction.user.username , iconURL:interaction.user.displayAvatarURL({dynamic:true})})
        .setAuthor({name:interaction.guild.name , iconURL:interaction.guild.iconURL({dynamic:true})})
        .setTimestamp(Date.now())
        .setColor('#000000')
        .setTitle(`**هذا الشخص غير موجود في قائمة النصابين**`)
        if(!db.has(`${scammer1}_scammer_${interaction.guild.id}`)) return interaction.reply({embeds:[embed2]})
        await db.delete(`${scammer1}_scammer_${interaction.guild.id}`)
        await db.delete(`${scammer1}_story_${interaction.guild.id}`)
        await db.delete(`${scammer1}_proves_${interaction.guild.id}`)
        let embed3 = new EmbedBuilder()
        .setFooter({text:interaction.user.username , iconURL:interaction.user.displayAvatarURL({dynamic:true})})
        .setAuthor({name:interaction.guild.name , iconURL:interaction.guild.iconURL({dynamic:true})})
        .setTimestamp(Date.now())
        .setColor('#000000')
        .setTitle(`**تم ازالة المتهم بنجاح**`)
        return interaction.reply({embeds:[embed3]})
}
}