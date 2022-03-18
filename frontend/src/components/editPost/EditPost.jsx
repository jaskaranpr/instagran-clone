import { useState, useEffect } from "react";
import { Main, Bg } from "./styled";
import { useSelector } from "react-redux";
import axios from "axios";

export const EditPost = ({ post, setEditPost }) => {
  const [isFollwed, setIsFolled] = useState(false);
  const user = useSelector((state) => state.user);
  const loged = useSelector((state) => state.login);
  useEffect(() => {
    post.user.followers.map((postUser) => {
      if (postUser._id === user._id) {
        setIsFolled(true);
      }
    });
  }, []);

  async function changeFollow() {
    let res = await axios.post(
      "https://yourbackend.com/user/" + post.user._id + "/follow",
      {},
      {
        headers: {
          authorization: "Barear " + loged.token,
        },
      }
    );
    setIsFolled(!isFollwed);
  }

  async function handleDelete() {
    let res = await axios.delete("https://yourbackend.com/post/" + post._id, {
      headers: {
        authorization: "Barear " + loged.token,
      },
    });
    setEditPost(false);
  }
  console.log(post, user, isFollwed);
  return (
    <>
      <Main>
        {post.user._id === user._id && (
          <h1 onClick={handleDelete} className="red">
            Delete
          </h1>
        )}
        {isFollwed ? (
          <h1 onClick={changeFollow} className="red">
            Unfollow
          </h1>
        ) : (
          <h1 onClick={changeFollow} className="blue">
            Follow
          </h1>
        )}
        <h1>Share to...</h1>
        <h1
          onClick={() => setEditPost(false)}
          style={{
            borderBottom: "none",
          }}
        >
          Cancle
        </h1>
      </Main>
      <Bg onClick={() => setEditPost(false)}></Bg>
    </>
  );
};
