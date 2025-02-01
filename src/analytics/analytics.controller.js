// for fetching student performance data
export const studentPerformance = async (req, res, next) => { 
      try {
            const data = await fetch('https://api.jsonserve.com/rJvd7g').then((res) => res.json());
            // extract relevant data
            const { quiz_id, user_id, accuracy, final_score, better_than } = data;
            const { topic } = data.quiz;

            res.json({ quiz_id, user_id, topic, accuracy, score: final_score, better_than });
            
      } catch (error) {
            console.log(error);
            res.status(500).send({ error: "Failed to fetch Student Performance data. Please try again later..." });
      }
  
}

// to analyze general insights
export const generalInsights = async (req, res, next) => { 
      try {
            const currentQuizData = await fetch('https://api.jsonserve.com/rJvd7g').then(res => res.json());
            const historicalQuizData = await fetch('https://api.jsonserve.com/XgAgFJ').then(res => res.json());
  
          // Extract current quiz parameters by destructuring
            const {
                  accuracy: currentAccuracy,
                  speed: currentSpeed,
                  incorrect_answers: currentIncorrectAnswers,
                  mistakes_corrected: currentMistakesCorrected,
                  initial_mistake_count: currentInitialMistakeCount,
                  total_questions: currentTotalQuestions
            } = currentQuizData;

            // convert these values to numbers since they are in string
            const currentAccuracyNum = parseFloat(currentAccuracy.replace('%', '').trim());
            const currentSpeedNum = parseFloat(currentSpeed);
            const currentIncorrectAnswersNum = parseInt(currentIncorrectAnswers, 10);
            const currentMistakesCorrectedNum = parseInt(currentMistakesCorrected, 10);
            const currentInitialMistakeCountNum = parseInt(currentInitialMistakeCount, 10);
            const currentTotalQuestionsNum = parseInt(currentTotalQuestions, 10);

            // only find rate mistakeCorrectionRate initial mistake is not equal to 0 otherwise it gives NaN
            const mistakeCorrectionRate = currentInitialMistakeCountNum > 0
                  ? (currentMistakesCorrectedNum / currentInitialMistakeCountNum) * 100
                  : 0;
            const incorrectAnswerRate = (currentIncorrectAnswersNum / currentTotalQuestionsNum) * 100;
  
            
            // Calculate historical averages
            // use reduce to calculate the sum of all the values
            const total = historicalQuizData.reduce((acc, data) => {
                  return {
                        accuracy: acc.accuracy + parseFloat(data.accuracy.replace('%','').trim()),  // Convert "80 %" → 80
                        speed: acc.speed + parseFloat(data.speed),
                        mistakeCorrectionRate: acc.mistakeCorrectionRate + (data.initial_mistake_count > 0 
                              ? (data.mistakes_corrected / data.initial_mistake_count) * 100 
                              : 0),
                        incorrectAnsRate: acc.incorrectAnsRate + (data.incorrect_answers / data.total_questions) * 100,
                  };
            }, { accuracy: 0, speed: 0, mistakeCorrectionRate: 0, incorrectAnsRate: 0 });
            // then calculate averages
            const count = historicalQuizData.length;
            const avgAccuracy = (total.accuracy / count).toFixed(2);
            const avgSpeed = (total.speed / count).toFixed(2);
            const avgMistakeCorrectionRate = (total.mistakeCorrectionRate / count).toFixed(2);
            const avgIncorrectAnsRate = (total.incorrectAnsRate / count).toFixed(2);
  
          // Generate Insights Messages
            const accuracyMessage = currentAccuracyNum > avgAccuracy
                  ? `Your accuracy is ${currentAccuracyNum}%, which is better than your last 5 quizzes' average accuracy (${avgAccuracy}%).`
                  : `Your accuracy is ${currentAccuracyNum}%, which is lower than your last 5 quizzes' average accuracy (${avgAccuracy}%).`;
  
            const speedMessage = currentSpeedNum > avgSpeed
                  ? `Your speed is ${currentSpeedNum}, which is better than your last 5 quizzes' average speed (${avgSpeed}).`
                  : `Your speed is ${currentSpeedNum}, which is lower than your last 5 quizzes' average speed (${avgSpeed}).`;
          
            const mistakeCorrectionRateMessage = mistakeCorrectionRate > avgMistakeCorrectionRate
                  ? `Your mistake correction rate is ${mistakeCorrectionRate.toFixed(2)}%, which is better than your last 5 quizzes' average mistake correction rate (${avgMistakeCorrectionRate}%).`
                  : `Your mistake correction rate is ${mistakeCorrectionRate.toFixed(2)}%, which is lower than your last 5 quizzes' average mistake correction rate (${avgMistakeCorrectionRate}%).`;
  
            const incorrectAnswersMessage = incorrectAnswerRate > avgIncorrectAnsRate
                  ? `Your incorrect answer rate is ${incorrectAnswerRate.toFixed(2)}%, which is higher than your last 5 quizzes' average incorrect answer rate (${avgIncorrectAnsRate}%).`
                  : `Your incorrect answer rate is ${incorrectAnswerRate.toFixed(2)}%, which is lower than your last 5 quizzes' average incorrect answer rate (${avgIncorrectAnsRate}%).`;
  
            
            res.json({
                  insights: {
                        accuracyMessage,
                        speedMessage,
                        mistakeCorrectionRateMessage,
                        incorrectAnswersMessage,
                  }
            });
            
            
      } catch (error) {
            console.log(error);
            res.status(500).send({ error: "Failed to fetch General Insights data. Please try again later..." });
      }
      
      
}

