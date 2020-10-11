import React from 'react';
import UserPostList from './UserPostList';
import PostSender from './PostSender';
import config from '../config';

class BlogFeed extends React.Component {

    state = {
        userId: '',
        userPosts: []
    }

    handleChange = event => {
        this.setState({ userId: event.target.value });
        this.loadPosts(event.target.value);
    }

    componentDidMount = () =>
        this.loadPosts();

    addPost = newPost => {
        const postsCopy = [...this.state.userPosts];
        postsCopy.unshift(newPost);
        this.setState({ userPosts: postsCopy });
    }

    removePost = postIdToRemove => {
        const postsToKeep = this.state.userPosts
            .filter(post => post.id !== postIdToRemove)

        this.setState({ userPosts: postsToKeep });
    }

    loadPosts = userId => {
        let postsUrl;
        if (!!userId) {
            postsUrl = `${config.backend.BASE_URL}/users/${userId}/posts/`
        } else {
            postsUrl = `${config.backend.BASE_URL}/posts/`
        }

        fetch(postsUrl)
            .then(posts => posts.json())
            .then(postsJson =>
                this.setState({
                    userId: this.state.userId,
                    userPosts: postsJson
                }))
    }

    render = () => (
        <div>
            <div className="search">
                <input
                    type="text" 
                    value={this.state.userId} 
                    onChange={this.handleChange} 
                    placeholder="Enter user ID"
                    ref={this.searchInput}
                    autoFocus={true}
                />
            </div>
            {
                !!this.state.userId &&
                <PostSender
                    userId={this.state.userId}
                    addPostGlobal={this.addPost}
                />
            }
            {
                !this.state.userId &&
                <div className="post-sender">
                    <div>Enter user ID for new post</div>
                </div>
            }
            <div className="blog-feed">
                <UserPostList
                    userPosts={this.state.userPosts}
                    removePostGlobal={this.removePost} />
            </div>
        </div>
    );
}

export default BlogFeed;