// pages/api/getLatestDantri.js
import axios from 'axios';

export default async function fetchArticleByCat(req, res) {
  // Set up CORS headers
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With, Content-Type, Accept');

  // Handle API request
  try {
    const response = await axios.get("http://localhost:8080/api/v1/article/anonymous/find-by-category?categoryId=02a94e20-3bcc-4bea-9ddc-149ea8fd94b8");
    const data = response.data;
    console.log("🚀 ~ data:", data);
    res.status(200).json(data);
  } catch (error) {
    console.log("🚀 ~ error:", error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
}
