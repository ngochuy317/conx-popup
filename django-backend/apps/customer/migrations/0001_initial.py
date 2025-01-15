# Generated by Django 4.2.17 on 2025-01-14 03:31

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='CustomerInfo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(max_length=255)),
                ('gender', models.CharField(max_length=50)),
                ('id_number', models.CharField(max_length=20, unique=True)),
                ('day_of_birth', models.DateField()),
                ('family_relation', models.CharField(blank=True, max_length=255, null=True)),
                ('agency', models.CharField(blank=True, max_length=255, null=True)),
                ('contract_number', models.CharField(max_length=100)),
                ('company_name', models.CharField(blank=True, max_length=255, null=True)),
                ('company_address', models.CharField(blank=True, max_length=255, null=True)),
                ('company_district', models.CharField(blank=True, max_length=255, null=True)),
                ('company_province', models.CharField(blank=True, max_length=255, null=True)),
                ('group', models.CharField(blank=True, max_length=100, null=True)),
            ],
        ),
        migrations.CreateModel(
            name='PaymentInfo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('first_paid_date', models.DateField()),
                ('account_number', models.CharField(max_length=100)),
                ('largest_amount', models.DecimalField(decimal_places=2, max_digits=12)),
                ('last_payment_date', models.DateField()),
                ('disbursement_date', models.DateField()),
                ('cif', models.CharField(max_length=100)),
                ('due_date_overdue', models.DateField()),
                ('next_due_date', models.DateField()),
                ('next_due_amount', models.DecimalField(decimal_places=2, max_digits=12)),
                ('future_prin_amt', models.DecimalField(decimal_places=2, max_digits=12)),
                ('remain_prin', models.DecimalField(decimal_places=2, max_digits=12)),
                ('pos_bom', models.DecimalField(decimal_places=2, max_digits=12)),
            ],
        ),
        migrations.CreateModel(
            name='ContactInfo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('penalty_amount', models.DecimalField(decimal_places=2, max_digits=10)),
                ('interest_amount', models.DecimalField(decimal_places=2, max_digits=12)),
                ('principal_amount', models.DecimalField(decimal_places=2, max_digits=12)),
                ('pos_assign', models.DecimalField(decimal_places=2, max_digits=12)),
                ('last_result_final', models.CharField(max_length=100)),
                ('total_amount', models.DecimalField(decimal_places=2, max_digits=12)),
                ('date_start', models.DateField()),
                ('date_end', models.DateField()),
                ('total_payment', models.DecimalField(decimal_places=2, max_digits=12)),
                ('assign_invalid_date', models.DateField()),
                ('payment_request_date', models.DateField()),
                ('obs_due_no', models.IntegerField()),
                ('loan_term', models.IntegerField()),
                ('loan_amount', models.DecimalField(decimal_places=2, max_digits=12)),
                ('mob', models.IntegerField()),
                ('dpd_assign', models.IntegerField()),
                ('dpd_current', models.IntegerField()),
                ('current_account', models.CharField(max_length=100)),
                ('contract_date', models.DateField()),
                ('contract_number', models.CharField(max_length=100)),
                ('loan_id', models.CharField(max_length=100)),
            ],
        ),
        migrations.CreateModel(
            name='AddressInfo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('permanent_address', models.CharField(max_length=500)),
                ('temporary_address', models.CharField(max_length=500)),
                ('region', models.CharField(max_length=100)),
                ('province', models.CharField(max_length=100)),
                ('district', models.CharField(max_length=100)),
            ],
        ),
    ]
