from django.shortcuts import render
from django.http import HttpResponse
from .forms import CustomerForm

from rest_framework.decorators import api_view
from rest_framework.response import Response

CONTEXT_DATA = {
    "customerInfo": {
        "name": "John Doe",
        "gender": "Male",
        "idNumber": "123456789",
        "dayOfBirth": "1990-01-01",
        "familyRelation": "Brother",
        "agency": "Central Agency",
        "contractNumber": "CN-00123",
        "companyName": "Tech Innovators Inc.",
        "companyAddress": "123 Innovation Drive",
        "companyDistrict": "Central Business District",
        "companyProvince": "California",
        "group": "R&D"
    },
    "addressInfo": {
        "loanId": "LN-987654",
        "contractNumber": "CN-00123",
        "contractDate": "2023-01-01",
        "currentAccount": "ACC-123456",
        "dpdCurrent": "10",
        "dpdAssign": "8",
        "mob": "12",
        "loanAmount": "50000",
        "loanTerm": "24",
        "obsDueNo": "2",
        "paymentRequestDate": "2023-05-01",
        "assignInvalidDate": "2023-05-15",
        "penaltyAmount": "200",
        "interestAmount": "3000",
        "principalAmount": "47000",
        "posAssign": "5000",
        "totalPayment": "52000",
        "lastResultFinal": "Approved",
        "totalAmount": "55000",
        "dateStart": "2023-01-01",
        "dateEnd": "2025-01-01"
    },
    "paymentInfo": {
        "firstPaidDate": "2023-02-01",
        "accountNumber": "ACC-654321",
        "largestAmount": "5000",
        "lastPaymentDate": "2023-05-01",
        "disbursementDate": "2023-01-01",
        "cif": "CIF-789123",
        "dueDateOverdue": "2023-05-10",
        "nextDueDate": "2023-06-01",
        "nextDueAmount": "2500",
        "futurePrinAmt": "45000",
        "remainPrin": "45000",
        "posBom": "2000"
    },
    "contactInfo": {
        "penaltyAmount": "200",
        "interestAmount": "3000",
        "principalAmount": "47000",
        "posAssign": "5000",
        "lastResultFinal": "Approved",
        "totalAmount": "55000",
        "dateStart": "2023-01-01",
        "dateEnd": "2025-01-01",
        "totalPayment": "60000",
        "assignInvalidDate": "2023-06-01",
        "paymentRequestDate": "2023-05-15",
        "obsDueNo": "3",
        "loanTerm": "36",
        "loanAmount": "100000",
        "mob": "24",
        "dpdAssign": "10",
        "dpdCurrent": "5",
        "currentAccount": "ACC-12345",
        "contractDate": "2023-01-01",
        "contractNumber": "CN-789456",
        "loanID": "LN-987654"
    }
}

def htmx(request):
    if request.htmx:
        return render(request, "apps/customer/customer_info.html", {"context": CONTEXT_DATA})
    return render(request, "apps/customer/htmx.html", {"context": CONTEXT_DATA})


def contact_info(request):
    return render(request, "apps/customer/contact_info.html", {"context": CONTEXT_DATA})


def customer_info(request):
    return render(request, "apps/customer/customer_info.html", {"context": CONTEXT_DATA})


def address_info(request):
    return render(request, "apps/customer/address_info.html", {"context": CONTEXT_DATA})


def payment_info(request):
    # context = {
    #     "active" : "customer"
    # }
    return render(request, "apps/customer/payment_info.html", {"context": CONTEXT_DATA})


def submit_form(request):
    if request.method == 'POST':
        print("request.POST", request.POST)
    return render(request, "apps/customer/htmx.html", {"context": CONTEXT_DATA})


@api_view(['GET', 'PUT'])
def info_api(request):
    if request.method == 'PUT':
        return Response({"data": request.data})
    return Response({"data": CONTEXT_DATA})
