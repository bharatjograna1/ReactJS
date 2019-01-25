/* 
    Createdby : Kushal parekh
    Updateby : Kushal parekh
    CreatedDate : 20-09-2018
    UpdatedDate : 20-09-2018
    Description :Fees And Charges Pages
*/
import React, { Component } from 'react';
import { Table } from 'reactstrap';
import { connect } from 'react-redux';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

// page title bar
import PageTitleBar from 'Components/PageTitleBar/PageTitleBar';

// intl messages
import IntlMessages from 'Util/IntlMessages';

// jbs card box
import JbsCollapsibleCard from 'Components/JbsCollapsibleCard/JbsCollapsibleCard';

// app config
import AppConfig from 'Constants/AppConfig';

// redux actions
import { getPageContents } from 'Actions';

//For Meta Tag and SEO Configuration
import Page from 'Components/page';

class Fees extends Component {
	state = {
		myContnet: []
    }
    
    componentDidMount(){
		//HAVE TO PASS PROPER PAGE ID TO GET RELAVANT PAGE CONTENT
        this.props.getPageContents(AppConfig.pages['fees-and-charges']);
	}
	
	render() {
		const { pageContents } = this.props;
		const html =pageContents != null && pageContents.locale && pageContents.locale[localStorage.getItem('locale')] && pageContents.locale[localStorage.getItem('locale')].content ? pageContents.locale[localStorage.getItem("locale")].content : "";
		return (
			// <Page id="Feed" title="Fees" description="This is Fees Page">
			<div className="about-wrapper">
				<PageTitleBar title={<IntlMessages id="sidebar.fees" />} match={this.props.match} />
					<div className="terms-wrapper" >
						<div className="terms-conditions-rules">
						
								{ReactHtmlParser(html)}
							
							{/* <JbsCollapsibleCard heading="Fee for trading">
           						<span className="sub-heading mb-1">Starting from 0.15 % up to 0 % trading fee. If you hold UNQ token equivalent to the propose amount, will be given discounted rate in transaction fees. The discount will be void if they don't hold/stake/freeze their UNQ token in the wallet.</span>
								<div className="table-responsive">
									<div className="unseen">
										<Table hover bordered striped>
											<thead>
												<tr className="bg-primary text-white">
													<th>STAKING OF</th>
													<th>UNQ VALUE</th>
													<th>MAKER FEE</th>
													<th>TAKER FEE</th>
												</tr>
											</thead>
											<tbody>
											<tr>
												<td>UNQ TOKEN</td>
												<td>USD 0</td>
												<td>0.15%</td>
												<td>0.15%</td>
											</tr>

											<tr>
												<td>UNQ TOKEN</td>
												<td>USD 2,500</td>
												<td>0.12%</td>
												<td>0.12%</td>
											</tr>
										
											</tbody>
										</Table>
									</div>
								</div>
            				</JbsCollapsibleCard>
                            <JbsCollapsibleCard heading="Fee for Deposit">
               					<span className="sub-heading">Free</span>
            				</JbsCollapsibleCard>	
                            <JbsCollapsibleCard heading="Fee for Withdrawal">
                            <span className="sub-heading mb-1">We will adjust the withdrawal fees according to the Blockchain conditions regularly.</span>
                                <div className="table-responsive">
                                    <div className="unseen">
                                        <Table hover bordered striped>
                                            <thead>
                                                <tr className="bg-primary text-white">
                                                    <th>Coin</th>
                                                    <th>Name</th>
                                                    <th>Minimum Withdrawal</th>
                                                    <th>Transaction Fees</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td><img src={require(`Assets/img/coin/btc.png`)} className="mr-15" />BTC</td>
                                                    <td>BITCOIN</td>
                                                    <td>0.002</td>
                                                    <td>0.0005 BTC</td>
                                                </tr>
												<tr>
                                                    <td><img src={require(`Assets/img/coin/eth.png`)} className="mr-15" />ETH</td>
                                                    <td>ETHEREUM</td>
                                                    <td>0.02</td>
                                                    <td>0.01 ETH</td>
                                                </tr>
                                        	</tbody>
                                        </Table>
                                    </div>
                                </div>
                            </JbsCollapsibleCard> */}
						</div>
					</div>
			</div>
			// </Page>
		);
	}
}
// map state to props
const mapStateToProps = ({ pageContentApp }) => {
	const { pageContents } = pageContentApp;
	return { pageContents };
}

export default connect(mapStateToProps, {
	getPageContents
})(Fees);