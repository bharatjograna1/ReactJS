/**
 * App.js Layout Start Here
 */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';
//import { Offline, Online, Detector } from "react-detect-offline";
import qs from 'query-string';
// jbs theme provider
import JbsThemeProvider from './JbsThemeProvider';

//Horizontal Layout
import HorizontalLayout from './HorizontalLayout';

//Main App
//import JbsDefaultLayout from './DefaultLayout';


// app signin 
//import AppSignIn from './SigninFirebase';
//import AppSignUp from './SignupFirebase';
import SignUpScreen from './SignUpScreen';
import SignInScreen from './SignInScreen';
import SigninTabScreen from './SigninTabScreen';
import SignupTabScreen from './SignupTabScreen';
import ForgotPasswordScreen from './ForgotPasswordScreen';
import EmailConfirmationWdgt from '../components/MyAccount/EmailConfirmationWdgt';
import ForgotConfirmationWdgt from '../components/MyAccount/ForgotConfirmationWdgt';
import DeviceAuthorizeScreen from '../components/MyAccount/DeviceAuthorizeScreen';
import TermsofService from '../routes/pages/terms-of-service';
import Maintainance from '../routes/session/Maintainance';

//landing page
import LandingPage from './LandingPage';

//Cooldex landing page
import landingcooldexPage from './LandingCooldex';

//Added by salim dt:17/10/2018...
//Import Refresh Token Method to helpers.js
import { autoRefreshToken, redirectToLogin } from 'Helpers/helpers';

// async components
import {
	AsyncSessionLoginComponent,
	AsyncSessionRegisterComponent,
	AsyncSessionLockScreenComponent,
	AsyncSessionForgotPasswordComponent,
	AsyncSessionPage404Component,
	AsyncSessionPage500Component,
	AsyncTermsConditionComponent,
	AsyncNoInternetConnectionComponent
} from 'Components/AsyncComponent/AsyncComponent';

//Auth0
//import Auth from '../Auth/Auth';

// callback component
import Callback from "Components/Callback/Callback";

//Auth0 Handle Authentication
//const auth = new Auth();

/*const handleAuthentication = ({ location }) => {
	if (/access_token|id_token|error/.test(location.hash)) {
		auth.handleAuthentication();
	}
}*/

/**
 * Initial Path To Check Whether User Is Logged In Or Not
 */
const InitialPath = ({ component: Component, ...rest, authUser, location, match, path }) => {
	// console.log("match",match);
	// console.log("path",path);  //Added helpcenter routes 11-01-2019
	/* added following condition for withdraw route confirmation screen */
	if (location.pathname === `${path}/withdraw-confirmation` && !authUser) {
		if (localStorage.getItem('RefNo') === null && localStorage.getItem('Bit') === null) {
			const parsed = qs.parse(location.search);
			localStorage.setItem('RefNo', parsed.RefNo);
			localStorage.setItem('Bit', parsed.Bit);
		}
	}
	if (location.pathname === `${path}/pages/about-us` || location.pathname === `${path}/pages/contact-us` || location.pathname === `${path}/pages/application-center` || location.pathname === `${path}/pages/legal-statement` || location.pathname === `${path}/pages/terms-of-service` || location.pathname === `${path}/pages/privacy-policy` || location.pathname === `${path}/pages/fees` || location.pathname === `${path}/pages/faq` || location.pathname === `${path}/pages/refund-policy` || location.pathname === `${path}/pages/helpcenter` || location.pathname === `${path}/pages/helpcenter-info`) {
		return (
			<Route
				{...rest}
				render={props => <Component {...props} />}
			/>);
	} else {
		return (
			<Route
				{...rest}
				render={props =>
					authUser
						? <Component {...props} />
						: <Redirect
							to={{
								pathname: '/signin',
								state: { from: props.location }
							}}
						/>}
			/>);
	}
}


class App extends Component {
	//Added by salim dt:17/10/2018..
	constructor(props) {
		super(props);
		if (props.user) {
			autoRefreshToken();
			/* const checkToken = auth.isAuthenticated();
			if(!checkToken) {
				redirectToLogin();
			} */
		}
	}



