from django.shortcuts import render
import requests
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt


@csrf_exempt
def get_weather(request):
    """
    API view to get weather data from OpenWeather based on city.
    """
    if request.method == "GET":
        city = request.GET.get("city")

        if not city:
            return JsonResponse({"error": "City parameter is required"}, status=400)

        api_key = "7c758b2577839650b8c913f234ddd096"
        api_url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric"

        try:
            response = requests.get(api_url)
            response.raise_for_status()  # Raise an error for bad status codes
            data = response.json()
            weather_data = {
                "name": data["name"],
                "description": data["weather"][0]["description"],
                "temp": data["main"]["temp"],
                "humidity": data["main"]["humidity"],
            }
            return JsonResponse(weather_data)
        except requests.exceptions.RequestException as e:
            return JsonResponse({"error": str(e)}, status=500)


def index(request):
    """
    View to render the index page (landing page).
    """
    return render(request, 'index.html')


def home(request):
    """
    View to render the home page.
    """
    return render(request, 'home.html')
