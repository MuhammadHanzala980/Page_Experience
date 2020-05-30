import React from 'react';
import { Tabs } from '@material-ui/core';
import styles from './ExplorePageHeader.module.scss';
import { connect } from 'react-redux';
import StyledTab from '../StyledTab/StyledTab'


const ExplorePageHeader = ({ onChange, activeTab }) => {
	return (
		<div className={styles.exploreHeader}>
			<Tabs
				value={activeTab}
				onChange={(e, newTab) => onChange(newTab)}
				indicatorColor='primary'
				textColor='primary'
				centered
			>
				<StyledTab value='content' label='Content' />
				<StyledTab value='people' label='People' />
			</Tabs>
		</div>
	);
};

const mapStateToProps = ({ myInfo }) => ({ passion: myInfo.passion.title });
export default connect(mapStateToProps)(ExplorePageHeader);
