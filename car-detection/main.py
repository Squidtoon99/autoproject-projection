import requests
import urllib


def get_image_data(url: str):
    # The Content-Type header is typically necessary for POST requests with URL-encoded data
    headers = {'Content-Type': 'application/x-www-form-urlencoded'}

    # Encode the URL before sending it as form data
    encoded_url = urllib.parse.quote(url, safe='')
    print(encoded_url)
    response = requests.post(
        "https://carnet.ai/recognize-url", data=encoded_url, headers=headers)

    if response.ok:
        return response.json()  # or response.json() if the response is JSON
    else:
        # Will raise an HTTPError if the HTTP request returned an unsuccessful status code
        response.raise_for_status()


print(get_image_data(
    "https://img2.carmax.com/assets/24434450/hero.jpg"))
