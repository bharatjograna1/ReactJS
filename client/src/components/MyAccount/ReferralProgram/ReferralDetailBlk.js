/**
 * Active User Component
 */
import React, { Component, Fragment } from "react";
import { Input } from "reactstrap";

//Copy to Clipborad..
import { CopyToClipboard } from "react-copy-to-clipboard";

// intl messages
import IntlMessages from "Util/IntlMessages";

class ReferralDetailBlk extends Component {
  constructor(props) {
    super(props);
    this.state = {
      my_referral_id: "35130015",
      referral_link: "https://www.jbspl.com/?ref=35130015",
      commission_rate: "20%",
      referral_friend_count: "0",
      estimate_commission_value: "0 BTC",
      copied: false
    };

    this.onCopy = this.onCopy.bind(this);
  }

  onCopy() {
    this.setState({ copied: true });
  }

  render() {
    const {
      my_referral_id,
      referral_link,
      commission_rate,
      referral_friend_count,
      estimate_commission_value
    } = this.state;

    var cursor = { cursor: "pointer" };
    return (
      <Fragment>
        <div className="card p-15">
          <div className="row">
            <div className="col-md-1 col-sm-3">
              <i className="material-icons mr-10 font-5x">dashboard</i>
            </div>
            <div className="pr-30 col-md-7 col-sm-6 border-right">
              <div className="row">
                <div className="col-md-6 col-sm-12">
                  <p>
                    <IntlMessages id="sidebar.myReferralID" />{" "}
                    <span className="text-warning pl-10">{my_referral_id}</span>
                  </p>
                </div>
                <div className="col-md-6 col-sm-12">
                  <p>
                    <IntlMessages id="sidebar.yourCommissionRate" />{" "}
                    <span className="text-warning pl-10">
                      {commission_rate}
                    </span>
                  </p>
                </div>
              </div>
              <div className="ref_lnk_area">
                <p>
                  <IntlMessages id="sidebar.referralLinkColon" />
                  <Input
                    disabled="disabled"
                    type="text"
                    name="referral_link"
                    className="w-75 d-inline mx-25"
                    id="referral_link"
                    value={referral_link}
                  />
                  <span className="d-inline-block align-middle" style={cursor}>
                    <CopyToClipboard text={referral_link} onCopy={this.onCopy}>
                      <i className="material-icons">content_copy</i>
                    </CopyToClipboard>
                  </span>
                </p>
              </div>
              <div className="share_area">
                <p>
                  <IntlMessages id="sidebar.shareColon" />
                  <span className="mx-15">
                    <i aria-hidden="true" className="ti-facebook" />
                  </span>
                  <span className="mx-15">
                    <i aria-hidden="true" className="ti-twitter-alt" />
                  </span>
                  <span className="mx-15">
                    <i aria-hidden="true" className="ti-linkedin" />
                  </span>
                </p>
              </div>
            </div>
            <div className="col-md-4 col-sm-3 px-25 pt-30">
              <div className="row">
                <div className="col-md-4 col-sm-5">
                  <p className="m-0 text-center">
                    <IntlMessages id="sidebar.referralFriends" />
                    <span className="d-block font-2x text-warning">
                      {referral_friend_count}
                    </span>
                  </p>
                </div>
                <div className="text-center col-md-8 col-sm-7">
                  <p className="m-0 text-center">
                    <IntlMessages id="sidebar.estimatedCommissionValue" />
                    <span className="d-block font-2x text-warning">
                      {estimate_commission_value}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

export default ReferralDetailBlk;
