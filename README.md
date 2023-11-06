# WaterDipAI-assignment
## Intro
This assignment focuses on making charts from a bunch of hotel booking data.
## Local development
- clone this repo using `git clone https://github.com/Ayan726/WaterDipAI-assignment.git`
- Move to server directory and create a `.env` file and put your own `MONGO_URI` as shown in `.env.example` file
- run `npm i` on the terminal and run `npm run dev`
- Move to client directory and in another terminal, run `npm i` followed by `npm run dev`
- Now open `http://localhost:5173` on browser
## My approach of building
- I converted the .csv file into .json file and pushed into mongoDB using Node & express
- Made an api route to fetch data between 2 dates passed as query parameter
- fetched data in frontend using React
- processed those data and used appexChart to make charts out of the data
