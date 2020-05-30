import React from 'react';
import { connect } from 'react-redux';
import {exploreResetJournalSelectionAction} from '../../../store/actions';
import './JournalNav.css';

const JournalNav = ({resetJournalSelection, selectedSection}) => {
    const handleBack = () => {
        resetJournalSelection();
    };

    return (
        <React.Fragment>
            <div className="explore-journal-nav">
                <div className="explore-journal-nav-back" onClick={handleBack}>⟵&nbsp;&nbsp;</div><div className="explore-journal-nav-path">{selectedSection.passion.passionTitle} > {selectedSection.form.form} > {selectedSection.journal.title}</div>
            </div>
        </React.Fragment>
    );
};

const mapStateToProps = state => ({
    selectedSection: state.explore.selectedSection,
});

const mapDispatchToProps = dispatch => {
    return {
        resetJournalSelection: () => dispatch(exploreResetJournalSelectionAction()),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(JournalNav);
