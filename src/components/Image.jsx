import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios'

const Image = () => {
  const [imageUrl, setImageUrl] = useState(null)
  const [imageName, setImageName] = useState(null)
  const id = useParams().id
  const navigate = useNavigate()
  
  
  useEffect(() => {
    
    const token = JSON.parse(localStorage.getItem('token'));

    axios
      .get(`http://localhost:5000/api/get_image/${id}`, {
        headers: {
          Authorization: token 
        },
      })
      .then((response) => {
        console.log(response.data.image_url);
        setImageName(response.data.image_name)
        setImageUrl(response.data.image_url)
      })
      .catch((error) => {
        console.error('Error fetching image:', error);
      });


  }, [])

  const goToHome = () => {
    navigate('/home')
  }

  const goToList = () => {
    navigate('/image-list')
  }

  const logOut = () => {
    localStorage.removeItem('token')
    navigate('/')
  }


  return (

    <div>
        <div style={{display:'flex', justifyContent:"space-between", }} >
          <button style={{margin:"20px", padding:"10px"}} onClick={() => goToHome()}  >Home</button>
          <button style={{margin:"20px", padding:"10px"}} onClick={() => goToList()}  >List</button>
          <button style={{margin:"20px", padding:"10px"}} onClick={() => logOut()} >Logout</button>
        </div>
        <div>
          <h3>{imageName}</h3>
          <img src={imageUrl} alt="img" width={800} height={800} />
        </div>
    </div>
  )
}

export default Image