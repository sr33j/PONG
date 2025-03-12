from flask import Flask, render_template, jsonify

app = Flask(__name__)

@app.route('/')
def index():
    try:
        return render_template('pong.html')
    except Exception as e:
        return str(e), 500

@app.errorhandler(404)
def not_found_error(error):
    return jsonify({"error": "Resource not found"}), 404

@app.errorhandler(500)
def internal_error(error):
    return jsonify({"error": "Internal server error"}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', debug=True)