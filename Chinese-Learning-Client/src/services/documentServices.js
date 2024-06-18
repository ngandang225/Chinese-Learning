const apiUrl = process.env.REACT_APP_API_URL;
const documentServices = {
  getAll: async () => {
    try {
      const response = await fetch(apiUrl + '/documents');
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
      const response = await fetch(apiUrl + `/documents/${id}`);
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

export default documentServices;
