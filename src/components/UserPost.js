import React from 'react';
import CommentList from './CommentList';
import config from '../config';

function UserPost({ userPost, removePostGlobal }) {

    const handleRemoveClick = () => {
        fetch(`${config.backend.BASE_URL}/posts/${userPost.id}`,
            { method: 'DELETE' })
            .then(response => response.json())
            .then(json => removePostGlobal(userPost.id));
    }

    return (
        <div className='text-block'>
            <div>
                <div className="h-flex-container">
                    <div className="title">{userPost.title}</div>
                    <button className="remove" onClick={handleRemoveClick}>╳</button>
                </div>

                <div className="section-body">{userPost.body}</div>
            </div>

            <CommentList postId={userPost.id} />
        </div>
    )
}

export default UserPost;
