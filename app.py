# app.py file
# Import Necessary Libraries
from flask import (
    Flask,
    request,
    redirect,
    jsonify, 
    render_template)
#import os - needed???
import pickle
import numpy as np
#import boto3 - off for now


# Flask Setup
app = Flask(__name__)
model = pickle.load(open('model2.pkl', 'rb'))

# Create route that renders index.html template
@app.route("/")
@app.route("/index.html")
def index():
    return render_template("index.html")

# Create route that renders rentals.html template
@app.route("/rentals.html")
def rentals():
    return render_template("rentals.html")

# Create route that renders team.html template
@app.route("/team.html")
def team():
    return render_template("team.html")

# Render results from model - work in progress - - - - - - - - - - - - - - - -
@app.route('/predict', methods=['GET', 'POST'])
def predict():
    if request.method == "POST":
        # Redisplay page with warning for missing fields
        missing = list()

        for k, v in request.form.items():
            if v == "":
                missing.append(k)

        if missing:
            feedback = f"Missing fields for {', '.join(missing)}"
            return render_template("index.html", feedback=feedback)

        # Receive form inputs
        age = int(request.form["age"])
        sex = request.form["sex"]
        race = request.form["race"]
        city = request.form["city"]
        
        # Transform inputs into array for ML model
        if age<25:
            array_age = [0,0]
        elif age>54:
            array_age = [0,1]
        else:
            array_age = [1,0]

        if race == 'asian':
            array_race = [0,0,0]
        elif race == 'black':
            array_race = [1,0,0]
        elif race == 'hispanic':
            array_race = [0,1,0]
        else:
            array_race = [0,0,1]

        if sex == 'male':
            array_sex = [0]
        else:
            array_sex = [1]

        features = np.array([array_age + array_race + array_sex])
                
        # Call ML model
        prediction = model.predict(features)

        income = np.round(prediction[0], 2)
        income2 = np.round((income * 52), 2)
        income_wkly = ' '.join(map(str, income))
        income_yrly = ' '.join(map(str, income2))

        # Calculate max mortgate payment based on 4.3 average weeks in a month
        can_afford = income * 4.3 * 0.28

        # NEED TO PULL MEDIAN VALUE FROM ZILLOW FILE - placeholder for now
        house_price = 175000
        mortgage = 408/100000 * house_price

        if mortgage > can_afford:
            decision = "CAN NOT"
        elif mortgage <= can_afford:
            decision = "CAN"

        # Return website text
        return render_template('index.html',\
            summary_text=f"For a {age}-year-old {race} {sex}",\
            prediction_text=f"the Estimated Income is: ${income_wkly} per week (${income_yrly} per year)",\
            decision_text=f"You {decision} afford a house in {city}") 
  


import psycopg2
import pandas as pd
from pprint import pprint
connection = psycopg2.connect(
    host = 'housingdb.cxrqyy0s90my.us-east-2.rds.amazonaws.com',
    port = 5432,
    user = 'root',
    password = 'ClassProject3718',
    database='housing'
    )

@app.route("/data")

def data():
    data = []

    sql = """
    SELECT *
    FROM zillow_housing
    """
    datas = pd.read_sql(sql, con=connection)
    new = datas.to_json(orient="values")
        
    return new

    


# turn off for AWS deployment
if __name__ == "__main__":
    app.run(debug=True)

# turn on for AWS deployment
#if __name__ == "__main__":
    #app.run(host='0.0.0.0', port=8080)

