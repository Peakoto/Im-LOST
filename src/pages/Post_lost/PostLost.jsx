// only student can access it

import "./PostLost.css";
import React from "react";
import Button from "../../components/Button";
import Dropdown from "../../components/Dropdown";
import DropdownRadio from "../../components/DropdownRadio";
import DropdownCheckBox from "../../components/DropdownCheckBox";


const PostLost = ({isLoggedIn}) => {

  const handlePostClick = ()=>{
    if(!isLoggedIn){
      alert("Please log in first!")
      return;
    }
  }
  
  return <h2 style={{ color: "black" }}>Post lost</h2>;
};

export default PostLost;