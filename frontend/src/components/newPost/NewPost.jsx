import { useRef, useState } from "react";
import { Main, BG, Button, Img, Top, ProgressDiv } from "./styled/post";
import EmojiPicker from "emoji-picker-react";
import axios from "axios";
import {
  getStorage,
  ref,
  getDownloadURL,
  uploadBytesResumable,
} from "firebase/storage";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { alertMessage } from "../../store/alert/action";
import { v4 as uuid } from "uuid";

export const NewPost = ({ setPost }) => {
  const loged = useSelector((state) => state.login);
  const fileRef = useRef(null);
  const [fileUrl, setFileUrl] = useState(null);
  const [progressBar, setProgressBar] = useState(0);
  const orignalUrl = useRef(null);
  const [fileType, setFileType] = useState(null);
  const [emoji, setEmoji] = useState(false);
  const [caption, setCaption] = useState("");
  const dispatch = useDispatch();

  const handleFile = () => {
    fileRef.current.click();
    fileRef.current.addEventListener("change", function () {
      const reader = new FileReader();

      reader.addEventListener("load", () => {
        console.log(this.files[0].size);
        orignalUrl.current = this.files[0];
        setFileType(this.files[0].type);
        setFileUrl(reader.result);
      });
      reader.readAsDataURL(this.files[0]);
    });
  };
  const onEmojiClick = (event, emojiObject) => {
    setCaption(caption + emojiObject.emoji);
  };

  const handlePost = async () => {
    try {
      if (fileType.startsWith("image")) {
        const { url } = await fetch("https://yourbackend.com/s3").then((res) =>
          res.json()
        );
        await fetch(url, {
          method: "PUT",
          headers: {
            "Content-Type": "multipart/form-data",
            Accept: "*/*",
          },
          body: orignalUrl.current,
        });
        const imageUrl = url.split("?")[0];
        uploadOnTheServer(imageUrl);
      } else if (fileType.startsWith("video")) {
        uploadVideo();
      }
    } catch (err) {
      dispatch(alertMessage("warning", "Somthing went Wrong"));
      setPost(false);
    }
  };

  function uploadVideo() {
    const storage = getStorage();
    const storageRef = ref(storage, "videos/" + uuid());
    const UploadTask = uploadBytesResumable(storageRef, orignalUrl.current);
    UploadTask.on(
      "state_changed",
      (snapshot) => {
        setProgressBar(
          Math.floor((snapshot.bytesTransferred / snapshot.totalBytes) * 100)
        );
      },
      (err) => {
        dispatch(alertMessage("warning", "Somthing went Wrong"));
      },
      () => {
        getDownloadURL(UploadTask.snapshot.ref).then((url) => {
          uploadOnTheServer(url.split("&")[0]);
        });
      }
    );
  }

  function uploadOnTheServer(url) {
    axios
      .post(
        "https://yourbackend.com/post",
        {
          url,
          file_type: fileType,
          caption,
        },
        {
          headers: {
            Authorization: "barear " + loged.token,
          },
        }
      )
      .then((res) => {
        dispatch(alertMessage("success", "Image uploaded successfully"));
        setPost(false);
      })
      .catch((err) => {
        dispatch(alertMessage("warning", "Somthing went Wrong"));
        setPost(false);
      });
  }

  return (
    <>
      <Main>
        <Top
          style={{
            justifyContent: fileUrl ? "space-between" : "center",
          }}
        >
          {fileUrl && (
            <svg
              style={{
                cursor: "pointer",
              }}
              onClick={() => setPost(false)}
              aria-label="Back"
              color="#262626"
              fill="#262626"
              height="24"
              role="img"
              viewBox="0 0 24 24"
              width="24"
            >
              <line
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                x1="2.909"
                x2="22.001"
                y1="12.004"
                y2="12.004"
              ></line>
              <polyline
                fill="none"
                points="9.276 4.726 2.001 12.004 9.276 19.274"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
              ></polyline>
            </svg>
          )}
          <p> Create new post</p>
          {fileUrl && <span onClick={handlePost}>share</span>}
          <ProgressDiv
            style={{
              width: progressBar + "%",
            }}
          >
            <span>{progressBar + "%"}</span>
          </ProgressDiv>
        </Top>
        {fileUrl ? (
          <Img img={fileUrl}>
            <div className="left-img">
              <video autoPlay muted loop>
                <source src={fileUrl} type={fileType} />
              </video>
            </div>
            <div className="right-caption">
              <h1>Username</h1>
              <textarea
                name=""
                id="caption"
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                cols="30"
                placeholder="Write a caption..."
                rows="10"
              ></textarea>
              <div>
                <svg
                  onClick={() => setEmoji(!emoji)}
                  style={{ cursor: "pointer" }}
                  aria-label="Emoji"
                  color="#8e8e8e"
                  fill="#8e8e8e"
                  height="20"
                  role="img"
                  viewBox="0 0 24 24"
                  width="20"
                >
                  <path d="M15.83 10.997a1.167 1.167 0 101.167 1.167 1.167 1.167 0 00-1.167-1.167zm-6.5 1.167a1.167 1.167 0 10-1.166 1.167 1.167 1.167 0 001.166-1.167zm5.163 3.24a3.406 3.406 0 01-4.982.007 1 1 0 10-1.557 1.256 5.397 5.397 0 008.09 0 1 1 0 00-1.55-1.263zM12 .503a11.5 11.5 0 1011.5 11.5A11.513 11.513 0 0012 .503zm0 21a9.5 9.5 0 119.5-9.5 9.51 9.51 0 01-9.5 9.5z"></path>
                </svg>
              </div>
              {emoji && <EmojiPicker onEmojiClick={onEmojiClick} />}
            </div>
          </Img>
        ) : (
          <div className="con">
            <svg
              aria-label="Icon to represent media such as images or videos"
              color="#262626"
              fill="#262626"
              height="77"
              role="img"
              viewBox="0 0 97.6 77.3"
              width="96"
            >
              <path
                d="M16.3 24h.3c2.8-.2 4.9-2.6 4.8-5.4-.2-2.8-2.6-4.9-5.4-4.8s-4.9 2.6-4.8 5.4c.1 2.7 2.4 4.8 5.1 4.8zm-2.4-7.2c.5-.6 1.3-1 2.1-1h.2c1.7 0 3.1 1.4 3.1 3.1 0 1.7-1.4 3.1-3.1 3.1-1.7 0-3.1-1.4-3.1-3.1 0-.8.3-1.5.8-2.1z"
                fill="currentColor"
              ></path>
              <path
                d="M84.7 18.4L58 16.9l-.2-3c-.3-5.7-5.2-10.1-11-9.8L12.9 6c-5.7.3-10.1 5.3-9.8 11L5 51v.8c.7 5.2 5.1 9.1 10.3 9.1h.6l21.7-1.2v.6c-.3 5.7 4 10.7 9.8 11l34 2h.6c5.5 0 10.1-4.3 10.4-9.8l2-34c.4-5.8-4-10.7-9.7-11.1zM7.2 10.8C8.7 9.1 10.8 8.1 13 8l34-1.9c4.6-.3 8.6 3.3 8.9 7.9l.2 2.8-5.3-.3c-5.7-.3-10.7 4-11 9.8l-.6 9.5-9.5 10.7c-.2.3-.6.4-1 .5-.4 0-.7-.1-1-.4l-7.8-7c-1.4-1.3-3.5-1.1-4.8.3L7 49 5.2 17c-.2-2.3.6-4.5 2-6.2zm8.7 48c-4.3.2-8.1-2.8-8.8-7.1l9.4-10.5c.2-.3.6-.4 1-.5.4 0 .7.1 1 .4l7.8 7c.7.6 1.6.9 2.5.9.9 0 1.7-.5 2.3-1.1l7.8-8.8-1.1 18.6-21.9 1.1zm76.5-29.5l-2 34c-.3 4.6-4.3 8.2-8.9 7.9l-34-2c-4.6-.3-8.2-4.3-7.9-8.9l2-34c.3-4.4 3.9-7.9 8.4-7.9h.5l34 2c4.7.3 8.2 4.3 7.9 8.9z"
                fill="currentColor"
              ></path>
              <path
                d="M78.2 41.6L61.3 30.5c-2.1-1.4-4.9-.8-6.2 1.3-.4.7-.7 1.4-.7 2.2l-1.2 20.1c-.1 2.5 1.7 4.6 4.2 4.8h.3c.7 0 1.4-.2 2-.5l18-9c2.2-1.1 3.1-3.8 2-6-.4-.7-.9-1.3-1.5-1.8zm-1.4 6l-18 9c-.4.2-.8.3-1.3.3-.4 0-.9-.2-1.2-.4-.7-.5-1.2-1.3-1.1-2.2l1.2-20.1c.1-.9.6-1.7 1.4-2.1.8-.4 1.7-.3 2.5.1L77 43.3c1.2.8 1.5 2.3.7 3.4-.2.4-.5.7-.9.9z"
                fill="currentColor"
              ></path>
            </svg>
            <h1>
              <p> Drag photos and videos here</p>
            </h1>
            <input type="file" ref={fileRef} style={{ display: "none" }} />
            <Button onClick={handleFile}>Select from Computer</Button>
          </div>
        )}
      </Main>
      <BG onClick={() => setPost(false)}></BG>
    </>
  );
};
