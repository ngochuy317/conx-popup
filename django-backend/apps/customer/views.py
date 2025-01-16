from django.shortcuts import render, redirect
from django.http import HttpRequest, HttpResponse

from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .forms import (
    CustomerInfoForm,
    ContactInfoForm,
    PaymentInfoForm,
    AddressInfoForm,
    ProductInfoForm,
    PhoneInfoForm,
)
from .models import (
    ContactInfo,
    CustomerInfo,
    AddressInfo,
    PaymentInfo,
    ProductInfo,
    PhoneInfo,
    CallOutcome,
)
from .serializers import (
    AddressInfoSerializer,
    PaymentInfoSerializer,
    ContactInfoSerializer,
    CustomerInfoSerializer,
)


def init_call_outcome_info_data() -> CallOutcome:
    call_outcome_info_instance = CallOutcome.objects.first()
    if not call_outcome_info_instance:
        call_outcome_info_instance = CallOutcome.objects.create(**{
            "pds": True,
            "final": True,
            "contacted_person": "Nam",
            "action_code": "ACC",
            "reason_code": "TTA",
            "note": "Ghi chú sample",
            "payment_date": "2023-01-01",
            "payment_amount": 1234,
        })
    return call_outcome_info_instance


def init_phone_info_data() -> PhoneInfo:
    phone_info_instance = PhoneInfo.objects.first()
    if not phone_info_instance:
        phone_info_instance = PhoneInfo.objects.create(**{
            "spouse_name": "",
            "contact_name_1": "",
            "contact_relationship_1": "",
            "contact_name_2": "",
            "contact_relationship_2": "",
            "family_book": "",
            "other_contact_name": "",
            "other_contact_name_2": "",
        })
    return phone_info_instance


def init_product_info_data() -> ProductInfo:
    product_info_instance = ProductInfo.objects.first()
    if not product_info_instance:
        product_info_instance = ProductInfo.objects.create(**{
            "product": "UPL",
        })
    return product_info_instance


def init_contact_info_data() -> ContactInfo:
    contact_info_instance = ContactInfo.objects.first()
    if not contact_info_instance:
        contact_info_instance = ContactInfo.objects.create(**{
            "penalty_amount": "200",
            "interest_amount": "3000",
            "principal_amount": "47000",
            "pos_assign": "5000",
            "last_result_final": "Approved",
            "total_amount": "55000",
            "date_start": "2023-01-01",
            "date_end": "2025-01-01",
            "total_payment": "60000",
            "assign_invalid_date": "2023-06-01",
            "payment_request_date": "2023-05-15",
            "obs_due_no": "3",
            "loan_term": "36",
            "loan_amount": "100000",
            "mob": "24",
            "dpd_assign": "10",
            "dpd_current": "5",
            "current_account": "ACC-12345",
            "contract_date": "2023-01-01",
            "contract_number": "CN-789456",
            "loan_id": "LN-987654",
            "late_days": 0,
            "monthly_payment": 0,
        })
    return contact_info_instance


def init_customer_info_data() -> CustomerInfo:
    customer_info_instance = CustomerInfo.objects.first()
    if not customer_info_instance:
        customer_info_instance = CustomerInfo.objects.create(**{
            "name": "John Doe",
            "gender": "Male",
            "id_number": "123456789",
            "day_of_birth": "1990-01-01",
            "family_relation": "Brother",
            "agency": "Central Agency",
            "contract_number": "CN-00123",
            "company_name": "Tech Innovators Inc.",
            "company_address": "123 Innovation Drive",
            "company_district": "Central Business District",
            "company_province": "California",
            "group": "R&D"
        })
    return customer_info_instance


def init_address_info_data() -> AddressInfo:
    address_info_instance = AddressInfo.objects.first()
    if not address_info_instance:
        address_info_instance = AddressInfo.objects.create(**{
            "permanent_address": "permanent_address",
            "temporary_address": "temporary_address",
            "region": "region",
            "province": "province",
            "district": "district",
        })
    return address_info_instance


