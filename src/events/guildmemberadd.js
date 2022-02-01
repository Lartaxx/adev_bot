const { Event } = require("sheweny");

module.exports = class guildMemberAddEvent extends Event {
  constructor(client) {
    super(client, "guildMemberAdd", {
      description: "guildMemberAdd",
      only: true,
    });
    this.config = client.options.config;
    this.client = client;
    this.embed = client.options.MessageEmbed;
    this.format = client.options.format;
  }

  execute(member) {
    const random = Math.floor(Math.random() * this.config.randoms_phrases_join.length);
    const phrase = this.config.randoms_phrases_join[random];
    member.guild.channels.cache.get(this.config.channels.join_member).send({embeds: [
      new this.embed()
        .setColor(this.config.colors.success ?? "GREEN")
        .setTitle(this.format(phrase, member.user.username))
        .setDescription(`Bienvenue ${member } tu es le **${member.guild.memberCount}ème membre** !, nous sommes ravi de t'accueillir sur a-developpement, n'oublie pas d'aller te vérifier dans <#${this.config.channels.verif}> pour recevoir ton rôle de <@&${this.config.roles.verified_member}> et avoir accès au reste du Discord !`)
        .setFooter(this.client.user.username, this.client.user.displayAvatarURL())
        .setTimestamp()
    ]});
  }
};
