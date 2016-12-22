from django.conf.urls import url

from . import views

urlpatterns = [
    # ex: /events/
    url(r'^$', views.index, name='index'),
    # ex: /events/5
    # url(r'^(?P<event_id>[0-9]+)/$', views.detail, name='detail'),
]