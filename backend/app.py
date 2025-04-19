from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os


app = Flask(__name__)

# Enable Cross-Origin Resource Sharing (CORS) for the React frontend
CORS(app)

# Route to handle the incoming POST request from React
@app.route('/totally_not_a_zip_bomb', methods=['POST'])
def receive_workout():
    try:
        new_data = request.get_json(force=True)
        print('✅ Received workout data:', new_data)

        new_data = [
                {'username': 'joe'}, 
                {'exercise': 'aaa', 'weight': 500, 'sets': 4, 'reps': 5}, 
                {'exercise': 'bbb', 'weight': 10, 'sets': 5, 'reps': 6}, 
                {'exercise': 'ccc', 'weight': 12, 'sets': 6, 'reps': 7}
            ]

        username = new_data[0]['username']
        user_file = f'{username}.txt'
    
        # store existing user data
        user_data = []
        if os.path.exists(user_file):
            with open(user_file, 'r') as file:
                user_data = json.load(file)

        for exercise in new_data[1:]:
            name = exercise['exercise']
            new_value = f"{exercise['sets']}x{exercise['reps']} {exercise['weight']}"
            existing_exercise = next((item for item in user_data if name in item), None)
    
            if not existing_exercise:
                user_data.append({name: new_value})
            else:
                old_value = int(existing_exercise[name].split()[-1]) # old weight
                if exercise['weight'] > old_value:
                    existing_exercise[name] = new_value
        
        with open(user_file, 'w') as file:
            json.dump(user_data, file)

        return jsonify({'status': 'success', 'message': 'Workout received!'})
    
    except Exception as e:
        print('❌ Error parsing workout data:', e)
        return jsonify({'status': 'error', 'message': str(e)}), 500


if __name__ == '__main__':
    # Flask will run on port 5000, which will be forwarded by Nginx
    app.run(host='0.0.0.0', port=5000, debug=True)

