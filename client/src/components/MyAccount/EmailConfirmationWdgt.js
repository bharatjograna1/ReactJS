/**
 * Auther : Salim Deraiya
 * Created : 26/10/2018
 * Email Confirmation Widget
 */
import React, { Component, Fragment } from "react";
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Alert, Button } from "reactstrap";
import CircularProgress from '@material-ui/core/CircularProgress';
// redux action
import { emailConfirmation } from "Actions/MyAccount";
// intl messages
import IntlMessages from "Util/IntlMessages";
//queryString
import qs from 'query-string';
// app config
import AppConfig from 'Constants/AppConfig';

const EmailConfirmScreen = ({data}) => {
    if(data.ReturnCode === 0) {
        return (            
            <Fragment>
                <div className="forgotconfirmbox">                                                     
                    <span><i className="material-icons font-2x">done</i></span>                                    
                </div>
                <h1 className="font-weight-bold mb-20 text-center"> <IntlMessages id="my_account.emailConfTitle" /></h1>
                <p className="text-center"><IntlMessages id="my_account.emailConfNote" /></p>
                {/* <Button onClick={() => window.location.href = '/'} className="w-25 mx-auto rounded-0 border-0" color="primary"><IntlMessages id="sidebar.btnBackToLogin" /></Button> */}
                <Link to="/signin" className="lnkToBtn btn-danger w-25 mx-auto" variant="raised"><IntlMessages id="sidebar.btnBackToLogin" /></Link>
            </Fragment>
        );
    } else {
        return (
            <Fragment>
                <div className="forgotconfirmbox">
                    <span className="bg-danger"><i className="material-icons font-2x">close</i></span>                                    
                </div>
                <h1 className="font-weight-bold mb-20 text-center"> <IntlMessages id="my_account.emailNotConfTitle" /></h1>
                <p className="text-center"><IntlMessages id={`apiErrCode.${data.ErrorCode}`} /></p>
                {/* <Button onClick={() => window.location.href = '/'} className="w-25 mx-auto lnkToBtn" variant="raised"><IntlMessages id="sidebar.btnBackToLogin" /></Button> */}
                <Link to="/signin" className="lnkToBtn btn-danger w-25 mx-auto" variant="raised"><IntlMessages id="sidebar.btnBackToLogin" /></Link>
            </Fragment>
        );
    }
}

class EmailConfirmationWdgt extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {},
            loading: false
        };
    }

    componentWillMount() {
        const parsed = qs.parse(location.search);
        if(parsed.emailConfirmCode !== '') {
            var reqObj = {
                emailConfirmCode : parsed.emailConfirmCode
            }
            this.props.emailConfirmation(reqObj);
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({ loading: nextProps.loading, data : nextProps.data });
    }

    render() {
        const { data, loading } = this.state;
        return (
            <div className="mx-auto w-50 text-center mt-50">
                <div className="text-center">
                    <a href="/"><img src={AppConfig.appLogo} alt="session-logo" className="img-fluid" width="110" height="35" /></a>
                </div>
                <div className="card p-30 forgotconfirmradius" style={{'margin-top':'100px'}}>
                    {
                        loading 
                        ?
                            <div className="text-center py-40"><CircularProgress className="progress-primary" thickness={2} /></div>
                        :
                            <EmailConfirmScreen data={data} />
                    }
                </div>
            </div>
        );
    }
}

const mapStateToProps = ({ emailConfirmRdcer }) => {
    const response = {
        data : emailConfirmRdcer.data,
        loading : emailConfirmRdcer.loading
    }
    return response;
};

export default connect(mapStateToProps, {
    emailConfirmation
})(EmailConfirmationWdgt);