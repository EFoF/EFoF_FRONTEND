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
import FormResponse from "./pages/survey/FormResponse";
import GeneratePrerelease from "./pages/mysurvey/GeneratePrerelease";
import GenerateTotal from "./pages/mysurvey/GenerateTotal";
import GenerateProgress from "./pages/mysurvey/GenerateProgress";
import GenerateOver from "./pages/mysurvey/GenerateOver";
import FormSetting from './pages/survey/FormSetting';
import SectionInfo from './pages/statistic/SectionInfo';
import ParticipateTotal from "./pages/mysurvey/ParticipateTotal";
import ParticipateProgress from "./pages/mysurvey/ParticipateProgress";
import ParticipateOver from "./pages/mysurvey/ParticipateOver";


const App = () => {
    return (
        <BrowserRouter basename={process.env.PUBLIC_URL}>
            <Routes>
                <Route path="/" exact element={<MainPage/>}/>
                <Route path="/login" exact element={<LoginPage/>}/>
                <Route path="/signup" exact element={<Signup/>}/>
                <Route path="/signup/email" exact element={<Step1/>}/>
                <Route path="/signup/inform" exact element={<Step2/>}/>
                <Route path="/form" exact element={<Form/>}/>
                <Route path="/form/:id/setting" exact element={<FormSetting/>}/>
                <Route path="/form/pre-release/:id" exact element={<Form/>}/>
                <Route path="/form/in-progress/:id" exact element={<FormResponse/>}/>
                <Route path="/findpw" exact element={<FindPW/>}/>
                <Route path="/privacy-policy" exact element={<PrivacyPolicy/>}/>
                <Route path="/statistic/:id" exact element={<Statistic/>}/>
                <Route path="/form/generate" exact element={<Generate/>}>
                    <Route path=":id" element={<GenerateTotal />} />
                    <Route path="prerelease/:id" element={<GeneratePrerelease />} />
                    <Route path="progress/:id" element={<GenerateProgress />} />
                    <Route path="over/:id" element={<GenerateOver />} />
                    {/*<Route path="*" element={<NoMatch />} />*/}
                </Route>
                <Route path="/form/participate" exact element={<Participate/>}>
                    <Route path=":id" element={<ParticipateTotal />} />
                    <Route path="progress/:id" element={<ParticipateProgress />} />
                    <Route path="over/:id" element={<ParticipateOver />} />
                    {/*<Route path="*" element={<NoMatch />} />*/}
                </Route>
                <Route path="/statistic/:id/:section_id" exact element={<SectionInfo/>}/>
            </Routes>
        </BrowserRouter>
    )
}

export default App;
