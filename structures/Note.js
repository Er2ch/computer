module.exports = class Note {
constructor(a, obj) {
this.user = obj.user?obj.user:null
this.id = obj.id || 1
this.idn = this.id.split('_')[1]
this.name = obj.name || ''
this.text = obj.text || ''
this._deleted = false
}

get vals() {
return {user: this.user, id: this.id, name: this.name, text: this.text}
}

set vals(val) {
if(typeof val !== 'object') return 'Error! Value must be an object.'
if(val[0]) this.id = val[0]
if(val[1]) this.name = val[1]
if(val[2]) this.text = val[2]
}

}