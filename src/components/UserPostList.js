import React from 'react';
import UserPost from './UserPost';
import {v4 as uuidV4} from 'uuid';

const UserPostList = ({ 
    userPosts,
    removePostGlobal
}) => (
    <ul>
        {
            userPosts.map(userPost =>
                (
                    <li key={uuidV4()}>
                        <div className="block">
                            <UserPost
                                userPost={userPost}
                                removePostGlobal={removePostGlobal} />
                        </div>
                    </li>
                )
            )
        }
    </ul>);

export default UserPostList;