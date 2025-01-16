from django.contrib import admin
from django.urls import path
from .views import (
    htmx,
    contact_info,
    customer_info,
    payment_info,
    submit_form,
    address_info,
    payment_info_api,
    address_info_api,
    customer_info_api,
    contact_info_api,
)

urlpatterns = [
    path('htmx/', htmx, name='htmx'),
    path('contact_info/', contact_info, name='contact_info'),
    path('customer_info/', customer_info, name='customer_info'),
    path('payment_info/', payment_info, name='payment_info'),
    path('address_info/', address_info, name='address_info'),
    path('submit_form/', submit_form, name='submit_form'),
    path('api/payment_info_api', payment_info_api, name='payment_info_api'),
    path('api/address_info_api', address_info_api, name='address_info_api'),
    path('api/customer_info_api', customer_info_api, name='customer_info_api'),
    path('api/contact_info_api', contact_info_api, name='contact_info_api'),
]
