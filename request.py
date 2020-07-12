# request.py

# Import dependencies
import requests

# place holder only - - - - -
# this is code from another project
url = "http://localhost:5000/predict.api"
r = requests.post(url,json={'experience':2, 'test_score':9, 'interview_score': 6})

print(r.json())