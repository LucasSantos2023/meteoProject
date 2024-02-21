import { useEffect, useReducer, createContext } from 'react';
import { getCities, getCityForecast } from '../services/api';
import { reducer } from '../reducer';

export const AppContext = createContext();

const initialState = {
	cities: [],
	inputValue: '',
	selectedCity: { cityName: '', forecast: [] },
};

export function AppProvider({ children }) {
	const [state, dispatch] = useReducer(reducer, initialState);

	useEffect(() => {
		async function getCitiesForecast() {
			try {
				const country = await getCities();

				console.log('Cities Data ::', country);

				dispatch({ type: 'SET_CITIES', payload: country.data });
			} catch (error) {
				console.log(error);
			}
		}

		getCitiesForecast();
	}, []);

	function handleInputChange(event) {
		const { value } = event.target;
		console.log('inputValue ::', value);
		dispatch({ type: 'SET_SEARCH_INPUT', payload: value });
	}

	function handleChosenCity(globalIdLocal, cityName) {
		console.log('globalIdLocal ::', globalIdLocal);
		console.log('cityName ::', cityName);

		dispatch({ type: 'RESET_INPUT_VALUE' });

		async function getCityForecastById(globalIdLocal) {
			try {
				const cityForecast = await getCityForecast(globalIdLocal);

				console.log('cityForecast ::', cityForecast);
				dispatch({ type: 'SET_SELECTED_CITIES', payload: { cityName, forecast: cityForecast.data } });
			} catch (error) {
				console.log(error.message);
			}
		}

		getCityForecastById(globalIdLocal);
	}

	return (
		<AppContext.Provider
			value={{
				...state,
				handleInputChange,
				handleChosenCity,
			}}
		>
			{children}
		</AppContext.Provider>
	);
}
