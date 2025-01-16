from django import forms
from .models import (
    CustomerInfo,
    PaymentInfo,
    AddressInfo,
    ContactInfo,
    ProductInfo,
    PhoneInfo,
)


class PhoneInfoForm(forms.ModelForm):
    spouse_name = forms.CharField(required=False, label="Tên Vợ/Chồng")
    contact_name_1 = forms.CharField(required=False, label="Liên hệ thứ 1")
    contact_relationship_1 = forms.CharField(required=False, label="Mối quan hệ của SDT thứ 1")
    contact_name_2 = forms.CharField(required=False, label="Liên hệ thứ 2")
    contact_relationship_2 = forms.CharField(required=False, label="Mối quan hệ của SDT thứ 2")
    family_book = forms.CharField(required=False, label="Family Book")
    other_contact_name = forms.CharField(required=False, label="Tên liên hệ khác")
    other_contact_name_2 = forms.CharField(required=False, label="Tên liên hệ khác 2")

    class Meta:
        model = PhoneInfo
        fields = '__all__'


class ProductInfoForm(forms.ModelForm):
    product = forms.CharField(required=False)
    class Meta:
        model = ProductInfo
        fields = '__all__'


class CustomerInfoForm(forms.ModelForm):
    name = forms.CharField(required=False, label="Tên KH")
    id_number = forms.CharField(max_length=20, label="CCCD")
    day_of_birth = forms.DateField(label="Ngày sinh", required=False)
    gender = forms.CharField(label="Giới tính", required=False)
    contract_number = forms.CharField(label="Số hợp đồng", required=False)
    company_name = forms.CharField(label="Tên công ty", required=False)
    company_address = forms.CharField(label="Địa chỉ công ty", required=False)
    company_district = forms.CharField(label="Địa chỉ công ty - Quận/Huyện", required=False)
    company_province = forms.CharField(label="Địa chỉ công ty - Tỉnh/TP", required=False)

    class Meta:
        model = CustomerInfo
        fields = '__all__'


class ContactInfoForm(forms.ModelForm):
    loan_id = forms.CharField(required=False, label="Loan ID")
    contract_number = forms.CharField(required=False, label="Số hợp đồng")
    contract_date = forms.DateField(required=False, label="Contract Date")
    current_account = forms.CharField(required=False, label="Current Account")
    dpd_current = forms.CharField(required=False, label="DPD Current")
    dpd_assign = forms.CharField(required=False, label="DPD Assign")
    mob = forms.CharField(required=False, label="MOB")
    loan_amount = forms.CharField(required=False, label="Số tiền vay")
    loan_term = forms.CharField(required=False, label="Số kỳ hạn vay")
    obs_due_no = forms.CharField(required=False, label="OBS Due No")
    payment_request_date = forms.DateField(required=False, label="Ngày đề nghị thanh toán")
    assign_invalid_date = forms.DateField(required=False, label="Assign Invalid Date")
    penalty_amount = forms.CharField(required=False, label="Số tiền phạt phát sinh")
    interest_amount = forms.CharField(required=False, label="Số tiền lãi phát sinh")
    principal_amount = forms.CharField(required=False, label="Số tiền nợ gốc đã phát sinh")
    pos_assign = forms.CharField(required=False, label="POS Assign")
    total_payment = forms.CharField(required=False, label="Tổng số tiền thanh toán")
    last_result_final = forms.CharField(required=False, label="Last Result Final")
    total_amount = forms.CharField(required=False, label="Total_Amount")
    date_start = forms.DateField(required=False, label="Date Start")
    date_end = forms.DateField(required=False, label="Date End")
    late_days = forms.IntegerField(required=False, label="Số ngày trễ hạn")
    monthly_payment = forms.IntegerField(required=False, label="Số tiền phải đóng hàng tháng")

    class Meta:
        model = ContactInfo
        fields = '__all__'


class PaymentInfoForm(forms.ModelForm):
    first_paid_date = forms.DateField(required=False, label="First Paid Date")
    account_number = forms.CharField(required=False, label="Số tài khoản")
    largest_amount = forms.CharField(required=False, label="Số tiền thanh toán gần nhất")
    last_payment_date = forms.DateField(required=False, label="Ngày thanh toán gần nhất")
    disbursement_date = forms.DateField(required=False, label="Disbursement Date")
    cif = forms.CharField(required=False, label="CIF")
    due_date_overdue = forms.DateField(required=False, label="Due Date Overdue")
    next_due_date = forms.DateField(required=False, label="Ngày đến hạn chu kỳ tiếp theo")
    next_due_amount = forms.CharField(required=False, label="Số tiền phải đóng trong chu kỳ tiếp theo")
    future_prin_amt = forms.CharField(required=False, label="Future PRIN AMT")
    remain_prin = forms.CharField(required=False, label="Remain PRIN")
    pos_bom = forms.CharField(required=False, label="POS bom")

    class Meta:
        model = PaymentInfo
        fields = '__all__'


class AddressInfoForm(forms.ModelForm):
    permanent_address = forms.CharField(required=False, label="Địa chỉ thường trú")
    temporary_address = forms.CharField(required=False, label="Địa chỉ tạm trú")
    region = forms.CharField(required=False, label="Vùng")
    district = forms.CharField(required=False, label="Quận/Huyện")
    province = forms.CharField(required=False, label="Tỉnh")

    class Meta:
        model = AddressInfo
        fields = '__all__'