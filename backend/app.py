from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)

# Enable Cross-Origin Resource Sharing (CORS) for the React frontend
CORS(app)

# Route to handle the incoming POST request from React
@app.route('/totally_not_a_zip_bomb', methods=['POST'])
def receive_workout():
    try:
        data = request.get_json(force=True)
        print("✅ Received workout data:", data)
        return jsonify({"status": "success", "message": "Workout received!"})
    except Exception as e:
        print("❌ Error parsing workout data:", e)
        return jsonify({"status": "error", "message": str(e)}), 500


if __name__ == '__main__':
    # Flask will run on port 5000, which will be forwarded by Nginx
    app.run(host='0.0.0.0', port=5000, debug=True)

