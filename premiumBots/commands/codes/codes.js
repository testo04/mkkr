const { SlashCommandBuilder, EmbedBuilder , PermissionsBitField } = require("discord.js");
const { Database } = require("st.db")
const db = new Database("/database/usersdata/codes")
const tier2subscriptions = new Database("/database/makers/tier2/subscriptions")

module.exports = {
  ownersOnly:true,
  data: new SlashCommandBuilder()
  .setName('codes')
  .setDescription('عرض اكواد الخصم في الخادم')
  , // or false
  async execute(interaction) {
    await interaction.deferReply({ephemeral:false})
    let subs = tier2subscriptions.get(`tier2_subs`)
    let info = subs.find(a => a.guildid == interaction.guild.id)
    let owner = info.owner
    if (owner != interaction.user.id) {
      return interaction.reply({content: `❗ ***لا تستطيع استخدام هذا الامر***`, ephemeral: true});
    }
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