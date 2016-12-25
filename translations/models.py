from datetime import datetime

import requests
from django.db import models

GOOGLE_TRANSLATE_API_KEY = 'ya29.El-8Aysqs5nB64_EUKeoJNSF34NMmIZ8bxYPaHuhxNIb8P6kYEgUhBLmhAjmzAOwf0-iKsbWeCjVIncACsbpntgiz4-a3zBieo1QHwkndot4W-Cj5uTtKtEY0LeZnTHc-w'


# Create your models here.
class Translation(models.Model):
    pub_date = models.DateTimeField('date created')
    original_lang_text = models.CharField(max_length=500)
    eng_translation = models.CharField(max_length=500)
    original_lang = models.CharField(max_length=500, default='es')

    def __str__(self):
        return str([self.original_lang_text, self.original_lang, self.eng_translation])

    def dict_to_class(self, req_body):
        self.pub_date = datetime.now()
        # self.original_lang = req_body['original_lang']
        self.original_lang_text = req_body['original_lang_text']
        self.get_english_translation_and_source_language()
        print(self.original_lang)

    # Sample Google Translate API Params
    # {
    #   'q': 'Dónde Está La Playa',
    #   'target': 'en',
    #   'format': 'text'
    # }
    def get_english_translation_and_source_language(self):
        payload = {'q': self.original_lang_text, 'target': 'en', 'format': 'text'}
        headers = {
            'Authorization': 'Bearer ya29.El-_A56Zzw69zAwmYuWZc8A1fxp11bgkPpvJD4hB5l2f2OrqBywQyspdMDKGgLnihmjCabmeV8i4RR_DA241LIdBCU4i3WmH_ki9JQxJuuArhSy3OVnWEpC-1usw-5kXtw'}
        print(headers)
        r = requests.get('https://translation.googleapis.com/language/translate/v2', params=payload, headers=headers)
        print(r.json())
        self.original_lang = r.json()['data']['translations'][0]['detectedSourceLanguage']
        self.eng_translation = r.json()['data']['translations'][0]['translatedText']
