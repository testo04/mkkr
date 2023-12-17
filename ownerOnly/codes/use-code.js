const { SlashCommandBuilder, EmbedBuilder , PermissionsBitField, Embed } = require("discord.js");
const { Database } = require("st.db")
const db = new Database("/database/usersdata/codes")
const usersdata = new Database(`/database/usersdata/usersdata`)
module.exports = {
    ownersOnly:false,
    data: new SlashCommandBuilder()
    .setName('use-code')
    .setDescription('استخدام كود خصم')
    .addStringOption(Option => Option
        .setName(`code`)
        .setDescription(`الكود`)
        .setRequired(true))
   , // or false
async execute(interaction) {
    await interaction.deferReply({ephemeral:false})
    const code = interaction.options.getString(`code`)
    let codes = db.get(`codes_${interaction.guild.id}`)
    if(!codes) {
        await db.set(`codes_${interaction.guild.id}` , [])
    }
    codes = await db.get(`codes_${interaction.guild.id}`)
    if(!codes || codes.length <= 0) {
        return interaction.editReply({content:`**لا يوجد اكواد دعوة في هذا الخادم للاستخدام**`})
    }
  let codeFind = codes.find(re => re.code == code)
  if(!codeFind) return interaction.editReply({content:`**هذا الكود غير متوفر**`})
  let {usergift , maxuse , users , usersnow} = codeFind;
if(users.includes(interaction.user.id)) return interaction.editReply({content:`**لقد قمت باستخدام هذا الكود مسبقا**`})
if(usersnow == maxuse) return interaction.editReply({content:`**هذا الكود وصل لاقصى حد من الاستخدام**`})
  let authorbalance = usersdata.get(`balance_${interaction.user.id}_${interaction.guild.id}`)
  if(!authorbalance) {
      await usersdata.set(`balance_${interaction.user.id}_${interaction.guild.id}` , 0)
  }
  authorbalance = await usersdata.get(`balance_${interaction.user.id}_${interaction.guild.id}`)
  let newauthorbalance = parseInt(authorbalance) + parseInt(usergift)
  await usersdata.set(`balance_${interaction.user.id}_${interaction.guild.id}` , newauthorbalance)
  const embed = new EmbedBuilder()
  .setTitle(`**تم استخدام الكود بنجاح**`)
  .setDescription(`**هديتك : \`${usergift}\`**`)
  .setColor(`Gold`)
  .setTimestamp()
  users.push(interaction.user.id)
  usersnow = parseInt(usersnow) + 1
  codeFind.users = users;
  codeFind.usersnow = usersnow;
  await db.set(`codes_${interaction.guild.id}` , codes)
  return interaction.editReply({embeds:[embed]})

}
}