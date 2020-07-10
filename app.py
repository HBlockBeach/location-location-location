# Import Necessary Libraries

from flask import (
    Flask, 
    render_template,
    jsonify,
    request,
    redirect)

#import boto3

# Flask Setup
app = Flask(__name__)


# Create route that renders index.html template
@app.route("/")
def index():
    return render_template("index.html")




if __name__ == "__main__":
    app.run()