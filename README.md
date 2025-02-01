
# Project Overview
The Student Rank Predictor for NEET is a tool designed to estimate a student's potential rank based on quiz performance and past NEET exam results. The system leverages historical data to predict ranks, colleges and general insights

## Run Locally

Clone the project

```bash
  git clone https://github.com/RudrakshaTyagi/Testline-Assignment1.git
```

Go to the project directory

```bash
  cd Testline-Assignment1
```

Install dependencies

```bash
  npm install
```

Start the server

```bash
  npm start
```


## Approach

- Quiz Data Retrievel:
Used Fetch method to retrieve data from the api
- Analytics:
1. TO SHOW STUDENT PERFORMANCE: call the latest quiz api and destructure it to extract relevant data and res.json it.

2. GENERAL INSIGHTS: call both historical and current quiz data. Then decide parameters to compare, find average of those parameters from last 5 quizes and compare to current quiz parameters. Accordingly give insights

3. RANK PREDICTOR: From the current quiz, find ratio of attemptedQs to totalQs.  Then multiply that to 180 since neet has 180 questions in total.
Then multiply expected attemptedQs to accuracy and accordingly multiply correct qs to 4 and incorrect to -1 and come to the expected final neet score

Using neet 2024 score to rank data, using if else condition to predict rank

4. COLLEGE PREDICTOR: using the predicted rank use if else condition to predict college






## Screenshots

StudentPerformance
![Student Performanve](https://github.com/RudrakshaTyagi/Testline-Assignment1/blob/main/screenshots/StudentPerformance.png?raw=true)

General Insights
![General Insights](https://github.com/RudrakshaTyagi/Testline-Assignment1/blob/main/screenshots/general-insights.png?raw=true)

Rank Predictor
![Rank Predictor](https://github.com/RudrakshaTyagi/Testline-Assignment1/blob/main/screenshots/RankPredictor.png?raw=true)

College Predictor
![College Predictor](https://github.com/RudrakshaTyagi/Testline-Assignment1/blob/main/screenshots/CollegePredictor.png?raw=true)
## Demo

Github link to video, since the video size was 4mb, it couldnt be pasted
https://github.com/RudrakshaTyagi/Testline-Assignment1/blob/main/screenshots/freecompress-TestlineAssignment1-testing-video.mp4#:~:text=StudentPerformance.png-,freecompress,-%2DTestlineAssignment1%2Dtesting%2Dvideo


## Authors

- [@RudrakshaTyagi](https://github.com/RudrakshaTyagi)

