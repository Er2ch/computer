module.exports.info = {
name: 'верифи',
engname: 'verify',
regex: 'в[еи]р[ие]ф[ие]|v[ei]r[ei]f[iy]',
desc: 'Верифицирует пользователя',
engdesc: 'Verifing a user',
}
module.exports.run = async (message, ph) => {
if(!message.guild.me.hasPermission('EMBED_LINKS'))
return message.reply(ph[7])
if(!message.author.bot && (['verify', 'verification', 'верифи', 'верификация'].includes(message.channel.name) || [/*some ids*/'561921259429167117'].includes(message.channel.id))){
message.channel.startTyping()
let i = 0, captcha = Math.random().toString(36).substr(2, 6), user = message.member,
authorized = message.guild.roles.cache.find(r => r.name.toLowerCase().match(new RegExp(/auth(orized)?|member|мембер|участник|человек|граждан(е|ин)/)))
if(!authorized) {message.channel.stopTyping(); return message.reply(ph[0])}
else authorized = authorized.id
message.delete({timeout: 1500})
const bg = await Comp.jimp.read("https://santehlux.by/upload/iblock/1a3/white_textile.jpg"),
fnt = await Comp.jimp.loadFont(Comp.jimp.FONT_SANS_32_BLACK)
bg
.resize(750, 350)
.print(fnt, Math.random() * 400, Math.random() * 200, captcha)
.getBuffer(Comp.jimp.MIME_PNG, (err, buff) => {
message.channel.stopTyping()
message.reply(new Comp.Discord.MessageEmbed().setTitle(ph[1]).setDescription(ph[2]).addField(ph[3], ph[4]).setColor('BLURPLE').attachFiles([new Comp.Discord.MessageAttachment(buff, "captcha.png")]).setTimestamp() ).then(m => m.delete({timeout: 120000}))
})
const collector = new Comp.Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 120000 })
collector.on('collect', msg => {
msg.delete({timeout: 2000})
if(msg.content === captcha){ message.guild.member(message.author).roles.add(authorized); message.channel.send(ph[5]).then(msg => msg.delete({timeout: 1500})); collector.stop() }
else if(i!==3) i++
else {
message.channel.send(ph[6]).then(m => m.delete({timeout: 1500}))
collector.stop()
}})
} else return
}