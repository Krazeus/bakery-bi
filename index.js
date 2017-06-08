/*!
 * @author myax <mig_dj@hotmail.com>
 * date 7/6/2017
 * data generator.
 */
const fs = require('fs'),
    empty = require('is-empty'),
    guid = require('guid'),
    moment = require('moment'),
    // dates = require('./data/dates.json'),
    dates = [],
    stores = ['Totonicapan', 'San Cristobal', 'Quetzaltenango', '4 Caminos'],
    types = ['Tarjeta', 'Efectivo'],
    products = [
        { name: 'Pan dulce', c: 0.33 },
        { name: 'Pan frances', c: 0.33 },
        { name: 'Pan de yemas', c: 1 },
        { name: 'Xeca', c: 3 },
        { name: 'Champurrada', c: 1 },
        { name: 'Pirujo', c: 1 },
        { name: 'Concha', c: 1 },
        { name: 'Cubiletes', c: 1.5 },
        { name: 'Pan galleta', c: 1 },
    ];
/**
 * @method getIndex obtiene un numero aleatorio 
 * @param {Number} limit  `10` limite
 * @return {number} index `0` numero aleatorio
 * @private
 */
let rand = function (max, min) {
    max = max || 10;
    min = min || 1;
    return Math.floor((Math.random() * max)) + min;
};

let randDate = function () {
    let date = [rand(31), rand(12), 2010 + rand(5)];
    while (!moment(date.join('/'), 'DD/MM/YYYY').isValid()) {
        date[0] = rand(31);
    }
    return { f: date.join('/'), d: date[0], m: date[1], y: date[2] };
};

// // let sales = dates.map(function (d, i) {
let date = {},
    unit = 0,
    prod = {},
    sales = [],
    pl = products.length;

for (var i = 0; i < 100000; i++) {
    date = randDate();
    unit = rand(300);
    prod = products[rand(pl) - 1];

    sales.push({
        t: stores[rand(4) - 1],
        y: date.y,
        f: date.f,
        tp: types[rand(2) - 1],
        // ic: guid.raw(),
        i: guid.raw(),
        p: prod.name,
        u: unit,
        uc: prod.c,
        m: parseFloat(unit * prod.c).toFixed(2)
    });
}
// });

fs.writeFile('data/sales.json', JSON.stringify(sales), function (err) {
    if (err) {
        return console.log(err);
    }
    console.log('Writed');
});