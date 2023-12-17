const { SlashCommandBuilder, EmbedBuilder , PermissionsBitField, Embed } = require("discord.js");
const { Database } = require("st.db")
const db = new Database("/database/usersdata/referral")
const usersdata = new Database(`/database/usersdata/usersdata`)
module.exports = {
    ownersOnly:false,
    data: new SlashCommandBuilder()
    .setName('use-referral')
    .setDescription('استخدام كود دعوة')
    .addStringOption(Option => Option
        .setName(`code`)
        .setDescription(`الكود`)
        .setRequired(true))
   , // or false
async execute(interaction) {
    await interaction.deferReply({ephemeral:false})
    const code = interaction.options.getString(`code`)
    let referrals = db.get(`referrals_${interaction.guild.id}`)
    if(!referrals) {
        await db.set(`referrals_${interaction.guild.id}` , [])
    }
    referrals = await db.get(`referrals_${interaction.guild.id}`)
    if(!referrals || referrals.length <= 0) {
        return interaction.editReply({content:`**لا يوجد اكواد دعوة في هذا الخادم للاستخدام**`})
    }
  let codeFind = referrals.find(re => re.code == code)
  if(!codeFind) return interaction.editReply({content:`**هذا الكود غير متوفر**`})
  let {owner , usergift , ownergift , maxuse , users , usersnow} = codeFind;
    if(owner == interaction.user.id) return interaction.editReply({content:`**لا تستطيع استخدام كودك**`})
if(users.includes(interaction.user.id)) return interaction.editReply({content:`**لقد قمت باستخدام هذا الكود مسبقا**`})
if(usersdata.has(`usedreferral_${interaction.user.id}_${interaction.guild.id}`)) return interaction.editReply({content:`**لقد قمت باستخدام كود مسبقا ولا يمكنك استخدام المزيد**`})
if(usersnow == maxuse) return interaction.editReply({content:`**هذا الكود وصل لاقصى حد من الاستخدام**`})
  let authorbalance = usersdata.get(`balance_${interaction.user.id}_${interaction.guild.id}`)
  let userbalance = usersdata.get(`balance_${owner}_${interaction.guild.id}`);
  if(!userbalance) {
      await usersdata.set(`balance_${owner}_${interaction.guild.id}` , 0)
  }
  if(!authorbalance) {
      await usersdata.set(`balance_${interaction.user.id}_${interaction.guild.id}` , 0)
  }
  authorbalance = await usersdata.get(`balance_${interaction.user.id}_${interaction.guild.id}`)
  userbalance = await usersdata.get(`balance_${owner}_${interaction.guild.id}`);
  let newauthorbalance = parseInt(authorbalance) + parseInt(usergift)
    let newuserbalance = parseInt(userbalance) + parseInt(ownergift)
  await usersdata.set(`balance_${interaction.user.id}_${interaction.guild.id}` , newauthorbalance)
  await usersdata.set(`balance_${owner}_${interaction.guild.id}` , newuserbalance)
  await usersdata.set(`usedreferral_${interaction.user.id}_${interaction.guild.id}` , true)
  const embed = new EmbedBuilder()
  .setTitle(`**تم استخدام الكود بنجاح**`)
  .setDescription(`**صاحب الكود : <@${owner}>\nهديتك : \`${usergift}\`\n هدية صاحب الكود : \`${ownergift}\`**`)
  .setColor(`Gold`)
  .setTimestamp()
  const embed2 = new EmbedBuilder()
  .setTitle(`**قام شخص بأستخدام كودك**`)
  .setTimestamp()
  .setColor(`Gold`)
  .setDescription(`**المستخدم : ${interaction.user}\nهديتك : \`${ownergift}\`\nرصيدك الحالى : \`${newuserbalance}\`**`)
  await interaction.guild.members.fetch(owner)
  let theuser = await interaction.guild.members.cache.find(us => us.id == owner)
    theuser.send({embeds:[embed2]}).catch(async() => {})
  users.push(interaction.user.id)
  usersnow = parseInt(usersnow) + 1
  codeFind.users = users;
  codeFind.usersnow = usersnow;
  await db.set(`referrals_${interaction.guild.id}` , referrals)
  return interaction.editReply({embeds:[embed]})

}
}