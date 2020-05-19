const zzr = {
    info: {name: 'zouzhirui'},
    
    get name () {
        return this.info.name
    },

    set name (val) {
        this.info.name = val
    }
}

console.log(zzr.name)

zzr.name = 'zouleyi'

console.log(zzr.name)
