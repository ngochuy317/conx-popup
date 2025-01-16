from django.contrib import admin
from django.urls import path
from .views import (
    htmx,
    contact_info,
    customer_info,
    payment_info,
    product_info,
    address_info,
    phone_info,
    payment_info_api,
    address_info_api,
    customer_info_api,
    contact_info_api,
)

urlpatterns = [
    path('htmx/', htmx, name='htmx'),
    path('contact_info/', contact_info, name='contact-info'),
    path('customer_info/', customer_info, name='customer-info'),
    path('payment_info/', payment_info, name='payment-info'),
    path('address_info/', address_info, name='address-info'),
    path('product_info/', product_info, name='product-info'),
    path('phone_info/', phone_info, name='phone-info'),
    path('api/payment_info_api', payment_info_api, name='payment_info_api'),
    path('api/address_info_api', address_info_api, name='address_info_api'),
    path('api/customer_info_api', customer_info_api, name='customer_info_api'),
    path('api/contact_info_api', contact_info_api, name='contact_info_api'),
]
