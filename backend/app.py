from flask import Flask, request, jsonify
from flask_cors import CORS
import json
import os


app = Flask(__name__)

# Enable Cross-Origin Resource Sharing (CORS) for the React frontend
CORS(app)

# Route to handle the incoming POST request from React
@app.route('/create_account', methods=['POST'])
def create_account():
    print('Received request for /create_account')
    try:
        account_info = request.get_json(force=True)
        print('✅ Received account info:', account_info)

        username = account_info['username']
        password = account_info['password']
        credentials_file = 'user_credentials/credentials.txt'
        
        credentials = {}
        if os.path.getsize(credentials_file) > 0:
            with open(credentials_file, 'r') as file:
                credentials = json.load(file)

        # if username doesn't exist, append to the file
        if username not in credentials:
            credentials[username] = password

            with open(credentials_file, 'w') as file:
                json.dump(credentials, file, indent=4)

            return jsonify({'status': 'success', 'message': 'Account created!'})
        else:
            return jsonify({'status': 'error', 'message': 'Username already exists'})

    except Exception as e:
        print('❌ Error creating account:', e)
        return jsonify({'status': 'error', 'message': str(e)}), 500


# Route to handle the incoming POST request from React
@app.route('/login', methods=['POST'])
def login():
    print('Received request for /login')
    try:
        account_info = request.get_json(force=True)
        print('✅ Received account info:', account_info)

        username = account_info['username']
        password = account_info['password']
        credentials_file = 'user_credentials/credentials.txt'

        credentials = {}
        if os.path.getsize(credentials_file) > 0:
            with open(credentials_file, 'r') as file:
                credentials = json.load(file)

        # if username doesn't exist, append to the file
        if username not in credentials:
            return jsonify({'status': 'error', 'message': 'Invalid username'})
        elif credentials[username] != password:
            return jsonify({'status': 'error', 'message': 'Invalid password'})


        return jsonify({'status': 'success', 'message': 'Account logged in!'})

    except Exception as e:
        print('❌ Error logging in:', e)
        return jsonify({'status': 'error', 'message': str(e)}), 500


# Route to handle the incoming POST request from React
@app.route('/totally_not_a_zip_bomb', methods=['POST'])
def receive_workout():
    try:
        new_data = request.get_json(force=True)
        print('✅ Received workout data:', new_data)
        
        username = new_data[0]['username']
        user_file = f'{username}.txt'
    
        # store existing user data
        user_data = []
        if os.path.exists("./"+user_file):
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

@app.route('/records', methods=['GET'])
def send_records():
    try:
        # Retrieve the username from the query parameters
        username = request.args.get('username')
        if not username:
            return jsonify({'status': 'error', 'message': 'Username is required'}), 400

        print(f"✅ Received username: {username}")  # Debug log
        user_file = f'{username}.txt'
        print(f"🔍 Looking for file: {user_file}")  # Debug log

        # Initialize an empty list for user data
        user_data = []
        if os.path.exists(user_file):
            with open(user_file, 'r') as file:
                user_data = json.load(file)
                print(f"📂 Loaded user data: {user_data}")  # Debug log
        else:
            print(f"⚠️ File not found for username: {username}")  # Debug log

        # Return the user data in JSON format
        return jsonify({'status': 'success', 'data': user_data}), 200

    except json.JSONDecodeError:
        print('❌ Error: Invalid JSON in user file')
        return jsonify({'status': 'error', 'message': 'Invalid JSON in user file'}), 500

    except Exception as e:
        print(f'❌ Unexpected error: {e}')
        return jsonify({'status': 'error', 'message': 'An unexpected error occurred'}), 500
if __name__ == '__main__':
    # Flask will run on port 5000, which will be forwarded by Nginx
    app.run(host='0.0.0.0', port=5000, debug=True)

