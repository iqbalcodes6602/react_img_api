import { useEffect, useState } from "react";
import { Button, Modal } from 'react-bootstrap';
import styles from "./styles.module.css";
import Lightbox from 'react-awesome-lightbox';
import 'react-awesome-lightbox/build/style.css';
import UploadImage from './UploadImage';
import axios from 'axios';
import jwt_decode from 'jwt-decode';
import { useNavigate } from "react-router-dom";


const Main = () => {
	const navigate = useNavigate();
	const token = localStorage.getItem("token");// Get the JWT token from authentication process
	// Decode the JWT token and extract the user ID
	const decodedToken = jwt_decode(token);
	const userId = decodedToken._id;

	const handleLogout = () => {
		localStorage.removeItem("token");
		navigate("/login");
	};

	//modalfunctionality
	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	//lightbox fucntionality
	const [isOpen, setIsOpen] = useState(false);
	const [currentImageIndex, setCurrentImageIndex] = useState(0);


	//fetch images from backend
	const [images, setImages] = useState([]);
	useEffect(() => {
		const fetchImages = async () => {
			try {
				const response = await axios.get(`http://localhost:8080/api/img/images/${userId}`);
				//fetched image data stored in a variable called `fetchedImages`
				const renamedImages = response.data.map((image) => {
					const { cloudinaryUrl, ...rest } = image;
					return { url: cloudinaryUrl, ...rest };
				});

				console.log(renamedImages);
				setImages(renamedImages);
			} catch (error) {
				console.error(error);
			}
		};

		fetchImages();
	}, []);


	const openLightbox = async (image) => {
		image.viewsCount = image.viewsCount + 1;
		setIsOpen(true);
		setCurrentImageIndex(image);
		try {
			await axios.post(`http://localhost:8080/api/img/${image._id}/view`);
		} catch (error) {
			console.error(error);
		}
	};

	const closeLightbox = () => {
		setIsOpen(false);
		setCurrentImageIndex(0);
	};

	return (
		<div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1>CloudPIX</h1>
				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
			</nav>
			<div className="container p-4 d-flex flex-column justify-content-center align-items-center">
				<Button variant="info" onClick={handleShow}>
					<b>
						Upload Image &nbsp;
						<i className="fa fa-plus"
							style={{
								fontSize: "16px",
							}}
						/>
					</b>
				</Button>
				<br />
				<div>
					(Please click on any image to view.)
				</div>
			</div>


			<div>
				{
					isOpen && (
						<Lightbox
							image={currentImageIndex.url}
							title={currentImageIndex.title + " - " + currentImageIndex.description}
							onClose={closeLightbox}
						>
						</Lightbox>
					)
				}

				{
					<div className="container">
						<div className="row">
							{images.map((image, index) => (
								<div className="col-md-4" key={index}>
									<div className="card mb-3">
										<img style={{ cursor: "pointer" }} onClick={() => openLightbox(image)} src={image.url} className="card-img-top" alt={image.title} />
										<div className="card-body">
											<h5 className="card-title">{image.title}</h5>
											<p className="card-text">{image.description}</p>
											<button type="button" className="btn btn-secondary" disabled>
												<i className="fa fa-eye"
													style={{
														fontSize: "16px",
													}}
												/>&nbsp;
												Views: {image.viewsCount}
											</button>
										</div>
									</div>
								</div>
							))}
						</div>
					</div>
				}
			</div>


			<Modal show={show} onHide={handleClose}>
				<UploadImage />
			</Modal>
		</div>
	);
};

export default Main;
