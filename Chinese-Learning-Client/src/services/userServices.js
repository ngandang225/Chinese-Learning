const apiUrl = process.env.REACT_APP_API_URL;
const userServices = {
  getCurrentUser: () => {
    const user = JSON.parse(localStorage.getItem('user')) || null;
    return user;
  },

  getAll: async () => {
    try {
      const response = await fetch(apiUrl + '/users');
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
      const response = await fetch(apiUrl + `/users/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  },
  login: async (data) => {
    try {
      const response = await fetch(apiUrl + '/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: JSON.stringify(data),
        // mode: 'cors',
      });
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const user = await response.json();
      return user;
    } catch (error) {
      console.error(error);
    }
  },
  logout: async (data) => {},
};

export default userServices;
