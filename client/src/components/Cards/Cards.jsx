import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import Card from '../Card/Card';
import Paging from '../Paging/Paging.jsx';
import s from './Cards.module.css';

export default function Cards() {
	const filters = useSelector(state => state.filters); //brands
	const filterBrands = useSelector(state => state.filterBrands);
	const filterSizes = useSelector(state => state.filterSizes);
	const filterPrice = useSelector(state => state.filterPrice);
	const page = useSelector(state => state.currentPage);
	const data = useSelector(state => state.shoes);
	const [shownCards, setShownCards] = useState([]);
	const SHOES_PER_PAGE = 10;

	useEffect(() => {
		if (filters && filters.length > 0) {
			if (
				filters.includes('brands') &&
				!filters.includes('sizes') &&
				!filters.includes('price')
			) {
				setShownCards(data.filter(elem => elem.brand.includes(filterBrands)));
			}
			if (
				filters.includes('brands') &&
				filters.includes('sizes') &&
				!filters.includes('price')
			) {
				setShownCards(
					data.filter(
						elem =>
							elem.brand.includes(filterBrands) &&
							elem.resellPrices?.flightClub?.hasOwnProperty(filterSizes)
					)
				);
			}
			if (
				filters.includes('brands') &&
				!filters.includes('sizes') &&
				filters.includes('price')
			) {
				setShownCards(
					data.filter(
						elem =>
							elem.brand.includes(filterBrands) &&
							elem.retailPrice <= filterPrice
					)
				);
			}
			if (
				filters.includes('brands') &&
				filters.includes('sizes') &&
				filters.includes('price')
			) {
				setShownCards(
					data.filter(
						elem =>
							elem.brand.includes(filterBrands) &&
							elem.resellPrices?.flightClub?.hasOwnProperty(filterSizes) &&
							elem.retailPrice <= filterPrice
					)
				);
			}
			if (
				!filters.includes('brands') &&
				filters.includes('sizes') &&
				!filters.includes('price')
			) {
				setShownCards(
					data.filter(elem =>
						elem.resellPrices?.flightClub?.hasOwnProperty(filterSizes)
					)
				);
			}
			if (
				!filters.includes('brands') &&
				filters.includes('sizes') &&
				filters.includes('price')
			) {
				setShownCards(
					data.filter(
						elem =>
							elem.resellPrices?.flightClub?.hasOwnProperty(filterSizes) &&
							elem.retailPrice <= filterPrice
					)
				);
			}
			if (
				!filters.includes('brands') &&
				!filters.includes('sizes') &&
				filters.includes('price')
			) {
				setShownCards(data.filter(elem => elem.retailPrice <= filterPrice));
			}
		} else {
			setShownCards(data);
		}
	}, [data, filters, filterBrands, filterSizes, filterPrice, page]);

	return (
		<>
			<Paging shoesPerPage={SHOES_PER_PAGE} shoes={shownCards} />
			<br />
			<br />
			<div className={s.cards}>
				{shownCards &&
					shownCards.length > 0 &&
					shownCards
						.slice(page * SHOES_PER_PAGE, SHOES_PER_PAGE * (1 + page))
						.map((shoe, i) => <Card key={i} shoe={shoe} />)}
			</div>
		</>
	);
}
