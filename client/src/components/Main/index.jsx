import { useState } from "react";
import { Button, Modal } from 'react-bootstrap';
import styles from "./styles.module.css";
import Lightbox from 'react-awesome-lightbox';
import 'react-awesome-lightbox/build/style.css';
import UploadImage from './UploadImage'

const Main = (props) => {
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

	const images = [
		{
			url: "\https://s42814.pcdn.co/wp-content/uploads/2020/01/Landscaping-iStock-498015683.0-768x576-1500x1125.jpg.optimal.jpg",
			title: "image title 1"
		},
		{
			url: "https://www.gardendesign.com/pictures/images/650x490Exact_48x0/site_3/front-landscape-with-cannas-and-japanese-forest-grass-garden-design_17014.jpg",
			title: "image title 2"
		}
	];

	const openLightbox = (index) => {
		setIsOpen(true);
		setCurrentImageIndex(index);
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
			<div>
				hello there this is the dashboard

				<Button variant="primary" onClick={handleShow}>
					Upload Image
				</Button>
			</div>

			<div>
				{isOpen && (
					<Lightbox
						images={images}
						currentIndex={currentImageIndex}
						onClose={closeLightbox}
					/>
				)}

				{images.map((image, index) => (
					<div key={index}>
						<img src={image.url} alt={image.title} onClick={() => openLightbox(index)} />
					</div>
				))}
			</div>


			<Modal show={show} onHide={handleClose}>
				<UploadImage user={props.user} />
			</Modal>
		</div>
	);
};

export default Main;
