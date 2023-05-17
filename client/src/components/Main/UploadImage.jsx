import React, { useState } from 'react';
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';
import jwt_decode from 'jwt-decode';


const UploadImage = () => {
    //jwt funcitions
    const token = localStorage.getItem("token");// Get the JWT token from your authentication process
    // Decode the JWT token and extract the user ID
    const decodedToken = jwt_decode(token);
    const userId = decodedToken._id;

    //modalfunctionality
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [cloudinaryUrl, setCloudinaryUrl] = useState('');
    const [image, setImage] = useState(null);

    // const handleUserChange = (e) => {
    //     setUser(e.target.value);
    // };

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleCloudinaryUrlChange = (e) => {
        setCloudinaryUrl(e.target.value);
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleUpload = async () => {
        try {
            const requestBody = {
                user: userId, // from token
                title: title,
                description: description,
                cloudinaryUrl: cloudinaryUrl,
            };

            const response = await axios.post('http://localhost:8080/api/img/upload', requestBody);

            console.log(userId);
            console.log(response.data); // Log the response from the backend
        } catch (error) {
            console.error(error);
        }
    };


    return (
        <>
            <Modal.Header closeButton>
                <Modal.Title>
                    <h2>Upload Image</h2>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div>
                    <div>
                        <label>Title:</label>
                        <input type="text" value={title} onChange={handleTitleChange} />
                    </div>
                    <div>
                        <label>Description:</label>
                        <input type="text" value={description} onChange={handleDescriptionChange} />
                    </div>
                    <div>
                        <label>URL:</label>
                        <input type="text" value={cloudinaryUrl} onChange={handleCloudinaryUrlChange} />
                    </div>
                    <button onClick={handleUpload}>Upload</button>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    <div>
                        <label>Image:</label>
                        <input type="file" accept="image/*" onChange={handleImageChange} />
                    </div>
                </Button>
                <Button variant="primary" onClick={handleUpload}>
                    Upload
                </Button>
            </Modal.Footer>
        </>
    );
};

export default UploadImage;
