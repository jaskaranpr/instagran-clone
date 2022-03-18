import { Posts } from "./Posts";
import axios from "axios";
import { UserProfile } from "./UserProfile";
import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { PostView } from "./PostView";
import { Navigation, Button } from "./styled/UserStyled";
import { useSelector } from "react-redux";

export const User = () => {
  const [viewPost, setViewPost] = useState(null);
  const [data, setData] = useState([]);
  const postsRef = useRef(0);
  const followersRef = useRef(0);
  const followingsRef = useRef(0);
  const loged = useSelector((state) => state.login);

  let initNav = {
    posts: false,
    videos: false,
    saved: false,
  };

  const [nav, setNav] = useState({ ...initNav, posts: true });
  const [loading, setLoading] = useState(true);
  const { id } = useParams();
  useEffect(() => {
    getData();
  }, [nav]);
  function getData() {
    if (nav.saved) {
      axios
        .get("https://yourbackend.com/user/savedpost", {
          headers: {
            authorization: "Barear " + loged.token,
          },
        })
        .then((res) => {
          setData({
            ...data,
            posts: [...res.data.posts],
          });
        });
    } else {
      axios.get("https://yourbackend.com/user/find/" + id).then((res) => {
        if (nav.videos) {
          setData({
            ...res.data,
            posts: [
              ...res.data.posts.filter((post) =>
                post.file_type.startsWith("video")
              ),
            ],
          });
        } else {
          postsRef.current = res.data.posts.length;
          followersRef.current = res.data.user.followers.length;
          followingsRef.current = res.data.followings.length;
          setData(res.data);
        }
        setLoading(false);
      });
    }
  }

  const navigationTab = (val) => {
    setNav({ ...initNav, [val]: true });
  };
  return loading ? (
    ""
  ) : (
    <>
      <UserProfile
        user={data.user}
        id={id}
        posts={postsRef.current}
        followers={followersRef.current}
        followings={followingsRef.current}
      />
      <Navigation>
        <Button
          style={{
            opacity: nav.posts ? "1" : "60%",
            borderTop: nav.posts ? "1px solid var(--color)" : "none",
          }}
          onClick={() => navigationTab("posts")}
        >
          <svg
            aria-label=""
            color="#262626"
            fill="#262626"
            height="12"
            role="img"
            viewBox="0 0 24 24"
            width="12"
          >
            <rect
              fill="none"
              height="18"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              width="18"
              x="3"
              y="3"
            ></rect>
            <line
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              x1="9.015"
              x2="9.015"
              y1="3"
              y2="21"
            ></line>
            <line
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              x1="14.985"
              x2="14.985"
              y1="3"
              y2="21"
            ></line>
            <line
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              x1="21"
              x2="3"
              y1="9.015"
              y2="9.015"
            ></line>
            <line
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              x1="21"
              x2="3"
              y1="14.985"
              y2="14.985"
            ></line>
          </svg>
          <h1>POSTS</h1>
        </Button>
        <Button
          style={{
            opacity: nav.videos ? "1" : "60%",
            borderTop: nav.videos ? "1px solid var(--color)" : "none",
          }}
          onClick={() => navigationTab("videos")}
        >
          <svg
            aria-label=""
            color="#262626"
            fill="#262626"
            height="12"
            role="img"
            viewBox="0 0 24 24"
            width="12"
          >
            <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm0 22.5C6.2 22.5 1.5 17.8 1.5 12S6.2 1.5 12 1.5 22.5 6.2 22.5 12 17.8 22.5 12 22.5zm5-11.8l-6.8-3.9c-.5-.3-1-.3-1.5 0-.4.3-.7.7-.7 1.3v7.8c0 .5.3 1 .8 1.3.2.1.5.2.8.2s.5-.1.8-.2l6.8-3.9c.5-.3.8-.8.8-1.3s-.5-1-1-1.3zm-7.5 5.2V8.1l6.8 3.9-6.8 3.9z"></path>
          </svg>
          <h1>VIDEOS</h1>
        </Button>

        <Button
          style={{
            opacity: nav.saved ? "1" : "60%",
            borderTop: nav.saved ? "1px solid var(--color)" : "none",
          }}
          onClick={() => navigationTab("saved")}
        >
          <svg
            aria-label=""
            color="#262626"
            fill="#262626"
            height="12"
            role="img"
            viewBox="0 0 24 24"
            width="12"
          >
            <polygon
              fill="none"
              points="20 21 12 13.44 4 21 4 3 20 3 20 21"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
            ></polygon>
          </svg>
          <h1>SAVED</h1>
        </Button>
      </Navigation>
      <Posts posts={data.posts} setViewPost={setViewPost} />
      {viewPost && <PostView viewPost={viewPost} setViewPost={setViewPost} />}
    </>
  );
};
