import React, { useState } from "react";
import styles from "./Posts.module.css";
import Content from "../../../content/Content";
import { useDispatch, useSelector } from "react-redux";
import { getComments } from "../../../../redux/features/comments";
import { deletePost } from "../../../../redux/features/posts";

const Post = ({ comments, post, handleShowContent, loadingPosts }) => {
  const [window, setWindow] = useState(false);
  const dispatch = useDispatch();

  const handleOpenPost = () => {
    setWindow(true);
    dispatch(getComments());
  };
  const handleDeletePost = (id) => {
    dispatch(deletePost(id));
  };
  const commentsList = comments.filter((comment) => comment.post === post._id);

  const img = post.imagePost;

  const host = "http://localhost:4000/";
  const { user } = useSelector((state) => state.application);

  return (
    <div onClick={handleShowContent} className={styles.mainPosts}>
      <div className={styles.mainPostsImg} onClick={handleOpenPost}>
        <img src={`${host}${img}`} alt="postImage" />
        {user?._id === post?.user?._id && (
          <div onClick={() => handleDeletePost(post._id)}>Удалить пост</div>
        )}
      </div>

      {window && (
        <Content
          comments={commentsList}
          setWindow={setWindow}
          post={post}
          host={host}
          img={img}
          user={user}
        />
      )}
    </div>
  );
};

export default Post;
