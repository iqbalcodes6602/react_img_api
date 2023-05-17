import { useEffect, useState } from "react";
import { Button, Modal } from 'react-bootstrap';
import styles from "./styles.module.css";
import Lightbox from 'react-awesome-lightbox';
import 'react-awesome-lightbox/build/style.css';
import UploadImage from './UploadImage';
import axios from 'axios';


const Main = () => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
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
				const response = await axios.get('http://localhost:8080/api/img/images');
				// Assuming you have the fetched image data stored in a variable called `fetchedImages`
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

	const imagses = [
		{
			url: "https://s42814.pcdn.co/wp-content/uploads/2020/01/Landscaping-iStock-498015683.0-768x576-1500x1125.jpg.optimal.jpg",
			title: "image title 1"
		},
		{
			url: "https://www.gardendesign.com/pictures/images/650x490Exact_48x0/site_3/front-landscape-with-cannas-and-japanese-forest-grass-garden-design_17014.jpg",
			title: "image title 2"
		}
	];

	const openLightbox = (image) => {
		setIsOpen(true);
		setCurrentImageIndex(image);
	};

	const closeLightbox = () => {
		setIsOpen(false);
		setCurrentImageIndex(0);
	};

	return (
		<div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1>CloudPix</h1>
				<button className={styles.white_btn} onClick={handleLogout}>
					Logout
				</button>
			</nav>
			<div className="container p-4 d-flex flex-column justify-content-center align-items-center">
				<Button variant="primary" onClick={handleShow}>
					Upload Image
				</Button>
				<br />
				<div>
					(Please click on any image to view.)
				</div>
			</div>


			<div>
				{isOpen && (
					<Lightbox
						image={currentImageIndex.url}
						title={currentImageIndex.title + " - " + currentImageIndex.description}
						onClose={closeLightbox}
					>
					</Lightbox>
				)}

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
