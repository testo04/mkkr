const { SlashCommandBuilder,Events ,Client, ActivityType,ModalBuilder,TextInputStyle, EmbedBuilder , PermissionsBitField,ButtonStyle, TextInputBuilder, ActionRowBuilder,ButtonBuilder,MessageComponentCollector } = require("discord.js");
const { Database } = require("st.db")
const db = new Database("/Json-db/Bots/BroadcastDB")
module.exports = (client2) => {
    client2.on(Events.InteractionCreate , async(interaction) =>{
    if(interaction.isButton()) {
    if(interaction.customId == "add_token_button") {
        try {
            const modal = new ModalBuilder()
            .setCustomId(`add_token_modal`)
            .setTitle(`اضافة توكن بوت برودكاست`)
            const tokenn = new TextInputBuilder()
            .setCustomId('the_token')
            .setLabel(`التوكن`)
            .setStyle(TextInputStyle.Short)
            .setMinLength(65)
            .setMaxLength(85)
            const firstActionRow = new ActionRowBuilder().addComponents(tokenn);
            modal.addComponents(firstActionRow)
            await interaction.showModal(modal)
        } catch (error) {
            return interaction.reply({content:`${error.message}`})
        }
    }
   }
   if(interaction.isModalSubmit()) {
    if(interaction.customId == "add_token_modal") {
        try {
            await interaction.deferReply({ephemeral:false});
            const thetoken = interaction.fields.getTextInputValue(`the_token`)
            const thetokens = db.get(`tokens_${interaction.guild.id}`)
            if(thetokens) {
                if(thetokens.includes(thetoken)) {
                    return interaction.editReply({content:`**هذا التوكن موجود باللفعل**`})
                }
            }
            const clienter = new Client({intents:32767})
            await clienter.login(thetoken)
            clienter.user.setActivity(`Hello I'm BC Bot`)
            const embed1 = new EmbedBuilder()
            .setTitle(`**تم تسجيل الدخول بنجاح**`)
            .setTimestamp()
            .setColor(`Gold`)
            .addFields(
                {
                    name:`**اسم البوت**`,value:`**\`\`\`${clienter.user.tag}\`\`\`**`,inline:false
                },
                {
                    name:`**ايدي البوت**`,value:`**\`\`\`${clienter.user.id}\`\`\`**`,inline:false
                }
            )
            const invitebot = new ButtonBuilder()
	.setLabel('دعوة البوت')
	.setURL(`https://discord.com/api/oauth2/authorize?client_id=${clienter.user.id}&permissions=8&scope=bot`)
	.setStyle(ButtonStyle.Link);
    const row = new ActionRowBuilder().addComponents(invitebot);
            await interaction.editReply({embeds:[embed1],components:[row]})
            let tokens = db.get(`tokens_${interaction.guild.id}`)
            if(!tokens) {
                await db.set(`tokens_${interaction.guild.id}` , [thetoken])
            } else {
                await db.push(`tokens_${interaction.guild.id}` , thetoken)
            }
            tokens = db.get(`tokens_${interaction.guild.id}`)
            const broadcast_msg = db.get(`broadcast_msg_${interaction.guild.id}`) ?? "لم يتم تحديد رسالة"
        const msgid = db.get(`msgid_${interaction.guild.id}`)
        if(msgid) {
            const msg = interaction.channel.messages.fetch(msgid).then(async(msgg) => {
                const embed2 = new EmbedBuilder()
                .setTitle(`**التحكم في البرودكاست**`)
                .addFields(
                    {
                        name:`**عدد البوتات المسجلة حاليا**`,value:`**\`\`\`${tokens.length ?? "فشل التحديد"} من البوتات\`\`\`**`,inline:false
                    },
                    {
                        name:`**رسالة البرودكاست الحالية**`,value:`**\`\`\`${broadcast_msg}\`\`\`**`,inline:false
                    },
                )
                .setDescription(`**يمكنك التحكم في البوت عن طريق الازرار**`)
                .setColor(`Gold`)
                .setFooter({text:interaction.user.username , iconURL:interaction.user.displayAvatarURL({dynamic:true})})
                .setAuthor({name:interaction.guild.name , iconURL:interaction.guild.iconURL({dynamic:true})})
                .setTimestamp(Date.now())
                msgg.edit({embeds:[embed2]})
            })
        }
        } catch (error) {
                return interaction.editReply({content:`**الرجاء التأكد من توكن البوت أو تفعيل الخيارات الثلاثة الاخيرة من اعدادات البوت**`})
        }
    }
   }
  }
    )}