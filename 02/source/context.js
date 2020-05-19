module.exports = {
    get url () {
        return this.request._body
    },
    get body () {
        return this.response._body
    },

    set method (val) {
        this.response._body = val
    },
    get method () {
        return this.request._body
    },
}
