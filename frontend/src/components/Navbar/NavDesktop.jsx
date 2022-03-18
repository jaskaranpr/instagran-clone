import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { logOut } from "../../store/login/action";
import {
  Header,
  Nav,
  Logo,
  Search,
  Icon,
  LogOut,
  NavBtn,
  ProfileMenu,
  NotifyDot,
} from "./styled/NavDesk";
import cross from "../assets/cross.png";
import {
  Exploreicon,
  Hearticon,
  Homeicon,
  Inboxicon,
  Posticon,
  Profileicon,
  Searchicon,
} from "./assets/Icons";
import { NewPost } from "../newPost/NewPost";
import { SearchBox } from "./SearchBox";
import { Link, useNavigate } from "react-router-dom";
import { NotificationsView } from "./NotificatioView";
import { getDatabase, ref, onValue } from "firebase/database";

export const NavDesktop = ({ setTheme, theme, setGlobalUser }) => {
  const [search, setSearch] = useState(false);
  const [userClicked, setUserClicked] = useState(false);
  const [heart, setHeart] = useState(false);
  const [newPost, setNewPost] = useState(false);
  const user = useSelector((state) => state.user);
  const [searchInput, setSearchInput] = useState("");
  const [searchData, setSearchData] = useState([]);
  const [notify, setNotify] = useState(false);
  const [userNotifications, setUserNotification] = useState([]);
  useEffect(() => {
    const db = getDatabase();
    const starCountRef = ref(db, "notification/" + user._id);
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      if (data) setUserNotification(data.value);
    });
  }, []);

  useEffect(() => {
    if (userNotifications?.filter((n) => !n.watched).length > 0) {
      setNotify(true);
      setTimeout(() => {
        setNotify(false);
      }, 5000);
    }
  }, [userNotifications]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    setGlobalUser();
  }, []);
  return (
    <Header>
      <Nav>
        <Logo>
          <Link to="/">
            <img
              width="103px"
              height="29px"
              src={
                theme === "light"
                  ? "https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                  : "https://www.instagram.com/static/images/web/mobile_nav_type_logo-dark.png/ff9b85f2b7ca.png"
              }
              alt="logo"
            />
          </Link>
        </Logo>
        <Search cross={cross}>
          <div className="search-box">
            {!search && <Searchicon />}
            <input
              onMouseLeave={() => setSearch(false)}
              onFocus={() => setSearch(true)}
              type="search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              placeholder="Search"
            />
          </div>
          {searchInput && (
            <SearchBox
              setSearchInput={setSearchInput}
              setSearchData={setSearchData}
              searchData={searchData}
              searchInput={searchInput}
            />
          )}
        </Search>
        <NavBtn>
          <Icon>
            <Homeicon />
          </Icon>
          <Icon>
            <Inboxicon />
          </Icon>
          <Icon onClick={() => setNewPost(true)}>
            <Posticon />
          </Icon>
          <Icon>
            <Exploreicon />
          </Icon>
          <Icon
            style={{
              position: "relative",
            }}
            onClick={() => setHeart(!heart)}
          >
            <Hearticon heart={heart} />
            {heart && (
              <NotificationsView
                setHeart={setHeart}
                id={user._id}
                userNotifications={userNotifications}
              />
            )}
            <span
              className={
                notify
                  ? "notificationCount notificationActive"
                  : "notificationCount"
              }
            >
              <svg
                style={{
                  filter: "none",
                }}
                aria-label="Activity Feed"
                color="#fff"
                fill="#fff"
                height="24"
                role="img"
                viewBox="0 0 48 48"
                width="24"
              >
                <path d="M34.6 3.1c-4.5 0-7.9 1.8-10.6 5.6-2.7-3.7-6.1-5.5-10.6-5.5C6 3.1 0 9.6 0 17.6c0 7.3 5.4 12 10.6 16.5.6.5 1.3 1.1 1.9 1.7l2.3 2c4.4 3.9 6.6 5.9 7.6 6.5.5.3 1.1.5 1.6.5s1.1-.2 1.6-.5c1-.6 2.8-2.2 7.8-6.8l2-1.8c.7-.6 1.3-1.2 2-1.7C42.7 29.6 48 25 48 17.6c0-8-6-14.5-13.4-14.5z"></path>
              </svg>
              {userNotifications?.filter((n) => !n.watched).length}
            </span>
            {userNotifications?.filter((n) => !n.watched).length > 0 && (
              <NotifyDot></NotifyDot>
            )}
          </Icon>
          <Icon
            style={{
              position: "relative",
            }}
            onClick={() => setUserClicked(!userClicked)}
          >
            <Profileicon clicked={userClicked} img={user.profile_image} />
            {userClicked && (
              <ProfileMenu>
                <Link to={user.userId}>
                  <div>
                    <svg
                      aria-label="Profile"
                      color="#262626"
                      fill="#262626"
                      height="16"
                      role="img"
                      viewBox="0 0 24 24"
                      width="16"
                    >
                      <circle
                        cx="12.004"
                        cy="12.004"
                        fill="none"
                        r="10.5"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeMiterlimit="10"
                        strokeWidth="2"
                      ></circle>
                      <path
                        d="M18.793 20.014a6.08 6.08 0 00-1.778-2.447 3.991 3.991 0 00-2.386-.791H9.38a3.994 3.994 0 00-2.386.791 6.09 6.09 0 00-1.779 2.447"
                        fill="none"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeMiterlimit="10"
                        strokeWidth="2"
                      ></path>
                      <circle
                        cx="12.006"
                        cy="9.718"
                        fill="none"
                        r="4.109"
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeMiterlimit="10"
                        strokeWidth="2"
                      ></circle>
                    </svg>
                    <p>Profile</p>
                  </div>
                </Link>
                <Link to="/edituser">
                  <div>
                    <svg
                      aria-label="Settings"
                      color="#262626"
                      fill="#262626"
                      height="16"
                      role="img"
                      viewBox="0 0 24 24"
                      width="16"
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
                    <p>Settings</p>
                  </div>
                </Link>
                {/* ///////// */}
                <div
                  onClick={() => setTheme(theme === "light" ? "dark" : "light")}
                >
                  <svg
                    aria-label="Switch accounts"
                    color="#262626"
                    style={{
                      transform: "scale(-90%)",
                      marginBottom: "-5px",
                    }}
                    fill="#262626"
                    height="16"
                    role="img"
                    viewBox="0 0 24 24"
                    width="16"
                  >
                    <path d="M8 8.363a1 1 0 00-1-1H4.31a8.977 8.977 0 0114.054-1.727 1 1 0 101.414-1.414A11.003 11.003 0 003 5.672V3.363a1 1 0 10-2 0v5a1 1 0 001 1h5a1 1 0 001-1zm14 6.274h-5a1 1 0 000 2h2.69a8.977 8.977 0 01-14.054 1.727 1 1 0 00-1.414 1.414A11.004 11.004 0 0021 18.33v2.307a1 1 0 002 0v-5a1 1 0 00-1-1z"></path>
                  </svg>
                  <p>Switch to {theme}</p>
                </div>
                <LogOut
                  onClick={() => {
                    navigate("/");
                    dispatch(logOut());
                  }}
                >
                  <p style={{ paddingLeft: "5px" }}>Log out</p>
                </LogOut>
              </ProfileMenu>
            )}
          </Icon>
        </NavBtn>
      </Nav>
      {newPost && <NewPost setPost={setNewPost} />}
    </Header>
  );
};
