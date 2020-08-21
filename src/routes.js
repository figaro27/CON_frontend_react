import React from 'react'
import PropTypes from 'prop-types'
import { Route , Switch, Redirect, withRouter }  from 'react-router';
import {Provider} from 'react-redux';
import {configureStore} from './store';

// Services
import Auth from './Auth/Auth';

// Components
import AdminLayout       from './Layouts/AdminLayout'
import Dashboard         from './Components/Dashboard/Dashboard'
import SignUp            from './Components/SignUp/SignUp';
import ThankYouPage      from "./Components/SignUp/ThankYouPage";
import VerifyUser        from './Components/payout/payout';
import UpdateProfilePage from './Components/UpdateProfile/UpdateProfile';
import ReportingPage     from './Components/Reporting/Reporting';
import PrivacyPolicyPage from './Components/PrivacyPolicy/PrivacyPolicy';
import TermsServicePage  from './Components/TermsService/TermsService';
import feestructurePage  from './Components/feestructure/feestructure';
import Settings          from './Components/Settings/Settings';
import HistoryPage       from './Components/History/History';
import ContactUs         from './Components/ContactUs/contactus';
import BuySellWrapper    from './Components/BuySell/BuySellWrapper';
import Invest            from './Components/Invest/Invest';
import LoginNemID        from './Components/Login/LoginNemID';
import LoginScreen       from './Components/Login/LoginScreen';
import Logout            from './Components/Logout/Logout';
import Progress          from './Components/Progress';
import MobileAccess      from './Components/MobileAccess';
import Cancel            from './Components/Cancel';
import Maintance         from './Components/Maintance';
import Continue          from './Components/Continue';
import Timeout           from './Components/Timeout';
import Verification      from './Components/Verification';

const store = configureStore();

let auth = null;
window.appStore = store;

export const PrivateRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        auth.isAuthenticated()
        ?   auth.isPastFilled() ?
            <Provider store={store}>
                <AdminLayout auth={auth}>
                    <Component auth={auth} {...props} />
                </AdminLayout>
            </Provider> : <Redirect to={`/continue/${localStorage.getItem('lang')}`} />
        :   <Redirect to={`/login-nemid/${localStorage.getItem('lang')}`} />
    )} />
);

export const ContinueRoute = ({ component: Component, ...rest }) => (
    <Route {...rest} render={(props) => (
        auth.isAuthenticated()
        ?   <Provider store={store}>
                <Component auth={auth} {...props} />
            </Provider>
        :   <Redirect to='/login-nemid/' />
    )} />
);

class Routes extends React.Component
{
    static propTypes = {
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    }
    render() {

        auth = new Auth(this.props.history);

        return (
            <Switch>
                {/* AdminLayout */}
                <PrivateRoute exact path ='/'               component={Dashboard} />
                <PrivateRoute exact path ='/en'             component={Dashboard} />
                <PrivateRoute exact path ='/da'             component={Dashboard} />
                <PrivateRoute path='/updateprofile/:lang'   component={UpdateProfilePage} />
                <PrivateRoute path='/payout/:lang'          component={VerifyUser} />
                <PrivateRoute path='/reporting/:lang'       component={ReportingPage} />
                <PrivateRoute path='/settings/:lang'        component={Settings} />
                <PrivateRoute path='/privacypolicy/:lang'   component={PrivacyPolicyPage} />
                <PrivateRoute path='/feestructure/:lang'    component={feestructurePage} />
                <PrivateRoute path='/termsservice/:lang'    component={TermsServicePage} />
                <PrivateRoute path='/history/:lang'         component={HistoryPage} />
                <PrivateRoute path='/contactus/:lang'       component={ContactUs} />
                <PrivateRoute path='/buysell/:type/:lang'   component={BuySellWrapper} />
                <PrivateRoute path='/invest/:lang'          component={Invest} />
                <PrivateRoute path='/progress/:lang'        component={Progress} />
                <PrivateRoute path='/maintance/:lang'       component={Maintance} />
                <PrivateRoute path='/cancel/:lang'          component={Cancel} />
                <PrivateRoute path='/mobileaccess/:lang'    component={MobileAccess} />
                
                <ContinueRoute path='/verification/:lang'    component={Verification} />
                <ContinueRoute path="/continue/:lang"      component={Continue} />

                {/* Login layout */}
                <Route path='/login/:lang'                component={LoginScreen} />
                <Route path='/login-nemid/:lang'          render={() => <LoginNemID auth={auth} />} />
                <Route path='/logout/:lang'               component={Logout} />
                <Route path='/register/:lang'             component={SignUp} />
                <Route path='/thankyou/:lang'             component={ThankYouPage} />
                <Route path='/timeout/:lang'              component={Timeout} />
            </Switch>
        )
    }
}

export default withRouter(Routes);
