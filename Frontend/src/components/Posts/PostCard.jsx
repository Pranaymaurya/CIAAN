import React from 'react';
import { Link } from 'react-router-dom';

const PostCard = ({ post }) => {
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="post-card">
      <div className="post-header">
        <div className="post-author">
          <Link to={`/profile/${post.author._id}`} className="author-name">
            {post.author.name}
          </Link>
          <span className="post-date">{formatDate(post.createdAt)}</span>
        </div>
      </div>
      <div className="post-content">
        <p>{post.content}</p>
      </div>
    </div>
  );
};

export default PostCard;