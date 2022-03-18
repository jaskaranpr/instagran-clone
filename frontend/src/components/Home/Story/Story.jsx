import { useState, useEffect } from "react";
import { stories } from "./assets/dataForStory";
import { StoryDiv, StoryImage } from "../styled/StoryStyle";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";
import { useNavigate } from "react-router-dom";
export const Story = () => {
  let [scroll, setScroll] = useState(0);
  let [width, setWidth] = useState(0);
  const navigate = useNavigate();
  let data = stories();
  useEffect(() => {
    let divWidth = document.getElementById("story-display").clientWidth - 630;
    setWidth(divWidth);
  }, []);

  const handleStoryClick = (i) => {
    sessionStorage.setItem("story", i);
    navigate("/stories");
  };
  return (
    <StoryDiv>
      <div
        id="story-left-arrow"
        onClick={() => {
          if (scroll > -100) {
            setScroll(0);
          } else setScroll(scroll + 100);
        }}
        className={scroll === 0 ? "none" : "story-arrows"}
      >
        <ArrowBackIosNewIcon />
      </div>
      <div
        id="story-display"
        style={{
          display: "flex",
          transform: `translateX(${scroll}px)`,
          transition: "transform 0.5s ease",
          gap: "5px",
        }}
      >
        {data.map((d, i) => {
          return (
            <div onClick={() => handleStoryClick(i)} key={i}>
              <StoryImage img={d.profile_image}>
                <div></div>
              </StoryImage>
              <p>{d.user}</p>
            </div>
          );
        })}
      </div>
      <div
        onClick={() => {
          if (width + scroll < 100) {
            setScroll(-width);
          } else setScroll(scroll - 100);
        }}
        id="story-right-arrow"
        className={scroll === -width || width <= 0 ? "none" : "story-arrows"}
      >
        <ArrowForwardIosIcon />
      </div>
    </StoryDiv>
  );
};
