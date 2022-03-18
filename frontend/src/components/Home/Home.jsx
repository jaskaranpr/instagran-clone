import { useEffect, useState } from "react";
import { Posts } from "./Posts/Posts";
import { Story } from "./Story/Story";
import { Main, Left, Right } from "./styled/homeStyle";
import { Suggestions } from "./Suggestions/Suggestions";

export const Home = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    fetch("https://yourbackend.com/post")
      .then((res) => res.json())
      .then((data) => setPosts(data))
      .catch((err) => console.log(err));
  }, []);
  return (
    <Main>
      <Left>
        <Story />
        {posts.map((post) => {
          return <Posts key={post._id} post={post} />;
        })}
      </Left>

      <Right>
        <Suggestions />
      </Right>
    </Main>
  );
};
