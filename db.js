"use strict"
/**
 *   Creates our schema for storing our app's data. We create two tables,
 *   one to store csv file names and one to store the expense data.
 */

const knex = require('knex')({
  client: 'mysql',
  connection: {
    host     : '127.0.0.1',
    port     : '3306',
    user     : 'root',
    password : '',
    database : 'translator_app_node',
    charset  : 'utf8'
  }
});

knex.schema.hasTable('translations').then(function(exists) {
  if (!exists) {
    return knex.schema.createTable('translations', function (translation) {
      translation.increments('id').primary();
      translation.string('original_lang_text', 500);
      translation.string('eng_translation', 500);
      translation.string('original_lang', 500);
      translation.timestamps();
      console.log(`Created translations table`);
    });
  }
});

// pub_date = models.DateTimeField('date created')
// original_lang_text = models.CharField(max_length=500)
// eng_translation = models.CharField(max_length=500)
// original_lang = models.CharField(max_length=500, default='es')

const Bookshelf = require('bookshelf')(knex);

module.exports = {
  Bookshelf: Bookshelf,
  knex: knex
};