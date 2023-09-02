import axios from "axios";

export const individualUpload = async (file) => {
  const data = new FormData();

  data.append("file", file);
  data.append("upload_preset", "Voyance");

  try {
    const url = await axios.post(
      "https://api.cloudinary.com/v1_1/additya/image/upload",
      data
    );

    return url.data;
  } catch (err) {
    console.log(`Error in upload: ${err}`);
    return;
  }
};

const upload = async (file) => {
  const urls = [];
  const length = file.length;

  const data = new FormData();

  for (var i = 0; i < length; i++) {
    data.append("file", file[i]);
    data.append("upload_preset", "Voyance");

    try {
      const res = await axios.post(
        "https://api.cloudinary.com/v1_1/additya/image/upload",
        data
      );

      const { url } = res.data;
      urls.push(url);
    } catch (err) {
      console.log(`Error in upload: ${err}`);
      return;
    }
  }

  return urls;
};

export default upload;
