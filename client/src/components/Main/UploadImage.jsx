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

            console.log(response.data); // Log the response from the backend
            window.location.reload()
        } catch (error) {
            console.error(error);
        }
    };


    const postDetails = (pics) => {
        if (!pics || pics.length === 0) {
            window.alert("Please select an image");
            return;
        }

        const file = pics[0];
        if (file.type === "image/jpeg" || file.type === "image/png") {
            const data = new FormData();
            data.append("upload_preset", "wkvvcgfu");
            data.append("file", file);
            data.append("cloud_name", "dcqiakni6");
            fetch("https://api.cloudinary.com/v1_1/dcqiakni6/image/upload", {
                method: "post",
                body: data,
            })
                .then((res) => res.json())
                .then((data) => {
                    setCloudinaryUrl(data.url.toString());
                    console.log(cloudinaryUrl);
                    console.log(data.url.toString());
                })
                .catch((err) => {
                    console.log(err);
                });
        } else {
            window.alert("Please select a valid image (JPEG or PNG)");
            return;
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
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="title">Title:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="title"
                                    value={title}
                                    onChange={handleTitleChange}
                                />
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="form-group">
                                <label htmlFor="description">Description:</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    id="description"
                                    value={description}
                                    onChange={handleDescriptionChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    <div>
                        <label>Image:</label>
                        <input
                            placeholder='Image'
                            type="file"
                            accept="image/"
                            onChange={(e) => { postDetails(e.target.files) }}
                        />
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




