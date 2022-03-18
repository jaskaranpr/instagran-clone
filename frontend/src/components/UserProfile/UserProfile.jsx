import { useState, useEffect } from "react";
import { LogoDiv, Main, TextDiv, FollowBtn } from "./styled/userProf";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { SendNotification } from "../SendNotification/SendNotification";
import axios from "axios";

export const UserProfile = ({ id, user, posts, followers, followings }) => {
  const curUser = useSelector((state) => state.user);
  const loged = useSelector((state) => state.login);
  const [follow, setFollow] = useState(false);
  useEffect(() => {
    {
      user.followers && curUser._id !== user._id && checkFollow();
    }
  }, []);
  function checkFollow() {
    user.followers.map(({ _id }) => {
      if (_id === curUser._id) {
        setFollow(true);
      }
    });
  }

  async function changeFollow() {
    let res = await axios.post(
      "https://yourbackend.com/user/" + user._id + "/follow",
      {},
      {
        headers: {
          authorization: "Barear " + loged.token,
        },
      }
    );
    if (!follow) {
      SendNotification(user._id, "follow", curUser._id, {
        profile_image: curUser.profile_image,
        name: curUser.name,
        userId: curUser.userId,
      });
    }
    setFollow(!follow);
  }

  return (
    <Main
      style={{
        width: "1000px",
        margin: "auto",
      }}
    >
      <div>
        <LogoDiv className="logo">
          <img src={user.profile_image} alt="" />
        </LogoDiv>
        <TextDiv>
          <div className="userId-section">
            <h1>{user.userId}</h1>
            {curUser._id === user._id ? (
              <>
                {" "}
                <Link to="edit">
                  <button>Edit Profile</button>
                </Link>
                <Link to="edit">
                  <svg
                    aria-label="Options"
                    color="#262626"
                    fill="#262626"
                    height="24"
                    role="img"
                    viewBox="0 0 24 24"
                    width="24"
                  >
                    <circle
                      cx="12"
                      cy="12"
                      fill="none"
                      r="8.635"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    ></circle>
                    <path
                      d="M14.232 3.656a1.269 1.269 0 01-.796-.66L12.93 2h-1.86l-.505.996a1.269 1.269 0 01-.796.66m-.001 16.688a1.269 1.269 0 01.796.66l.505.996h1.862l.505-.996a1.269 1.269 0 01.796-.66M3.656 9.768a1.269 1.269 0 01-.66.796L2 11.07v1.862l.996.505a1.269 1.269 0 01.66.796m16.688-.001a1.269 1.269 0 01.66-.796L22 12.93v-1.86l-.996-.505a1.269 1.269 0 01-.66-.796M7.678 4.522a1.269 1.269 0 01-1.03.096l-1.06-.348L4.27 5.587l.348 1.062a1.269 1.269 0 01-.096 1.03m11.8 11.799a1.269 1.269 0 011.03-.096l1.06.348 1.318-1.317-.348-1.062a1.269 1.269 0 01.096-1.03m-14.956.001a1.269 1.269 0 01.096 1.03l-.348 1.06 1.317 1.318 1.062-.348a1.269 1.269 0 011.03.096m11.799-11.8a1.269 1.269 0 01-.096-1.03l.348-1.06-1.317-1.318-1.062.348a1.269 1.269 0 01-1.03-.096"
                      fill="none"
                      stroke="currentColor"
                      strokeLinejoin="round"
                      strokeWidth="2"
                    ></path>
                  </svg>
                </Link>{" "}
              </>
            ) : (
              <FollowBtn
                onClick={changeFollow}
                style={{
                  background: follow ? "rgba(237,73,86,1)" : "#0095f6",
                }}
              >
                {follow ? "Unfollow" : "Follow"}
              </FollowBtn>
            )}
          </div>
          <div className="user-activity">
            <div className="posts">{posts} posts</div>
            <div className="followers">{followers} followers</div>
            <div className="following"> {followings} following</div>
          </div>
          <div className="bio">
            <p>{user.bio || "No Bio"}</p>
          </div>
        </TextDiv>
      </div>
    </Main>
  );
};
