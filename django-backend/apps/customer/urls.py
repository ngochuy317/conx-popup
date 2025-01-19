from django.contrib import admin
from django.urls import path
from .views import (
    alpine_index,
    htmx_index,
    htmx_contact_info,
    htmx_customer_info,
    htmx_payment_info,
    htmx_product_info,
    htmx_address_info,
    htmx_phone_info,
    alpine_phone_info,
    payment_info_api,
    address_info_api,
    customer_info_api,
    contact_info_api,
    call_outcome_api,
    phone_info_api,
)

urlpatterns = [
    path('alpinejs/', alpine_index, name='alpine-index'),
    path('alpine_phone_info/', alpine_phone_info, name='alpine-phone-info'),
    path('htmx/', htmx_index, name='htmx-index'),
    path('contact_info/', htmx_contact_info, name='htmx-contact-info'),
    path('customer_info/', htmx_customer_info, name='htmx-customer-info'),
    path('payment_info/', htmx_payment_info, name='htmx-payment-info'),
    path('address_info/', htmx_address_info, name='htmx-address-info'),
    path('product_info/', htmx_product_info, name='htmx-product-info'),
    path('phone_info/', htmx_phone_info, name='htmx-phone-info'),
    path('api/payment_info_api', payment_info_api, name='payment_info_api'),
    path('api/address_info_api', address_info_api, name='address_info_api'),
    path('api/customer_info_api', customer_info_api, name='customer_info_api'),
    path('api/phone_info_api', phone_info_api, name='phone_info_api'),
    path('api/contact_info_api', contact_info_api, name='contact_info_api'),
    path('api/call_outcome_api', call_outcome_api, name='call-outcome-api'),
]
