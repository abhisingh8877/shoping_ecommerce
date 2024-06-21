import React, { useEffect, useState } from 'react';
import './App.css';
import axios from 'axios';
import svg from '../public/vite.svg'

function App() {
  const [image, setImage] = useState(null);
  const [path, setPath] = useState([]);
  const [Message,setMessage]=useState();
   const HandleChange=(e)=>{
        const filedata=e.target.files[0];
        const name=filedata.name;
        const gettitle=name.split('.')[1];
        const title=['jpeg','jpg','png'];
        if(!title.includes(gettitle))
          {
             setMessage('please select image format as PNG or JPG/JPEG ');
             return ;
          }
        setImage(e.target.files[0]);
        setMessage('');
   }
  const fetchData = async () => {
    try {
      const res = await fetch('http://localhost:3000/getimage');
      const data = await res.json();
      setPath(data.imagedetail || []); // Update state with fetched data
    } catch (err) {
     
    }
  };

  useEffect(() => {
    fetchData();
  }, []); // Run only once on mount

  

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
      if(!image)
        {
           setMessage("Please select your file")
           return;
        }
    const formData = new FormData();
    formData.append('image', image);

    try {
      const res = await axios.post('http://localhost:3000/api/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
     

      // Fetch new data after successful upload
      fetchData();
    } catch (err) {
     
      

    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit} encType="multipart/form-data">
        <input type="file" accept='image/jpeg,image/png' onChange={HandleChange } /><br />
        <br />
        <button type='submit'>Submit</button>
      </form>
      <br></br>
      <p>{Message}</p>
      <br/>
      {path.map((item, index) => (
        <div key={index}>
          <img src={`../src/assets/upload/${item.image}`} alt={`img-${index}`} />
        </div>
      ))}
    </div>
  );
}

export default App;
