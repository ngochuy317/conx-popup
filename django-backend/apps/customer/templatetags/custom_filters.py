from django import template

register = template.Library()

@register.filter
def get(dictionary, key):
    """Retrieve a value from a dictionary by its key."""
    print('dictionary', dictionary)
    print('key', key)
    print(type(dictionary))
    print('isinstance(dictionary, dict)', isinstance(dictionary, dict))
    if isinstance(dictionary, dict):
        return dictionary.get(key, None)
    return None