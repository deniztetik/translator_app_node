"use strict"
const Translation = require('../models/translation.js');


exports.addTranslation = function(translation) {
  return new Translation({
    original_lang_text: translation.original_lang_text,
    original_lang: translation.original_lang,
    eng_translation: translation.eng_translation
  }).save();
};


/**
 This function will take an email for input and return a
 'User' Bookshelf model
 */
exports.getTranslations = function() {
  return Translation.fetchAll();
};