	render() {
		const { location, match, user } = this.props;
		/* if regarding url load then its allow without login added by kushal parekh*/ //Added helpcenter routes 11-01-2019
		if (location.pathname === '/') {
			if (location.pathname === `${match.url}/about-us` || location.pathname === `${match.url}/contact-us` || location.pathname === `${match.url}/application-center` || location.pathname === `${match.url}/legal-statement` || location.pathname === `${match.url}/terms-of-service` || location.pathname === `${match.url}/privacy-policy` || location.pathname === `${match.url}/fees` || location.pathname === `${match.url}/faq` || location.pathname === `${match.url}/refund-policy` || location.pathname === `${match.url}}/pages/helpcenter` || location.pathname === `${match.url}/pages/helpcenter-info`) {

			}
			else {
				if (user === null) {
					return (<Redirect to={'/signin'} />);
				} else {
					//return (<Redirect to={'/app/dashboard/ecommerce'} />);
					return (<Redirect to={'/app/dashboard/trading'} />);
				}
			}
		}
		//Added by salim
		const hide = {
			display: 'none'
		};
		return (
			<div>
				{/* <Detector
				render={({ online }) => (
					<div className={`App ${online ? "Online" : "Offline"}`}>
					
					</div>
				)}
				/>
				<Online> */}
				{/* Added by salim textToImage Convert */}
				<div style={hide}>
					<canvas id="textCanvas" height="50"></canvas>
				</div>
				<JbsThemeProvider>
					<NotificationContainer />
					<InitialPath
						path={`${match.url}app`}
						authUser={user}
						component={HorizontalLayout}
						location={location}
						match={match}
					/>
					<Route path="/horizontal" component={HorizontalLayout} />
					<Route path="/dashboard" component={HorizontalLayout} />
					{/* <Route path="/signin" component={AppSignIn} />
						<Route path="/signup" component={AppSignUp} /> */}
					{/* <Route path="/signin" component={SignInScreen} />
						<Route path="/signup" component={SignUpScreen} /> */}
					<Route path="/signin" component={SigninTabScreen} />
					<Route path="/signup" component={SignupTabScreen} />
					<Route path="/register-confirm" component={EmailConfirmationWdgt} />
					<Route path="/forgot-password" component={ForgotPasswordScreen} />
					<Route path="/device-authorize" component={DeviceAuthorizeScreen} />
					{/* <Route path="/session/login" component={AsyncSessionLoginComponent} />
						<Route path="/session/register" component={AsyncSessionRegisterComponent} />
						<Route path="/session/lock-screen" component={AsyncSessionLockScreenComponent} />
						<Route path="/session/forgot-password" component={AsyncSessionForgotPasswordComponent} />
						<Route path="/session/404" component={AsyncSessionPage404Component} />
						<Route path="/session/500" component={AsyncSessionPage500Component} /> */}
					{/* <Route path="/terms-condition" component={AsyncTermsConditionComponent} /> */}
					<Route path="/landingpage" component={LandingPage} />
					<Route path="/landingcooldex" component={landingcooldexPage} />
					<Route path="/callback" render={(props) => {
						//handleAuthentication(props);
						return <Callback {...props} />
					}} />
					<Route path="/forgot-confirm" component={ForgotConfirmationWdgt} />
					<Route path="/terms-of-service" component={TermsofService} />
					<Route path="/maintainance" component={Maintainance} />
				</JbsThemeProvider>
				{/* </Online>
				<Offline polling={{ enabled: true, interval: 2000, timeout: 1000 }}>
				  		<AsyncNoInternetConnectionComponent/>
				</Offline> */}
			</div>
		);
	}
}

// map state to props
/* const mapStateToProps = ({ authUser }) => {
	const { user } = authUser;
	return { user };
}; */
const mapStateToProps = ({ nrlLoginRdcer }) => {
	const { user } = nrlLoginRdcer;
	return { user };
};

export default connect(mapStateToProps)(App);