def init_payment_info_data() -> PaymentInfo:
    payment_info_instance = PaymentInfo.objects.first()
    if not payment_info_instance:
        payment_info_instance = PaymentInfo.objects.create(**{
            "first_paid_date": "2023-02-01",
            "account_number": "ACC-654321",
            "largest_amount": "5000",
            "last_payment_date": "2023-05-01",
            "disbursement_date": "2023-01-01",
            "cif": "CIF-789123",
            "due_date_overdue": "2023-05-10",
            "next_due_date": "2023-06-01",
            "next_due_amount": "2500",
            "future_prin_amt": "45000",
            "remain_prin": "45000",
            "pos_bom": "2000"
        })
    return payment_info_instance


def htmx(request: HttpRequest):
    context = {
        "active_tab": "customer-info",
    }
    return render(request, "apps/customer/htmx.html")


def phone_info(request: HttpRequest) -> HttpResponse:
    phone_info_instance = init_phone_info_data()
    phone_form = PhoneInfoForm(request.POST or None, instance=phone_info_instance)
    if request.method == "POST" and phone_form.is_valid():
        phone_form.save()
        return redirect('phone-info')
    context = {
        "form": phone_form,
        "active_tab": "phone-info",
    }
    return render(request, "apps/customer/phone_info.html", context)


def product_info(request: HttpRequest) -> HttpResponse:
    product_info_instance = init_product_info_data()
    product_form = ProductInfoForm(request.POST or None, instance=product_info_instance)
    if request.method == "POST" and product_form.is_valid():
        product_form.save()
        return redirect('product-info')
    context = {
        "form": product_form,
        "active_tab": "product-info",
    }
    return render(request, "apps/customer/product_info.html", context)


def contact_info(request: HttpRequest) -> HttpResponse:
    contact_info_instance = init_contact_info_data()
    contact_form = ContactInfoForm(request.POST or None, instance=contact_info_instance)
    if request.method == "POST" and contact_form.is_valid():
        contact_form.save()
        return redirect('contact-info')
    context = {
        "form": contact_form,
        "active_tab": "contact-info",
    }
    
    return render(request, "apps/customer/contact_info.html", context)


def customer_info(request: HttpRequest) -> HttpResponse:
    customer_info_instance = init_customer_info_data()
    customer_form = CustomerInfoForm(request.POST or None, instance=customer_info_instance)
    if request.method == "POST" and customer_form.is_valid():
        customer_form.save()
        return redirect('customer-info')
    context = {
        "form": customer_form,
        "active_tab": "customer-info",
    }
    return render(request, "apps/customer/customer_info.html", context)


def address_info(request: HttpRequest) -> HttpResponse:
    address_info_instance = init_address_info_data()
    address_form = AddressInfoForm(request.POST or None, instance=address_info_instance)
    if request.method == "POST" and address_form.is_valid():
        address_form.save()
        return redirect('address-info')
    context = {
        "form": address_form,
        "active_tab": "address-info",
    }
    return render(request, "apps/customer/address_info.html", context)


def payment_info(request: HttpRequest) -> HttpResponse:
    payment_info_instance = init_payment_info_data()
    payment_form = PaymentInfoForm(request.POST or None, instance=payment_info_instance)
    if request.method == "POST" and payment_form.is_valid():
        payment_form.save()
        return redirect('payment-info')
    context = {
        "form": payment_form,
        "active_tab": "payment-info",
    }
    return render(request, "apps/customer/payment_info.html", context)


@api_view(['GET', 'POST'])
def payment_info_api(request: HttpRequest) -> Response:
    payment_info_instance = init_payment_info_data()
    if request.method == 'GET':
        serializer = PaymentInfoSerializer(payment_info_instance)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = PaymentInfoSerializer(payment_info_instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def address_info_api(request: HttpRequest) -> Response:
    address_info_instance = init_address_info_data()
    if request.method == 'GET':
        serializer = AddressInfoSerializer(address_info_instance)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = AddressInfoSerializer(address_info_instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def contact_info_api(request: HttpRequest) -> Response:
    contact_info_instance = init_contact_info_data()
    if request.method == 'GET':
        serializer = ContactInfoSerializer(contact_info_instance)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = ContactInfoSerializer(contact_info_instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def customer_info_api(request: HttpRequest) -> Response:
    customer_info_instance = init_customer_info_data()
    if request.method == 'GET':
        serializer = CustomerInfoSerializer(customer_info_instance)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = CustomerInfoSerializer(customer_info_instance, data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
