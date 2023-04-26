module.exports = {
    dateToString: function(d) {
        return d.toISOString().split('T')[0]
    },
    recordToCsv: function(r) {
        return ""
    },
}