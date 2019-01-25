/* 
    Createdby : Kushal parekh
    Updateby : Kushal parekh
    CreatedDate : 20-09-2018
    UpdatedDate : 27-09-2018
    Description : News pages use NewsList and NewsDetail Page Component
*/
import React, { Component } from "react";
// page title bar
import PageTitleBar from "Components/PageTitleBar/PageTitleBar";

// intl messages
import IntlMessages from "Util/IntlMessages";

//Import NewsList Component
import NewsList from "Components/News/NewsList";

//Widgets
import { Announcement } from "Components/Widgets";

// jbs collapsible card
import JbsCollapsibleCard from "Components/JbsCollapsibleCard/JbsCollapsibleCard";

//For Meta Tag and SEO Configuration
import Page from 'Components/page';

export default class News extends Component {
  render() {
    
    return (
      // <Page id="News" title="News" description="This is News Page">
      <div className="about-wrapper">
        <PageTitleBar
          title={<IntlMessages id="sidebar.news" />}
          match={this.props.match}
        />
        <div className="news-dashboard-wrapper">
            <div className="row news-content">
              <JbsCollapsibleCard
                heading={<IntlMessages id="news.title" />}  
                colClasses="col-sm-6 col-md-6 col-lg-6"
              >
                <NewsList {...this.props}/>
              </JbsCollapsibleCard>

              <JbsCollapsibleCard
                heading={<IntlMessages id="widget.annoucement.title" />}
                colClasses="col-sm-6 col-md-6 col-lg-6"
              >
                <Announcement {...this.props}/>
              </JbsCollapsibleCard>
            </div>
        </div>
      </div>
      // </Page>
    );
  }
}
