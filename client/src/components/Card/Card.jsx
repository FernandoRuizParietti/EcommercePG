/* import { useState } from 'react'; */
import s from './Card.module.css';
import { useSelector } from 'react-redux';
import { addToCart, update, addToWishList, openModal, deleteFromWishList, getWishList } from '../../redux/actions';
import Review from '../Review/Review.jsx';
import { useDispatch } from 'react-redux';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import {faHeart as farHeart} from '@fortawesome/free-regular-svg-icons'
import {useState} from 'react'
/*
import { openModal } from '../../redux/actions/index.js';
import { openBuyDetailsModal } from '../../redux/actions/index.js';
import { onlyThreeColorGrid } from '../FilterColor/colors.js'; */
import { Link } from 'react-router-dom';
import DeleteShoe from '../DeleteShoe/DeleteShoe.jsx';
import EditButton from '../EditShoe/EditButton.jsx';

export default function Card({ shoe }) {
	const dispatch = useDispatch();
	const user = useSelector(state => state.user);
	const wishlist = useSelector(state => state.wishlist)
	const [buySize, setBuySize] = useState('')
	
	// console.log(shoe)
	const [icon1,setIcon1] = useState(farHeart)
	const [icon2,setIcon2] = useState(faHeart)
	let rating = Math.floor(Math.random() * 5) + 0;

	const handleLike1 = async function (){
		if (!(user.email)){
			dispatch(openModal('login'))
		}
		else {
			if (icon1 === farHeart){
				await dispatch(deleteFromWishList({email:user.email, shoeId:shoe.id}))
				setIcon1(faHeart)
			}  
			if (icon1 === faHeart){
				await dispatch(addToWishList({email:user.email, shoeId:shoe.id}))
				setIcon1(farHeart)
			}
		}
		await dispatch(getWishList({email:user?.email}))
	}

	const handleLike2 = async function (){
		if (!(user.email)){
			dispatch(openModal('login'))
		}
		else {
			if (icon2 == farHeart){
				setIcon2(faHeart)
				await dispatch(deleteFromWishList({email:user.email, shoeId:shoe.id}))
			}  
			if (icon2 == faHeart){
				setIcon2(farHeart)
				await dispatch(addToWishList({email:user.email, shoeId:shoe.id}))
			}
		}
		await dispatch(getWishList({email:user?.email}))
	}

	const handleClick = function () {
		//console.log(buySize)
		if (parseInt(buySize) > 0 && buySize != ''){
			dispatch(addToCart({ id: shoe.id, image: shoe.thumbnail, name: shoe.shoeName, price: shoe.retailPrice, stock: shoe.stock, cuantity: 1, size: buySize }));
			dispatch(update());

		}
	};

	return (
		<div className={s.card__father} style={{ position: 'relative' }}>
			<Link to={`/shoe/${shoe.id}`}>
				<div
					className={s.card}
				>
					<div className={s.icon} style={{ position: 'relative' }}>
						<img src={shoe.thumbnail} alt='lol' className={s.img} />
						<h3> {shoe.shoeName} </h3> {shoe.stock > 0 && <h2> US$ {shoe?.retailPrice} </h2>}
						<Review rating={rating} shoe={shoe} currentComponent='Card' />
					</div>{' '}
				</div>{' '}
			</Link>
			<div style={{ position: 'absolute', top: 70, left: 50, zIndex: 20, display:'flex' }}>
				{user && user.role == 2 && <DeleteShoe id={shoe.id} />}
				{user && user.role == 2 && <EditButton id={shoe.id} />}
			</div>
			<div style={{ position: 'absolute', bottom: 70, right: 100, zIndex: 20 }}>
				{user && wishlist && JSON.stringify(wishlist).length > 2  && 
				wishlist.shoes.some((wishlistShoe) => wishlistShoe.id == shoe.id ) ?
				<FontAwesomeIcon style={{cursor:'pointer'}} size='lg' color='red' icon={icon2} onClick={ () => handleLike1()}/> :
				<FontAwesomeIcon style={{cursor:'pointer'}} size='lg'  color='red' icon={icon1} onClick={ () => handleLike2()}/> 
			}
			</div>
			{ shoe.stock > 0 && <select onChange={(e) =>setBuySize(e.target.value || '')} style={{position:'absolute', bottom: 100, right: 170, zIndex: 20 }}><option select> Select Size</option>{Object.keys(shoe.AvailableSizes).map((size) => size != 'id' && shoe.AvailableSizes[size] > 0 && <option style={{display:'flex'}} value={size} >{size}</option>)}
			</select>}
			{shoe.stock > 0?
			<button className={s.button} style={{ zIndex: 30, borderRadius: 10, position: 'absolute', bottom: 65, left: '38.%', zIndex: 10, padding: 5, border: '1px solid black' }} onClick={() => handleClick()}>
				🛒 add to cart
			</button>
             : 
                <button className={s.button} style={{ backgroundColor: "red", zIndex: 30, borderRadius: 10, position: 'absolute', bottom: 65, left: '38.%', zIndex: 10, padding: 5, border: '1px solid black' }}>
                Out of stock
            </button>
			
            }
		</div>
	);
}
