import React, { useState } from 'react';
import UsersTab from './Users/UsersTab';
import ContentTab from './Content/ContentTab';
import ExplorePageHeader from '../../components-no-duplication/ExplorePageHeader/ExplorePageHeader';
import { connect } from 'react-redux';
import { exploreResetNavigationAction } from '../../store/actions';
import './explore.css';
import { Container } from '@material-ui/core';

const Explore = ({ exploreResetNavigation }) => {
	const [activeTab, setActiveTab] = useState('content');

	const handleSelectTab = (selectedTab) => {
		setActiveTab(selectedTab);
		exploreResetNavigation();
	};

	return (
		<Container fixed style={{maxWidth: 700}}>
			<div className='explore'>
				<ExplorePageHeader
					activeTab={activeTab}
					onChange={(tab) => handleSelectTab(tab)}
				/>
				{activeTab === 'content' && <ContentTab />}
				{activeTab === 'people' && <UsersTab />}
			</div>
		</Container>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		exploreResetNavigation: () => dispatch(exploreResetNavigationAction()),
	};
};

export default connect(null, mapDispatchToProps)(Explore);
