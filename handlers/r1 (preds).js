module.exports.run = message => {

//Анти-инвайт им. Сталина
Comp.invites = []
Comp.client.guilds.cache.forEach(async guild => {
if ([Comp.owners.stalin, Comp.owners.lenin].includes(message.author.id)) return
await guild.fetchInvites().then(i => i.forEach(invite => Comp.invites.push({guild: invite.guild.id, code: invite.code}))).catch(() => null)
})
let matches = message.content.match(/discord(app\.com\/invite|.\w{2})\/\w{3,}/gi)
if (matches)
matches.forEach(match => {
if (!Comp.invites.find(m => m.guild == message.guild.id && m.code == match.match(/discord(app\.com\/invite|.\w{2})\/(\w{3,})/i)[2])) {
message.delete().catch(() => message.channel.send('Не могу удалить сообщение'))
message.xp = -30
if(message.lang == 'ru') message.author.send('```' + `Товарищ ${message.guild.member(message.author).displayName}, реклама запрещена.` + '```').catch(() => null)
else message.author.send('```' + `Comrade ${message.member.displayName}, ads is not allowed.` + '```').catch(() => null)
const row = Comp.DB.preds.get(message.author.id)
Comp.send(Comp.client.users.get(Comp.owners.stalin), '```' + `Автор: товарищ ${(message.guild.member(message.author)?message.guild.member(message.author).displayName:message.author.tag)}\nСодержание: ${match}` + '```' + `${rows[0].invite + 1}/10`)
if(row.invite >= 9){
if(!message.member.bannable || message.author.id == Comp.owners.lenin) Comp.DB.preds.get(message.author.id).invite = 0
if(message.member.bannable && message.author.id!== Comp.owners.lenin) message.member.ban('Оставляет инвайты...')
} else Comp.DB.preds.get(message.author.id).invite++
})

//Анти-спам система им. Сталина
const collector = new Comp.Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 8000 }); collector.on('collect', msg => {const collecto = new Comp.Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 4000 }); collecto.on('collect', msg2 => {const collect = new Comp.Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 2000 })
collect.on('collect', msg3 => {
if(message.member.hasPermission('ADMINISTRATOR') || message.channel.id == '693046024146518107') return
if (!Comp.warnedFlood.has(message.author.id)) {
if(message.lang == 'ru') message.reply('прошу, не спамьте.')
else message.reply('please, do not spamming.')
Comp.warnedFlood.add(message.author.id)
setTimeout(() => { Comp.warnedFlood.delete(message.author.id) }, 5500)
}
})})})
const mut = message.guild.roles.find(r => r.name.match(/[Mm]ut[ei][dt]|Замучен{1,}(ы[ей])?/))

if (Comp.warnedFlood.has(message.author.id)) {
Comp.warnedFlood.delete(message.author.id)
const collectorr = new Comp.Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 3000 })
collectorr.on('collect', msg3 => {
if (!message.member.roles.has(mut)) {
message.member.addRole(mut.id)
message.xp = -50
if(message.lang == 'ru') message.reply('Всё в порядке? Ты был наказан на час.')
else message.reply('All ok? You will muted on 1 hour.')
let row = Comp.DB.mutes.get(message.guild.id+'_'+message.author.id)
let zamutil = 0
if(!row) zamutil==0?(Comp.DB.mutes.set(message.guild.id+'_'+message.author.id, new Comp.classes.Mute({guild: message.guild.id, id: message.author.id, inmute: 1, reason: 'flood', mute_time: Date.now(), unmute_time: Date.now()+3600000}), zamutil = 1):''
else {row.inmute = 1; row.reason = 'flood'; mute_time = Date.now(); unmute_time = Date.now()+3600000}
//if(message.lang == 'ru') zamutil?'':message.author.send('Доигрался? Ты был наказан на час.').catch(() => null)
//else zamutil?'':message.author.send('All ok? You will muted on 1 hour.').catch(() => null)
row = Comp.DB.preds.get(message.author.id)
Comp.send(Comp.client.users.cache.get(Comp.owners.stalin), 'Товарищ '+(message.guild.member(message.author)?message.guild.member(message.author).displayName:message.author.tag)+ ' спамит. '+(row.spam + 1)+'/10')
if(row.spam >= 9)
if(!message.author.bannable || message.author.id === Comp.owners.lenin) 
else message.member.ban('Ультра спамер'), row._deleted = true
else {
row.spam = row.spam?row.spam+1:1
const collectoor = new Comp.Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 2000 })
collectoor.on('collect', msg4 => {
const coollector = new Comp.Discord.MessageCollector(message.channel, m => m.author.id === message.author.id, { time: 3000 })
coollector.on('collect', msg5 => {
if (message.glang === 1 && message.member.bannable && message.author.id!==Comp.owners.lenin) message.member.ban('Ультра спамер') && message.reply('вы были забанены за спам.').catch()
if (message.glang === 2 && message.member.bannable && message.author.id!==Comp.owners.lenin) message.member.ban('Spamming') && message.reply('you get ban for spamming.').catch()
})})}})}})}

}