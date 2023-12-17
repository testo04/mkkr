/*const config = require("../../../config.json");
const { Events, Interaction, EmbedBuilder ,InteractionType } = require('discord.js');
const client22 = require(`../Autoline-Bots.js`)

const { Database } = require("st.db")


module.exports.run = async (client22, interaction) =>{
  if (!interaction.isChatInputCommand()) return;
  const { commandName, options, user, guildId } = interaction;

  const command = await client22.AutoLineSlashCommands.get(commandName)
  if (!command) return;
  if (command.ownerOnly === true) {
    if (!ownerDB.includes(interaction.user.id)) {
      return interaction.reply({content: `❗ ***لا تستطيع استخدام هذا الامر***`, ephemeral: true});
    }
  }

  if (command.botPermission) {
    const missingPermissions = [];
    const botPermissions = interaction.guild.me.permissions;

    if (command.botPermission && Array.isArray(command.botPermission)) {
      command.botPermission.forEach((permission) => {
        if (!botPermissions.has(permission)) {
          missingPermissions.push(permission);
        }
      });
    }
    if (missingPermissions.length) {
      const missingPermsEmbed = new MessageEmbed()
        .setColor("#ff0000")
        .setDescription(`❌ I don't have the required permissions: ${missingPermissions.join(", ")}`);

      return interaction.reply({ embeds: [missingPermsEmbed], ephemeral: true });
    }
  }

  if (command.authorPermission) {
    const missingPermissions = [];
    const memberPermissions = interaction.member.permissions;
  
    command.authorPermission.forEach((permission) => {
      if (!memberPermissions.has(permission)) {
        missingPermissions.push(permission);
      }
    });
  
    if (missingPermissions.length) {
      const missingPermsEmbed = new MessageEmbed()
        .setColor("#ff0000")
        .setDescription(`❌ You don't have the required permissions: ${missingPermissions.join(", ")}`);
  
      return interaction.reply({ embeds: [missingPermsEmbed], ephemeral: true });
    }
  }
  

  try {
    if (command) {
      command.run(client22, interaction);
    }
  } catch (error) {
    console.error(`Error executing command ${commandName}:`, error);
  }

}
*/const { Events, Interaction, EmbedBuilder ,InteractionType } = require('discord.js');
const { Database } = require("st.db")
module.exports = {
  name: Events.InteractionCreate,
    /**
    * @param {Interaction} interaction
  */
  async execute(interaction){
    console.log('tst1')
    if (interaction.isChatInputCommand()) {
      console.log('tst2')
	    if(interaction.user.bot) return;
	     let client = interaction.client2;
		const command = interaction.client2.AutoLineSlashCommands.get(interaction.commandName);
	    
		if (!command) {
			console.error(`No command matching ${interaction.commandName} was found.`);
			return;
		}
		if (command.ownersOnly === true) {
			let subs = tier1subscriptions.get(`tier1_subs`)
			let info = subs.find(a => a.guildid == interaction.guild.id)
			let ownerid = info.ownerid
			if (ownerid != interaction.user.id) {
			  return interaction.reply({content: `❗ ***لا تستطيع استخدام هذا الامر***`, ephemeral: true});
			}
		}
		try {
			await command.execute(interaction);
		} catch (error) {
			console.error(`Error executing ${interaction.commandName}`);
			console.error(error);
		}
    }
  }
}