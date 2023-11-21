# Clean House Project for CMPE-280

## Running the project

### Backend
- All the code for the backend is in the [python-backend](./python-backend/) directory
- To run the backend, you need to have python3 installed on your machine along with PostgreSQL
- To install the required Python packages, run `pip3 install -r requirements.txt` from the [python-backend](./python-backend/) directory
- To run the backend, run `python3 app.py` from the [python-backend](./python-backend/) directory
- Note: You need to have a PostgreSQL database running on your machine with the username `postgres` and password `password` on the default port `5432`. There should also be a database named `cleaning` present. As long as this database is present, the backend will automatically create the required tables in the database.
  - You can make use of the `docker-compose.yml` file to run the PostgreSQL database in a Docker container. To do this, run `docker-compose up` from the [python-backend](./python-backend/) directory. This will start the PostgreSQL database with the required username, password and database name. You can then run the backend as mentioned above.
  
  The deployed website can be accessed at - http://35.161.198.84:3000/login
