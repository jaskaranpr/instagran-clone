import { useState, useEffect } from "react";
import "./App.css";
import { setUser } from "./store/user/action";
import axios from "axios";
import { Login } from "./components/Login/Login";
import { Signup } from "./components/Login/Signup";
import { NavDesktop } from "./components/Navbar/NavDesktop";
import { Routes, Route } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { logIn } from "./store/login/action";
import { Home } from "./components/Home/Home";
import { AlertMessage } from "./components/AlertMessage/AlertMessage";
import { User } from "./components/UserProfile/User";
import { EditUser } from "./components/editUser/EditUser";
import { StoryView } from "./components/Home/Story/storyView";
import { Explore } from "./components/explore/Explore";
import { Inbox } from "./components/inbox/Inbox";

function App() {
  const [width, setWidth] = useState(window.innerWidth || 1000);
  const hasWindow = typeof window !== "undefined";
  const loged = useSelector((state) => state.login);
  const [loading, setLoading] = useState(true);
  const [globalTheme, setGlobalTheme] = useState(
    localStorage.getItem("theme") || "light"
  );

  useEffect(() => {
    localStorage.setItem("theme", globalTheme);
    if (globalTheme === "dark") {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [globalTheme]);

  const dispatch = useDispatch();
  useEffect(() => {
    if (loged.token) {
      setGlobalUser();
    }
    let id = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(id);
  }, []);

  function setGlobalUser() {
    const url = "https://yourbackend.com/user/get";
    axios
      .get(url, {
        headers: {
          authorization: "Barear " + loged.token,
        },
      })
      .then(({ data }) => {
        let user = dispatch(
          setUser({
            _id: data.user._id,
            name: data.user.name,
            userId: data.user.userId,
            saved: data.user.saved || [],
            profile_image:
              data.user.profile_image ||
              "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png",
          })
        );
        dispatch(logIn());
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    if (hasWindow) {
      window.addEventListener("resize", handleResize);
    }
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  function handleResize() {
    setWidth(window.innerWidth);
  }
  if (width < 1000) {
    return (
      <h1
        style={{
          position: "absolute",
          left: "50%",
          top: "50%",
          transform: "translate(-50%,-50%)",
          fontSize: "20px",
        }}
      >
        <img
          src="https://w7.pngwing.com/pngs/597/231/png-transparent-logo-game-sorry-miscellaneous-text-business.png"
          alt=""
          srcset=""
        />
        Sorry this website is not yet supported small size screens.
        <br />
        <strong
          style={{
            textAlign: "center",
            width: "100%",
          }}
        >
          I am working on it.
        </strong>
      </h1>
    );
  }

  return (
    <>
      <AlertMessage />
      {loading ? (
        ""
      ) : (
        <div
          style={{
            paddingTop: "100px",
          }}
        >
          {loged.log ? (
            <>
              <NavDesktop
                setGlobalUser={setGlobalUser}
                theme={globalTheme}
                setTheme={setGlobalTheme}
              />

              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/:id" element={<User />} />
                <Route path="/inbox" element={<Inbox />} />
                <Route path="/stories" element={<StoryView />} />
                <Route path="/explore" element={<Explore />} />
                <Route
                  path="/edituser"
                  element={<EditUser setGlobalUser={setGlobalUser} />}
                />
              </Routes>
            </>
          ) : (
            <Routes>
              <Route path="/" element={<Signup />} />
              <Route
                path="/login"
                setGlobalUser={setGlobalUser}
                element={<Login />}
              />
            </Routes>
          )}
        </div>
      )}
    </>
  );
}

export default App;
