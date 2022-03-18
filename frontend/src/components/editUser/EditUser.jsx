import { useState, useEffect } from "react";
import axios from "axios";
import { ChangePassword } from "./ChangePassword";
import { ChangeUser } from "./ChangeUser";
import { useSelector } from "react-redux";

import { Main, Navigation, Content } from "./styled/EditStyle";

export const EditUser = ({ setGlobalUser }) => {
  const [editNav, setEditNav] = useState("profile");
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.user);
  useEffect(() => {
    axios
      .get("https://yourbackend.com/user/find/" + user.userId)
      .then((res) => {
        setData(res.data);
        setLoading(false);
      });
  }, []);
  return loading ? (
    ""
  ) : (
    <Main>
      <Navigation>
        <h2
          onClick={() => setEditNav("profile")}
          className={(editNav === "profile" && "userEditAct") || ""}
        >
          Edit Profile
        </h2>
        <h2
          onClick={() => setEditNav("password")}
          className={(editNav === "password" && "userEditAct") || ""}
        >
          Change Password
        </h2>
      </Navigation>
      <Content>
        {editNav === "profile" && (
          <ChangeUser user={data.user} setGlobalUser={setGlobalUser} />
        )}
        {editNav === "password" && <ChangePassword user={data.user} />}
      </Content>
    </Main>
  );
};
