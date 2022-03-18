import { useEffect, useState } from "react";
import styled from "styled-components";
import { getDatabase, ref, set } from "firebase/database";

const Main = styled.div`
  position: absolute;
  top: 100%;
  width: 400px;
  height: 300px;
  display: flex;
  overflow-y: scroll;
  padding: 10px;
  flex-direction: column;
  gap: 20px;
  background: var(--background);
  right: -20px;
  & > div {
    display: flex;
    gap: 10px;
    align-items: center;
  }
`;
const ImgDiv = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;

  & img {
    height: 100%;
    width: auto;
  }
`;
const TextDiv = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  & h1 {
    font-weight: 500;
    font-size: 14px;
    line-height: 15px;
  }
  & h2 {
    font-size: 14px;
    color: gray;
  }
`;
const BG = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
`;

export const NotificationsView = ({ id, userNotifications, setHeart }) => {
  const db = getDatabase();
  const [updated, setUpdated] = useState(false);

  useEffect(() => {
    if (userNotifications.length > 0) {
      let find = false;
      userNotifications = userNotifications.forEach((not) => {
        if (!not.watched) {
          not.watched = true;
          find = true;
        }
      });
      setUpdated(find);
    }
  }, []);
  useEffect(() => {
    if (updated) {
      send();
    }
  }, [updated]);

  function send() {
    set(ref(db, "notification/" + id), {
      value: userNotifications,
    });
  }

  return (
    <>
      <Main>
        {userNotifications.reverse().map((not, i) => {
          return (
            <div key={i}>
              <ImgDiv>
                <img src={not.data.profile_image} alt="" />
              </ImgDiv>
              <TextDiv>
                <h1>{not.data.userId}</h1>
                <h2>
                  {not.type === "like"
                    ? " liked your post."
                    : " started following you."}
                </h2>
              </TextDiv>
            </div>
          );
        })}
      </Main>
      <BG onClick={() => setHeart(false)}></BG>
    </>
  );
};
