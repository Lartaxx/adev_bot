const { Event } = require("sheweny");

module.exports = class guildMemberRemoveEvent extends Event {
  constructor(client) {
    super(client, "guildMemberRemove", {
      description: "guildMemberRemove",
      only: true,
    });
    this.config = client.options.config;
    this.client = client;
    this.embed = client.options.MessageEmbed;
    this.format = client.options.format;
  }

  execute(member) {
    const random = Math.floor(Math.random() * this.config.randoms_phrases_left.length);
    const phrase = this.config.randoms_phrases_left[random];
    member.guild.channels.cache.get(this.config.channels.left_member).send({embeds: [
      new this.embed()
        .setColor(this.config.colors.error ?? "RED")
        .setTitle(this.format(phrase, member.user.username))
        .setDescription(`${member.user.tag} est parti...nous ne sommes plus que **${member.guild.memberCount} membres...**`)
        .setFooter(this.client.user.username, this.client.user.displayAvatarURL())
        .setTimestamp()
    ]});
  }
};
