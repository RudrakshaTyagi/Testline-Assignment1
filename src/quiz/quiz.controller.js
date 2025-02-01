// fetch the quiz data
export const fetchCurrentQuizData = async (req, res, next) => {
      try {
            const data = await fetch('https://www.jsonkeeper.com/b/LLQT').then((res) => res.json());
            res.send(data);
      } catch (error) {
            console.log(error);
            res.status(500).send({ error: "Failed to fetch data. Please try again later..." });
      }
      
}

// fetch submitted quiz data
export const fetchSubmittedQuizData = async (req, res, next) => { 
      try {
            const data = await fetch('https://api.jsonserve.com/rJvd7g').then((res) => res.json());
            res.send(data);
      } catch (error) {
            res.status(500).send({ error: "Failed to fetch data. Please try again later..." });
      }
}

// fetch historical quiz data
export const fetchHistoricalQuizData = async (req,res,next) => { 
      try {
            const data = await fetch('https://api.jsonserve.com/XgAgFJ').then((res) => res.json());
            res.send(data);
      } catch (error) {
            res.status(500).send({ error: "Failed to fetch data. Please try again later..." });
      }
}