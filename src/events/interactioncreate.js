const { Event } = require("sheweny");

module.exports = class clickButtonEvent extends Event {
  constructor(client) {
    super(client, "interactionCreate", {
      description: "interactionCreate",
      only: false,
    });
    this.config = client.options.config;
    this.client = client;
    this.row = client.options.MessageActionRow;
    this.embed = client.options.MessageEmbed;
    this.select = client.options.MessageSelectMenu;
    this.button = client.options.MessageButton;
    this.permissions = client.options.Permissions;
    this.pool = client.options.pool;
    this.uniqid = client.options.uniqid;
  }

  async execute(button) {
    const config = this.config;
    const Permissions = this.permissions;
    const row = this.row;
    const embed = this.embed;
    const pool = this.pool;
    const button_discord = this.button;
    const uniqid = this.uniqid;
    if (button.isButton() ) {
    let to_continue = 1;
    switch (button.customId) {
      case "adev::button_ticket": {
        button.deferUpdate();
          const category_channels = this.client.channels.cache.get(config.category.ticket);
          const ticket_channels = category_channels.children;
          ticket_channels.forEach(async (ticket) => {
            if ( ticket?.topic === button.user.id  ) {
              to_continue = 0;
            }
            else {
              to_continue = 1;
            }
          });

          if ( to_continue === 1 ) {
            this.client.guilds.cache.get("789808009613672448").channels.create(`ticket-de-${button.user.username.toLowerCase()}`, {
              parent: config.category.ticket,
              type: "GUILD_TEXT",
              permissionOverwrites: [
                {
                  id: button.message.guild.roles.everyone.id,
                  deny: [Permissions.FLAGS.VIEW_CHANNEL]
                },
                {
                  id: button.user.id,
                  allow: [Permissions.FLAGS.VIEW_CHANNEL],
                  deny: [Permissions.FLAGS.SEND_MESSAGES]
                }
              ]
            })
            .then(async (ticket) => {
              await ticket.setTopic(button.user.id);
              const row = new this.row()
                .addComponents(new this.select()
                                    .setCustomId("adev::select_ticket")
                                    .setPlaceholder("🔘 | Choisissez votre / vos raisons !")
                                    .setMinValues(1)
                                    .setMaxValues(5)
                                    .addOptions([
                                      {
                                        label: `Création de site web`,
                                        description: "Ce choix est à prendre si vous souhaitez un site web ( front & back )",
                                        value: `Création de site web ( Frontend et/ou Backend )`,
                                        emoji: `${this.client.guilds.cache.get("789808009613672448").emojis.cache.get("904485363479900261")}`
                                      },
                                      {
                                        label: "Création de forum sous CMS",
                                        description: "Ce choix est à prendre si vous souhaitez un forum sous CMS **License non fournis**",
                                        value: "Création de forum sous CMS",
                                        emoji: `${this.client.guilds.cache.get("789808009613672448").emojis.cache.get("904485363450523669")}`
                                      },
                                      {
                                        label: "Configuration",
                                        description: "Ce choix est à prendre si vous souhaitez la configuration de votre serveur de jeu",
                                        value: "Configuration de serveur de jeu",
                                        emoji: `${this.client.guilds.cache.get("789808009613672448").emojis.cache.get("904672060150800385")}`
                                      },
                                      {
                                        label: "Bot Discord",
                                        description: "Ce choix est à prendre si vous souhaitez un bot discord",
                                        value: "Bot Discord personalisé",
                                        emoji: `${this.client.guilds.cache.get("789808009613672448").emojis.cache.get("904485363135942667")}`
                                      },
                                      {
                                        label: "Mapping",
                                        description: "Ce choix est à prendre si vous souhaitez une map, ou la modificaion d'une map",
                                        value: `Création / Modification d'une map`,
                                        emoji: `${this.client.guilds.cache.get("789808009613672448").emojis.cache.get("904668760252764182")}`
                                      },
                                      {
                                        label: "Support",
                                        description: "Ce chois est à prendre si vous avez besoin de support",
                                        value: "Support divers",
                                        emoji: `${this.client.guilds.cache.get("789808009613672448").emojis.cache.get("904692670650273862")}`}
                                    ]));
            const embed = new this.embed()
            .setColor(config.colors.info ?? "BLUE")
            .setTitle("Gestion de votre ticket")
            .setDescription(`Bonjour ${button.member}, vous pouvez gérer votre ticket de plusieurs façons, en choisissant notamment de le fermer, mais aussi de choisir quand vous l'ouvrez les raisons pour lesquelles vous l'ouvrez pour pouvoir notifier les raisons aux administrateurs du Discord !`)
            .setTimestamp()
            return ticket.send({components: [row], embeds: [embed]})
            })
          }
          else {
            return button.member.send("Vous avez déjà un ticket ouvert !");
          }
        break;
      }

      case "adev::button_close": {
        const button_close_embed = new this.embed()
          .setColor(config.colors.info ?? "BLUE")
          .setTitle("La fermeture de votre ticket est en cours.... ")
          .setDescription("Cette action est réversible ! Si c'est une erreur vous pouvez mp un staff pour réouvrir celui-ci si il n'est pas archivé !")
          .setTimestamp();
        button.message.channel.send({embeds: [button_close_embed]})
        .then(async () => {
            const row = new this.row()
              .addComponents(new this.button()
                                  .setCustomId("adev::button_close")
                                  .setStyle("DANGER")
                                  .setLabel("🔒 Fermer le ticket")
              )
              .addComponents(new this.button()
                                .setCustomId("adev::button_reopen")
                                .setLabel('🔓 Rouvrir le ticket')
                                .setStyle('SUCCESS')
                                .setDisabled(false)
              )
              .addComponents(new this.button()
                                  .setCustomId("adev::button_archived")
                                  .setStyle("PRIMARY")
                                  .setLabel("🗄️ Archiver le ticket")
              )
              .addComponents(new this.button()
                              .setCustomId("adev::button_finalised")
                              .setStyle("SECONDARY")
                              .setLabel("🔐 Finaliser la commande")
              )
                                  
            await button.deferUpdate();
            button.editReply({components: [row]})
          setTimeout(async () => {
            const member_ticket = await button.message.guild.members.fetch(button.message.channel.topic)
            button.message.channel.permissionOverwrites.edit(member_ticket.user.id, {VIEW_CHANNEL: false});
          }, 3000)
        })
        break;
      }

      case "adev::button_reopen": {
        if ( button.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR) ) {
          const member_ticket = await button.message.guild.members.fetch(button.message.channel.topic)
          button.message.channel.permissionOverwrites.edit(member_ticket.user.id, {VIEW_CHANNEL: true, READ_MESSAGE_HISTORY: true});
          button.message.channel.send({embeds: [
            new this.embed()
              .setColor(config.colors.success ?? "GREEN")
              .setDescription(`Le ticket de ${button.message.guild.members.cache.get(button.message.channel.topic)} a été rouvert par ${button.member}`)
              .setTimestamp()
          ]})
          .then(async () => {
            const row = new this.row()
          .addComponents(new this.button()
                              .setCustomId("adev::button_close")
                              .setStyle("DANGER")
                              .setLabel("🔒 Fermer le ticket")
          )
          .addComponents(new this.button()
                            .setCustomId("adev::button_reopen")
                            .setLabel('🔓 Rouvrir le ticket')
                            .setStyle('SUCCESS')
                            .setDisabled(true)
          )
          .addComponents(new this.button()
                              .setCustomId("adev::button_archived")
                              .setStyle("PRIMARY")
                              .setLabel("🗄️ Archiver le ticket")
          )
          .addComponents(new this.button()
                              .setCustomId("adev::button_finalised")
                              .setStyle("SECONDARY")
                              .setLabel("🔐 Finaliser la commande")
          )
                              
        await button.deferUpdate();
        button.editReply({components: [row]})
          })
        }
        break;
      }

      case "adev::button_archived": {
        if ( button.member.permissions.has(Permissions.FLAGS.ADMINISTRATOR) ) {
          const user_ticket = await button.message.guild.members.fetch(button.message.channel.topic);
          button.message.channel.setName(`ticket-archive-de-${user_ticket.user.username.toLowerCase()}`);
          button.message.channel.send(`Le ticket de ${user_ticket} a bien été archivé et **ne pourra plus être rouvert** !`)
          .then(async () =>  {
            await button.deferUpdate();
            button.editReply({components: []})
            button.message.channel.send("Le ticket va être supprimé dans quelques secondes...")
            .then(() => {
              setTimeout(() => {
                return button.message.channel.delete();
              }, 3000)
            })
          })
        }
        else {
          return button.reply({content: "Vous n'avez pas la permission d'archivé ce ticket !", ephemeral: true});
        }
        break;
      }

      case "adev::button_verif": {
        await button.deferUpdate();
        if (button.member._roles.includes(this.config.roles.verified_member)) {
          await button.followUp({content: "Vous êtes déjà un membre vérifié !", ephemeral: true});
        }
        else {
          button.member.roles.add(this.config.roles.verified_member);
          await button.followUp({content: `Vous êtes désormais un <@&${this.config.roles.verified_member}> !`, ephemeral: true});
        }
        break;
      }

      case "adev::button_take": {
        if(!button.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) return button.reply({content: "Vous n'avez pas la permission de prendre ce ticket !", ephemeral: true});
        this.pool.query(`INSERT INTO tickets(user_id, taker_id) VALUES('${button.message.channel.topic}', '${button.member.user.id}')`, function(err) { if (err) return button.message.channel.send(`Erreur sur l'insertion (ticket) : \`${err}\``)})
        const row = new this.row()
        .addComponents(new this.button()
                            .setCustomId("adev::button_close")
                            .setStyle("DANGER")
                            .setLabel("🔒 Fermer le ticket")
                            .setDisabled(true)
        )
        .addComponents(new this.button()
                          .setCustomId("adev::button_reopen")
                          .setLabel('🔓 Rouvrir le ticket')
                          .setStyle('SUCCESS')
                          .setDisabled(true)
        )
        .addComponents(new this.button()
                            .setCustomId("adev::button_archived")
                            .setStyle("PRIMARY")
                            .setLabel("🗄️ Archiver le ticket")
        )
        .addComponents(new this.button()
                            .setCustomId("adev::button_finalised")
                            .setStyle("SECONDARY")
                            .setLabel("🔐 Finaliser la commande")
        )
        await button.deferUpdate();
        await button.editReply({components: [row], content: `Ticket prit en charge par : ${button.member}`});
        const member_ticket = await button.message.guild.members.fetch(button.message.channel.topic)
        button.message.channel.permissionOverwrites.edit(member_ticket.user.id, {VIEW_CHANNEL: true, SEND_MESSAGES: true});
        const row_next = new this.row()
        .addComponents(new this.button()
                            .setCustomId("adev::button_close")
                            .setStyle("DANGER")
                            .setLabel("🔒 Fermer le ticket")
        )
        .addComponents(new this.button()
                          .setCustomId("adev::button_reopen")
                          .setLabel('🔓 Rouvrir le ticket')
                          .setStyle('SUCCESS')
                          .setDisabled(true)
        )
        .addComponents(new this.button()
                            .setCustomId("adev::button_archived")
                            .setStyle("PRIMARY")
                            .setLabel("🗄️ Archiver le ticket")
        )
        .addComponents(new this.button()
                            .setCustomId("adev::button_finalised")
                            .setStyle("SECONDARY")
                            .setLabel("🔐 Finaliser la commande")
        )
        await button.editReply({components: [row_next]});
        break;
      }

      case "adev::button_finalised": {
          if ( !button.member.permissions.has(Permissions.FLAGS.MANAGE_CHANNELS)) {
            return button.reply({content: "Vous n'avez pas la permission de finaliser la commande", ephemeral: true});
          }
          else {
            const user_ticket = await button.message.guild.members.fetch(button.message.channel.topic);
            this.pool.query(`INSERT INTO rates(uniqid, user_id, developper_id) VALUES("${uniqid()}", "${user_ticket.user.id}", "${button.member.user.id}")`, function(err) {
              if (err) return button.message.channel.send(`Erreur : \`${err}\``);
              pool.query(`SELECT * FROM rates WHERE user_id = ${user_ticket.user.id} AND is_complete = 0`, async function(err, results) {
                if (err) return button.message.channel.send(`Erreur sur la sélection : \`${err}\``);
                if (!results.length) return;
                const buttons = new row()
                .addComponents(new button_discord()
                                    .setCustomId("adev::button_close")
                                    .setStyle("DANGER")
                                    .setLabel("🔒 Fermer le ticket")
                )
                .addComponents(new button_discord()
                                  .setCustomId("adev::button_reopen")
                                  .setLabel('🔓 Rouvrir le ticket')
                                  .setStyle('SUCCESS')
                                  .setDisabled(true)
                )
                .addComponents(new button_discord()
                                    .setCustomId("adev::button_archived")
                                    .setStyle("PRIMARY")
                                    .setLabel("🗄️ Archiver le ticket")
                )
                .addComponents(new button_discord()
                                    .setCustomId("adev::button_finalised")
                                    .setStyle("SECONDARY")
                                    .setLabel("🔐 Finaliser la commande")
                                    .setDisabled(true)
                )
                                    
              await button.deferUpdate();
              button.editReply({components: [buttons]})
                return button.message.channel.send(`${user_ticket}, pour avoir le rôle client, vous devez utiliser la commandes \`!rate\` avec comme identifiant unique : **${results[0].uniqid}**`);            
              })
            })
            
          }
         break;
        }
            
        case "adev::role_apocalypse": {
            if (button.member._roles.includes(config.roles.apocalypse)) {
                button.member.roles.remove(config.roles.apocalypse);
                return button.reply({content: `Vous n'avez plus le rôle <@&${config.roles.apocalypse}>`, ephemeral: true});
            }
            else {
                button.member.roles.add(config.roles.apocalypse);
                return button.reply({content: `Vous avez désormais le rôle <@&${config.roles.apocalypse}>`, ephemeral: true});
            }
        }

        case "adev::role_notif_annonce": {
          if (button.member._roles.includes(config.roles.annonce)) {
            button.member.roles.remove(config.roles.annonce);
            return button.reply({content: `Vous n'avez plus le rôle <@&${config.roles.apocalypse}>`, ephemeral: true});
          }
          else {
              button.member.roles.add(config.roles.annonce);
              return button.reply({content: `Vous avez désormais le rôle <@&${config.roles.apocalypse}>`, ephemeral: true});
          }
        }
      }
    }
    else if ( button.isSelectMenu() ) {
      switch(button.customId) {
        case "adev::select_ticket": {
          if (!(button.member.user.id === button.message.channel.topic)) {
            return button.reply({content: "Vous n'êtes pas le créateur du ticket !", ephemeral: true})
          }
          else {
          let sValues;
          button.values.forEach(e => {
            return sValues += `${e}\n`;
          });
          const embed_modified = new this.embed()
          .setColor(config.colors.info ?? "BLUE")
          .setTitle("Gestion de votre ticket | Suite")
          .setDescription(`${button.member}, vous avez choisis votre / vos raisons. \n\n __**Raisons :**__ \n ${sValues.replace("undefined", "")}`)
          .setTimestamp()
          button.message.channel.messages.fetch().then(async messages => {
            const old_embed = messages.first();
            const row = new this.row()
              .addComponents(new this.button()
                                  .setCustomId("adev::button_close")
                                  .setStyle("DANGER")
                                  .setLabel("🔒 Fermer le ticket")
                                  .setDisabled(true)
              )
              .addComponents(new this.button()
                                .setCustomId("adev::button_reopen")
                                .setLabel('🔓 Rouvrir le ticket')
                                .setStyle('SUCCESS')
                                .setDisabled(true)
              )
              .addComponents(new this.button()
                                  .setCustomId("adev::button_archived")
                                  .setStyle("PRIMARY")
                                  .setLabel("🗄️ Archiver le ticket")
              )
              .addComponents(new this.button()
                                .setCustomId("adev::button_take")
                                .setStyle("SECONDARY")
                                .setLabel("👉 Prendre le ticket")
              )
              .addComponents(new this.button()
                              .setCustomId("adev::button_finalised")
                              .setStyle("SECONDARY")
                              .setLabel("🔐 Finaliser la commande")
                              .setDisabled(true)
              )
                                  
            old_embed.edit({embeds: [embed_modified]})
            await button.deferUpdate();
            button.editReply({components: [row]})
            button.message.channel.permissionOverwrites.edit(button.message.channel.topic, {VIEW_CHANNEL: true, SEND_MESSAGES: false});
            
          })
            break;
          }
        }

        case "adev::select_rate": {
          this.pool.query(`SELECT * FROM rates WHERE user_id = ${button.user.id} AND is_complete = 0`, async function(err, results) {
            if (err) throw err;
            if (!results.length) return;
            const member_ticket = await button.message.guild.members.fetch(button.user.id);
            const developer = await button.message.guild.members.fetch(results[0].developper_id);
            if (member_ticket._roles.includes(config.roles.client)) {
              button.guild.channels.cache.get(config.channels.rates).send({embeds: [
                new embed()
                  .setColor(config.colors.info ?? "BLUE")
                  .setTitle(`Un nouvel avis a été posté !`)
                  .addFields(
                    {name: `Client`, value: `<@${member_ticket.user.id}>`, inline: true},
                    {name: "Dévelopeur", value: `<@${developer.user.id}>`, inline: true},
                    {name: "Note", value: button.values[0], inline: true}
                  )
              ]})
              pool.query(`UPDATE rates SET is_complete = 1 WHERE user_id = ${member_ticket.user.id} AND is_complete = 0`, function(err) {if (err) return button.message.channel.send(`Erreur sur l'édition : \`${err}\``)})
                await button.deferUpdate();
                return await button.editReply({components: [], embeds: [], content: `Votre avis a été envoyé, merci !`})
            }
            button.guild.channels.cache.get(config.channels.rates).send({embeds: [
              new embed()
                .setColor(config.colors.info ?? "BLUE")
                .setTitle(`Un nouvel avis a été posté !`)
                .addFields(
                  {name: `Client`, value: `<@${member_ticket.user.id}>`, inline: true},
                  {name: "Dévelopeur", value: `<@${developer.user.id}>`, inline: true},
                  {name: "Note", value: button.values[0], inline: true}
                )
            ]})
            member_ticket.roles.add(config.roles.client)
            .then(async () => {
              await button.deferUpdate();
              await button.editReply({components: [], embeds: [], content: `Vous êtes désormais <@&${config.roles.client}>`})
            })
            return pool.query(`UPDATE rates SET is_complete = 1 WHERE user_id = ${member_ticket.user.id} AND is_complete = 0`, function(err) {if (err) return button.message.channel.send(`Erreur sur l'édition : \`${err}\``)})
          })
          break;
        }
      }
    }
  }
};
