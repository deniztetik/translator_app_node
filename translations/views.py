import json

from django.http import HttpResponse

# Create your views here.
from django.core import serializers
from django.views.decorators.csrf import csrf_exempt

from .models import Translation


@csrf_exempt
def index(request):
    if request.method == "GET":
        data = serializers.serialize("json", Translation.objects.all())
        return HttpResponse(data)
    if request.method == "POST":
        # these two lines convert JSON into a Python dict
        # so we can further process the data
        body_unicode = request.body.decode('utf-8')
        body = json.loads(r'%s' % body_unicode)
        ###
        # create new event, convert request body dict into model properties,
        # and then save in db
        translation = Translation()
        translation.dict_to_class(body)
        translation.save()
        created_translation = Translation.objects.filter(id=translation.id)
        return HttpResponse(serializers.serialize("json", created_translation))
