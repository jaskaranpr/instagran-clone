import { useState, useEffect } from "react";
import { v4 as uuid } from "uuid";
import { getDatabase, ref, set, get, child, onValue } from "firebase/database";

import {
  Main,
  UserSec,
  ChatSec,
  UsersForChatSec,
  ChatInput,
  Bg,
  BgForUsers,
} from "./styled/InboxStyle";
import axios from "axios";
import { useSelector } from "react-redux";
import EmojiPicker from "emoji-picker-react";
export const Inbox = () => {
  const [showUsers, setShowUsers] = useState(false);
  const curUser = useSelector((state) => state.user);
  const [chatsData, setChatData] = useState([]);
  const db = getDatabase();
  const [loading, setLoading] = useState(true);
  const [chats, setChats] = useState({});
  const [mainDataOfChat, setMainDataOfChat] = useState([]);
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => (document.body.style.overflow = "");
  }, []);

  function getChats() {
    get(child(ref(getDatabase()), "chats"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          let data = snapshot.val();
          let arr = [];
          for (let key in data) {
            arr.push(data[key]);
          }
          setChatData(arr);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }
  useEffect(() => {
    getChats();
  }, []);

  useEffect(() => {
    const starCountRef = ref(db, "chats/");
    onValue(starCountRef, (snapshot) => {
      const data = snapshot.val();
      let arr = [];
      for (let key in data) {
        arr.push({ ...data[key], chatId: key });
      }
      setMainDataOfChat(
        arr.filter(
          (chat) =>
            chat.members[0]._id === curUser._id ||
            chat.members[1]._id === curUser._id
        )
      );
      setLoading(false);
    });
  }, []);

  return loading ? (
    ""
  ) : (
    <>
      <Main>
        <UserSec>
          <div className="userChatHeader">
            <h1>{curUser.userId}</h1>
            <svg
              onClick={() => setShowUsers(true)}
              aria-label="New message"
              color="#262626"
              fill="#262626"
              height="24"
              role="img"
              viewBox="0 0 24 24"
              width="24"
            >
              <path
                d="M12.202 3.203H5.25a3 3 0 00-3 3V18.75a3 3 0 003 3h12.547a3 3 0 003-3v-6.952"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              ></path>
              <path
                d="M10.002 17.226H6.774v-3.228L18.607 2.165a1.417 1.417 0 012.004 0l1.224 1.225a1.417 1.417 0 010 2.004z"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              ></path>
              <line
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                x1="16.848"
                x2="20.076"
                y1="3.924"
                y2="7.153"
              ></line>
            </svg>
          </div>
          <ShowUsersSec setChats={setChats} mainDataOfChat={mainDataOfChat} />
          {/* //////////// */}
        </UserSec>
        <ChatSec>
          <div className="chatMainHeader">
            <div className="imageDivInChatHeader">
              <img src={chats?.user?.profile_image} alt="" />
            </div>
            <h1>{chats?.user?.userId}</h1>
          </div>
          <ShowChatsSec
            chats={mainDataOfChat.filter((c) => c.chatId === chats.chatId)[0]}
          />
          {/* /////// */}
          {chats.user && <ChatInputSec chats={chats} />}
        </ChatSec>
      </Main>
      {showUsers && (
        <BgForUsers onClick={() => setShowUsers(false)}></BgForUsers>
      )}
      {showUsers && (
        <UserForChat
          chatsData={chatsData}
          curUser={curUser}
          setShowUsers={setShowUsers}
        />
      )}
    </>
  );
};

function ShowUsersSec({ mainDataOfChat, setChats }) {
  const curUser = useSelector((state) => state.user);
  return (
    <div className="userSecBody">
      {mainDataOfChat.map((chat) => {
        let user =
          chat.members[0]._id === curUser._id
            ? chat.members[1]
            : chat.members[0];

        return (
          <div
            key={chat.chatId}
            onClick={() =>
              setChats({
                chatId: chat.chatId,
                user,
                chat: chat.chat || [],
              })
            }
            className="userShowDiv"
          >
            <div className="imageDivInChatUsers">
              <img src={user?.profile_image} alt="" />
            </div>
            <div>
              <h1>{user?.userId}</h1>
              <h2>{user?.name}</h2>
            </div>
          </div>
        );
      })}
    </div>
  );
}

function ShowChatsSec({ chats }) {
  const curUser = useSelector((state) => state.user);
  return (
    <div className="chatMainBody">
      {chats?.chat?.map((chat, i) => {
        return (
          <div
            key={i}
            style={{
              justifyContent: curUser._id === chat.sender ? "flex-end" : "",
            }}
          >
            <h2>{chat.message}</h2>
          </div>
        );
      })}
    </div>
  );
}

function ChatInputSec({ chats }) {
  const [message, setMessage] = useState("");
  const [emoji, setEmoji] = useState(false);
  const curUser = useSelector((state) => state.user);
  const onEmojiClick = (event, emojiObject) => {
    setMessage(message + emojiObject.emoji);
  };

  const handleSend = () => {
    get(child(ref(getDatabase()), "chats/" + chats.chatId))
      .then((snapshot) => {
        if (snapshot.exists()) {
          let data = snapshot.val();
          sendChat(data);
        }
      })
      .catch((error) => {
        console.error(error);
      });
  };
  const db = getDatabase();
  function sendChat(data) {
    if (data.chat) {
      data.chat.push({
        sender: curUser._id,
        recever: chats.user._id,
        message,
      });
    } else {
      data.chat = [
        {
          sender: curUser._id,
          recever: chats.user._id,
          message,
        },
      ];
    }
    set(ref(db, "chats/" + chats.chatId), {
      ...data,
    });
    setMessage("");
  }
  return (
    <ChatInput>
      <div>
        <svg
          onClick={() => setEmoji(!emoji)}
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
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Message..."
          onKeyPress={(e) => {
            if (e.code === "Enter") handleSend();
          }}
        />
        {message && <button onClick={handleSend}>send</button>}
        {emoji && (
          <>
            <EmojiPicker onEmojiClick={onEmojiClick} />
            <Bg color={""} onClick={() => setEmoji(false)}></Bg>
          </>
        )}
      </div>
    </ChatInput>
  );
}

function UserForChat({ setShowUsers, curUser, chatsData }) {
  const [data, setData] = useState([]);
  const loged = useSelector((state) => state.login);
  useEffect(() => {
    axios
      .get("https://yourbackend.com/user/chatusers", {
        headers: {
          authorization: "Barear " + loged.token,
        },
      })
      .then((res) => {
        setData(res.data);
      });
  }, []);

  return (
    <>
      <UsersForChatSec>
        <h1>New Chat</h1>
        <div>
          {data.map((user) => {
            return (
              <SingleUserHandle
                key={user._id}
                chatsData={chatsData}
                setShowUsers={setShowUsers}
                curUser={curUser}
                user={user}
              />
            );
          })}
        </div>
      </UsersForChatSec>
    </>
  );
}

function SingleUserHandle({ user, chatsData, curUser, setShowUsers }) {
  const db = getDatabase();
  function send() {
    set(ref(db, "chats/" + uuid()), {
      members: [
        {
          _id: curUser._id,
          name: curUser.name,
          profile_image: curUser.profile_image,
          userId: curUser.userId,
        },
        user,
      ],
    });
    setShowUsers(false);
  }
  let find = false;
  chatsData.forEach((chat) => {
    if (
      (chat.members[0]._id === user._id &&
        chat.members[1]._id === curUser._id) ||
      (chat.members[1]._id === user._id && chat.members[0]._id === curUser._id)
    ) {
      find = true;
    }
  });
  if (find) return <></>;

  return (
    <div onClick={send}>
      <div className="imageDivInChatUsers">
        <img src={user.profile_image} alt="" />
      </div>
      <div className="textDivInChatUsers">
        <h1>{user.userId}</h1>
        <h2>{user.name}</h2>
      </div>
    </div>
  );
}
