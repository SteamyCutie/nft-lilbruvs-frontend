import React from "react";
import ImageUploader from "react-images-upload";

const UploadComponent = () => {
  const onDrop = (pictureFiles, pictureDataURLs) => {
    const newImagesUploaded = pictureDataURLs.slice(
      defaultImages.length
    );
    console.warn("pictureDataURLs =>", newImagesUploaded);
    handleChange(newImagesUploaded);
  };

  render(
    <ImageUploader
      withIcon={false}
      withLabel={false}
      withPreview={true}
      buttonText={"Add photos"}
      fileSizeError={"File size is too big!"}
      fileTypeError={"This extension is not supported!"}
      onChange={onDrop}
      imgExtension={imgExtension}
      maxFileSize={maxFileSize}
      defaultImages={defaultImages}
    />
  );
}

export default UploadComponent;
