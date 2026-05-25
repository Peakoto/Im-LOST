// only admin can access it
import "./PostFound.css";
import React from "react";
import { useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import Button from "../../components/Button";
import Dropdown from "../../components/Dropdown";
import DropdownRadio from "../../components/DropdownRadio";
import DropdownCheckBox from "../../components/DropdownCheckBox";
import { useDropzone } from 'react-dropzone';
import styled from 'styled-components';
const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};

const getColor = (props) => {
  if (props.isDragAccept) {
    return '#00e676';
  }
  if (props.isDragReject) {
    return '#ff1744';
  }
  if (props.isFocused) {
    return '#2196f3';
  }
  return '#eeeeee';
}

const Container = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${props => getColor(props)};
  border-style: dashed;
  // background-color: #fafafa;
  color: #bdbdbd;
  outline: none;
  transition: border .24s ease-in-out;
`;

function StyledDropzone(props) {
  const [files, setFiles] = useState([]);
  const {
    getRootProps,
    getInputProps,
    isFocused,
    isDragAccept,
    isDragReject
  } = useDropzone({
    accept: { 'image/*': [] },
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
    }

  });
  const thumbs = files.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          // Revoke data uri after image is loaded
          onLoad={() => { URL.revokeObjectURL(file.preview) }}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    // Make sure to revoke the data uris to avoid memory leaks, will run on unmount
    return () => files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);

  return (
    <div className="container">
      <Container {...getRootProps({ isFocused, isDragAccept, isDragReject })}>
        <input {...getInputProps()} />
        <p>Drag 'n' drop some files here, or click to select files</p>
      </Container>
      <aside style={thumbsContainer}>
        {thumbs}
      </aside>
    </div>
  );
}


const PostFound = () => {
  const [campus, setCampus] = useState("Alam Sutera");
  const [location, setLocation] = useState("Canteen");
  const [category, setCategory] = useState("Category");
  const [colour, setColour] = useState("");
  // const [itemName, setItemName] = useState("");
  // const [desc, setDesc] = useState("");
  const [inputs, setInputs] = useState({});

  const handleChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setInputs(values => ({ ...values, [name]: value }))
  }


  return (
    <div>
      <StyledDropzone />
      <form>
        <label>itemName
          <input
            type="text"
            name="itemName"
            value={inputs.itemName}
            onChange={handleChange}
          />
        </label>
        <label>personName
          <input
            type="text"
            name="personName"
            value={inputs.personName}
            onChange={handleChange}
          />
        </label>
        <p>Current values: {inputs.itemName} {inputs.personName}</p>
      </form>



      <Dropdown label={campus} type="campus">
        <DropdownRadio
          name="campus"
          options={["Alam Sutera", "Anggrek", "Bandung", "Bekasi", "Malang", "Semarang", "Senayan", "Syahdan & Kijang"]}
          selected={campus}
          setSelected={setCampus}
        />
      </Dropdown>

      <Dropdown label={location} type="location">
        <DropdownRadio
          name="location"
          options={["Canteen", "Classroom", "Gym", "Hallway", "Lift Area", "LKC", "Lobby", "Parking Lot", "Toilet", "Others"]}
          selected={location}
          setSelected={setLocation}
        />
      </Dropdown>

      <Dropdown label={category} type="category">
        <DropdownRadio
          name="category"
          options={["Canteen", "Classroom", "Gym", "Hallway", "Lift Area", "LKC", "Lobby", "Parking Lot", "Toilet", "Others"]}
          selected={category}
          setSelected={setCategory}
        />
      </Dropdown>

      <Dropdown label={"Colours: " + [colour]} type="colour">
        <DropdownCheckBox
          name="color"
          options={[
            "Red",
            "Orange",
            "Yellow",
            "Green",
            "Blue",
            "Purple",
            "Pink",
            "Brown",
            "Black",
            "White",
            "Grey"
          ]}
          selected={colour}
          setSelected={setColour}
        />
      </Dropdown>
    </div>
  )
};

export default PostFound;