// algo to predict rank
export const predictRank = async (req, res, next) => { 
      try {
            // in this algo: we will consider the current quiz data
            //first we calculate the ratio of attempted Qs to total Qs
            // then we consider accuracy of the attempted Qs
            // based on that we calculate score for 180 qs of neet considering +4 and -1 for correct and incorrect qs
            // then using past neet data we predict rank
            
            // extract data from current quiz
            const data = await fetch('https://api.jsonserve.com/rJvd7g').then((res) => res.json());

            const totalNeetQuestions = 180;
            const attemptRatio = (parseInt(data.correct_answers, 10) + parseInt(data.incorrect_answers, 10)) / parseInt(data.total_questions, 10);
            const expectedNeetAttempts = Math.round(totalNeetQuestions * attemptRatio);
            const expectedCorrect = Math.round(expectedNeetAttempts * parseFloat(data.accuracy)/100);
            const expectedIncorrect = expectedNeetAttempts - expectedCorrect;
            const neetScore = (expectedCorrect * 4) - (expectedIncorrect * 1);

            let predictedRank;
            if (neetScore >= 700) predictedRank = "1-2,250";
            else if (neetScore >= 650) predictedRank = "2,251 - 29,000";
            else if (neetScore >= 600) predictedRank = "29,001 - 77,000";
            else if (neetScore >= 550) predictedRank = "77,001 - 144,000";
            else if (neetScore >= 500) predictedRank = "144,001 - 209,000";
            else if (neetScore >= 450) predictedRank = "209,001 - 285,550";
            else if (neetScore >= 400) predictedRank = "285,551 - 351,425";
            else predictedRank = "3,60,000+ (low score)";

            res.json({ neetScore, predictedRank });

// NEET Score	Approximate Rank Range
// ≥ 700	1 - 2,250
// ≥ 650	2,251 - 29,000
// ≥ 600	29,001 - 77,000
// ≥ 550	77,001 - 144,000
// ≥ 500	144,001 - 209,000
// ≥ 450	209,001 - 285,550
// ≥ 400	285,551 - 351,425
      } catch (error) {
            console.log(error);
            res.status(500).send({ error: "Failed to predict rank. Please try again later..." });
      }
}


// used ai just for college prediction as on internet they were asking caste input from user and there were just too many colleges
export const predictCollege = async (req, res, next) => { 
      try {
            // Fetch current quiz data
            const data = await fetch('https://api.jsonserve.com/rJvd7g').then((res) => res.json());
  
            const totalNeetQuestions = 180;
            const attemptRatio = (parseInt(data.correct_answers, 10) + parseInt(data.incorrect_answers, 10)) / parseInt(data.total_questions, 10);
            const expectedNeetAttempts = Math.round(totalNeetQuestions * attemptRatio);
            const expectedCorrect = Math.round(expectedNeetAttempts * parseFloat(data.accuracy) / 100);
            const expectedIncorrect = expectedNeetAttempts - expectedCorrect;
            const neetScore = (expectedCorrect * 4) - (expectedIncorrect * 1);
  
            let predictedRank, predictedCollege;
  
            if (neetScore >= 700) {
                  predictedRank = "1-2,250";
                  predictedCollege = "AIIMS Delhi, MAMC Delhi, JIPMER, CMC Vellore, KGMU Lucknow";
            } else if (neetScore >= 650) {
                  predictedRank = "2,251 - 29,000";
                  predictedCollege = "Top Govt. Medical Colleges like BJMC Pune, GMC Chandigarh, LHMC Delhi";
            } else if (neetScore >= 600) {
                  predictedRank = "29,001 - 77,000";
                  predictedCollege = "Good Govt. Colleges like UCMS Delhi, Govt. Medical College Patiala, Osmania Medical College";
            } else if (neetScore >= 550) {
                  predictedRank = "77,001 - 144,000";
                  predictedCollege = "State Govt. Medical Colleges (Lower Cutoffs) & Few Deemed Universities";
            } else if (neetScore >= 500) {
                  predictedRank = "144,001 - 209,000";
                  predictedCollege = "Private Medical Colleges (High Fees) or Govt. Seats in North-East States";
            } else if (neetScore >= 450) {
                  predictedRank = "209,001 - 285,550";
                  predictedCollege = "Lower-tier Private Colleges & Deemed Universities";
            } else if (neetScore >= 400) {
                  predictedRank = "285,551 - 351,425";
                  predictedCollege = "Private Medical Colleges (Low Reputation)";
            } else {
                  predictedRank = "3,60,000+ (low score)";
                  predictedCollege = "Consider Private Colleges with Management Quota or Dropping a Year";
            }
  
            res.json({ neetScore, predictedRank, predictedCollege });
  
      } catch (error) {
            console.log(error);
            res.status(500).send({ error: "Failed to predict college. Please try again later..." });
      }
  };
  