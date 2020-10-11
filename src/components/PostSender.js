import React from 'react';
import config from '../config'

class PostSender extends React.Component {

    state = {
        titleInput: '',
        postInput: ''
    }

    handleChangeTitle = event =>
        this.setState({ titleInput: event.target.value });


    handleChangePost = event =>
        this.setState({ postInput: event.target.value });


    handleAddClick = () => {

        fetch(`${config.backend.BASE_URL}/posts`,
            {
                method: 'POST',
                body: JSON.stringify({
                    title: this.state.titleInput,
                    body: this.state.postInput,
                    userId: this.props.userId,
                }),
                headers: {
                    'Content-type': 'application/json; charset=UTF-8',
                },
            })
            .then(response => response.json())
            .then(json => {
                this.setState({ titleInput: '', postInput: '' })
                this.props.addPostGlobal(json);
            });
    }

    render = () => (
        <div className="post-sender">

            <input
                className="input-post-sender"
                placeholder="Header"
                type="text"
                value={this.state.titleInput}
                onChange={this.handleChangeTitle} />

            <textarea
                className="input-post-sender"
                placeholder="Write your post"
                type="text"
                value={this.state.postInput}
                onChange={this.handleChangePost} />

            <button
                className="button-default"
                onClick={this.handleAddClick}
            >
                Post
                </button>
        </div>
    );

}

export default PostSender;