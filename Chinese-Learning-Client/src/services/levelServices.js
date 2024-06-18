const apiUrl = process.env.REACT_APP_API_URL;
const levelServices = {
  getAll: async () => {
    try {
      const response = await fetch(apiUrl + '/levels');
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
      const response = await fetch(apiUrl + `/levels/${id}`);
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

export default levelServices;
