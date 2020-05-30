import React from 'react';
import { Tabs } from '@material-ui/core';
import StyledTab from '../StyledTab/StyledTab'
//import styles from './homePageHeader.module.scss';
import { connect } from 'react-redux';

/* this component will envolve to something more
    complex do not move to home page
*/
const UsersPageHeader = ({ onChange, activeTab, passions }) => {
    return (
        <div>
            <Tabs
                value={activeTab}
                onChange={(e, newTab) => onChange(newTab)}
                indicatorColor='primary'
                textColor='primary'
                centered
            >
                {passions && passions.map( (passion) => {
                        return (
                            <StyledTab value={passion._id} label={passion.passionTitle}/>
                        );
                    }
                )}
            </Tabs>
        </div>
    );
};

const mapStateToProps = ({ myInfo }) => ({ passion: myInfo.passion.title });
export default connect(mapStateToProps)(UsersPageHeader);
