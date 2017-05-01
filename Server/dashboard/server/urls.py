from django.conf.urls import url
from . import views
from rest_framework.urlpatterns import format_suffix_patterns
urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^data/$', views.DataList.as_view(), name='data'), #data list
    url(r'^data/(?P<pk>[0-9]+)/$', views.DataDetail.as_view()), #data details
]

urlpatterns = format_suffix_patterns(urlpatterns)
