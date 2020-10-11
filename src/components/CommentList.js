import React, { Component } from 'react';
import Comment from './Comment';
import config from '../config'

class CommentList extends Component {

    state = {
        isOpen: false,
        comments: []
    }

    render() {
        return (
            <div className="user-comments">
                <div className="comments">{/* comments area */}
                    <button
                        className="button-default"
                        onClick={this.handleClick}>
                        {this.state.isOpen ? 'hide comments' : 'show comments'}
                    </button>
                    {
                        this.state.isOpen && this.state.comments.length > 0 && (
                            <ul>
                                { this.state.comments.map(comment =>
                                    <li key={comment.id}>
                                        <Comment comment={comment} />
                                    </li>
                                )}
                            </ul>)
                    }
                </div>
            </div>
        )

    }

    /** Loading comments on state opening only. */
    handleClick = () => {
        if (!this.state.isOpen) {
            fetch(`${config.backend.BASE_URL}/posts/${this.props.postId}/comments`)
                .then(comments => comments.json())
                .then(commentsJson =>
                    this.setState({
                        comments: commentsJson,
                        isOpen: true
                    }));
        } else {
            this.setState({
                isOpen: false
            });
        }
    }
}

export default CommentList;