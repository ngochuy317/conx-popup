from django.shortcuts import render, redirect
from django.http import HttpResponse
from .forms import CustomerInfoForm, ContactInfoForm, PaymentInfoForm, AddressInfoForm
from .models import *
from .serializers import AddressInfoSerializer, PaymentInfoSerializer

from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import AllowAny
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework import status


# customer = CustomerInfo.objects.first()
# address_info: AddressInfo = customer.address
# payment_info: PaymentInfo = customer.payment
# contact_info: ContactInfo = customer.contact
# CONTEXT_DATA = {
#     "customerInfo": {
#         "name": customer.name,
#         "gender": customer.gender,
#         "idNumber": customer.id_number,
#         "dayOfBirth": customer.day_of_birth,
#         "familyRelation": customer.family_relation,
#         "agency": customer.agency,
#         "contractNumber": customer.contract_number,
#         "companyName": customer.company_name,
#         "companyAddress": customer.company_address,
#         "companyDistrict": customer.company_district,
#         "companyProvince": customer.company_province,
#         "group": customer.group
#     },
#     "addressInfo": {
#         "loanId": address_info.loan_id,
#         "contractNumber": address_info.contract_number,
#         "contractDate": address_info.contract_date,
#         "currentAccount": address_info.current_account,
#         "dpdCurrent": address_info.dpd_current,
#         "dpdAssign": address_info.dpd_assign,
#         "mob": address_info.mob,
#         "loanAmount": address_info.loan_amount,
#         "loanTerm": address_info.loan_term,
#         "obsDueNo": address_info.obs_due_no,
#         "paymentRequestDate": address_info.payment_request_date,
#         "assignInvalidDate": address_info.assign_invalid_date,
#         "penaltyAmount": address_info.penalty_amount,
#         "interestAmount": address_info.interest_amount,
#         "principalAmount": address_info.principal_amount,
#         "posAssign": address_info.pos_assign,
#         "totalPayment": address_info.total_payment,
#         "lastResultFinal":address_info.last_result_final,
#         "totalAmount": address_info.total_amount,
#         "dateStart": address_info.date_start,
#         "dateEnd": address_info.date_end
#     },
#     "paymentInfo": {
#         "firstPaidDate": payment_info.first_paid_date,
#         "accountNumber": payment_info.account_number,
#         "largestAmount": payment_info.largest_amount,
#         "lastPaymentDate": payment_info.last_payment_date,
#         "disbursementDate": payment_info.disbursement_date,
#         "cif": payment_info.cif,
#         "dueDateOverdue": payment_info.due_date_overdue,
#         "nextDueDate": payment_info.next_due_date,
#         "nextDueAmount": payment_info.next_due_amount,
#         "futurePrinAmt": payment_info.future_prin_amt,
#         "remainPrin": payment_info.remain_prin,
#         "posBom": payment_info.pos_bom
#     },
#     "contactInfo": {
#         "penaltyAmount": contact_info.penalty_amount,
#         "interestAmount": contact_info.interest_amount,
#         "principalAmount": contact_info.principal_amount,
#         "posAssign": contact_info.pos_assign,
#         "lastResultFinal": contact_info.last_result_final,
#         "totalAmount": contact_info.total_amount,
#         "dateStart": contact_info.date_start,
#         "dateEnd": contact_info.date_end,
#         "totalPayment": contact_info.total_payment,
#         "assignInvalidDate": contact_info.assign_invalid_date,
#         "paymentRequestDate": contact_info.payment_request_date,
#         "obsDueNo": contact_info.obs_due_no,
#         "loanTerm": contact_info.loan_term,
#         "loanAmount": contact_info.loan_amount,
#         "mob": contact_info.mob,
#         "dpdAssign": contact_info.dpd_assign,
#         "dpdCurrent": contact_info.dpd_current,
#         "currentAccount": contact_info.current_account,
#         "contractDate": contact_info.contract_date,
#         "contractNumber": contact_info.contract_number,
#         "loanID": contact_info.loan_id
#     }
# }

