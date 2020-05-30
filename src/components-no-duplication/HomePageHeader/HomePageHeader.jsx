import React from 'react';
import { Tabs } from '@material-ui/core';
import StyledTab from '../StyledTab/StyledTab'
import styles from './homePageHeader.module.scss';
import { connect } from 'react-redux';

/* this component will envolve to something more
    complex do not move to home page
*/
const HomePageHeader = ({ subject, onChange, activeTab, passion }) => {
	return (
		<div className={styles.homeHeader}>
			<Tabs
				value={activeTab}
				onChange={(e, newTab) => onChange(newTab)}
				indicatorColor='primary'
				textColor='primary'
				centered
			>
				<StyledTab value='passion' label={`${passion}`} />
				<StyledTab value='subscribtion' label='SUBSCRIPTIONS' />
			</Tabs>
		</div>
	);
};

const mapStateToProps = ({ myInfo }) => ({ passion: myInfo.passion.title });
export default connect(mapStateToProps)(HomePageHeader);
