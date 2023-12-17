const { SlashCommandBuilder, EmbedBuilder , PermissionsBitField } = require("discord.js");
const { Database } = require("st.db")
const db = new Database("/database/usersdata/referral")
module.exports = {
    ownersOnly:true,
    data: new SlashCommandBuilder()
    .setName('referrals')
    .setDescription('عرض اكواد الدعوة في الخادم')
   , // or false
async execute(interaction) {
    await interaction.deferReply({ephemeral:false})
    let referrals = db.get(`referrals_${interaction.guild.id}`)
    if(!referrals) {
        await db.set(`referrals_${interaction.guild.id}` , [])
    }
    referrals = await db.get(`referrals_${interaction.guild.id}`)
    if(!referrals || referrals.length <= 0) {
        return interaction.editReply({content:`**لا يوجد اكواد دعوة في هذا الخادم**`})
    }
  const embed = new EmbedBuilder()
  .setColor(`Gold`)
  .setTitle(`**جميع اكواد الدعوة الموجودة في الخادم**`)
  .setTimestamp()
  referrals.forEach(async(referral) => {
      const {owner , code , usergift , ownergift , maxuse , users} = referral;
      let theusers = [];
      users.forEach(async(user) => {
        theusers.push(`<@${user}>`)
      })
    embed.addFields(
        {
            name:`**---**`,value:`**الكود : \`${code}\`\nصاحب الكود : <@${owner}>\nهدية المستخدم : \`${usergift}\`\nهدية صاحب الكود : \`${ownergift}\`\nاقصى عدد للاستخدام : \`${maxuse}\`\nمستخدمين الكود : ${theusers.length > 0 ? theusers : "لا يوجد مستخدمين"}**`,inline:false
        }
    )
  })
  return interaction.editReply({embeds:[embed]})

}
}