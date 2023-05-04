import React from 'react';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import ScrollToTop from './component/scrollToTop/ScrollToTop';
import 'bootstrap/dist/css/bootstrap.min.css';


// Home Pages Import
import DigitalAgency from './pages/DigitalAgency';

// Pages 
import Splash from './pages/Splash';

// Css Import
import './assets/scss/app.scss';


const App = () => {
  return (
    <Router>
		<ScrollToTop>
			<Routes>
				<Route path={process.env.PUBLIC_URL + "/"} element={<DigitalAgency />}/>
				<Route path={process.env.PUBLIC_URL + "/splash"} element={<Splash />}/>
			</Routes>
		</ScrollToTop>
    </Router>
  )
}

export default App;
