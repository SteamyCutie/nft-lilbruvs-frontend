import { useState } from "react";
import { Container, Stack, Button } from "@mui/material"
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import ListSubheader from '@mui/material/ListSubheader';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import ImageUploading from "react-images-uploading";

const ipns = () => {
  const [ images, setImages ] = useState([]);
  const maxNumber = 69;

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  return (
    <Container sx={{py: 5, minHeight: '80vh'}}>
      <Stack spacing={2}>
        <h1>IPNS Publish</h1>
        <ImageUploading
          multiple
          value={images}
          onChange={onChange}
          maxNumber={maxNumber}
          dataURLKey="data_url"
        >
          {({
            imageList,
            onImageUpload,
            onImageRemoveAll,
            onImageUpdate,
            onImageRemove,
            isDragging,
            dragProps
          }) => (
            // write your building UI
            <div className="upload__image-wrapper">
              <Button
                style={isDragging ? { color: "red" } : undefined}
                Ther wold be the
                onClick={onImageUpload}
                {...dragProps}
                variant="contained"
              >
                Click or Drop here
              </Button>
              &nbsp;
              <Button onClick={onImageRemoveAll} variant="contained">Remove all images</Button>
              <ImageList sx={{ width: '100%', height: '100%' }}>
                <ImageListItem key="Subheader" cols={2}>
                  <ListSubheader component="div">December</ListSubheader>
                </ImageListItem>
                {imageList.map((image, index) => (
                  <ImageListItem key={index}>
                    <img 
                      src={image["data_url"]}
                      srcSet={image["data_url"]}
                      alt="" loading="lazy" />
                    <ImageListItemBar
                      title={"Sample Image"}
                      subtitle={"for Add & Publish"}
                      actionIcon={
                        <IconButton
                          sx={{ color: 'rgba(255, 255, 255, 0.54)' }}
                          aria-label={`info about ${"Sample Image"}`}
                        >
                          <InfoIcon />
                        </IconButton>
                      }
                    />
                    <div className="image-item__btn-wrapper">
                      <Button onClick={() => onImageUpdate(index)} variant="contained">Update</Button>
                      <Button onClick={() => onImageRemove(index)} variant="contained">Remove</Button>
                    </div>
                  </ImageListItem>
                ))}
              </ImageList>
            </div>
          )}
        </ImageUploading>
      </Stack>
    </Container>
  )
}

export default ipns;