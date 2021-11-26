// import {

// } from "../constants";

const initialState = {
	shoes: [],
	filteredShoes: [],
	brands: [],
	sizes: [],
	modal: '',
	filters: [],
	currentPage: 0,
	filterBrands: [],
	filterSizes: [],
	user: {},
};

function rootReducer(state = initialState, action) {
	switch (action.type) {
		case 'GET_SHOES':
			return {
				shoes: action.payload,
				filteredShoes: action.payload,
				brands: action.payload.map(elem => elem.brand),
				sizes: [
					...new Set(
						action.payload
							.map(elem => elem.resellPrices) // mapping data's resellPrices properties
							.filter(elem => elem) // filtering undefined ones out
							.map(elem => Object.keys(elem.flightClub)) // taking all sizes
							.flat(Infinity)
					),
				].sort((a, b) => a - b),
				filters: [],
				currentPage: 0,
			}; // flattening out the array

		case 'OPEN_MODAL':
			return {
				...state,
				modal: action.payload,
			};

		case 'CLOSE_MODAL':
			return {
				...state,
				modal: '',
			};
		case 'SET_FILTER_BRANDS': {
			if (action.payload) {
				return {
					...state,
					filters: Array.from(new Set([...state.filters, 'brands'])),
					filterBrands: action.payload,
					currentPage: 0,
				};
			} else {
				return {
					...state,
					filters: state.filters.filter(elem => elem !== 'brands'),
					filterBrands: [],
					currentPage: 0,
				};
			}
			break;
		}
		case 'FILTER_SIZE': {
			var auxBrands = state.filteredShoes;
			if (action.payload > 0) {
				return {
					...state,
					filters: Array.from(new Set([...state.filters, 'sizes'])),
					filterSizes: action.payload,
					currentPage: 0,
				};
			} else {
				return {
					...state,
					filters: state.filters.filter(elem => elem !== 'sizes'),
					filterSizes: [],
					currentPage: 0,
				};
			}
			break;
		}
		case 'SET_PAGE': {
			return {
				...state,
				currentPage: action.payload,
			};
		}
		default:
			return state;
	}
}

export default rootReducer;
