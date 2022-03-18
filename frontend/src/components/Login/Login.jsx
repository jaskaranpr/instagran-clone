import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo.png";
import { FacebookBtn } from "./FacebookBtn";
import axios from "axios";
import logimg from "../assets/logimg.png";
import { logIn } from "../../store/login/action";
import { useDispatch, useSelector } from "react-redux";
import { alertMessage } from "../../store/alert/action";

const Main = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10%;
  height: 100vh;
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
const Img = styled.div``;
const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 80px;
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

export const Login = () => {
  const loged = useSelector((state) => state.login);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  useEffect(() => {
    if (loged.log) {
      navigate("/");
    }
  }, []);

  const [form, setForm] = useState({
    userId: "",
    password: "",
  });
  const handleData = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleLogin = () => {
    axios.post("https://yourbackend.com/login", form).then(
      (response) => {
        localStorage.setItem("Auth Token", response.data.token);
        navigate("/");
        dispatch(logIn());
        dispatch(alertMessage("success", "Login Successfully"));
      },
      (error) => {
        dispatch(alertMessage("warning", "Somthing went Wrong"));
      }
    );
  };

  return (
    <Main>
      <Img>
        <img src={logimg} alt="" />
      </Img>
      <Div>
        <img src={logo} alt="" width="200px" />
        <h1>Sign up to see photos and videos from your friends.</h1>
        <FacebookBtn />
        <div className="line">
          <p>OR</p>
        </div>
        <Form>
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
          disabled={!form.password || !form.userId}
          id="sign-in-button"
          onClick={handleLogin}
        >
          Login
        </Button>

        <P>
          By signing up, you agree to our Terms, Data Policy and Cookie Policy.
        </P>
        <Log>
          Don't have an account? <Link to="/"> Signup</Link>
        </Log>
      </Div>
    </Main>
  );
};
