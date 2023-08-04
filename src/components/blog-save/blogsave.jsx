
import React from 'react';
import { BsBookmarkDashFill, BsBookmarkPlusFill } from 'react-icons/bs';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';

import { fetchAuthors, fetchSavePost, fetchSavedPosts, fetchUnsavePost } from '../../redux/reducers/PostSlice';


export default function BlogSaveButton({ posts }) {
    const { _id } = posts;
  const dispatch = useDispatch();
  const location = useLocation();

  const handleSave = async () => {
    await dispatch(fetchSavePost(_id)).then(() => dispatch(fetchAuthors()));
  };

  const handleUnsave = () => {
    dispatch(fetchUnsavePost(_id)).then(async () => {
      if (location.pathname === '/dashboard') {
        await dispatch(fetchSavedPosts());
      } else if (location.pathname === '/') {
        dispatch(fetchAuthors());
      }
    });
  };

    return posts?.isMine === false ?
        <div className="position-absolute mark">
          {posts?.isSaved ? <BsBookmarkDashFill style={{ cursor: 'pointer', fill: 'black' }} onClick={handleUnsave} /> : <BsBookmarkPlusFill style={{ cursor: 'pointer' }} onClick={handleSave} />}
        </div>
        :
        null
}