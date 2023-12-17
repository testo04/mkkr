const { SlashCommandBuilder, EmbedBuilder , PermissionsBitField } = require("discord.js");
const { Database } = require("st.db")
const db = new Database("/Json-db/Bots/scamDB.json")
module.exports = {
    data: new SlashCommandBuilder()
    .setName('proves')
    .setDescription('لرؤية ادلة النصاب')
    .addStringOption(Option => 
        Option
        .setName('user')
        .setDescription('النصاب المراد رؤية ادلته')
        .setRequired(true)), // or false
async execute(interaction) {
 let scammer1 = interaction.options.getString(`user`)
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
        .setTitle(`**لم يتم العثور علي هذا الشخص في قائمة النصابين لرؤية الادلة**`)
        if(!db.has(`${scammer1}_scammer_${interaction.guild.id}`)) return interaction.reply({embeds:[embed2]})
        let scammerstory = db.get(`${scammer1}_story_${interaction.guild.id}`)
        let scammerproves = db.get(`${scammer1}_proves_${interaction.guild.id}`)
        let embed3 = new EmbedBuilder()
        .setFooter({text:interaction.user.username , iconURL:interaction.user.displayAvatarURL({dynamic:true})})
        .setAuthor({name:interaction.guild.name , iconURL:interaction.guild.iconURL({dynamic:true})})
        .setTimestamp(Date.now())
        .setColor('#000000')
        .setTitle(`**قصة وادلة الشخص النصاب**`)
        .addFields({name:`**قصة التهمة**`,value:`**\`${scammerstory}\`**`,inline:false},{name:`**الادلة**`,value:`**الادلة مدرجة علي هيئة روابط**`,inline:false})
        
        scammerproves.forEach((prove) => {
                embed3.addFields({name:`**===**`,value:`${prove}`,inline:false})
        })
        interaction.reply({embeds:[embed3]})
}
}