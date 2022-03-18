import { useState, useEffect, useRef } from "react";
import {
  PostsDiv,
  UserSec,
  ImageSec,
  LikeDiv,
  CommentDiv,
  Faded,
  BottomCommentInput,
  EmojiBg,
} from "../styled/PostsStyle";
import { Link } from "react-router-dom";
import axios from "axios";
import EmojiPicker from "emoji-picker-react";
import { useSelector } from "react-redux";
import { PostView } from "../../UserProfile/PostView";
import { EditPost } from "../../editPost/EditPost";
import { SendNotification } from "../../SendNotification/SendNotification";

export const Posts = ({ post }) => {
  const [viewPost, setViewPost] = useState(null);
  const user = useSelector((state) => state.user);
  const [saved, setSaved] = useState(false);
  const loged = useSelector((state) => state.login);
  const [emoji, setEmoji] = useState(false);
  const [comment, setComment] = useState("");
  const [editPost, setEditPost] = useState(false);

  const [like, setLike] = useState({
    liked: false,
    count: 0,
  });

  function handleLikes(op) {
    axios
      .post(
        `https://yourbackend.com/post/${post._id}/like`,
        {},
        {
          headers: {
            authorization: "Barear " + loged.token,
          },
        }
      )
      .then((res) => {
        setLike({
          liked: op === 1,
          count: like.count + op,
        });
      })
      .catch((err) => console.log(err));
    if (op === 1) {
      SendNotification(post.user._id, "like", user._id, {
        profile_image: user.profile_image,
        name: user.name,
        userId: user.userId,
      });
    }
  }
  function handleSaved(op) {
    axios
      .post(
        `https://instagarm-jaskaran.herokuapp.com/user/savepost`,
        {
          postId: post._id,
        },
        {
          headers: {
            authorization: "Barear " + loged.token,
          },
        }
      )
      .then((res) => {
        console.log(res);
        setSaved(op === 1);
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    if (post) {
      let find = false;
      post.likes.map((like) => {
        if (like === user._id) {
          find = true;
        }
      });
      setLike({ liked: find, count: post.likes.length });

      user.saved.map((save) => {
        if (save === post._id) {
          setSaved(true);
        }
      });
    }
  }, []);
  function timeSince(date) {
    var seconds = Math.floor((new Date() - date) / 1000);

    var interval = seconds / 31536000;
    if (interval === 1) {
      return Math.floor(interval) + " YEARS AGO";
    }
    if (interval > 1) {
      return Math.floor(interval) + " YEARS AGO";
    }
    interval = seconds / 2592000;
    if (interval === 1) {
      return Math.floor(interval) + " MONTH AGO";
    }
    if (interval > 1) {
      return Math.floor(interval) + " MONTHS AGO";
    }
    interval = seconds / 86400;
    if (interval === 1) {
      return Math.floor(interval) + " DAY AGO";
    }
    if (interval > 1) {
      return Math.floor(interval) + " DAYS AGO";
    }
    interval = seconds / 3600;
    if (interval === 1) {
      return Math.floor(interval) + " HOUR AGO";
    }
    if (interval > 1) {
      return Math.floor(interval) + " HOURS AGO";
    }
    interval = seconds / 60;
    if (interval === 1) {
      return Math.floor(interval) + " MINUTE AGO";
    }
    if (interval > 1) {
      return Math.floor(interval) + " MINUTES AGO";
    }
    return Math.floor(seconds) + " SECODES AGO";
  }
  const onEmojiClick = (event, emojiObject) => {
    setComment(comment + emojiObject.emoji);
  };

  function postComment() {
    axios
      .post(
        `https://instagarm-jaskaran.herokuapp.com/post/${post._id}/comment`,
        { title: comment },
        {
          headers: {
            authorization: "Barear " + loged.token,
          },
        }
      )
      .then((res) => {
        setComment("");
      })
      .catch((err) => console.log(err));
  }
  return (
    <>
      {editPost && <EditPost post={post} setEditPost={setEditPost} />}
      {viewPost && <PostView viewPost={viewPost} setViewPost={setViewPost} />}
      <PostsDiv>
        <UserSec>
          <Link to={"/" + post.user.userId}>
            <div>
              <div>
                <img src={post.user.profile_image} alt="" />
              </div>
              <h2>{post.user.userId}</h2>
            </div>
          </Link>
          <div
            onClick={() => setEditPost(true)}
            style={{
              cursor: "pointer",
            }}
          >
            <svg
              aria-label="More Options"
              color="#262626"
              fill="#262626"
              height="24"
              role="img"
              viewBox="0 0 24 24"
              width="24"
            >
              <circle cx="12" cy="12" r="1.5"></circle>
              <circle cx="6" cy="12" r="1.5"></circle>
              <circle cx="18" cy="12" r="1.5"></circle>
            </svg>
          </div>
        </UserSec>
        <ImageSec>
          {post.file_type.startsWith("image") ? (
            <img src={post.url} alt="" />
          ) : (
            <DisplayVideo file={post.url} type={post.file_type} />
          )}
        </ImageSec>
        <LikeDiv>
          <div>
            {" "}
            {like.liked ? (
              <svg
                onClick={() => handleLikes(-1)}
                color="#ed4956"
                style={{
                  filter: "none",
                }}
                className="liked-svg"
                fill="#ed4956"
                height="24"
                role="img"
                viewBox="0 0 48 48"
                width="24"
              >
                <path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
              </svg>
            ) : (
              <svg
                onClick={() => handleLikes(1)}
                color="#262626"
                fill="#262626"
                height="24"
                role="img"
                viewBox="0 0 24 24"
                width="24"
              >
                <path d="M16.792 3.904A4.989 4.989 0 0121.5 9.122c0 3.072-2.652 4.959-5.197 7.222-2.512 2.243-3.865 3.469-4.303 3.752-.477-.309-2.143-1.823-4.303-3.752C5.141 14.072 2.5 12.167 2.5 9.122a4.989 4.989 0 014.708-5.218 4.21 4.21 0 013.675 1.941c.84 1.175.98 1.763 1.12 1.763s.278-.588 1.11-1.766a4.17 4.17 0 013.679-1.938m0-2a6.04 6.04 0 00-4.797 2.127 6.052 6.052 0 00-4.787-2.127A6.985 6.985 0 00.5 9.122c0 3.61 2.55 5.827 5.015 7.97.283.246.569.494.853.747l1.027.918a44.998 44.998 0 003.518 3.018 2 2 0 002.174 0 45.263 45.263 0 003.626-3.115l.922-.824c.293-.26.59-.519.885-.774 2.334-2.025 4.98-4.32 4.98-7.94a6.985 6.985 0 00-6.708-7.218z"></path>
              </svg>
            )}
            <svg
              onClick={() =>
                setViewPost({
                  index: 0,
                  postsArr: [post._id],
                })
              }
              color="#262626"
              fill="#262626"
              height="24"
              role="img"
              viewBox="0 0 24 24"
              width="24"
            >
              <path
                d="M20.656 17.008a9.993 9.993 0 10-3.59 3.615L22 22z"
                fill="none"
                stroke="currentColor"
                strokeLinejoin="round"
                strokeWidth="2"
              ></path>
            </svg>
          </div>
          <div>
            {saved ? (
              <svg
                aria-label="Remove"
                onClick={() => handleSaved(0)}
                color="#262626"
                fill="#262626"
                height="24"
                role="img"
                viewBox="0 0 24 24"
                width="24"
              >
                <path d="M20 22a.999.999 0 01-.687-.273L12 14.815l-7.313 6.912A1 1 0 013 21V3a1 1 0 011-1h16a1 1 0 011 1v18a1 1 0 01-1 1z"></path>
              </svg>
            ) : (
              <svg
                onClick={() => handleSaved(1)}
                aria-label="Save"
                color="#262626"
                fill="#262626"
                height="24"
                role="img"
                viewBox="0 0 24 24"
                width="24"
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
            )}
          </div>
        </LikeDiv>
        <CommentDiv>
          <p>{like.count + (like.count === 1 ? " like" : " likes")}</p>

          <div className="commentDivBottom">
            <h2>{post.user.userId}</h2>

            {post.caption}
          </div>
          <Faded>
            <p
              onClick={() =>
                setViewPost({
                  index: 0,
                  postsArr: [post._id],
                })
              }
            >
              {post.comments.length === 0
                ? "No comments"
                : post.comments.length === 1
                ? "View one comment"
                : `View ${post.comments.length} comments`}
            </p>
            <h2>{timeSince(new Date(post.createdAt))}</h2>
          </Faded>
        </CommentDiv>
        <BottomCommentInput>
          <svg
            onClick={() => setEmoji(true)}
            aria-label="Emoji"
            color="#262626"
            fill="#262626"
            height="24"
            role="img"
            viewBox="0 0 24 24"
            width="24"
          >
            <path d="M15.83 10.997a1.167 1.167 0 101.167 1.167 1.167 1.167 0 00-1.167-1.167zm-6.5 1.167a1.167 1.167 0 10-1.166 1.167 1.167 1.167 0 001.166-1.167zm5.163 3.24a3.406 3.406 0 01-4.982.007 1 1 0 10-1.557 1.256 5.397 5.397 0 008.09 0 1 1 0 00-1.55-1.263zM12 .503a11.5 11.5 0 1011.5 11.5A11.513 11.513 0 0012 .503zm0 21a9.5 9.5 0 119.5-9.5 9.51 9.51 0 01-9.5 9.5z"></path>
          </svg>
          <input
            type="text"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Add a comment…"
          />
          {comment.length > 0 && <p onClick={postComment}>Post</p>}
          {emoji && (
            <EmojiPicker
              style={{
                position: "absolute",
                bottom: "0",
              }}
              onEmojiClick={onEmojiClick}
            />
          )}
        </BottomCommentInput>
        {emoji && <EmojiBg onClick={() => setEmoji(false)} />}
      </PostsDiv>
    </>
  );
};

function DisplayVideo({ file, type }) {
  const videoRef = useRef(null);
  const [paused, setPaused] = useState(true);
  const [muted, setMuted] = useState(true);
  const [loading, setLoading] = useState(true);
  const handlePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setPaused(false);
    } else {
      videoRef.current.pause();
      setPaused(true);
    }
  };
  const handleMuted = () => {
    if (videoRef.current.muted) {
      videoRef.current.muted = false;
      setMuted(false);
    } else {
      videoRef.current.muted = true;
      setMuted(true);
    }
  };
  useEffect(() => {
    videoRef.current.addEventListener("loadedmetadata", () => {
      setLoading(false);
    });
  }, []);

  return (
    <div id="videoDivHome" className={loading ? "videoLoading" : ""}>
      <video onClick={handlePlay} ref={videoRef} muted>
        <source src={file} type={type} />
      </video>
      {!loading && paused && <div onClick={handlePlay} id="play"></div>}
      <div id="muteBtn" onClick={handleMuted}>
        {!loading && (
          <>
            {" "}
            {muted ? (
              <svg
                style={{
                  filter: "none",
                }}
                aria-label="Audio is muted."
                color="#ffffff"
                fill="#ffffff"
                height="12"
                role="img"
                viewBox="0 0 48 48"
                width="12"
              >
                <path
                  clipRule="evenodd"
                  d="M1.5 13.3c-.8 0-1.5.7-1.5 1.5v18.4c0 .8.7 1.5 1.5 1.5h8.7l12.9 12.9c.9.9 2.5.3 2.5-1v-9.8c0-.4-.2-.8-.4-1.1l-22-22c-.3-.3-.7-.4-1.1-.4h-.6zm46.8 31.4l-5.5-5.5C44.9 36.6 48 31.4 48 24c0-11.4-7.2-17.4-7.2-17.4-.6-.6-1.6-.6-2.2 0L37.2 8c-.6.6-.6 1.6 0 2.2 0 0 5.7 5 5.7 13.8 0 5.4-2.1 9.3-3.8 11.6L35.5 32c1.1-1.7 2.3-4.4 2.3-8 0-6.8-4.1-10.3-4.1-10.3-.6-.6-1.6-.6-2.2 0l-1.4 1.4c-.6.6-.6 1.6 0 2.2 0 0 2.6 2 2.6 6.7 0 1.8-.4 3.2-.9 4.3L25.5 22V1.4c0-1.3-1.6-1.9-2.5-1L13.5 10 3.3-.3c-.6-.6-1.5-.6-2.1 0L-.2 1.1c-.6.6-.6 1.5 0 2.1L4 7.6l26.8 26.8 13.9 13.9c.6.6 1.5.6 2.1 0l1.4-1.4c.7-.6.7-1.6.1-2.2z"
                  fillRule="evenodd"
                ></path>
              </svg>
            ) : (
              <svg
                style={{
                  filter: "none",
                }}
                aria-label="Audio is playing"
                color="#ffffff"
                fill="#ffffff"
                height="12"
                role="img"
                viewBox="0 0 24 24"
                width="12"
              >
                <path d="M16.636 7.028a1.5 1.5 0 10-2.395 1.807 5.365 5.365 0 011.103 3.17 5.378 5.378 0 01-1.105 3.176 1.5 1.5 0 102.395 1.806 8.396 8.396 0 001.71-4.981 8.39 8.39 0 00-1.708-4.978zm3.73-2.332A1.5 1.5 0 1018.04 6.59 8.823 8.823 0 0120 12.007a8.798 8.798 0 01-1.96 5.415 1.5 1.5 0 002.326 1.894 11.672 11.672 0 002.635-7.31 11.682 11.682 0 00-2.635-7.31zm-8.963-3.613a1.001 1.001 0 00-1.082.187L5.265 6H2a1 1 0 00-1 1v10.003a1 1 0 001 1h3.265l5.01 4.682.02.021a1 1 0 001.704-.814L12.005 2a1 1 0 00-.602-.917z"></path>
              </svg>
            )}
          </>
        )}
      </div>
    </div>
  );
}
