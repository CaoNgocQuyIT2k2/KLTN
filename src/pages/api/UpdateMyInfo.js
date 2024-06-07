import axios from 'axios';

export default async function UpdateUserInfo(req, res) {
  // Set CORS headers for all responses
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept, Authorization');

  if (req.method === 'OPTIONS') {
    // Handle preflight request
    res.status(200).end();
    return;
  }

  if (req.method === 'POST') {
    try {
      const { firstname, lastname, email, dob } = req.body;
      const { userId } = req.query;
      const token = req.headers.authorization;

      // Validate request body
      if (!firstname || !lastname || !email ) {
        res.status(400).json({ message: 'Fill in the required fields' });
        return;
      }

      // Send request to update user information API
      const response = await axios.post(
        `http://localhost:8080/api/v1/user/update-user-infor?userId=${userId}`,
        { firstname, lastname, email, dob },
        { headers: { Authorization: token } }
      );

      // Handle response from API
      if (response.status === 200) {
        res.status(200).json({ message: 'User information updated successfully!' });
      } else {
        res.status(response.status).json({ message: 'Failed to update user information.' });
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