const apiUrl = process.env.REACT_APP_API_URL;
const answerServices = {
  getAll: async () => {
    try {
      const response = await fetch(apiUrl + '/answers');
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  },
  getById: async (id) => {
    try {
      const response = await fetch(apiUrl + `/answers/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  },
  getByExerciseId: async (id) => {
    try {
      const response = await fetch(apiUrl + `/answers/exercise/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  },

  getByQuestionId: async (id) => {
    try {
      const response = await fetch(apiUrl + `/answers/question/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  },
};

export default answerServices;
