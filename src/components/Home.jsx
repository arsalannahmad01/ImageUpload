import "../App.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "react-modal";
import UploadIcon from "../Icons/uploadIcon.png";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { storage } from "../firebase";
import { v4 } from "uuid";
import { useNavigate } from "react-router-dom";

Modal.setAppElement("#root");

function Home() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageName, setImageName] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [token, setToken] = useState(null);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) setIsLoggedIn(true);
    setToken(JSON.parse(localStorage.getItem("token")));
  });

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
    setImageName(event.target.files[0].name);
  };

  const handleUpload = async () => {
    // Add code to upload the selected file to your server here
    const imageRef = ref(storage, `image/${v4() + selectedFile.name}`);
    await uploadBytes(imageRef, selectedFile);

    const res = await getDownloadURL(imageRef);

    const payload = {
      image_name: imageName,
      image_url: res,
    };

    await axios
      .post("http://127.0.0.1:5000/api/upload", payload, {
        headers: { Authorization: token },
      })
      .then((response) => {
        navigate(`/image/${response.data._id}`);
      })
      .catch((error) => {
        setError(true);
        console.log(error);
      });

    // if(data.data)
    //   navigate(`/image/${data.data._id}`);
  };

  const handleLogin = async () => {
    try {
      // Add code to send a login request to your API here
      const response = await axios.post("http://127.0.0.1:5000/api/login", {
        email,
        password,
      });

      // Handle successful login here
      localStorage.setItem("token", JSON.stringify(response.data.token));

      if (response.token) setIsLoggedIn(true);
      setIsModalOpen(false);
    } catch (error) {
      // Handle login error here
      console.error("Login failed:", error);
    }
  };

  const goToList = () => {
    navigate('/image-list')
  }

  const logOut = () => {
    localStorage.removeItem("token");
    navigate("/home");
  };

  return (
    <div className="App">
      <div className="header">
        <button style={{margin:"20px", padding:"10px"}} onClick={() => goToList()}  >List</button>
        {isLoggedIn ? (
          <button
            style={{ margin: "20px", padding: "10px" }}
            onClick={() => logOut()}
          >
            Logout
          </button>
        ) : (
          <button className="login-button" onClick={() => setIsModalOpen(true)}>
            Login
          </button>
        )}
      </div>
      <div className="upload-container">
        <label className="uploadIcon">
          <img src={UploadIcon} width={100}></img>
          <input type="file" accept="image/*" onChange={handleFileChange} />
          {imageName != null ? (
            <p style={{ fontStyle: "italic", fontSize: "18px" }}>{imageName}</p>
          ) : null}
        </label>
        <button onClick={handleUpload}>Upload Image</button>
      </div>
      <Modal
        isOpen={error}
        onRequestClose={() => setError(false)}
        contentLabel="Error Modal"
        className="modal"
      >
        <p style={{ color: "red" }}>You are not authorized!</p>
        <p style={{ color: "#0074d9" }}>Login to uppload images.</p>
      </Modal>
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Login Modal"
        className="modal"
      >
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
        <p style={{margin:"10px auto"}} >or</p>
        <h2 style={{margin:"auto"}} >Google Login</h2>
      </Modal>
    </div>
  );
}

export default Home;
