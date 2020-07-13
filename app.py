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

        #return redirect(request.url)
    
        # Receive form inputs
        age = int(request.form["age"])
        sex = request.form["sex"]
        race = request.form["race"]

        print(f"age: {age}, sex: {sex}, race: {race}")
        
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
        print(features)
        
        # Call ML model
        prediction = model.predict(features)

        output = np.round(prediction[0], 2)

        # Return prediction
        return render_template('index.html', prediction_text="Your Estimated Weekly Income is ${}".format(output))  

# turn off for AWS deployment
if __name__ == "__main__":
    app.run(debug=True)

# turn on for AWS deployment
#if __name__ == "__main__":
    #app.run(host='0.0.0.0', port=8080)

