from django.db import models

# Create your models here.
from django.db import models

class CustomerInfo(models.Model):
    name = models.CharField(max_length=255)
    gender = models.CharField(max_length=50)
    id_number = models.CharField(max_length=20, unique=True)
    day_of_birth = models.DateField()
    family_relation = models.CharField(max_length=255, blank=True, null=True)
    agency = models.CharField(max_length=255, blank=True, null=True)
    contract_number = models.CharField(max_length=100)
    company_name = models.CharField(max_length=255, blank=True, null=True)
    company_address = models.CharField(max_length=255, blank=True, null=True)
    company_district = models.CharField(max_length=255, blank=True, null=True)
    company_province = models.CharField(max_length=255, blank=True, null=True)
    group = models.CharField(max_length=100, blank=True, null=True)

    def __str__(self):
        return self.name


class AddressInfo(models.Model):
    permanent_address = models.CharField(max_length=500)
    temporary_address = models.CharField(max_length=500)
    region = models.CharField(max_length=100)
    province = models.CharField(max_length=100)
    district = models.CharField(max_length=100)


class PhoneInfo(models.Model):
    spouse_name = models.CharField(max_length=300)
    contact_name_1 = models.CharField(max_length=300)
    contact_relationship_1 = models.CharField(max_length=300)
    contact_name_2 = models.CharField(max_length=300)
    contact_relationship_2 = models.CharField(max_length=300)
    family_book = models.CharField(max_length=300)
    other_contact_name = models.CharField(max_length=300)
    other_contact_name_2 = models.CharField(max_length=300)


class ProductInfo(models.Model):
    product = models.CharField(max_length=300)


class CallOutcome(models.Model):
    pds = models.BooleanField()
    final = models.BooleanField()
    contacted_person = models.CharField(max_length=300)
    action_code = models.CharField(max_length=300)
    reason_code = models.CharField(max_length=300)
    note = models.TextField(max_length=300)
    payment_date = models.DateField()
    payment_amount = models.IntegerField()


class PaymentInfo(models.Model):
    first_paid_date = models.DateField()
    account_number = models.CharField(max_length=100)
    largest_amount = models.DecimalField(max_digits=12, decimal_places=2)
    last_payment_date = models.DateField()
    disbursement_date = models.DateField()
    cif = models.CharField(max_length=100)
    due_date_overdue = models.DateField()
    next_due_date = models.DateField()
    next_due_amount = models.DecimalField(max_digits=12, decimal_places=2)
    future_prin_amt = models.DecimalField(max_digits=12, decimal_places=2)
    remain_prin = models.DecimalField(max_digits=12, decimal_places=2)
    pos_bom = models.DecimalField(max_digits=12, decimal_places=2)

    def __str__(self):
        return self.account_number


class ContactInfo(models.Model):
    penalty_amount = models.DecimalField(max_digits=10, decimal_places=2)
    interest_amount = models.DecimalField(max_digits=12, decimal_places=2)
    principal_amount = models.DecimalField(max_digits=12, decimal_places=2)
    pos_assign = models.DecimalField(max_digits=12, decimal_places=2)
    last_result_final = models.CharField(max_length=100)
    total_amount = models.DecimalField(max_digits=12, decimal_places=2)
    date_start = models.DateField()
    date_end = models.DateField()
    total_payment = models.DecimalField(max_digits=12, decimal_places=2)
    assign_invalid_date = models.DateField()
    payment_request_date = models.DateField()
    obs_due_no = models.IntegerField()
    loan_term = models.IntegerField()
    loan_amount = models.DecimalField(max_digits=12, decimal_places=2)
    mob = models.IntegerField()
    dpd_assign = models.IntegerField()
    dpd_current = models.IntegerField()
    current_account = models.CharField(max_length=100)
    contract_date = models.DateField()
    contract_number = models.CharField(max_length=100)
    loan_id = models.CharField(max_length=100)
    late_days = models.IntegerField(default=0)
    monthly_payment = models.IntegerField(default=0)

    def __str__(self):
        return self.contract_number