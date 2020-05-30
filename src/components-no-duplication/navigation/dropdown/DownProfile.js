import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useRouteMatch, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { exploreResetNavigationAction } from '../../../store/actions';

const Wrapper = styled.div`
	z-index: 55;
	position: absolute;
	width: 250px;
	top: 45px;
	right: 40px;
	border-radius: 10px;
	background: white;
	.drop-down-list {
		overflow: hidden;
		box-shadow: 0px 0px 2px #899eff;
		border-radius: 10px;
		.drop-down-item {
			border: 1px solid #00000011;
			padding: 0 10px;
			text-align: center;
			line-height: 40px;
			font-size: 20px;
			cursor: pointer;
			user-select: none;
		}
		.drop-down-item:hover {
			transform: scale(1.05);
		}
	}
`;

const DownProfile = ({
	exploreResetNavigation,
	history,
	logoutUser,
	close,
}) => {
	const [entred, setEntred] = useState(false);
	const [timer, setTimer] = useState(null);
	const [timeOut, setTimOut] = useState(false);
	useEffect(() => {
		if (timeOut && !entred) {
			close();
			setTimer(null);
			setEntred(false);
		}
		if (!timer) {
			setTimer(setTimeout(() => setTimOut(true), 3000));
		}
		return () => {
			clearTimeout(timer);
		};
	}, [timer, entred, timeOut, close]);

	const isExplore = useRouteMatch('/explore');

	const handleExploreClick = () => {
		close();

		if (!isExplore) {
			exploreResetNavigation();
			history.push('/explore');
		}
	};

	const handleItemClick = (item) => {
		close();
		if (item) history.push(item);
	};
	const handleLogout = () => {
		logoutUser();
	};
	return (
		<Wrapper
			className='ProfileDropDown'
			onMouseLeave={close}
			onMouseEnter={() => {
				setEntred(true);
			}}
		>
			<div className='drop-down-list'>
				<div
					className='drop-down-item'
					onClick={() => handleItemClick('/user-profile')}
				>
					My Profile
				</div>
				<div className='drop-down-item' onClick={handleExploreClick}>
					Explore
				</div>
				<div
					style={{ opacity: 0.5 }}
					className='drop-down-item'
					onClick={() => handleItemClick(null)}
				>
					Notifications
				</div>
				<div
					style={{ opacity: 0.5 }}
					className='drop-down-item'
					onClick={() => handleItemClick(null)}
				>
					Settings and Privacy
				</div>
				<div className='drop-down-item' onClick={handleLogout}>
					Log out
				</div>
			</div>
		</Wrapper>
	);
};

const mapDispatchToProps = (dispatch) => {
	return {
		exploreResetNavigation: () => dispatch(exploreResetNavigationAction()),
	};
};

export default withRouter(connect(null, mapDispatchToProps)(DownProfile));
