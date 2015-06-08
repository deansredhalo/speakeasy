from flask import Flask
from flask import render_template, json, Markup
import os

app = Flask(__name__, static_folder='assets', template_folder='assets/templates')

SITE_ROOT = os.path.realpath(os.path.dirname(__file__))
MANIFESTS_PATH = os.path.join(SITE_ROOT, "assets/manifests")
ASSETS_PATH = 'assets/'

JS_IMPORTS = []
CSS_IMPORTS = []

@app.route('/')
def home_screen():
	json_data = open(os.path.join(MANIFESTS_PATH, "main.json"), "r")
	data = json.load(json_data)
	JS_IMPORTS[:] = []
	CSS_IMPORTS[:] = []
	for files in data:
		for file in data[files]:
			print(file)
			if file.endswith('.js'):
				importString = ASSETS_PATH + file
				importString.strip()
				JS_IMPORTS.append(Markup(importString))
			else:
				importString = ASSETS_PATH + file
				importString.strip()
				CSS_IMPORTS.append(Markup(importString))

	return render_template('index.html', JS_IMPORTS = JS_IMPORTS, CSS_IMPORTS = CSS_IMPORTS)

if __name__ == '__main__':
	app.run(debug = True)