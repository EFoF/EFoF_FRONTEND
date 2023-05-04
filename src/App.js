import React from 'react';
import {BrowserRouter as Router, Routes, Route, BrowserRouter} from 'react-router-dom';
import ScrollToTop from './component/scrollToTop/ScrollToTop';
import 'bootstrap/dist/css/bootstrap.min.css';


// Home Pages Import
import DigitalAgency from './pages/DigitalAgency';

// Pages 
import Splash from './pages/Splash';

// Css Import
import './assets/scss/app.scss';
import Signup from "./pages/signup";
import Step1 from "./pages/signup/Email/Step1";
import Step2 from "./pages/signup/Email/Step2";
import LoginPage from "./pages/signin/index";

const App = () => {
  return (
    // <Router>
	// 	<ScrollToTop>
	// 		<Routes>
	// 			<Route path={process.env.PUBLIC_URL + "/"} element={<DigitalAgency />}/>
	// 			<Route path={process.env.PUBLIC_URL + "/splash"} element={<Splash />}/>
	// 		</Routes>
	// 	</ScrollToTop>
    // </Router>
	  <BrowserRouter basename={process.env.PUBLIC_URL}>
		  <Routes>
			<Route path="/" exact element={<DigitalAgency />}/>
			<Route path="login" exact element={<LoginPage />}/>
			<Route path="signup" exact element={<Signup />}/>
			<Route path="/signup/email" exact element={<Step1 />}/>
			<Route path="/signup/inform" exact element={<Step2 />}/>
		  </Routes>
	  </BrowserRouter>
  )
}

export default App;
