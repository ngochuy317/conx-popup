from django import template
from datetime import datetime, date

register = template.Library()

@register.filter
def format_date_if_needed(value, date_format='%Y-%m-%d'):
    try:
        # Check if the value is already in the correct format
        value = datetime.strptime(value, date_format)
        return value.strftime(date_format)
    except (ValueError, TypeError):
        # If not, format the value
        value = value.strftime(date_format) if isinstance(value, date) else value
        return value