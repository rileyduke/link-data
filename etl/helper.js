module.exports = {
    dateToString: function(d) {
        return d.toISOString().split('T')[0]
    },
    recordToCsv: function(r) {
        return `${r.date}, ${r.amount.replace(/,/g, '')}, '${r.description}'`
    },
    differenceInDays: function(from, to) {
        let difference = to.getTime() - from.getTime();
        let totalDays = Math.ceil(difference / (1000 * 3600 * 24));
        return totalDays;
    },
    addDays: function(d, days) {
        let newd = new Date(d.valueOf())
        newd.setDate(newd.getDate() + days);
        return newd;
    },
}