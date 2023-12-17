const { SlashCommandBuilder,Events , ActivityType,ModalBuilder,TextInputStyle, EmbedBuilder , PermissionsBitField,ButtonStyle, TextInputBuilder, ActionRowBuilder,ButtonBuilder,MessageComponentCollector, Embed } = require("discord.js");
const settings = require("../../../database/settings")
const managers = require("../../../database/managers")
const { Database } = require("st.db")
const ticketsManager = new Database("/Json-db/Bots/ticketDB.json")
module.exports = (client7) => {
    client7.on(Events.InteractionCreate , async(interaction) =>{
    if(interaction.isModalSubmit()) {
        let guilddata = await settings.findOne({guildid:interaction.guild.id})
    let panelsRoom = guilddata.panelsRoom;
    let panel1Category = guilddata.panel1Category;
    let panel1Role = guilddata.panel1Role;
    let panel1Welcome = guilddata.panel1Welcome;
    let panel1Name = guilddata.panel1Name;
    let panel2Category = guilddata.panel2Category;
    let panel2Role = guilddata.panel2Role;
    let panel2Welcome = guilddata.panel2Welcome;
    let panel2Name = guilddata.panel2Name;
    let panel3Category = guilddata.panel3Category;
    let panel3Role = guilddata.panel3Role;
    let panel3Welcome = guilddata.panel3Welcome;
    let panel3Name = guilddata.panel3Name;
    let panel4Category = guilddata.panel4Category;
    let panel4Role = guilddata.panel4Role;
    let panel4Welcome = guilddata.panel4Welcome;
    let panel4Name = guilddata.panel4Name;

    let panel1Number = guilddata.panel1Number;
    let panel2Number = guilddata.panel2Number;
    let panel3Number = guilddata.panel3Number;
    let panel4Number = guilddata.panel4Number;
    if(!guilddata || !panelsRoom ||!panel3Category || !panel3Role || !panel3Welcome || !panel3Name || !panel4Category || !panel4Role || !panel4Welcome || !panel4Name || !panel1Category || !panel1Role || !panel1Welcome || !panel1Name || !panel2Category || !panel2Role || !panel1Role || !panel2Welcome || !panel2Name) return;
    if(interaction.customId == "modal_1") {
            await interaction.deferReply({ephemeral:true})
            let thereason = interaction.fields.getTextInputValue(`the_problem_1`)
            let theticket = await interaction.guild.channels.create({
                name:`ticket-${panel1Number}`,
                parent:panel1Category,
                permissionOverwrites:[
                    {
                        id:interaction.guild.id,
                        deny:[PermissionsBitField.Flags.ViewChannel],
                    },
                    {
                        id:interaction.user.id,
                        allow:[PermissionsBitField.Flags.ViewChannel , PermissionsBitField.Flags.SendMessages],
                    },
                    {
                        id:panel1Role,
                        allow:[PermissionsBitField.Flags.ViewChannel , PermissionsBitField.Flags.SendMessages],
                    }
                ]
            })
            await interaction.editReply({content:`${theticket}`})
            let openembed = new EmbedBuilder()
        .setFooter({text:interaction.user.username , iconURL:interaction.user.displayAvatarURL({dynamic:true})})
        .setAuthor({name:interaction.guild.name , iconURL:interaction.guild.iconURL({dynamic:true})})
        .setTimestamp(Date.now())
        .setColor('#00f3ff')
        .setTitle(`${panel1Welcome}`)
        .setDescription(`**سبب فتح التكت : \` ${thereason} \`**`)
        const claimticket = new ButtonBuilder()
        .setCustomId(`claim_ticket_1`)
        .setLabel(`Claim Ticket`)
        .setStyle(ButtonStyle.Secondary)
        const deleteticket = new ButtonBuilder()
        .setCustomId(`delete_ticket`)
        .setLabel(`Delete Ticket`)
        .setStyle(ButtonStyle.Danger)
        const row = new ActionRowBuilder()
        .addComponents(claimticket , deleteticket);
        await theticket.send({components:[row] , embeds:[openembed] , content:`**${interaction.user} , <@&${panel1Role}>**`})
        guilddata.panel1Number = parseInt(panel1Number) + 1
        guilddata.save();
        await ticketsManager.set(`${theticket.id}` , {
            opener:interaction.user.id,channelid:interaction.user.id,channelname:theticket.name
        })
        return;
        }
        if(interaction.customId == "modal_2"){
            await interaction.deferReply({ephemeral:true})
            let thereason = interaction.fields.getTextInputValue(`the_problem_2`)
            let theticket = await interaction.guild.channels.create({
                name:`ticket-${panel2Number}`,
                parent:panel2Category,
                permissionOverwrites:[
                    {
                        id:interaction.guild.id,
                        deny:[PermissionsBitField.Flags.ViewChannel],
                    },
                    {
                        id:interaction.user.id,
                        allow:[PermissionsBitField.Flags.ViewChannel , PermissionsBitField.Flags.SendMessages],
                    },
                    {
                        id:panel2Role,
                        allow:[PermissionsBitField.Flags.ViewChannel , PermissionsBitField.Flags.SendMessages],
                    }
                ]
            })
            await interaction.editReply({content:`${theticket}`})
            let openembed = new EmbedBuilder()
        .setFooter({text:interaction.user.username , iconURL:interaction.user.displayAvatarURL({dynamic:true})})
        .setAuthor({name:interaction.guild.name , iconURL:interaction.guild.iconURL({dynamic:true})})
        .setTimestamp(Date.now())
        .setColor('#00f3ff')
        .setTitle(`${panel2Welcome}`)
        .setDescription(`**سبب فتح التكت : \` ${thereason} \`**`)
        const claimticket = new ButtonBuilder()
        .setCustomId(`claim_ticket_2`)
        .setLabel(`Claim Ticket`)
        .setStyle(ButtonStyle.Secondary)
        const deleteticket = new ButtonBuilder()
        .setCustomId(`delete_ticket`)
        .setLabel(`Delete Ticket`)
        .setStyle(ButtonStyle.Danger)
        const row = new ActionRowBuilder()
        .addComponents(claimticket , deleteticket);
        await theticket.send({components:[row] , embeds:[openembed] , content:`**${interaction.user} , <@&${panel2Role}>**`})
        guilddata.panel2Number = parseInt(panel2Number) + 1
        guilddata.save();
        await ticketsManager.set(`${theticket.id}` , {
            opener:interaction.user.id,channelid:interaction.user.id,channelname:theticket.name
        })
        return;
        }

        if(interaction.customId == "modal_3") {
            await interaction.deferReply({ephemeral:true})
            let thereason = interaction.fields.getTextInputValue(`the_problem_3`)
            let theticket = await interaction.guild.channels.create({
                name:`ticket-${panel3Number}`,
                parent:panel3Category,
                permissionOverwrites:[
                    {
                        id:interaction.guild.id,
                        deny:[PermissionsBitField.Flags.ViewChannel],
                    },
                    {
                        id:interaction.user.id,
                        allow:[PermissionsBitField.Flags.ViewChannel , PermissionsBitField.Flags.SendMessages],
                    },
                    {
                        id:panel3Role,
                        allow:[PermissionsBitField.Flags.ViewChannel , PermissionsBitField.Flags.SendMessages],
                    }
                ]
            })
            await interaction.editReply({content:`${theticket}`})
            let openembed = new EmbedBuilder()
        .setFooter({text:interaction.user.username , iconURL:interaction.user.displayAvatarURL({dynamic:true})})
        .setAuthor({name:interaction.guild.name , iconURL:interaction.guild.iconURL({dynamic:true})})
        .setTimestamp(Date.now())
        .setColor('#00f3ff')
        .setTitle(`${panel3Welcome}`)
        .setDescription(`**سبب فتح التكت : \` ${thereason} \`**`)
        const claimticket = new ButtonBuilder()
        .setCustomId(`claim_ticket_3`)
        .setLabel(`Claim Ticket`)
        .setStyle(ButtonStyle.Secondary)
        const deleteticket = new ButtonBuilder()
        .setCustomId(`delete_ticket`)
        .setLabel(`Delete Ticket`)
        .setStyle(ButtonStyle.Danger)
        const row = new ActionRowBuilder()
        .addComponents(claimticket , deleteticket);
        await theticket.send({components:[row] , embeds:[openembed] , content:`**${interaction.user} , <@&${panel3Role}>**`})
        guilddata.panel3Number = parseInt(panel3Number) + 1
        guilddata.save();
        await ticketsManager.set(`${theticket.id}` , {
            opener:interaction.user.id,channelid:interaction.user.id,channelname:theticket.name
        })
        return;
        }
        if(interaction.customId == "modal_4") {
            await interaction.deferReply({ephemeral:true})
            let thereason = interaction.fields.getTextInputValue(`the_problem_4`)
            let theticket = await interaction.guild.channels.create({
                name:`ticket-${panel4Number}`,
                parent:panel4Category,
                permissionOverwrites:[
                    {
                        id:interaction.guild.id,
                        deny:[PermissionsBitField.Flags.ViewChannel],
                    },
                    {
                        id:interaction.user.id,
                        allow:[PermissionsBitField.Flags.ViewChannel , PermissionsBitField.Flags.SendMessages],
                    },
                    {
                        id:panel4Role,
                        allow:[PermissionsBitField.Flags.ViewChannel , PermissionsBitField.Flags.SendMessages],
                    }
                ]
            })
            await interaction.editReply({content:`${theticket}`})
            let openembed = new EmbedBuilder()
        .setFooter({text:interaction.user.username , iconURL:interaction.user.displayAvatarURL({dynamic:true})})
        .setAuthor({name:interaction.guild.name , iconURL:interaction.guild.iconURL({dynamic:true})})
        .setTimestamp(Date.now())
        .setColor('#00f3ff')
        .setTitle(`${panel4Welcome}`)
        .setDescription(`**سبب فتح التكت : \` ${thereason} \`**`)
        const claimticket = new ButtonBuilder()
        .setCustomId(`claim_ticket_4`)
        .setLabel(`Claim Ticket`)
        .setStyle(ButtonStyle.Secondary)
        const deleteticket = new ButtonBuilder()
        .setCustomId(`delete_ticket`)
        .setLabel(`Delete Ticket`)
        .setStyle(ButtonStyle.Danger)
        const row = new ActionRowBuilder()
        .addComponents(claimticket , deleteticket);
        await theticket.send({components:[row] , embeds:[openembed] , content:`**${interaction.user} , <@&${panel4Role}>**`})
        guilddata.panel4Number = parseInt(panel4Number) + 1
        guilddata.save();
        await ticketsManager.set(`${theticket.id}` , {
            opener:interaction.user.id,channelid:interaction.user.id,channelname:theticket.name
        })
        return;
        }
    }
  }
    )};