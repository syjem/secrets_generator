import secrets
from flask import Flask, render_template, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


def secret_keys(char):
    secret_key = ''.join(secrets.choice(
        'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*(-_=+)') for _ in range(char))

    return secret_key


@app.route("/")
def index():
    secret_key = secret_keys(32)
    return render_template('index.html', secret_key=secret_key)


@app.route("/secrets")
def secret_generators():
    secret_key = secret_keys(32)
    return jsonify(secret_key)


if __name__ == '__main__':
    app.run()
