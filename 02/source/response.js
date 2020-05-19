module.exports = {
    get body () {
        return this._body
    },

    set method (val) {
        this._body = val
    }
}
