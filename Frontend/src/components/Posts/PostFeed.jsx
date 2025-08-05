import React, { useState, useEffect } from 'react';
import { postsAPI } from '../../utils/api';
import CreatePost from './CreatePost';
import PostCard from './PostCard';

const PostFeed = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    try {
      const response = await postsAPI.getAllPosts();
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
    setLoading(false);
  };

  const handlePostCreated = (newPost) => {
    setPosts([newPost, ...posts]);
  };

  if (loading) {
    return <div className="loading">Loading posts...</div>;
  }

  return (
    <div className="post-feed">
      <CreatePost onPostCreated={handlePostCreated} />
      
      <div className="posts-list">
        {posts.length === 0 ? (
          <div className="no-posts">
            <p>No posts yet. Be the first to share something!</p>
          </div>
        ) : (
          posts.map((post) => (
            <PostCard key={post._id} post={post} />
          ))
        )}
      </div>
    </div>
  );
};

export default PostFeed;