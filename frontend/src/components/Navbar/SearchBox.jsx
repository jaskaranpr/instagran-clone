import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { Link } from "react-router-dom";

const Search = styled.div`
  width: 120%;
  height: 300px;
  position: absolute;
  top: 100%;
  padding: 10px;
  left: 40%;
  display: flex;
  flex-direction: column;
  gap: 15px;
  overflow-y: scroll;
  transform: translateX(-50%);
  z-index: 1;
  background: var(--background);
  & > a > div {
    display: flex;
    cursor: pointer;
    gap: 10px;
  }
  & .profileImageInSearch {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    overflow: hidden;
    & img {
      height: 100%;
    }
  }
  & .textDivInSearch {
    & h1 {
      font-weight: 600;
      line-height: 15px;
    }
    & h2 {
      color: gray;
    }
  }
`;

export const SearchBox = ({
  setSearchInput,
  searchInput,
  searchData,
  setSearchData,
}) => {
  useEffect(() => {
    let id = setTimeout(() => {
      getData();
    }, 1000);
    return () => clearTimeout(id);
  }, []);

  function getData() {
    axios
      .get("https://yourbackend.com/user/search/" + searchInput)
      .then((res) => setSearchData(res.data || []))
      .catch((err) => console.log(err));
  }
  return (
    <>
      <Search>
        {searchData.map((res) => {
          return (
            <Link
              onClick={() => {
                setSearchInput("");
              }}
              to={res.userId}
            >
              <div key={res._id}>
                <div className="profileImageInSearch">
                  <img src={res.profile_image} alt="" />
                </div>
                <div className="textDivInSearch">
                  <h1>{res.userId}</h1>
                  <h2>{res.name}</h2>
                </div>
              </div>
            </Link>
          );
        })}
      </Search>
    </>
  );
};
