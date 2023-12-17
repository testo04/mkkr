const { SlashCommandBuilder, EmbedBuilder , PermissionsBitField, ActionRowBuilder,ButtonBuilder,MessageComponentCollector,ButtonStyle } = require("discord.js");
const { Database } = require("st.db");
const usersdata = new Database(`/database/usersdata/usersdata`)
const { createCanvas, loadImage, registerFont } = require('canvas');
module.exports ={
    ownersOnly:false,
    data: new SlashCommandBuilder()
    .setName('transfer-balance')
    .setDescription('تحويل رصيد الى شخص')
    .addUserOption(Option => Option
        .setName(`user`)
        .setDescription(`الشخص المراد تحويل الرصيد اليه`)
        .setRequired(true))
        .addIntegerOption(Option => Option
            .setName(`quantity`)
            .setDescription(`الكمية`)
            .setRequired(true)),
    async execute(interaction, client) {
        let balanceembed = new EmbedBuilder()
        .setColor(`Gold`)
        .setTimestamp()
        let user = interaction.options.getUser(`user`)
        let quantity = interaction.options.getInteger(`quantity`)
        let authorbalance = usersdata.get(`balance_${interaction.user.id}_${interaction.guild.id}`)
        let userbalance = usersdata.get(`balance_${user.id}_${interaction.guild.id}`);
        if(!userbalance) {
            await usersdata.set(`balance_${user.id}_${interaction.guild.id}` , 0)
        }
        if(!authorbalance) {
            await usersdata.set(`balance_${interaction.user.id}_${interaction.guild.id}` , 0)
        }
        authorbalance = await usersdata.get(`balance_${interaction.user.id}_${interaction.guild.id}`)
        userbalance = await usersdata.get(`balance_${user.id}_${interaction.guild.id}`);
        if(authorbalance < quantity) {
            balanceembed.setTitle(`**انت لا تمتلك هذا الرصيد لكي تستطيع تحويله**`)
            return interaction.reply({embeds:[balanceembed]})
        }
        let newauthorbalance = parseInt(authorbalance) - parseInt(quantity)
        let newuserbalance = parseInt(userbalance) + parseInt(quantity)
        function generateRandomNumber(n) {
            const captchaNumber = [];
            for (let i = 0; i < n; i++) {
                captchaNumber.push(Math.floor(Math.random() * 10));
            }
            return captchaNumber;
        }
        const ax = interaction.user.id
        const theimg = await loadImage('https://cdn.discordapp.com/attachments/1137496890724847778/1152310004439863376/Resize_image_project_2.png');
        const canvas = createCanvas(theimg.width, theimg.height);
        const ctx = canvas.getContext('2d');
        ctx.drawImage(theimg, 0, 0, canvas.width, canvas.height);
        const randomNum = generateRandomNumber(5);
        ctx.font = '40px Arial';
        ctx.fillStyle = 'white';
        // Add a stroke (outline) to the text
        ctx.strokeStyle = 'black'; // Color of the stroke
        ctx.lineWidth = 5; // Adjust the stroke width as needed
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const centerX = canvas.width / 2;
        const centerY = canvas.height / 2;
        ctx.strokeText(randomNum.join(" "), centerX, centerY);
        ctx.fillText(randomNum.join(" "), centerX, centerY);      
        const buffer = canvas.toBuffer();
            const themsg = await interaction.reply({content:`**الرجاء كتابة الارقام التالية لتأكيد عملية التحويل : **` , files:[{name:`captcha.png` , attachment:buffer}]})
            let timer = setTimeout(() => {
                try {
                    themsg.delete();
                } catch {
                    return;
                }
            }, 15 * 1000);
            let collectorFilter = (i) => (i.author.id == ax)
            const collect = await interaction.channel.createMessageCollector({
                filter:collectorFilter,
                max: 1,
                time: 15 * 1000
            });
            collect.on("collect" , async(msg) => {
                try {
                    if(msg.content == randomNum.join("")) {
                        clearTimeout(timer)
                        await usersdata.set(`balance_${user.id}_${interaction.guild.id}` , newuserbalance)
                        await usersdata.set(`balance_${interaction.user.id}_${interaction.guild.id}` , newauthorbalance)
                        balanceembed.setTitle(`**تم تحويل \`${quantity}\` من الرصيد بنجاح**`)
                        balanceembed.setDescription(`**رصيدك الحالي هو : \`${newauthorbalance}\`\n رصيد ${user} الحالي هو : \`${newuserbalance}\`**`)
                        await msg.delete();
                        await themsg.delete();
                        return interaction.channel.send({content:`<@${ax}>`,embeds:[balanceembed]})
                    } else {
                        clearTimeout(timer)
                        await msg.delete();
                        return themsg.delete();
                    }
                } catch {
                    return;
                }
               
            })
            
 
    }
}