// Create web server
const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const cors = require('cors');

// Create express app
const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Create comments object
const commentsByPostId = {};

// Create a route handler for POST request at /posts/:id/comments
// Post a comment to a post
app.post('/posts/:id/comments', (req, res) => {
  // Generate random ID
  const commentId = randomBytes(4).toString('hex');
  // Get post ID from URL
  const { id } = req.params;
  // Get comment from body
  const { content } = req.body;
  // Get comments for post
  const comments = commentsByPostId[id] || [];
  // Add comment to comments
  comments.push({ id: commentId, content });
  // Add comments to commentsByPostId
  commentsByPostId[id] = comments;
  // Send back comments
  res.status(201).send(comments);
});

// Create a route handler for GET request at /posts/:id/comments
// Get comments for a post
app.get('/posts/:id/comments', (req, res) => {
  // Get post ID from URL
  const { id } = req.params;
  // Get comments for post
  const comments = commentsByPostId[id] || [];
  // Send back comments
  res.send(comments);
});

// Listen on port 4001
app.listen(4001, () => {
  console.log('Listening on 4001');
});