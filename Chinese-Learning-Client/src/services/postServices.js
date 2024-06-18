import userServices from './userServices';
const apiUrl = process.env.REACT_APP_API_URL;

const postServices = {
  getAll: async () => {
    try {
      const response = await fetch(apiUrl + '/posts');
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
      const response = await fetch(apiUrl + `/posts/${id}`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  },
  getAllAvailable: async () => {
    try {
      const response = await fetch(apiUrl + `/posts/available`);
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  },
  create: async (post) => {
    try {
      const user = userServices.getCurrentUser();
      const accessToken = user?.accessToken;
      const formData = new FormData();
      // Thêm các trường dữ liệu vào FormData
      formData.append('title', post.title);
      formData.append('description', post.description);
      formData.append('content', post.content);
      formData.append('createdBy', post.createdBy);
      if (post.image instanceof File) {
        formData.append('image', post.image);
      }
      const response = await fetch(apiUrl + `/posts`, {
        method: 'POST',
        mode: 'cors', // no-cors, *cors, same-origin
        body: formData,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!response.ok) {
        // throw new Error(`HTTP error! Status: ${response.status}`);
        return { error: response.statusText, code: response.status };
      } else {
        const data = await response.json();
        return data;
      }
    } catch (error) {
      console.error(error);
    }
  },
  update: async (post) => {
    try {
      const user = userServices.getCurrentUser();
      const accessToken = user?.accessToken;
      const formData = new FormData();
      // Thêm các trường dữ liệu vào FormData
      formData.append('title', post.title);
      formData.append('description', post.description);
      formData.append('content', post.content);
      formData.append('createdBy', post.createdBy);
      if (post.image instanceof File) {
        formData.append('image', post.image);
      }
      const response = await fetch(apiUrl + `/posts/${post.id}`, {
        method: 'PUT',
        mode: 'cors', // no-cors, *cors, same-origin
        body: formData,
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!response.ok) {
        // throw new Error(`HTTP error! Status: ${response.status}`);
        return { error: response.statusText, code: response.status };
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  },
  delete: async (id) => {
    try {
      const user = userServices.getCurrentUser();
      const accessToken = user?.accessToken;
      const response = await fetch(apiUrl + `/posts/${id}/delete`, {
        method: 'PUT',
        mode: 'cors', // no-cors, *cors, same-origin
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (!response.ok) {
        // throw new Error(`HTTP error! Status: ${response.status}`);
        return { error: response.statusText, code: response.status };
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
    }
  },
};

export default postServices;
