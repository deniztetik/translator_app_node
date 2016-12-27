const express    = require('express')
    , app        = express()
    , port       = process.env.PORT || 8080
    , bodyParser = require('body-parser')
    , request    = require('request')
    , translationController = require('./controllers/translationController');


// to make parsing requests easier ///
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

app.use(express.static(__dirname + '/static'));


app.post('/api/translations', function(req, res) {
  var options = {
    url: 'https://translation.googleapis.com/language/translate/v2',
    qs: { target: 'en', q: req.body.original_lang_text},
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ya29.El_AA4JzANBvzPp7xWI4lpLCAS4yCiz6worNhYkib_WaME0pnH-ROFCIxgZIgCp3yGzCm_WvMA8TFC2R_GN6hMGJHepwYgmBK98ADA7F6OnXP18MJ4lrQnzcrpfH7ve_-Q'
    }
  };
  request(options, function(error, response, body) {
    var parsedBody = JSON.parse(body);
    var original_lang = parsedBody.data.translations[0].detectedSourceLanguage;
    var eng_translation = parsedBody.data.translations[0].translatedText;
    var translation = {
      original_lang: original_lang,
      eng_translation: eng_translation,
      original_lang_text: req.body.original_lang_text
    };
    translationController.addTranslation(translation)
      .then(function() {
        res.send(translation);
      });
  });
});

  // request();
//curl -s -k -H 'Content-Type: application/json' \
// -H 'Authorization: Bearer ya29.El-8Aysqs5nB64_EUKeoJNSF34NMmIZ8bxYPaHuhxNIb8P6kYEgUhBLmhAjmzAOwf0-iKsbWeCjVIncACsbpntgiz4-a3zBieo1QHwkndot4W-Cj5uTtKtEY0LeZnTHc-w' \
// 'https://translation.googleapis.com/language/translate/v2' \
// -d @translate-request.json
// });

app.get('/api/translations', function(req, res) {
  console.log('GET');
});

// redirect gets to root if address not found //
// app.get('*', (req, res) => {
//     res.redirect('/');
// });

app.listen(port);

console.log('Translator App is now listening on port ' + port);

module.exports = app;