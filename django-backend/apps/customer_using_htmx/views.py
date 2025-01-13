from django.shortcuts import render
from django.http import HttpResponse
from .forms import CustomerForm

context_data = {
    "info": {
        "name": "John Doe",
        "gender": "Male",
        "id_number": "123456789",
        "day_of_birth": "1990-01-01",
    }
}

def htmx(request):
    if request.htmx:
        print('11111111111')

        return render(request, "apps/customer/customer_info.html", {"context": context_data})
    return render(request, "apps/customer/htmx.html", {"context": context_data})
