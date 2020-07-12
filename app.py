# app.py file
# Import Necessary Libraries
from flask import (
    Flask,
    request,
    jsonify, 
    render_template)
#import os - needed???
import pickle
import numpy as np
#import boto3 - off for now

# Flask Setup
app = Flask(__name__)
model = pickle.load(open('model.pkl', 'rb'))

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
@app.route('/predict', methods=['POST'])
def predict():
    int_features = [int(x) for x in request.form.values()]
    final_features = [np.array(int_features)]
    prediction = model.predict(final_features)

    output = round(prediction[0], 2)

    return render_template('forecast.html', prediction_text="fill this in ${}".format(output))  

# Added to correct and or prevent favicon error
#@app.route('/favicon.ico') 
#def favicon(): 
    #return send_from_directory(os.path.join(app.root_path, 'static'), 'favicon.ico', mimetype='image/vnd.microsoft.icon')


if __name__ == "__main__":
    app.run(debug=True)