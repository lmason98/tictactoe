# tictactoe

- [x] Scoreboard
- [x] Mobile friendly
- [x] Play against AI

## Setup

### Prerequisites
1. Have python3.8+ installed
2. Have node 20 installed

### Backend:
Zip file contains a .env file with credentials for a test AWS RDS database
1. Navigate to backend directory
2. Create virtualenv `python3.8 -m venv .ttt_env/`
3. Source virtualenv `source .ttt_env/bin/activate`
4. Install dependencies `pip install -r requirements.txt`
5. Start backend `python manage.py runserver`

### Frontend:
1. Navigate to frontend directory
2. Install dependencies `npm install`
3. Start frontend `npm start`
