from django.contrib import admin
from .models import ContactInfo, CustomerInfo, AddressInfo, PaymentInfo
# Register your models here.

admin.site.register(ContactInfo)
admin.site.register(CustomerInfo)
admin.site.register(AddressInfo)
admin.site.register(PaymentInfo)