# Generated by Django 4.2.17 on 2025-01-16 09:47

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('customer', '0002_contactinfo_latedays_contactinfo_monthlypayment'),
    ]

    operations = [
        migrations.CreateModel(
            name='CallOutcome',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('pds', models.BooleanField()),
                ('final', models.BooleanField()),
                ('contacted_person', models.CharField(max_length=300)),
                ('action_code', models.CharField(max_length=300)),
                ('reason_code', models.CharField(max_length=300)),
                ('note', models.TextField(max_length=300)),
                ('payment_date', models.DateField()),
                ('payment_amount', models.IntegerField()),
            ],
        ),
        migrations.CreateModel(
            name='PhoneInfo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('spouse_name', models.CharField(max_length=300)),
                ('contact_name_1', models.CharField(max_length=300)),
                ('contact_relationship_1', models.CharField(max_length=300)),
                ('contact_name_2', models.CharField(max_length=300)),
                ('contact_relationship_2', models.CharField(max_length=300)),
                ('family_book', models.CharField(max_length=300)),
                ('other_contact_name', models.CharField(max_length=300)),
                ('other_contact_relationship', models.CharField(max_length=300)),
            ],
        ),
        migrations.CreateModel(
            name='ProductInfo',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('product', models.CharField(max_length=300)),
            ],
        ),
    ]
