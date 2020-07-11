# Import Necessary Libraries

from flask import (
    Flask, 
    render_template)
import os
import pickle
import boto3

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
  

# Added to correct and or prevent favicon error
#@app.route('/favicon.ico') 
#def favicon(): 
    #return send_from_directory(os.path.join(app.root_path, 'static'), 'favicon.ico', mimetype='image/vnd.microsoft.icon')


if __name__ == "__main__":
    app.run(debug=True)