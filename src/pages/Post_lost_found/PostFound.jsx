// only admin can access it

import "./PostLostFound.css";
import React, {useState, useEffect} from "react";
import Button from "../../components/Button";
import Dropdown from "../../components/Dropdown";
import DropdownRadio from "../../components/DropdownRadio";
import DropdownCheckBox from "../../components/DropdownCheckBox";
import plus from "../../assets/plus_icon.png";
import CalendarFilter from "../../features/filters/CalendarFilter";
import homeIcon from "../../assets/home_icon.png";
import { supabase } from "../../data/supabase";
import useDebounce from "../../hooks/useDebounce";
import React from "react";


const PostFound = ({isAdmin,isLoggedIn}) => {
  const [campus, setCampus] = useState("Alam Sutera");
  const [location, setLocation] = useState("Canteen");
  const [category, setCategory] = useState("Category");
  const [colour, setColour] = useState("");
  const [inputs, setInputs] = useState({});
  const [lostDate, setlostDate] = useState("");

  const [imgSrc, setImgSrc] = useState(null)
  const [imgInfo, setImgInfo] = useState(null)
  const [imgSize, setImgSize] = useState(null)
  const [imgReady, setimgReady] = useState(false)
  //got from https://www.youtube.com/watch?v=SMim5-ox0K4
  // ideally this portion would be in the components folder but imgSrc is required to pass on and I have no idea how to pass on these variables
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const debouncedSearch = useDebounce(inputs.itemName, 500);

  const [imgFile, setImgFile] = useState(null);
  
  // useEffect(() => {

  //   if (!debouncedSearch) return;

  //   console.log("Searching:", debouncedSearch);

  // }, [debouncedSearch]);

  const ImgUpload = () => {

    const handleDragOver = e => {
      e.preventDefault()
      // console.log(e.dataTransfer.files)
    }

    const handleDrop = e => {
      e.preventDefault()
      console.log(e.dataTransfer.files)

      handleFiles(e.dataTransfer.files)
    }

    const handleImgInput = e => {
      console.log(e.target.files)
      handleFiles(e.target.files)

    }

    const handleFiles = files => {
      if (!files) return
      const file = files[0]

      setImgFile(file);

      if (file.size < 10000000 && (file.type.includes("image/png") || file.type.includes("image/jpg") || file.type.includes("image/jpeg"))) {
        setimgReady(true);
      } else {
        setimgReady(false);
      }

      const reader = new FileReader()
      reader.readAsDataURL(file)

      reader.onload = () => (
        setImgSrc(reader.result),
        setImgInfo(file.type),
        setImgSize((file.size * 0.000001).toFixed(3))
      )
    }

    const uploadContent = (
      <label onDragOver={handleDragOver} onDrop={handleDrop} className="image-upload" htmlFor="img-upload">
        <img src={plus} alt="" />
        <span>Insert Image here</span>
        <span>(jpg, png)</span>
        <span>max file size 10mb</span>

        <input onChange={handleImgInput} type="file" name="image-upload" id="img-upload" />
      </label>
    )

    const previewContent = (
      <div className="img-preview">
        <img src={imgSrc} alt="" />
        <div className="overlay">
          <span>Type: {imgInfo}</span>
          <span>Size: {imgSize} MB</span>
          <span>Ready: {imgReady.toString()}</span>
          <button onClick={() => setImgSrc(null)} className="close-btn">
            ⨉
          </button>
        </div>

      </div>
    )

    return imgSrc ? previewContent : uploadContent
  }

  const handleChange = (e) => {
    e.preventDefault()
    const name = e.target.name;
    const value = e.target.value;
    setInputs(values => ({ ...values, [name]: value }))
  }

  //submit button
  const handleSubmit = async (e) => {
    e.preventDefault()

    if(!isLoggedIn){
      setError("Please log in to post a lost item report.");
      return;
    }

    if (!isAdmin){
      setError("Only Admins are allowed to make a found report! Please go to basement and give item to admin if you found an item");
      return;
    }
    let { itemName, personName, descitems, descloc, floor, foundDate } = inputs;

    const itemtry = {
      itemName,
      personName,
      descloc,
      descitems,
      floor,
      campus,
      location,
      category,
      colour,
      foundDate,
    }

    let thereIsNull = 0;

    Object.entries(itemtry).forEach(([key, value]) => {
      if (
        value === undefined ||
        value === null ||
        value === ""
      ) {
        thereIsNull += 1;
      }
    });
    if (thereIsNull > 0) {
      setError("All entries must be filled.");
      return;
    }


    //filter date
    if (itemtry.floor < 0 || itemtry.floor > 25) {
      console.log("Floor Not Correct");
    }
    //check floor

    try {
      setLoading(true);

      // get logged in user
      const {
        data: {user},error: userError} = await supabase.auth.getUser();

      if (userError || !user) {
        throw new Error("User not logged in.");
      }

      //Get image URL and upload to storage
      let imageUrl=null;
      if (imgFile){
        const fileExt= imgFile.name.split('.').pop()
        const fileName= `${Date.now()}.${fileExt}`

        const{error:uploadImgError}= await supabase.storage
          .from('images_LostandFound')
          .upload(fileName,imgFile)
        
        if(uploadImgError) {
          throw uploadImgError
        }

        const{data:urlData}= supabase.storage
          .from('images_LostandFound')
          .getPublicUrl(fileName)
        
        imageUrl= urlData.publicUrl
      }

      // insert into Item table
      const { data: itemData, error: itemError } = await supabase
        .from("Item")
        .insert([
          {
            item_category: category,
            item_description: descitems,
            item_name: itemName,
            campus_location: campus,
            location: location,
            item_color: colour,
            floor: floor,
          },
        ])
        .select();

      if (itemError) throw itemError;

      // get inserted item_id
      const item_id = itemData[0].item_id;

      // insert into FoundReport table
      const { error: foundError } = await supabase
        .from("FoundReport")
        .insert([
          {
            user_id: user.id,
            item_id: item_id,
            date_found: foundDate,
          },
        ]);

      if (foundError) throw foundError;

      setSuccess("Found report submitted successfully!");

      // optional reset form
      setInputs({});
      setImgSrc(null);
      setImgFile(null);

    } catch (err) {
      console.error(err);
      setError(err.message || "Submission failed.");
    } finally {
      setLoading(false);
    }


  }
  return (
    <div>
      <div className="home-btn-wrap">
        <Button
          type="home"
          icon={homeIcon}
          to="/"
          iconOnly={true}
        />
      </div>

      <br />
      <div className="layout_found">
        <table>
          <tbody>
            <tr>
              <td rowSpan={3}>
                <ImgUpload />
              </td>
              <td>
                <div className="inputhere">
                  <p>Item Name</p>
                  <form>
                    <label>
                      <input
                        type="text"
                        name="itemName"
                        value={inputs.itemName}
                        onChange={handleChange}
                      />
                    </label>
                  </form>
                </div>


              </td>
              <td colSpan={2} className="desc-cell">
                <div className="inputhere">
                  <p>Your Name (Founder of the item)</p>
                  <form>
                    <label>
                      <input
                        type="text"
                        name="personName"
                        value={inputs.personName}
                        onChange={handleChange}
                      />
                    </label>
                  </form>
                </div>


              </td>

            </tr>
            <tr>
              <td>
                <div className="inputhere">
                  <p>Date Lost:</p>
                  <form>
                    <label htmlFor="">
                      <input type="date" name="lostDate" value={inputs.lostDate} onChange={handleChange}></input>
                    </label>
                  </form>
                </div>

              </td>
              <td>
                <div className="inputhere">
                  <p>Campus</p>
                  {/* <br></br> */}
                  <Dropdown label={campus} type="campus">
                    <DropdownRadio
                      name="campus"
                      options={[
                        "Alam Sutera",
                        "Anggrek",
                        "Bandung",
                        "Bekasi",
                        "Malang",
                        "Semarang",
                        "Senayan",
                        "Syahdan & Kijang"
                      ]}
                      selected={campus}
                      setSelected={setCampus}
                    />
                  </Dropdown>
                </div>
              </td>
              <td>
                <div className="inputhere">
                  <p>Location</p>
                  <Dropdown label={location} type="location">
                    <DropdownRadio
                      name="location"
                      options={[
                        "Canteen",
                        "Classroom",
                        "Gym",
                        "Hallway",
                        "Lift Area",
                        "LKC",
                        "Lobby",
                        "Parking Lot",
                        "Toilet",
                        "Others"
                      ]}
                      selected={location}
                      setSelected={setLocation}
                    />
                  </Dropdown>
                </div>


              </td>
            </tr>
            <tr>
              <td>
                <div className="inputhere">
                  <p>Category</p>

                  <Dropdown label={category} type="category">
                    <DropdownRadio
                      name="category"
                      options={[
                        "Accessories",
                        "Bottle",
                        "Clothing",
                        "Documents",
                        "Electronics",
                        "ID Card",
                        "Stationery"
                      ]}
                      selected={category}
                      setSelected={setCategory}
                    />
                  </Dropdown>

                </div>

              </td>
              <td>
                <div className="inputhere">
                  <p>Colour</p>
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
              </td>
              <td>
                <div className="inputhere">
                  <p>Floor</p>
                  <form>
                    <label htmlFor="">
                      <input type="number" name="floor" min="0" max="25" value={inputs.floor} onChange={handleChange} />
                    </label>
                  </form>
                </div>
              </td>
            </tr>
            <tr>
              <td colSpan={4}>
                <h3>Description</h3>
              </td>
            </tr>
            <tr>
              <td colSpan={2} className="desc-cell">
                <form>
                  <label className="textarea-label">
                    <span>Item</span>
                    <textarea
                      name="descitems"
                      value={inputs.descitems}
                      onChange={handleChange}
                    ></textarea>
                  </label>
                </form>
              </td>
              <td colSpan={2} className="desc-cell">
                <form>
                  <label className="textarea-label">
                    <span>Location</span>
                    <textarea
                      name="descloc"
                      value={inputs.descloc}
                      onChange={handleChange}
                    ></textarea>
                  </label>
                </form>

              </td>
            </tr>
          </tbody>

        </table>

        {/* uploads image */}

        {/* <form> */}
        {/* do not move the dropdowns into the inside of the forum as it causes a weird instant reload thing*/}
        
        {error && (
          <p className="error-text">
            {error}
          </p>
        )}

        {success && (
          <p className="success-text">
            {success}
          </p>
        )}

        <button
          className="btn btn-post"
          onClick={handleSubmit}
          disabled={loading}
        >
          {loading ? "Submitting..." : "Submit"}
        </button>

      </div>
    </div>

  )
};

export default PostFound;