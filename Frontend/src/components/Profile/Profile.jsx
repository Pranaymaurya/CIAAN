import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { usersAPI, postsAPI } from '../../utils/api';
import PostCard from '../Posts/PostCard';

const Profile = () => {
  const { userId } = useParams();
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
  }, [userId]);

  const fetchUserData = async () => {
    try {
      const [userResponse, postsResponse] = await Promise.all([
        usersAPI.getUser(userId),
        postsAPI.getUserPosts(userId),
      ]);
      
      setUser(userResponse.data);
      setPosts(postsResponse.data);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
    setLoading(false);
  };

  if (loading) {
    return <div className="loading">Loading profile...</div>;
  }

  if (!user) {
    return <div className="error">User not found</div>;
  }

  return (
    <div className="profile">
      <div className="profile-header">
        <div className="profile-info">
          <h1>{user.name}</h1>
          <p className="profile-email">{user.email}</p>
          {user.bio && <p className="profile-bio">{user.bio}</p>}
        </div>
      </div>
      
      <div className="profile-posts">
        <h2>Posts ({posts.length})</h2>
        
        {posts.length === 0 ? (
          <div className="no-posts">
            <p>{user.name} hasn't posted anything yet.</p>
          </div>
        ) : (
          <div className="posts-list">
            {posts.map((post) => (
              <PostCard key={post._id} post={post} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Profile;