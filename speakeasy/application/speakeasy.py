from flask import Flask
from flask import render_template

app = Flask(__name__, static_folder='assets', template_folder='assets/templates')

@app.route('/')
def home_screen():
	return render_template('index.html')

if __name__ == '__main__':
	app.run(debug=True)