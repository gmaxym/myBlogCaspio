import React from 'react';

function Comment({ comment }) {
    return (
        <div className='text-block'>
            <h4>{comment.name}</h4>
            <div>{comment.body}</div>
        </div>
    );
}

export default Comment;