const apiUrl = process.env.REACT_APP_API_URL;
const ga4Service = {
  getPageViews: async () => {
    try {
      const response = await fetch(apiUrl + '/get-page-view');
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

export default ga4Service;
