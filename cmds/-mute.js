module.exports.info = {
name: 'мут',
engname: 'mute',
regex: 'му{1,}[тд]',
engregex: 'm[uo]{1,}[td]',
args: '<айди> <время (в мс)> [причина]',
engargs: '<id> <time (in ms)> [reason]',
desc: 'Мут',
engdesc: 'Mute',
private: true,
examples: ["Comp.client.users.cache.random().id+' '+Comp.random(10000, 360000)", "Comp.client.users.cache.random().id+' '+Comp.random(10000, 360000)+' spam'"]
}

module.exports.run = async message => {
const row = await Comp.models.get('Mute').findOne({guild: message.guild.id, id: message.author.id})
if(!row) {await Comp.models.get('Mute').create({guild: message.guild.id, id: message.author.id, inmute: 1, reason: (message.args.slice(2).join(' ') || 'no reason'), mute_time: Date.now(), unmute_time: (Date.now()+parseInt(message.args[1])) })
message.channel.send(['ok',
`Muted at ${new Date(Date.now()).toLocaleString('ru-RU', {timeZone: 'Europe/Moscow', hour12: false})} (MSK)`,
`Unmute at ${new Date(Date.now()+parseInt(message.args[1] || 0)).toLocaleString('ru-RU', {timeZone: 'Europe/Moscow', hour12: false})} (MSK)`
])}
else return message.channel.send([
`This user is ${row.inmute?'':'not '}muted`,
`Reason: ${row.reason?row.reason:'no reason'}`,
`Muted at ${new Date(parseInt(row.mute_time)).toLocaleString('ru-RU', {timeZone: 'Europe/Moscow', hour12: false})} (MSK)`,
`Unmute at ${new Date(parseInt(row.unmute_time)).toLocaleString('ru-RU', {timeZone: 'Europe/Moscow', hour12: false})} (MSK)`])
}