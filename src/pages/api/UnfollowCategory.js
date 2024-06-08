import axios from 'axios';

export default async function UnfollowCategory(req, res) {
  // Set CORS headers for all responses
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Authorization');

  if (req.method === 'OPTIONS') {
    // Handle preflight request
    res.status(200).end();
    return;
  }

  if (req.method === 'DELETE') {
    try {
      const { categoryId } = req.query;
      const token = req.headers.authorization;

      console.log("categoryId", categoryId);
      console.log("token", token);

      console.log("requestBody", requestBody);

      // Send request to update tag API
      const response = await axios.delete(
        `http://localhost:8080/api/v1/follow-category/un-follow?categoryId==${categoryId}`,
        { headers: { Authorization: token } }
      );

      // Handle response from API
      if (response.status === 200) {
        res.status(200).json({ message: 'Unfollow successfully!' });
      } else {
        res.status(response.status).json({ message: 'Failed to Unfollow.' });
      }
    } catch (error) {
      console.error('Error:', error);
      if (error.response && error.response.status === 403) {
        res.status(403).json({ message: 'Unauthorized' });
      } else {
        res.status(500).json({ message: 'Internal Server Error' });
      }
    }
  } else {
    res.status(405).json({ message: 'Method not allowed' });
  }
}