import React, { useState } from "react"
import imageCompression from "browser-image-compression"
import Card from "react-bootstrap/Card"

export default function ImageCompressor() {
  const [compressedLink, setCompressedLink] = useState("./placeholder.png")
  const [originalImage, setOriginalImage] = useState("")
  const [originalLink, setOriginalLink] = useState("")
  const [clicked, setClicked] = useState(false)
  const [uploadImage, setUploadImage] = useState(false)
  const [outputFileName, setOutputFileName] = useState("")

  const handle = (e) => {
    const imageFile = e.target.files[0]
    setOriginalLink(URL.createObjectURL(imageFile))
    setOriginalImage(imageFile)
    setOutputFileName(imageFile.name)
    setUploadImage(true)
  }

  const click = (e) => {
    e.preventDefault()

    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 500,
      useWebWorker: true,
    }

    if (options.maxSizeMB >= originalImage.size / 1024) {
      alert("Image is too small, can't be Compressed!")
      return 0
    }

    imageCompression(originalImage, options).then((x) => {
      const downloadLink = URL.createObjectURL(x)
      setCompressedLink(downloadLink)
    })

    setClicked(true)
  }

  return (
    <div className="m-5">
      <div className="text-light text-center">
        <h1>Three Simple Steps</h1>
        <h3>1. Upload Image</h3>
        <h3>2. Click on Compress</h3>
        <h3>3. Download Compressed Image</h3>
      </div>

      <div className="row mt-5">
        <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
          {uploadImage ? (
            <Card.Img
              className="ht"
              variant="top"
              src={originalLink}
            ></Card.Img>
          ) : (
            <Card.Img
              className="ht"
              variant="top"
              src="./placeholder.png"
            ></Card.Img>
          )}
          <div className="d-flex justify-content-center">
            <input
              type="file"
              accept="image/*"
              className="mt-2 btn btn-dark w-75"
              onChange={(e) => handle(e)}
            />
          </div>
        </div>
        <div className="col-xl-4 col-lg-4 col-md-12 mb-5 mt-5 col-sm-12 d-flex justify-content-center align-items-baseline">
          <br />
          {outputFileName ? (
            <button
              type="button"
              className=" btn btn-dark"
              onClick={(e) => click(e)}
            >
              Compress
            </button>
          ) : (
            <></>
          )}
        </div>

        <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 mt-3">
          <Card.Img variant="top" src={compressedLink}></Card.Img>
          {clicked ? (
            <div className="d-flex justify-content-center">
              <a
                href={compressedLink}
                download={outputFileName}
                className="mt-2 btn btn-dark w-75"
              >
                Download
              </a>
            </div>
          ) : (
            <></>
          )}
        </div>
      </div>
    </div>
  )
}
