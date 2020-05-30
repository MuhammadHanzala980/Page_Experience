import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { getPassionsAction, getFormsAction, getJournalsAction, selectSection} from '../../../store/actions';
import './ContentNavigation.css';

const ContentNavigation = ({getPassions, getForms, getJournals, selectSection, selectedSection, passions, forms, journals, myInfo}) => {
    let passion = null;
    let form = null;

    if (selectedSection) {
        passion = selectedSection.passion;
        form = selectedSection.form;
    }

    useEffect( () => {
        if (!selectedSection) {
            getPassions();
        }
    }, [myInfo, selectedSection, getPassions]);


    const handleSelectPassion = (selectedPassion) => {
        selectSection(selectedPassion, null, null);
        getForms(selectedPassion._id);
    };

    const handleSelectForm = (selectedForm) => {
        selectSection(passion, selectedForm, null);
        getJournals(passion._id, selectedForm.form);
    };

    const handleSelectJournal = (selectedJournal) => {
        selectSection(passion, form, selectedJournal);
    };

    return (
        <div className="explore-content-nav">
            <div className="explore-content-nav-column">
                {passions && passions[0] ? passions.map(item => {
                        let className = "explore-content-nav-item col1";

                        if (passion) {
                            if (item._id !== passion._id) {
                                className += " gray";
                            }
                        }

                        return <div className={className} onClick={() => handleSelectPassion(item) }>{item.passionTitle}</div>;
                    })
                    :
                    null}
            </div>
            <div className="explore-content-nav-column">
                {forms && forms[0] ? forms.map(item => {
                        let className = "explore-content-nav-item col2";

                        if (form) {
                            if (item.form !== form.form) {
                                className += " gray";
                            }
                        }

                        return (<div className={className} onClick={() => handleSelectForm(item) }>{item.form}</div>);
                    })
                    :
                    null}
            </div>
            <div className="explore-content-nav-item col3">
                {journals && journals[0] ? journals.map(item =>{
                        return (<div onClick={() => handleSelectJournal(item) }>{item.title}</div>);
                    })
                    :
                    null}
            </div>
        </div>
    );
};

const mapStateToProps = state => ({
    myInfo: state.myInfo,
    passions: state.explore.passions,
    forms: state.explore.forms,
    journals: state.explore.journals,
    selectedSection: state.explore.selectedSection
});

const mapDispatchToProps = dispatch => {
    return {
        selectSection: (passion, form, journal) => dispatch(selectSection(passion, form, journal)),
        getPassions: () => dispatch(getPassionsAction()),
        getForms: (passion) => dispatch(getFormsAction(passion)),
        getJournals: (passion, form) => dispatch(getJournalsAction(passion, form)),
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(ContentNavigation);
