import Forecast from './components/Forecast';
import Search from './components/Search';
import { AppProvider } from './contexts/AppContext';
function App() {
  
  
	return (
		<div className='app'>
			<h1>Meteorologia em Portugal</h1>

			{/* <ul>
        {state.cities.map((city) => {
					return <li>{city.local}</li>;
				})}
      </ul> */}

			<AppProvider>
				<Search  />
				<Forecast  />
			</AppProvider>
		</div>
	);
}

export default App;
