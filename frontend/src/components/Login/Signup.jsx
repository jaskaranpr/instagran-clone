import { useState, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo.png";
import { FacebookBtn } from "./FacebookBtn";
import { useDispatch } from "react-redux";
import { logIn } from "../../store/login/action";
import axios from "axios";
import { alertMessage } from "../../store/alert/action";
import {
  getAuth,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { Otp } from "./Otp";

const Main = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  flex-direction: column;
`;
const Div = styled.div`
  border: 1px solid #cacaca;
  width: 300px;
  display: flex;
  justify-content: center;
  position: relative;
  flex-direction: column;
  padding: 25px;
  & img {
    margin-left: 25px;
  }
  & h1 {
    color: #8e8e8e;
    color: rgba(var(142, 142, 142, 142, 142, 142), 1);
    font-size: 15px;
    font-weight: 600;
    line-height: 20px;
    margin: 10px;
    text-align: center;
  }
  & .line {
    position: relative;
    width: 100%;
    background: #bebebe;
    height: 1px;
    margin: 20px 0;
    display: flex;
    justify-content: center;
    align-items: center;

    & p {
      margin-top: -4px;
      background-color: #ffffff;
      color: #888888;
      padding: 0px 10px;
      font-size: 14px;
      font-weight: 500;
    }
  }
`;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 180px;
  & input {
    border: 1px solid #acacac;
    padding: 10px 5px;
    border-radius: 2px;
  }
`;
const Button = styled.button`
  background-color: #0095f6;
  background-color: rgba(var(--d69, 0, 149, 246), 1);
  border: 1px solid transparent;
  border-radius: 4px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  padding: 5px 9px;
  margin-top: 20px;
  text-align: center;
  text-overflow: ellipsis;
  text-transform: inherit;
  color: #fff;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif;
  color: rgba(var(255, 255, 255, 255, 255, 255), 1);
  position: relative;

  &:disabled {
    opacity: 50%;
  }
`;

const P = styled.p`
  color: rgba(var(142, 142, 142, 142, 142, 142), 1);
  font-size: 12px;
  line-height: 16px;
  color: gray;
  margin-top: 20px;
  text-align: center;
`;
const Log = styled.h2`
  color: #262626;
  color: rgba(var(38, 38, 38, 38, 38, 38), 1);
  font-size: 14px;
  margin: 15px;
  text-align: center;
  color: #262626;
  color: rgba(var(--i1d, 38, 38, 38), 1);
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica,
    Arial, sans-serif;
  font-size: 14px;
  line-height: 18px;
`;
export const Signup = () => {
  const tokenRef = useRef(null);
  const [sent, setSent] = useState(false);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [form, setForm] = useState({
    mobile: "",
    name: "",
    userId: "",
    password: "",
  });
  const [otp, setOtp] = useState("");
  const auth = getAuth();
  function ganerateRecaptcha() {
    window.recaptchaVerifier = new RecaptchaVerifier(
      "sign-in-button",
      {
        size: "invisible",
        callback: (response) => {},
      },
      auth
    );
  }

  function postOnDataBase() {
    axios.post("https://yourbackend.com/register", tokenRef.current).then(
      (response) => {
        localStorage.setItem("Auth Token", response.data.token);
      },
      (error) => {
        alert(error);
      }
    );
  }

  const handleSignup = () => {
    tokenRef.current = form;
    ganerateOtp();
  };
  function ganerateOtp() {
    ganerateRecaptcha();
    const appVerifier = window.recaptchaVerifier;
    signInWithPhoneNumber(auth, "+91" + tokenRef.current.mobile, appVerifier)
      .then((res) => {
        window.confirmationResult = res;
        setSent(true);
      })
      .catch((err) => {
        console.log("err:-", err);
      });
  }
  const handleData = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };
  const verifyOtp = () => {
    if (otp.length === 6) {
      let confirmationResult = window.confirmationResult;
      confirmationResult
        .confirm(otp)
        .then((result) => {
          dispatch(logIn());
          postOnDataBase();
          dispatch(alertMessage("success", "Login Successfully"));
        })
        .catch((error) => {
          console.log(error);
          dispatch(alertMessage("warning", "Somthing went Wrong"));
        });
    }
  };
  return (
    <Main>
      <Div>
        <img src={logo} alt="" width="200px" />
        <h1>Sign up to see photos and videos from your friends.</h1>
        <FacebookBtn />
        <div className="line">
          <p>OR</p>
        </div>
        {loading ? (
          "fg"
        ) : (
          <>
            {" "}
            {!sent ? (
              <>
                {" "}
                <Form>
                  <input
                    name="mobile"
                    type="text"
                    onChange={handleData}
                    placeholder="Mobile number"
                  />
                  <input
                    name="name"
                    type="text"
                    onChange={handleData}
                    placeholder="Full Name"
                  />
                  <input
                    name="userId"
                    type="text"
                    onChange={handleData}
                    placeholder="Username"
                  />
                  <input
                    name="password"
                    type="password"
                    onChange={handleData}
                    placeholder="Password"
                  />
                </Form>
                <Button
                  disabled={
                    !form.name ||
                    form.mobile.length !== 10 ||
                    !form.password ||
                    !form.userId
                  }
                  id="sign-in-button"
                  onClick={handleSignup}
                >
                  Sign up
                </Button>
              </>
            ) : (
              <Otp verifyOtp={verifyOtp} setOtp={setOtp} />
            )}
          </>
        )}
        <P>
          By signing up, you agree to our Terms, Data Policy and Cookie Policy.
        </P>
        <Log>
          Have an account? <Link to="/login"> Log in</Link>
        </Log>
      </Div>
    </Main>
  );
};
