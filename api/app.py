import secrets
from flask import Flask, render_template, jsonify, request
from flask_cors import CORS
from dotenv import load_dotenv

app = Flask(__name__)
CORS(app)
load_dotenv()

CHARACTERS_LISTS = [8, 16, 32, 64]


def secret_keys(char):
    secret_key = ''.join(secrets.choice(
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*(-_=+)') for _ in range(char))

    return secret_key


@app.route("/")
def index():
    secret_key = secret_keys(16)
    return render_template('index.html', secret_key=secret_key, lists=CHARACTERS_LISTS)


@app.route("/secrets", methods=['POST'])
def secret_generators():
    if request.method == 'POST':
        data = request.get_json()

        if not data:
            return jsonify('No data provided.')

        try:
            value = int(data)
        except (TypeError, ValueError):
            return jsonify('Invalid data format. Please provide a number.')

        if value not in CHARACTERS_LISTS:
            return jsonify('Invalid number of characters.')

        secret_key = secret_keys(value)
        return jsonify(secret_key), 200

    return jsonify('Method not allowed!'), 403



if __name__ == '__main__':
    app.run()
