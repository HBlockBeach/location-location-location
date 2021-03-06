# <div align="center">**location-location-location**<div> 

## Team:
* [Valerie Lobas](https://www.linkedin.com/in/vlobas/)
* [Randy Dettmer](https://www.linkedin.com/in/randydettmercscpmba/)
* [Hunter Block-Beach](https://www.linkedin.com/in/hunter-block-beach-96401267/)

## Project Overview:
<p> The aim of this project is to predict whether a person with specific demographics can afford the median home or rental price in a specific US metro area. The user's income is predicted based on the demographic information entered in the website form and a linear regression of historical Bureau of Labor Statistics (BLS) data. The user also selects a US city from the drop-down menu. Median home and rental prices were downloaded from Zillow.com. Affordability was determined based on rules of thumb that a person should not spend more than 28-30% of monthly gross income on housing.
<br><br> Tools used include:
  
- Python
- Pandas
- Flask
- SKLearn
- PostgreSQL
- HTML
- CSS
- Javascript
- Leaflet
- Mapbox
- Amazon Web Services
- PuTTY
- WinSCP

A map is included showing the top 25 markets and their median prices. A separate page is available to view the historical home and rental prices for a chosen city.
</p>

## Relevant Files: 
#### Raw Data:
1. [BLS Data (/income_data)](/income_data)
2. [Zillow Data (/realestate_data)](/realestate_data)
3. [Merged BLS Data (combined_data.csv)](combined_data.csv)

#### Python/Jupyter Notebooks:
1. [Data cleanup file (data_cleanup.ipynb)](data_cleanup.ipynb)
2. [Creation of Flask routes (app.py)](app.py)
3. [Data Visualization & Machine Learning (models.ipynb)](models.ipynb)

#### HTML/CSS/JS

* [/static/](static)
1. [Javascript code for map on main page (static/logic.js)](static/logic.js)
2. [Javascript code for map on rentals page (static/rentals.js)](static/rentals.js)
3. [CSS (static/styles.css)](static/styles.css)

* [/templates/](templates)
4. [Home Page](index.html)
5. [Rentals Page](rentals.html)
6. [Charts Page](charts.html)
7. [Team Page](team.html)

#### Other

1. [Linear Regression Model (ml_models/model2.pkl)](ml_models/model2.pkl)
2. [Requirements File (requirements.txt)](requirements.txt)

#### Project Documents

1. [Trello Board](https://trello.com/b/yW1SSckW/final-project-group-3)
2. [Google Slide Presentation](https://docs.google.com/presentation/d/16XxO4aX8xqUmglVcplGxaqJ9PxVngNpm74IpAFs2h4Q/edit#slide=id.g8bf3178969_0_126)
