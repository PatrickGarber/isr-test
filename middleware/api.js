import fs from 'fs';
import axios from 'axios';

export default function (req, res, next) {
  const fetchPosts = async () => {
    try {
      // Make a request to the API
      const response = await axios('https://64775ba49233e82dd53b8230.mockapi.io/api/v1/posts');

      // Check for errors
      if (response.status !== 200) {
        console.log('Error fetching data from API:', response.status);
        return;
      }

      // Write the data to the posts.json file
      fs.writeFileSync('static/posts.json', JSON.stringify(response.data, null, 2), 'utf-8');

      // Success!
      console.log('File fetched from API and written locally!');
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchPosts();

  next();
}
