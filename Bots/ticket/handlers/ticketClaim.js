const { SlashCommandBuilder,Events , ActivityType,ModalBuilder,TextInputStyle, EmbedBuilder , PermissionsBitField,ButtonStyle, TextInputBuilder, ActionRowBuilder,ButtonBuilder,MessageComponentCollector, Embed } = require("discord.js");
const settings = require("../../../database/settings")
const managers = require("../../../database/managers")
const { Database } = require("st.db")
const ticketsManager = new Database("/Json-db/Bots/ticketDB.json")

module.exports = (client7) => {
    client7.on(Events.InteractionCreate , async(interaction) =>{
    if(interaction.isButton()) {
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
    if(interaction.customId == "claim_ticket_1") {
            if(!interaction.member.roles.cache.has(`${panel1Role}`)) return interaction.reply({content:`**لا تمتلك الصلاحية لفعل هذا**` , ephemeral:true})
            await interaction.channel.setName(`ticket-${interaction.user.username}`).then(async() => {
                let claimembed = new EmbedBuilder()
                .setDescription(`**تم استلام التكت بواسطه : ${interaction.user}**`)
                .setTimestamp()
                
                await ticketsManager.set(`${interaction.user.id}_claimer_${interaction.channel.id}` , true)
                const claimedticket = new ButtonBuilder()
                .setCustomId(`claimed_ticket_1`)
                .setLabel(`Claimed`)
                .setStyle(ButtonStyle.Secondary)
                const deleteticket = new ButtonBuilder()
                .setCustomId(`delete_ticket`)
                .setLabel(`Delete Ticket`)
                .setStyle(ButtonStyle.Danger)
                const row = new ActionRowBuilder()
                .addComponents(claimedticket , deleteticket);
                let opener = ticketsManager.get(`${interaction.channel.id}`)
                let opener2 = opener.opener
                await interaction.channel.permissionOverwrites.set([
                    {
                        id:interaction.guild.id,
                        deny:[PermissionsBitField.Flags.ViewChannel],
                    },
                    {
                        id:panel1Role,
                        deny:[PermissionsBitField.Flags.ViewChannel],
                    },
                    {
                        id:interaction.user.id,
                        allow:[PermissionsBitField.Flags.ViewChannel , PermissionsBitField.Flags.SendMessages],
                    },
                    {
                        id:opener2,
                        allow:[PermissionsBitField.Flags.ViewChannel , PermissionsBitField.Flags.SendMessages],
                    }
                ])
                let userprofile = await managers.findOne({guildid:interaction.guild.id , id:interaction.user.id})
                if(!userprofile) {
                    new managers({
                        guildid:interaction.guild.id,
                        id:interaction.user.id,
                        points:1
                    }).save()
                    await interaction.update({components:[row]})
                    return interaction.channel.send({embeds:[claimembed]})
                }
                let userpoints = userprofile.points;
                userprofile.points = parseInt(userpoints) + 1
                userprofile.save();
                await interaction.update({components:[row]})
                    return interaction.channel.send({embeds:[claimembed]})
            })
        }
        if(interaction.customId == "claim_ticket_2") {
            if(!interaction.member.roles.cache.has(`${panel2Role}`)) return interaction.reply({content:`**لا تمتلك الصلاحية لفعل هذا**` , ephemeral:true})
            await interaction.channel.setName(`ticket-${interaction.user.username}`).then(async() => {
                let claimembed = new EmbedBuilder()
                .setDescription(`**تم استلام التكت بواسطه : ${interaction.user}**`)
                .setTimestamp()
                
                await ticketsManager.set(`${interaction.user.id}_claimer_${interaction.channel.id}` , true)
                const claimedticket = new ButtonBuilder()
                .setCustomId(`claimed_ticket_2`)
                .setLabel(`Claimed`)
                .setStyle(ButtonStyle.Secondary)
                const deleteticket = new ButtonBuilder()
                .setCustomId(`delete_ticket`)
                .setLabel(`Delete Ticket`)
                .setStyle(ButtonStyle.Danger)
                const row = new ActionRowBuilder()
                .addComponents(claimedticket , deleteticket);
                let opener = ticketsManager.get(`${interaction.channel.id}`)
                let opener2 = opener.opener
                await interaction.channel.permissionOverwrites.set([
                    {
                        id:interaction.guild.id,
                        deny:[PermissionsBitField.Flags.ViewChannel],
                    },
                    {
                        id:panel2Role,
                        deny:[PermissionsBitField.Flags.ViewChannel],
                    },
                    {
                        id:interaction.user.id,
                        allow:[PermissionsBitField.Flags.ViewChannel , PermissionsBitField.Flags.SendMessages],
                    },
                    {
                        id:opener2,
                        allow:[PermissionsBitField.Flags.ViewChannel , PermissionsBitField.Flags.SendMessages],
                    }
                ])
                let userprofile = await managers.findOne({guildid:interaction.guild.id , id:interaction.user.id})
                if(!userprofile) {
                    new managers({
                        guildid:interaction.guild.id,
                        id:interaction.user.id,
                        points:1
                    }).save()
                    await interaction.update({components:[row]})
                    return interaction.channel.send({embeds:[claimembed]})
                }
                let userpoints = userprofile.points;
                userprofile.points = parseInt(userpoints) + 1
                userprofile.save();
                await interaction.update({components:[row]})
                    return interaction.channel.send({embeds:[claimembed]})
            })
        }
        
        if(interaction.customId == "claim_ticket_3") {
            if(!interaction.member.roles.cache.has(`${panel3Role}`)) return interaction.reply({content:`**لا تمتلك الصلاحية لفعل هذا**` , ephemeral:true})
            await interaction.channel.setName(`ticket-${interaction.user.username}`).then(async() => {
                let claimembed = new EmbedBuilder()
                .setDescription(`**تم استلام التكت بواسطه : ${interaction.user}**`)
                .setTimestamp()
                
                await ticketsManager.set(`${interaction.user.id}_claimer_${interaction.channel.id}` , true)
                const claimedticket = new ButtonBuilder()
                .setCustomId(`claimed_ticket_3`)
                .setLabel(`Claimed`)
                .setStyle(ButtonStyle.Secondary)
                const deleteticket = new ButtonBuilder()
                .setCustomId(`delete_ticket`)
                .setLabel(`Delete Ticket`)
                .setStyle(ButtonStyle.Danger)
                const row = new ActionRowBuilder()
                .addComponents(claimedticket , deleteticket);
                let opener = ticketsManager.get(`${interaction.channel.id}`)
                let opener2 = opener.opener
                await interaction.channel.permissionOverwrites.set([
                    {
                        id:interaction.guild.id,
                        deny:[PermissionsBitField.Flags.ViewChannel],
                    },
                    {
                        id:panel3Role,
                        deny:[PermissionsBitField.Flags.ViewChannel],
                    },
                    {
                        id:interaction.user.id,
                        allow:[PermissionsBitField.Flags.ViewChannel , PermissionsBitField.Flags.SendMessages],
                    },
                    {
                        id:opener2,
                        allow:[PermissionsBitField.Flags.ViewChannel , PermissionsBitField.Flags.SendMessages],
                    }
                ])
                let userprofile = await managers.findOne({guildid:interaction.guild.id , id:interaction.user.id})
                if(!userprofile) {
                    new managers({
                        guildid:interaction.guild.id,
                        id:interaction.user.id,
                        points:1
                    }).save()
                    await interaction.update({components:[row]})
                    return interaction.channel.send({embeds:[claimembed]})
                }
                let userpoints = userprofile.points;
                userprofile.points = parseInt(userpoints) + 1
                userprofile.save();
                await interaction.update({components:[row]})
                    return interaction.channel.send({embeds:[claimembed]})
            })
        }






        if(interaction.customId == "claim_ticket_4") {
            if(!interaction.member.roles.cache.has(`${panel4Role}`)) return interaction.reply({content:`**لا تمتلك الصلاحية لفعل هذا**` , ephemeral:true})
            await interaction.channel.setName(`ticket-${interaction.user.username}`).then(async() => {
                let claimembed = new EmbedBuilder()
                .setDescription(`**تم استلام التكت بواسطه : ${interaction.user}**`)
                .setTimestamp()
                
                await ticketsManager.set(`${interaction.user.id}_claimer_${interaction.channel.id}` , true)
                const claimedticket = new ButtonBuilder()
                .setCustomId(`claimed_ticket_4`)
                .setLabel(`Claimed`)
                .setStyle(ButtonStyle.Secondary)
                const deleteticket = new ButtonBuilder()
                .setCustomId(`delete_ticket`)
                .setLabel(`Delete Ticket`)
                .setStyle(ButtonStyle.Danger)
                const row = new ActionRowBuilder()
                .addComponents(claimedticket , deleteticket);
                let opener = ticketsManager.get(`${interaction.channel.id}`)
                let opener2 = opener.opener
                await interaction.channel.permissionOverwrites.set([
                    {
                        id:interaction.guild.id,
                        deny:[PermissionsBitField.Flags.ViewChannel],
                    },
                    {
                        id:panel4Role,
                        deny:[PermissionsBitField.Flags.ViewChannel],
                    },
                    {
                        id:interaction.user.id,
                        allow:[PermissionsBitField.Flags.ViewChannel , PermissionsBitField.Flags.SendMessages],
                    },
                    {
                        id:opener2,
                        allow:[PermissionsBitField.Flags.ViewChannel , PermissionsBitField.Flags.SendMessages],
                    }
                ])
                let userprofile = await managers.findOne({guildid:interaction.guild.id , id:interaction.user.id})
                if(!userprofile) {
                    new managers({
                        guildid:interaction.guild.id,
                        id:interaction.user.id,
                        points:1
                    }).save()
                    await interaction.update({components:[row]})
                    return interaction.channel.send({embeds:[claimembed]})
                }
                let userpoints = userprofile.points;
                userprofile.points = parseInt(userpoints) + 1
                userprofile.save();
                await interaction.update({components:[row]})
                    return interaction.channel.send({embeds:[claimembed]})
            })
        }




     }
  }
    )};

