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
    if(interaction.customId == "claimed_ticket_1") {
            if(!ticketsManager.has(`${interaction.user.id}_claimer_${interaction.channel.id}`)) return interaction.reply({content:`** لا تمتلك صلاحية لفعل ذلك**`}) 
            let opener = ticketsManager.get(`${interaction.channel.id}`)
                let opener2 = opener.opener
                let userprofile = await managers.findOne({guildid:interaction.guild.id , id:interaction.user.id})
            await interaction.channel.permissionOverwrites.set([
                {
                    id:interaction.guild.id,
                    deny:[PermissionsBitField.Flags.ViewChannel],
                },
                {
                    id:panel1Role,
                    allow:[PermissionsBitField.Flags.ViewChannel],
                },
                {
                    id:opener2,
                    allow:[PermissionsBitField.Flags.ViewChannel , PermissionsBitField.Flags.SendMessages],
                }
            ])
            let userpoints = userprofile.points;
            userprofile.points = parseInt(userpoints) - 1
            userprofile.save();
            await interaction.channel.setName(`${opener.channelname}`)
            let unclaimembed = new EmbedBuilder()
            .setDescription(`**تم الغاء استلام التكت بواسطه : ${interaction.user}**`)
            .setTimestamp()
            const claimticket = new ButtonBuilder()
            .setCustomId(`claim_ticket_1`)
            .setLabel(`Claim Ticket`)
            .setStyle(ButtonStyle.Secondary)
            const deleteticket = new ButtonBuilder()
            .setCustomId(`delete_ticket`)
            .setLabel(`Delete Ticket`)
            .setStyle(ButtonStyle.Danger)
            const rowee = new ActionRowBuilder()
            .addComponents(claimticket , deleteticket);
            await interaction.update({components:[rowee]})
            return interaction.channel.send({embeds:[unclaimembed]})
        }
        if(interaction.customId == "claimed_ticket_2") {
            if(!ticketsManager.has(`${interaction.user.id}_claimer_${interaction.channel.id}`)) return interaction.reply({content:`** لا تمتلك صلاحية لفعل ذلك**`}) 
            let opener = ticketsManager.get(`${interaction.channel.id}`)
                let opener2 = opener.opener
                let userprofile = await managers.findOne({guildid:interaction.guild.id , id:interaction.user.id})
            await interaction.channel.permissionOverwrites.set([
                {
                    id:interaction.guild.id,
                    deny:[PermissionsBitField.Flags.ViewChannel],
                },
                {
                    id:panel2Role,
                    allow:[PermissionsBitField.Flags.ViewChannel],
                },
                {
                    id:opener2,
                    allow:[PermissionsBitField.Flags.ViewChannel , PermissionsBitField.Flags.SendMessages],
                }
            ])
            let userpoints = userprofile.points;
            userprofile.points = parseInt(userpoints) - 1
            userprofile.save();
            await interaction.channel.setName(`${opener.channelname}`)
            let unclaimembed = new EmbedBuilder()
            .setDescription(`**تم الغاء استلام التكت بواسطه : ${interaction.user}**`)
            .setTimestamp()
            const claimticket = new ButtonBuilder()
            .setCustomId(`claim_ticket_2`)
            .setLabel(`Claim Ticket`)
            .setStyle(ButtonStyle.Secondary)
            const deleteticket = new ButtonBuilder()
            .setCustomId(`delete_ticket`)
            .setLabel(`Delete Ticket`)
            .setStyle(ButtonStyle.Danger)
            const rowww = new ActionRowBuilder()
            .addComponents(claimticket , deleteticket);
            await interaction.update({components:[rowww]})
            return interaction.channel.send({embeds:[unclaimembed]})
        }
        if(interaction.customId == "claimed_ticket_3") {
            if(!ticketsManager.has(`${interaction.user.id}_claimer_${interaction.channel.id}`)) return interaction.reply({content:`** لا تمتلك صلاحية لفعل ذلك**`}) 
            let opener = ticketsManager.get(`${interaction.channel.id}`)
                let opener2 = opener.opener
                let userprofile = await managers.findOne({guildid:interaction.guild.id , id:interaction.user.id})
            await interaction.channel.permissionOverwrites.set([
                {
                    id:interaction.guild.id,
                    deny:[PermissionsBitField.Flags.ViewChannel],
                },
                {
                    id:panel3Role,
                    allow:[PermissionsBitField.Flags.ViewChannel],
                },
                {
                    id:opener2,
                    allow:[PermissionsBitField.Flags.ViewChannel , PermissionsBitField.Flags.SendMessages],
                }
            ])
            let userpoints = userprofile.points;
            userprofile.points = parseInt(userpoints) - 1
            userprofile.save();
            await interaction.channel.setName(`${opener.channelname}`)
            let unclaimembed = new EmbedBuilder()
            .setDescription(`**تم الغاء استلام التكت بواسطه : ${interaction.user}**`)
            .setTimestamp()
            const claimticket = new ButtonBuilder()
            .setCustomId(`claim_ticket_3`)
            .setLabel(`Claim Ticket`)
            .setStyle(ButtonStyle.Secondary)
            const deleteticket = new ButtonBuilder()
            .setCustomId(`delete_ticket`)
            .setLabel(`Delete Ticket`)
            .setStyle(ButtonStyle.Danger)
            const rowee = new ActionRowBuilder()
            .addComponents(claimticket , deleteticket);
            await interaction.update({components:[rowee]})
            return interaction.channel.send({embeds:[unclaimembed]})
        }
        if(interaction.customId == "claimed_ticket_4") {
            if(!ticketsManager.has(`${interaction.user.id}_claimer_${interaction.channel.id}`)) return interaction.reply({content:`** لا تمتلك صلاحية لفعل ذلك**`}) 
            let opener = ticketsManager.get(`${interaction.channel.id}`)
                let opener2 = opener.opener
                let userprofile = await managers.findOne({guildid:interaction.guild.id , id:interaction.user.id})
            await interaction.channel.permissionOverwrites.set([
                {
                    id:interaction.guild.id,
                    deny:[PermissionsBitField.Flags.ViewChannel],
                },
                {
                    id:panel4Role,
                    allow:[PermissionsBitField.Flags.ViewChannel],
                },
                {
                    id:opener2,
                    allow:[PermissionsBitField.Flags.ViewChannel , PermissionsBitField.Flags.SendMessages],
                }
            ])
            let userpoints = userprofile.points;
            userprofile.points = parseInt(userpoints) - 1
            userprofile.save();
            await interaction.channel.setName(`${opener.channelname}`)
            let unclaimembed = new EmbedBuilder()
            .setDescription(`**تم الغاء استلام التكت بواسطه : ${interaction.user}**`)
            .setTimestamp()
            const claimticket = new ButtonBuilder()
            .setCustomId(`claim_ticket_4`)
            .setLabel(`Claim Ticket`)
            .setStyle(ButtonStyle.Secondary)
            const deleteticket = new ButtonBuilder()
            .setCustomId(`delete_ticket`)
            .setLabel(`Delete Ticket`)
            .setStyle(ButtonStyle.Danger)
            const rowee = new ActionRowBuilder()
            .addComponents(claimticket , deleteticket);
            await interaction.update({components:[rowee]})
            return interaction.channel.send({embeds:[unclaimembed]})
        }
    }
  }
    )};