# import requests

# """
# name: {type: "string"},
# car_image: { type: "string" },
# ticker: { type: "string" },
# description: { type: "string" }
# """

# #Mytri was HeaderRegistry(, default_class=UnstructuredHeader, use_default_map=True)

# companies = [
#     {
#         "name": "Ford",
#         "car_image": "/images/ford.png",
#         "ticker": "F",
#         "description": ""
#     },
#     # Honda
#     {
#         "name": "Honda",
#         "car_image": "/images/honda.png",
#         "ticker": "HMC",
#         "description": ""
#     },
#     # Toyota
#     {
#         "name": "Toyota",
#         "car_image": "/images/toyota.png",
#         "ticker": "TM",
#         "description": ""
#     },
#     # Tesla
#     {
#         "name": "Tesla",
#         "car_image": "/images/tesla.png",
#         "ticker": "TSLA",
#         "description": ""
#     }
# ]

# for company in companies:
#     req = requests.post("http://localhost:3000/api/company", json=company, timeout=15)
#     if not req.ok:
#         print(req)
#         print(req.text)
#         req.raise_for_status()
#     else:
#         print(company['name'], "might've worked", req.json())
    

import random
import time
import json

# Car brands and models
cars = {
    'Tesla': [
        'Model S',  # Sedan
        'Model 3',  # Sedan
        'Model X',  # SUV
        'Model Y'   # SUV
    ],
    'Ford': [
        'Fiesta',  # Sedan
        'Focus',  # Sedan
        'Fusion',  # Sedan
        'Mustang',  # Coupe/Sedan
        'Taurus',  # Sedan
        'EcoSport',  # SUV
        'Escape',  # SUV
        'Edge',  # SUV
        'Flex',  # SUV
        'Explorer',  # SUV
        'Expedition',  # SUV
        'F-150',  # Pickup
        'Ranger',  # Pickup
        'Super Duty'  # Pickup
    ],
    'Toyota': [
        'Yaris',  # Sedan
        'Corolla',  # Sedan
        'Camry',  # Sedan
        'Avalon',  # Sedan
        '86',  # Coupe/Sedan
        'Supra',  # Coupe/Sedan
        'RAV4',  # SUV
        'Highlander',  # SUV
        '4Runner',  # SUV
        'Sequoia',  # SUV
        'Land Cruiser',  # SUV
        'Tacoma',  # Pickup
        'Tundra'  # Pickup
    ],
    'Honda': [
        'Fit',  # Sedan
        'Civic',  # Sedan
        'Insight',  # Sedan
        'Accord',  # Sedan
        'Clarity',  # Sedan
        'HR-V',  # SUV
        'CR-V',  # SUV
        'Passport',  # SUV
        'Pilot',  # SUV
        'Ridgeline'  # Pickup
    ]
}



# Function to generate a random date between two given dates
def random_date(start, end):
    start_time = time.mktime(time.strptime(start, '%m/%d/%Y'))
    end_time = time.mktime(time.strptime(end, '%m/%d/%Y'))
    random_time = start_time + random.random() * (end_time - start_time)
    return int(random_time * 1000)


# Function to generate a random coordinate in the US
def random_coordinate():
    lat = random.uniform(24.396308, 49.384358)
    lon = random.uniform(-124.848974, -66.93457)
    return lat, lon


# Function to pick a random car with custom biases and generate corresponding data
def random_car_and_data_with_bias():
    # Custom biases
    bias = {
        'Ford': 0.4,
        'Honda': 0.3,
        'Toyota': 0.2,
        'Tesla': 0.1
    }
    # Create a weighted list of car makes
    weighted_makes = [[make] * int(bias[make] * 100) for make in bias]
    weighted_makes = [make for sublist in weighted_makes for make in sublist]  # Flatten the list
    make = random.choice(weighted_makes)
    model = random.choice(cars[make])
    date = random_date('11/4/2023', time.strftime('%m/%d/%Y'))
    lat, lon = random_coordinate()
    return {
        'make': make,
        'model': model,
        'date': date,
        'location': {'latitude': lat, 'longitude': lon}
    }

import requests
import tqdm

for _ in tqdm.tqdm(range(1000)):
    random_car = random_car_and_data_with_bias()

    response = requests.post("http://localhost:3000/api/car", json=random_car)

    if not response.ok:
        response.raise_for_status()
