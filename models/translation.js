"use strict";
const db = require('../db.js');

var Translation = db.Bookshelf.Model.extend({
  tableName: 'translations',
  hasTimestamps: true
});

module.exports = Translation;