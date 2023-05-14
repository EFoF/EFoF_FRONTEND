import React from 'react';
import {BrowserRouter as Router, Routes, Route, BrowserRouter} from 'react-router-dom';
import ScrollToTop from './component/scrollToTop/ScrollToTop';
import 'bootstrap/dist/css/bootstrap.min.css';


// Home Pages Import
import MainPage from './pages/MainPage';

// Pages 
import Signup from "./pages/signup";
import Step1 from "./pages/signup/Email/Step1";
import Step2 from "./pages/signup/Email/Step2";
import LoginPage from "./pages/signin/index";
import Form from "./pages/survey/Form";
import PrivacyPolicy from './pages/PrivacyPolicy';
import FindPW from "./pages/findpw";
import Generate from './pages/mysurvey/Generate'
import Participate from "./pages/mysurvey/Participate";
import Statistic from './pages/statistic/Statistic';

// Css Import
import './assets/scss/app.scss';


const App = () => {
  return (
	  <BrowserRouter basename={process.env.PUBLIC_URL}>
		  <Routes>
              <Route path="/" exact element={<MainPage />}/>
              <Route path="/login" exact element={<LoginPage />}/>
              <Route path="/signup" exact element={<Signup />}/>
              <Route path="/signup/email" exact element={<Step1 />}/>
              <Route path="/signup/inform" exact element={<Step2 />}/>
              <Route path="/form" exact element={<Form />}/>
              <Route path="/findpw" exact element={<FindPW />}/>
              <Route path={process.env.PUBLIC_URL + "/privacy-policy"} element={<PrivacyPolicy />}/>
			  <Route path={process.env.PUBLIC_URL + "/statistic"} element={<Statistic />}/>
              <Route path={process.env.PUBLIC_URL + "/form/generate"} element={<Generate />}/>
			  <Route path={process.env.PUBLIC_URL + "/form/participate"} element={<Participate />}/>
		  </Routes>
	  </BrowserRouter>
  )
}

export default App;
