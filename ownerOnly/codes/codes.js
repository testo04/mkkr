const { SlashCommandBuilder, EmbedBuilder , PermissionsBitField } = require("discord.js");
const { Database } = require("st.db")
const db = new Database("/database/usersdata/codes")
module.exports = {
    ownersOnly:true,
    data: new SlashCommandBuilder()
    .setName('codes')
    .setDescription('عرض اكواد الخصم في الخادم')
   , // or false
async execute(interaction) {
    await interaction.deferReply({ephemeral:false})
    let codes = db.get(`codes_${interaction.guild.id}`)
    if(!codes) {
        await db.set(`codes_${interaction.guild.id}` , [])
    }
    codes = await db.get(`codes_${interaction.guild.id}`)
    if(!codes || codes.length <= 0) {
        return interaction.editReply({content:`**لا يوجد اكواد خصم في هذا الخادم**`})
    }
  const embed = new EmbedBuilder()
  .setColor(`Gold`)
  .setTitle(`**جميع اكواد الخصم الموجودة في الخادم**`)
  .setTimestamp()
  codes.forEach(async(referral) => {
      const {code , usergift , maxuse , users} = referral;
      let theusers = [];
      users.forEach(async(user) => {
        theusers.push(`<@${user}>`)
      })
    embed.addFields(
        {
            name:`**---**`,value:`**الكود : \`${code}\`\nهدية المستخدم : \`${usergift}\`\nاقصى عدد للاستخدام : \`${maxuse}\`\nمستخدمين الكود : ${theusers.length > 0 ? theusers : "لا يوجد مستخدمين"}**`,inline:false
        }
    )
  })
  return interaction.editReply({embeds:[embed]})

}
}