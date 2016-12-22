from django.db import models


# Create your models here.
class Translation(models.Model):
    pub_date = models.DateTimeField('date created')
    original_lang_text = models.CharField(max_length=500)
    eng_translation = models.CharField(max_length=500)

    def __str__(self):
        return [self.original_lang_text, self.eng_translation]

    def dict_to_class(self, req_body):
        self.pub_date = req_body['pub_date']
        self.original_lang_text = req_body['original_lang_text']
        self.eng_translation = req_body['eng_translation']
