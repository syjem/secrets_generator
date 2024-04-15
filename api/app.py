import secrets
from flask import Flask, render_template, request, jsonify, redirect
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/")
def index():
    return render_template('index.html')


@app.route("/secrets", methods=['POST'])
def secret_generators():
    if request.method == 'POST':
        data = request.get_json()

        if isinstance(data, str):
            return jsonify({'error': "Please enter a number"})

        elif not data:
            return jsonify({'error': "Please enter a valid number"})

        elif data < 8:
            return jsonify({'error': "Accepts minimum of 8 characters"})

        else:
            # Generate a random secret key
            secret_key = ''.join(secrets.choice(
                'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*(-_=+)') for _ in range(data))
            return jsonify({'success': secret_key})


if __name__ == '__main__':
    app.run(debug=True)
