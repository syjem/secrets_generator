import secrets
from flask import Flask, render_template, request, jsonify, redirect
from flask_cors import CORS

app = Flask(__name__)
CORS(app)


@app.route("/")
@app.route("/secrets", methods=['POST'])
def index():
    if request.method == 'POST':
        data = request.get_json()

        if not data or not data.isdigit():
            return jsonify({'error': "Please enter a valid number"})

        if int(data) < 8:
            return jsonify({'error': "Secrets has a minimum of 8 characters"})

    # Generate a random secret key
        secret_key = ''.join(secrets.choice(
            'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*(-_=+)') for _ in range(int(data)))
        return jsonify({'success': secret_key})

    return render_template("index.html")


if __name__ == '__main__':
    app.run(debug=True)
