const flr = Math.floor;

module.exports = {
    MILLISECOND: 1,
    SECOND: 1000,
    MINUTE: flr(1000 * 60),
    HOUR: flr((1000 * 60) * 60)
};