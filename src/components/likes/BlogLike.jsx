import React from 'react';
import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';
import { useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { fetchAuthors, fetchLike, fetchSavedPosts, fetchUnlike } from '../../redux/reducers/PostSlice';




export default function BlogLikeButton({ posts }) {
  const { _id } = posts;
  const dispatch = useDispatch();
  const location = useLocation();


  const handleLike = () => {
    dispatch(fetchLike(_id)).then(() => dispatch(fetchAuthors()));
  };

  const handleUnlike = () => {
    dispatch(fetchUnlike(_id)).then(async () => {
      if (location.pathname === '/dashboard') {
        await dispatch(fetchSavedPosts());
      } else {
        dispatch(fetchAuthors());
      }
    });
  };

  return (
    posts?.isMine === false ?
      <div className="d-flex align-items-center justify-content-center fs-4">
        {posts?.isLike ?
        <div className="d-flex align-items-center justify-content-center fs-4 ms-2">
          <p className="mb-0 me-2">{posts?.likes?.length}</p>
          <AiFillHeart style={{ cursor: 'pointer' }} onClick={handleUnlike} />
        </div>
        : <div className="d-flex align-items-center justify-content-center fs-4 ms-2">
          <p className="mb-0 me-2">{posts?.likes?.length}</p>
          <AiOutlineHeart style={{ cursor: 'pointer' }} onClick={handleLike} />
        </div>}
      </div>
      :
      <div className="d-flex align-items-center justify-content-center fs-4">
        <p className="mb-0 me-2">{posts?.likes?.length}</p>
        <AiFillHeart />
      </div>
  )


}
