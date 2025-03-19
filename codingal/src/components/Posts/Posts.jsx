    // src/components/Posts/Posts.jsx
    import React, { useState, useEffect, useRef } from 'react';
    import './Posts.css';
    import Loader from '../Loader/Loader';

    const Posts = () => {
    const [posts, setPosts] = useState([]);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hasMore, setHasMore] = useState(true);
    const loaderRef = useRef(null);

    // Function to fetch posts
    const fetchPosts = async () => {
        if (loading || !hasMore) return;
        
        setLoading(true);
        try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_page=${page + 1}&_limit=10`);
        
        if (!response.ok) {
            throw new Error('Failed to fetch posts');
        }
        
        const newPosts = await response.json();
        
        // If no more posts, set hasMore to false
        if (newPosts.length === 0) {
            setHasMore(false);
            return;
        }
        
        // Add new posts to existing posts
        setPosts(prevPosts => [...prevPosts, ...newPosts]);
        setPage(prevPage => prevPage + 1);
        } catch (err) {
        setError(err.message);
        } finally {
        setLoading(false);
        }
    };

    // Set up Intersection Observer for infinite scrolling
    useEffect(() => {
        const observer = new IntersectionObserver(
        entries => {
            if (entries[0].isIntersecting && !loading) {
            fetchPosts();
            }
        },
        { threshold: 1.0 }
        );

        if (loaderRef.current) {
        observer.observe(loaderRef.current);
        }

        // Clean up observer
        return () => {
        if (loaderRef.current) {
            observer.unobserve(loaderRef.current);
        }
        };
    }, [loading, hasMore]);

    // Initial fetch
    useEffect(() => {
        fetchPosts();
    }, []);

    // Error handling
    if (error) {
        return (
        <div className="posts-container">
            <div className="error-message">
            <h2>Error!</h2>
            <p>{error}</p>
            <button onClick={() => {
                setError(null);
                setPage(0);
                setPosts([]);
                setHasMore(true);
                fetchPosts();
            }}>
                Try Again
            </button>
            </div>
        </div>
        );
    }

    return (
        <div className="posts-container">
        <h1>Posts</h1>
        <div className="posts-list">
            {posts.map(post => (
            <div key={post.id} className="post-card">
                <h2>{post.title}</h2>
                <p>{post.body}</p>
            </div>
            ))}
            {loading && <Loader />}
            {!loading && hasMore && <div ref={loaderRef} className="loader-trigger"></div>}
            {!hasMore && posts.length > 0 && <p className="end-message">No more posts to load</p>}
            {!loading && posts.length === 0 && <p className="no-posts">No posts found</p>}
        </div>
        </div>
    );
    };

    export default Posts;