import { useRef, useState, useEffect } from "react";
import { Main, ProfileImage, Editfields } from "./styled/UserChange";
import axios from "axios";
import { useDispatch } from "react-redux";
import { alertMessage } from "../../store/alert/action";
import LoadingSvg from "../assets/whiteLoading.svg";

export const ChangeUser = ({ user, setGlobalUser }) => {
  const fileRef = useRef(null);
  const orignalImage = useRef(null);
  const [change, setChange] = useState(false);
  const [img, setImg] = useState(null);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState(user);
  const dispatch = useDispatch();
  function uploadPic() {
    fileRef.current.click();
    fileRef.current.addEventListener("change", function () {
      const reader = new FileReader();

      reader.addEventListener("load", () => {
        orignalImage.current = this.files[0];
        setImg(reader.result);
        handleImagePost();
        setChange(true);
      });
      reader.readAsDataURL(this.files[0]);
    });
  }
  const handleImagePost = async () => {
    try {
      const { url } = await fetch("https://yourbackend.com/s3").then((res) =>
        res.json()
      );

      await fetch(url, {
        method: "PUT",
        headers: {
          "Content-Type": "multipart/form-data",
          Accept: "*/*",
        },
        body: orignalImage.current,
      });
      const imageUrl = url.split("?")[0];
      setFormData({ ...formData, profile_image: imageUrl });
    } catch (err) {
      dispatch(alertMessage("warning", "Somthing went Wrong"));
    }
  };
  function handleFormData(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setChange(true);
  }

  function uploadOnTheServer() {
    setLoading(true);
    axios
      .patch("https://yourbackend.com/user/" + user._id, {
        ...formData,
      })
      .then((res) => {
        setGlobalUser();
        dispatch(alertMessage("success", "User updated successfully"));
        setLoading(false);
      })
      .catch((err) => {
        dispatch(alertMessage("error", "Somthing went wrong"));
        setLoading(false);
      });
  }

  return (
    <Main>
      <form onSubmit={(e) => e.preventDefault()}>
        <ProfileImage>
          <input
            ref={fileRef}
            type="file"
            style={{
              visibility: "hidden",
              position: "absolute",
            }}
          />
          <img src={img || user.profile_image} alt="" />
          <div className="editProfileImage">
            <h2>{user.userId}</h2>
            <p onClick={uploadPic}>Change profile photo</p>
          </div>
        </ProfileImage>
        <Editfields>
          <label htmlFor="">Name</label>
          <div className="EditTextFields">
            <input
              onChange={handleFormData}
              type="text"
              id="name"
              value={formData.name}
              name="name"
              placeholder="Name"
            />
            <p>
              Help people discover your account by using the name that you're
              known by: either your full name, nickname or business name.
            </p>
          </div>
        </Editfields>
        <Editfields>
          <label htmlFor="">Username</label>
          <div className="EditTextFields">
            <input
              onChange={handleFormData}
              type="text"
              value={formData.userId}
              id="uerId"
              name="userId"
              placeholder="Username"
            />
            <p>
              In most cases, you'll be able to change your username back to
              jaskaran.psd for another 14 days. Learn more
            </p>
          </div>
        </Editfields>
        <Editfields>
          <label htmlFor="">Bio</label>
          <div className="EditTextFields">
            <textarea
              type="text"
              onChange={handleFormData}
              value={formData.bio}
              id="bio"
              name="bio"
              placeholder="Bio"
            />
            <p>
              <strong>Personal information</strong> <br />
              Provide your personal information, even if the account is used for
              a business, pet or something else. This won't be part of your
              public profile.
            </p>
          </div>
        </Editfields>
        <Editfields>
          <button disabled={!change} onClick={uploadOnTheServer}>
            submit
            {loading && <img src={LoadingSvg} alt="" srcset="" />}
          </button>
        </Editfields>
      </form>
    </Main>
  );
};
