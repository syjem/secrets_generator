import secrets
from flask import Flask, render_template, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app)
load_dotenv()


def secret_keys(char=16):
    secret_key = ''.join(secrets.choice(
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*(-_=+)') for _ in range(char))

    return secret_key


character_options = [8, 16, 32, 64]


@app.route("/")
def index():
    secret_key = secret_keys()
    return render_template('index.html', secret_key=secret_key, options=character_options)


@app.route("/secrets", methods=['POST'])
def secret_generators():
    if request.method == 'POST':
        data = request.get_json()

        if not data:
            return jsonify('No data provided.')

        try:
            character_count = int(data)
        except (TypeError, ValueError):
            return jsonify('Invalid data format. Please provide a number.')

        if character_count not in character_options:
            return jsonify('Invalid number of characters.')

    secret_key = secret_keys(character_count)
    return jsonify(secret_key)


if __name__ == '__main__':
    app.run()
