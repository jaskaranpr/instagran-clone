import { useState, useEffect } from "react";
import { stories } from "./assets/dataForStory";
import { Link } from "react-router-dom";
import { Main, Header, Body, Story, SwitchTab } from "./styled/StoryViewStyle";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosNewIcon from "@mui/icons-material/ArrowBackIosNew";

export const StoryView = () => {
  let data = stories();

  const [index, setIndex] = useState(+sessionStorage.getItem("story") || 0);
  return (
    <Main>
      <Header>
        <Link to="/">
          <img
            src="https://www.instagram.com/static/images/web/mobile_nav_type_logo-dark.png/ff9b85f2b7ca.png"
            alt=""
          />
        </Link>
        <Link to="/">
          <svg
            aria-label="Close"
            color="#ffffff"
            fill="#ffffff"
            height="24"
            role="img"
            viewBox="0 0 24 24"
            width="24"
          >
            <polyline
              fill="none"
              points="20.643 3.357 12 12 3.353 20.647"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
            ></polyline>
            <line
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="3"
              x1="20.649"
              x2="3.354"
              y1="20.649"
              y2="3.354"
            ></line>
          </svg>
        </Link>
      </Header>

      <Body>
        <Story>
          {index > 0 ? (
            <div
              onClick={() => setIndex(index - 1)}
              className="storyBtn storyBtnLeft"
            >
              <ArrowForwardIosIcon />
            </div>
          ) : (
            <div></div>
          )}
          <div
            className="storyFlex"
            style={{
              width: 100 * data.length + "%",
              left: "-" + 100 * index + "%",
            }}
          >
            {data.map((story, i) => {
              return (
                <MapStroy
                  story={story}
                  index={+index}
                  i={i}
                  length={data.length}
                  setIndex={setIndex}
                />
              );
            })}
          </div>
          {index < data.length - 1 ? (
            <div
              onClick={() => setIndex(index + 1)}
              className="storyBtn storyBtnRight"
            >
              <ArrowBackIosNewIcon />
            </div>
          ) : (
            <div></div>
          )}
        </Story>
      </Body>
    </Main>
  );
};

function MapStroy({ story, i, index, length, setIndex }) {
  useEffect(() => {
    let id;
    if (index < length - 1) {
      id = setTimeout(() => {
        setIndex(index + 1);
      }, 10000);
    }
    return () => clearTimeout(id);
  }, [index]);
  return (
    <div className={i === index ? "active-story" : ""} key={i}>
      {i === index && (
        <>
          <div className="storyProcess"></div>
          <div className="profileOnStory">
            <div className="logoOnStory">
              <img src={story.profile_image} alt="" />
            </div>
            <h2>{story.user}</h2>
          </div>
        </>
      )}
      {i !== index && (
        <div className="logoOnStoryHidden">
          <img src={story.profile_image} alt="" />
        </div>
      )}
      <img src={story.url} alt="" />
    </div>
  );
}
