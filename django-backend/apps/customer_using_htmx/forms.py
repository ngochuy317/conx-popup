from django import forms


class CustomerForm(forms.Form):
    name = forms.CharField(max_length=100, required=True)
    gender = forms.ChoiceField(choices=[('Male', 'Male'), ('Female', 'Female')], required=True)
    id_number = forms.CharField(max_length=20, required=True)
    day_of_birth = forms.DateField(widget=forms.DateInput(attrs={'type': 'date'}))