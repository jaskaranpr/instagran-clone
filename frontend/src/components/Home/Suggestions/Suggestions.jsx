import { useEffect, useState } from "react";
import {
  SuggestionsDiv,
  UserSec,
  SuggestionsSec,
  UserSug,
} from "../styled/suggestionsStyle";
import axios from "axios";
import { useSelector } from "react-redux";

export const Suggestions = () => {
  const user = useSelector((state) => state.user);
  const loged = useSelector((state) => state.login);
  const [suggestionsData, setSuggestionsData] = useState([]);

  useEffect(() => {
    getSuggestions();
  }, []);

  function getSuggestions() {
    axios
      .get("https://yourbackend.com/user/suggestions", {
        headers: {
          authorization: "Barear " + loged.token,
        },
      })
      .then((res) => {
        setSuggestionsData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  async function changeFollow(id) {
    let res = await axios.post(
      "https://yourbackend.com/user/" + id + "/follow",
      {},
      {
        headers: {
          authorization: "Barear " + loged.token,
        },
      }
    );
    getSuggestions();
  }

  return (
    <SuggestionsDiv>
      <UserSec>
        <div className="id-of-user">
          <img src={user.profile_image} alt="" />
        </div>
        <div className="user-textDiv">
          <h1>{user.userId}</h1>
          <h2>{user.name}</h2>
        </div>
      </UserSec>
      <SuggestionsSec>
        <h1>Suggestions for you</h1>
        <div>
          {suggestionsData.map((s) => {
            return (
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  width: "290px",
                }}
                key={s._id}
              >
                <UserSug>
                  <div className="id-of-user-sug">
                    <img src={s.profile_image} alt="" />
                  </div>
                  <div className="user-textDiv-sug">
                    <h1>{s.userId}</h1>
                    <h2>{s.name}</h2>
                  </div>
                </UserSug>
                <h1
                  style={{
                    color: "var(--blue)",
                    cursor: "pointer",
                  }}
                  onClick={() => changeFollow(s._id)}
                >
                  Follow
                </h1>
              </div>
            );
          })}
        </div>
      </SuggestionsSec>
    </SuggestionsDiv>
  );
};
