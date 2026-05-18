import React from "react";
import plus from "../assets/plus-svgrepo-com.svg";
import close from "../assets/cancel-close-svgrepo-com.svg";
import dummy from "../assets/water_bottle.jpeg"

import { useState } from "react";

const ImgUpload = () => {
    const [imgSrc, setImgSrc]=useState(null)
    const [imgInfo, setImgInfo]=useState(null)
    const [imgSize, setImgSize]=useState(null)
    const [imgReady, setimgReady]=useState(false)

    const handleDragOver = e => {
        e.preventDefault()
        // console.log(e.dataTransfer.files)
    }

    const handleDrop = e => {
        e.preventDefault()
        console.log(e.dataTransfer.files)

        handleFiles(e.dataTransfer.files)
    }
    
    const handleImgInput= e => {
        console.log(e.target.files)
        handleFiles(e.target.files)
        
    }

    const handleFiles= files => {
        if(!files) return
        const file=files[0]

        if(file.size>10000000||file.type.includes("image/png")||file.type.includes("image/jpg")||file.type.includes("image/jpeg")){
            setimgReady(true);
        }

        const reader = new FileReader()
        reader.readAsDataURL(file)

        reader.onload =() => (
            setImgSrc(reader.result),
            setImgInfo(file.type),
            setImgSize((file.size*0.000001).toFixed(3))
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
            <img src={imgSrc} alt=""/>
            <div className="overlay">
                <span>Type: {imgInfo}</span>
                <span>Size: {imgSize} MB</span>
                <span>Ready: {imgReady.toString()}</span>
                <button onClick={() => setImgSrc(null)} className="close-btn">
                    <img src={close} alt="" />
                </button>
            </div>
            
        </div>
    )
 
    return imgSrc ? previewContent : uploadContent 
}
export default ImgUpload