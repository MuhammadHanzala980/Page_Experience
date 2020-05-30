import React from 'react';
import { connect } from 'react-redux';
import ContentNavigation from './ContentNavigation';
import './ContentTab.css';
import Journal from "./Journal";

const ContentTab = ({selectedSection}) => {



    return (
        <React.Fragment>
        {selectedSection && selectedSection.passion && selectedSection.form && selectedSection.journal ?
            <Journal section={selectedSection}/>
        :
            <ContentNavigation/>
        }
        </React.Fragment>
    );
};

const mapStateToProps = state => ({
    selectedSection: state.explore.selectedSection,
});

export default connect(mapStateToProps, null)(ContentTab);
