/* 
    Createdby : Kushal parekh
    Updateby : Kushal parekh
    CreatedDate : 19-09-2018
    UpdatedDate : 19-09-2018
    Description : Search Component for FAQ
*/
import React, { Component } from 'react';
import { FormGroup, Input } from 'reactstrap';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';

// actions
import { updateSearchFaq, onSearchFaq, showFaqLoadingIndicator } from 'Actions/Faq';

// jbs card
import JbsCollapsibleCard from 'Components/JbsCollapsibleCard/JbsCollapsibleCard';

// intl messages
import IntlMessages from 'Util/IntlMessages';

class SearchFaq extends Component {

    /**
     * On Search faqs
     */
    onUpdateSearchFaqs(e) {
        this.props.updateSearchFaq(e.target.value);
        if(e.target.value=='')
        {
            this.props.onSearchFaq(e.target.value); 
        }
    }

    /**
     * On Search faqs
     */
    onSearchFaqs() {
        this.props.showFaqLoadingIndicator();
        const { searchFaqText } = this.props;
        let self = this;
        setTimeout(() => {
            self.props.onSearchFaq(searchFaqText);
        }, 1500);
    }

    render() {
        const { searchFaqText } = this.props;
        return (
            <JbsCollapsibleCard customClasses="search-filter">
                <form>
                    <h2 className="heading mb-15"><IntlMessages id="faq.search.title" /></h2>
                    <FormGroup className="mb-0 w-20">
                        <Input
                            type="text"
                            name="search"
                            onChange={(e) => this.onUpdateSearchFaqs(e)}
                            value={searchFaqText}
                        />
                    </FormGroup>
                    <Button variant="raised" color="primary" className="text-white" onClick={() => this.onSearchFaqs()}><IntlMessages id="faq.button.search" /></Button>
                </form>
            </JbsCollapsibleCard>
        );
    }
}

// map state to props
const mapStateToProps = ({ faq }) => {
    return faq;
}

export default connect(mapStateToProps, {
    updateSearchFaq,
    onSearchFaq,
    showFaqLoadingIndicator
})(SearchFaq);
