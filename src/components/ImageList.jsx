import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './ImageList.css'
import { useNavigate } from 'react-router-dom'
// import { useNavigate, useParams } from 'react-router-dom'

const ImageList = () => { 
  const navigate = useNavigate()
  const [imageData, setImageData] = useState([])
  
  
  useEffect(() => {
    
    const token = JSON.parse(localStorage.getItem('token'));

    axios
      .get(`http://localhost:5000/api/get_images`, {
        headers: {
          Authorization: token 
        },
      })
      .then((response) => {
        setImageData(response.data.images)
      })
      .catch((error) => {
        console.error('Error fetching image:', error);
      });

  }, [])

  const handleMouseEnter = (e) => {
    e.target.classList.add('zoomed');
  };

  const handleMouseLeave = (e) => {
    e.target.classList.remove('zoomed');
  };

  const goToHome = () => {
    navigate('/home')
  }

  const logOut = () => {
    localStorage.removeItem('token')
    navigate('/')
  }


  return (
    <div>
      <div style={{display:'flex', justifyContent:"space-between", }} >
          <button style={{margin:"20px", padding:"10px"}} onClick={() => goToHome()}  >Home</button>
          <button style={{margin:"20px", padding:"10px"}} onClick={() => logOut()} >Logout</button>
      </div>
      <h1>Image List</h1>
      <div className='image_list' >
        {imageData && imageData.map((value, k) => (
          <img 
            key={k}
            src={value.image_url} 
            alt={value.image_name} 
            onMouseEnter={handleMouseEnter} 
            onMouseLeave={handleMouseLeave} 
            width={400} height={300} 
          />
        ))}
      </div>
    </div>
  )
}

export default ImageList