# CONTEXT_DATA = {
#     "customerInfo": {
#         "name": "John Doe",
#         "gender": "Male",
#         "idNumber": "123456789",
#         "dayOfBirth": "1990-01-01",
#         "familyRelation": "Brother",
#         "agency": "Central Agency",
#         "contractNumber": "CN-00123",
#         "companyName": "Tech Innovators Inc.",
#         "companyAddress": "123 Innovation Drive",
#         "companyDistrict": "Central Business District",
#         "companyProvince": "California",
#         "group": "R&D"
#     },
#     "addressInfo": {
#         "loanId": "LN-987654",
#         "contractNumber": "CN-00123",
#         "contractDate": "2023-01-01",
#         "currentAccount": "ACC-123456",
#         "dpdCurrent": "10",
#         "dpdAssign": "8",
#         "mob": "12",
#         "loanAmount": "50000",
#         "loanTerm": "24",
#         "obsDueNo": "2",
#         "paymentRequestDate": "2023-05-01",
#         "assignInvalidDate": "2023-05-15",
#         "penaltyAmount": "200",
#         "interestAmount": "3000",
#         "principalAmount": "47000",
#         "posAssign": "5000",
#         "totalPayment": "52000",
#         "lastResultFinal": "Approved",
#         "totalAmount": "55000",
#         "dateStart": "2023-01-01",
#         "dateEnd": "2025-01-01"
#     },
#     "paymentInfo": {
#         "firstPaidDate": "2023-02-01",
#         "accountNumber": "ACC-654321",
#         "largestAmount": "5000",
#         "lastPaymentDate": "2023-05-01",
#         "disbursementDate": "2023-01-01",
#         "cif": "CIF-789123",
#         "dueDateOverdue": "2023-05-10",
#         "nextDueDate": "2023-06-01",
#         "nextDueAmount": "2500",
#         "futurePrinAmt": "45000",
#         "remainPrin": "45000",
#         "posBom": "2000"
#     },
#     "contactInfo": {
#         "penaltyAmount": "200",
#         "interestAmount": "3000",
#         "principalAmount": "47000",
#         "posAssign": "5000",
#         "lastResultFinal": "Approved",
#         "totalAmount": "55000",
#         "dateStart": "2023-01-01",
#         "dateEnd": "2025-01-01",
#         "totalPayment": "60000",
#         "assignInvalidDate": "2023-06-01",
#         "paymentRequestDate": "2023-05-15",
#         "obsDueNo": "3",
#         "loanTerm": "36",
#         "loanAmount": "100000",
#         "mob": "24",
#         "dpdAssign": "10",
#         "dpdCurrent": "5",
#         "currentAccount": "ACC-12345",
#         "contractDate": "2023-01-01",
#         "contractNumber": "CN-789456",
#         "loanID": "LN-987654"
#     }
# }

def htmx(request):
    return render(request, "apps/customer/htmx.html")


def contact_info(request):
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
            "loan_id": "LN-987654"
        })
    contact_form = ContactInfoForm(request.POST or None, instance=contact_info_instance)
    if request.method == "POST" and contact_form.is_valid():
        contact_form.save()
        return redirect('contact_info')
    context = {
        "form": contact_form
    }
    
    return render(request, "apps/customer/contact_info.html", context)


def customer_info(request):
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
    customer_form = CustomerInfoForm(request.POST or None, instance=customer_info_instance)
    if request.method == "POST" and customer_form.is_valid():
        customer_form.save()
        return redirect('customer_info')
    context = {
        "form": customer_form,
        "active_tab": "customer_info",
    }
    return render(request, "apps/customer/customer_info.html", context)


def address_info(request):
    address_info_instance = AddressInfo.objects.first()
    if not address_info_instance:
        address_info_instance = AddressInfo.objects.create(**{
            "permanent_address": "permanent_address",
            "temporary_address": "temporary_address",
            "region": "region",
            "province": "province",
            "district": "district",
        })
    address_form = AddressInfoForm(request.POST or None, instance=address_info_instance)
    if request.method == "POST" and address_form.is_valid():
        address_form.save()
    context = {
        "form": address_form
    }
    return render(request, "apps/customer/address_info.html", context)


def payment_info(request):
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
    payment_form = PaymentInfoForm(request.POST or None, instance=payment_info_instance)
    if request.method == "POST" and payment_form.is_valid():
        payment_form.save()
        return redirect('payment_info')
    context = {
        "form": payment_form
    }
    return render(request, "apps/customer/payment_info.html", context)


def submit_form(request):
    if request.method == 'POST':
        print("request.POST", request.POST)
    return render(request, "apps/customer/htmx.html", {"context": 'CONTEXT_DATA'})


@api_view(['GET', 'PUT'])
def payment_info_api(request):
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
    if request.method == 'PUT':
        return Response({"data": request.data})
    return Response({"data": 'CONTEXT_DATA'})


@api_view(['GET', 'POST'])
def payment_info_api(request):
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
    if request.method == 'GET':
        serializer = PaymentInfoSerializer(payment_info_instance)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = PaymentInfoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'POST'])
def address_info_api(request):
    address_info_instance = AddressInfo.objects.first()
    if not address_info_instance:
        address_info_instance = AddressInfo.objects.create(**{
            "permanent_address": "permanent_address",
            "temporary_address": "temporary_address",
            "region": "region",
            "province": "province",
            "district": "district",
        })
    if request.method == 'GET':
        serializer = AddressInfoSerializer(address_info_instance)
        return Response(serializer.data)

    if request.method == 'POST':
        serializer = AddressInfoSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
