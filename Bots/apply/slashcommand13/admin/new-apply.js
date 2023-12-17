const { SlashCommandBuilder, EmbedBuilder , PermissionsBitField, ActionRowBuilder,ButtonBuilder,MessageComponentCollector,ButtonStyle } = require("discord.js");
const { Database } = require("st.db")
const applyDB = new Database("/Json-db/Bots/applyDB.json")
const tokens = new Database("/tokens/tokens")
const tier1subscriptions = new Database("/database/makers/tier1/subscriptions")

module.exports ={
    ownersOnly:true,
    data: new SlashCommandBuilder()
    .setName('new-apply')
    .setDescription('انشاء تقديم جديد')
    .addRoleOption(Option => Option
        .setName(`role`)
        .setDescription(`الرتبة التي سوف يتم انشاء التقديم عليها`)
        .setRequired(true))
        .addStringOption(Option => Option
            .setName(`ask1`)
            .setDescription(`السوال الاول`)
            .setRequired(true))
            .addStringOption(Option => Option
                .setName(`ask2`)
                .setDescription(`السوال الثاني`)
                .setRequired(true))
                .addStringOption(Option => Option
                    .setName(`ask3`)
                    .setDescription(`السوال الثالث`)
                    .setRequired(true))
                    .addStringOption(Option => Option
                        .setName(`ask4`)
                        .setDescription(`السوال الرابع`)
                        .setRequired(true))
                        .addStringOption(Option => Option
                            .setName(`ask5`)
                            .setDescription(`السوال الخامس`)
                            .setRequired(true))
    ,
    async execute(interaction, client) {
        const sent = await interaction.deferReply({ fetchReply: true , ephemeral:false});
        let role = interaction.options.getRole(`role`)
        let ask1 = interaction.options.getString(`ask1`)
        let ask2 = interaction.options.getString(`ask2`)
        let ask3 = interaction.options.getString(`ask3`)
        let ask4 = interaction.options.getString(`ask4`)
        let ask5 = interaction.options.getString(`ask5`)
        let embed1 = new EmbedBuilder()
        .setFooter({text:interaction.user.username , iconURL:interaction.user.displayAvatarURL({dynamic:true})})
        .setAuthor({name:interaction.guild.name , iconURL:interaction.guild.iconURL({dynamic:true})})
        .setTimestamp(Date.now())
        .setColor('#000000')
            await applyDB.set(`apply_${interaction.guild.id}` , {roleid:role.id,ask1:ask1,ask2:ask2,ask3:ask3,ask4:ask4,ask5:ask5})
        embed1.setTitle(`**تم انشاء تقديم جديد بنجاح**`)
        return interaction.editReply({embeds:[embed1]})
    }
}