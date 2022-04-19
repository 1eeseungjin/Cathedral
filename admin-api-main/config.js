const mysql = require('mysql');
const db_config = {
    host: 'ryucheat.com',
    user: 'boshow',
    password: '123789456123456789',
    database: 'boshow',
    typeCast: function (field, next) {
        if (field.type == 'VAR_STRING') {
            return field.string();
        }
        if (field.type == 'STRING') {
            return field.string();
        }
        return next();
    },
};

const connections = [];

const first_db = mysql.createConnection(db_config);
connections.push(first_db);

module.exports = {
    db: () => {
        let t = first_db;
        return t;
    },
};

setInterval(() => {
    for (let c of connections) c.query('select ' + Math.random(), () => { });
}, 60 * 1000);