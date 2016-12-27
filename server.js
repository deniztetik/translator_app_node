const express    = require('express')
    , app        = express()
    , port       = process.env.PORT || 8080
    , bodyParser = require('body-parser')
    , google     = require('googleapis')
    , translate  = google.translate('v2')
    , translationController = require('./controllers/translationController')
    , GOOGLE_API_KEY = require('./config/config')
    , isoLangs = require('./config/iso_lang_codes');

// to make parsing requests easier ///
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static(__dirname + '/static'));


app.post('/api/translations', function(req, res) {
  var params = {
    target: 'en',
    q: req.body.original_lang_text,
    auth: GOOGLE_API_KEY
  };
  translate.translations.list(params, {}, function (err, response) {
    var parsedBody = response;
    var original_lang = parsedBody.data.translations[0].detectedSourceLanguage;
    var eng_translation = parsedBody.data.translations[0].translatedText;
    var translation = {
      original_lang: isoLangs[original_lang].name,
      eng_translation: eng_translation,
      original_lang_text: req.body.original_lang_text
    };
    translationController.addTranslation(translation)
      .then(function () {
        res.send(translation);
      });
  });
});

app.get('/api/translations', function(req, res) {
  translationController.getTranslations()
    .then(function(translations) {
      res.send(translations.map(translation => translation.attributes));
    });
});

app.listen(port);

console.log('Translator App is now listening on port ' + port);

module.exports = app;