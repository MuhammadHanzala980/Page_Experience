import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Attach from '../../image/icone/attach.svg';
import { getImageFullUrl } from '../../Utils/utils';
import {getPostReactionsAction, reactPostAction} from '../../store/actions/ContentAction/ContentAction';
import { connect } from 'react-redux';

const customNotification = require('../../Utils/notification');

const Wrapper = styled.div`
	background: #00000055;
	z-index: 500;
	top: 0;
	left: 0;
	width: 100vw;
	height: 100vh;
	position: absolute;
	display: flex;
	align-items: center;
	justify-content: center;
	justify-content: center;
	.modal-react {
		width: 100%;
		max-width: 700px;
		height: 380px;
		background: #fff;
		z-index: 13;
		box-shadow: 0px 3px 30px #00000029;
		border-radius: 20px;
		color: #000;
	}

	.modal-react-top {
		width: 95%;
		padding: 15px;
		border-bottom: 1px solid #00000026;
		margin: 0 auto;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.modal-react-title {
		font-size: 17px;
	}

	.btn-close {
		text-align: center;
		line-height: 20px;
		width: 20px;
		height: 20px;
		border-radius: 25px;
		top: 5%;
		right: 2%;
		font-size: 15px;
		color: #899eff;
		border: 1px solid #899eff;
		cursor: pointer;
	}

	img {
		display: block;
		width: 40px;
		height: 40px;
		border: 1px solid rgba(0,0,0,.07);
        border-radius: 10px;
	}

	p {
		padding: 1px;
		height: 36px;
		line-height: 36px;
		margin: 0 5px;
		color: #8c8787;
		text-align: center;
	}

	.modal-react-people {
		padding: 15px;
		margin-left: 15px;
	}
	
	.modal-group-img {
		display: flex;
	}
	
	.modal-group-img b {
	    line-height: 40px;
    	padding-top: 2px;
    	margin-right: 15px;
	}
	
	.modal-group-img img {
		display: block;
		width: 40px;
		height: 40px;
		border-radius: 5px;
	}
	
	.no-reactions {
		height: 40px;
		padding: 15px;
	}

	.modal-react-form {
		width: 95%;
		height: 141px;
		margin: 15px auto;
		background: #f1f1f1;
		border-radius: 10px;
	}

	.input-form {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 100%;
		border-radius: 10px;

		img {
			width: 70px;
			height: 70px;
		}
	}

	.input-form-item-1 {
		display: flex;
		align-items: center;
		justify-content: space-between;
		height: 100%;
	}

	.input-form-item-2 {
		display: flex;
		align-items: center;
		padding: 5px;
		justify-content: space-between;
		border-top: 1px solid #00000026;
		height: 20%;
	}

	.input-react {
		border: none;
		width: 100%;
		height: 60%;
		background: #f1f1f1;
	}

	.input-tags {
		border: none;
		padding: 5px;
		border-right: 1px solid #00000026;
		width: 100%;
		height: 90%;
		background: #f1f1f1;
	}

	.attach {
		width: 22px;
		height: 22px;
	}
	.modal-promote-bottom {
		display: flex;
		justify-content: flex-end;
		margin: 20px;
	}

	.btn-promote {
		width: 100px;
		height: 31px;
		border: none;
		background: #000000;
		color: #fff;
		box-shadow: 0px 3px 2px #00000029;
		font-size: 13px;
		border-radius: 21px;
		cursor: pointer;
	}
`;

const ReactPost = ({ close, myInfo, content, postReactions, getPostReactions, onReactPost }) => {
	const [description, setDescription] = useState(null);
	const [tags, setTags] = useState(null);

	useEffect( () => {
		getPostReactions(content._id, 0, 1000);
	}, [content, getPostReactions]);


	const descriptionChange = (event) => {
		setDescription(event.target.value);
	};

	const tagsChange = (event) => {
		setTags(event.target.value);
	};

	const handleReact = () => {
		console.log('handleReact');
		console.log(content._id);
		console.log(description);
		console.log(tags);
		onReactPost(content._id, description, tags).then((res) => {
			console.log(res);
			if (res && res.msg) {
				customNotification.fireNotification('success', res.msg);
			} else {
				customNotification.fireNotification('warning', `Something went wrong!`);
			}
			close();
		});
	};

	return (
		<Wrapper>
			<div className='modal-react'>
				<div className='modal-react-top'>
					<h1 className='modal-react-title'>React to this work</h1>
					<div className='btn-close' onClick={close}>
						X
					</div>
				</div>
				{ (postReactions && postReactions.length > 0) ?
					(
						<div className='modal-react-people'>
							<div className='modal-group-img'>
								<b>Reactions:</b>
								{postReactions.map((item, index) =>
									index < 2 ? (
										<img
											src={getImageFullUrl(item.profilePhoto)}
											alt="profile"
										/>
									) : (
										""
									)
								)}
								{postReactions.length > 2 && (
									<>
										<p>+{postReactions.length - 2}</p>
										<span>other people</span>
									</>
								)}
							</div>
						</div>
					) : (
						<div className="no-reactions"/>
					)}
				<div className='modal-react-form'>
					<div className='input-form'>
						<div className='input-form-item-1'>
							<img
								style={{ borderRadius: '10px', marginLeft: '5px' }}
								src={getImageFullUrl(myInfo.profilePhoto)}
								alt='profile'
							/>
							<textarea
								className='input-react'
								placeholder='Write your thoughts ...'
								onChange={descriptionChange}
							/>
						</div>
						<div className='input-form-item-2'>
							<input
								className='input-tags'
								placeholder='#Tags'
								onChange={tagsChange}
							/>
							<img style={{ height: '20px' }} src={Attach} alt='attach' />
						</div>
					</div>
				</div>
				<div className='modal-promote-bottom' onClick={handleReact}>
					<button className='btn-promote'>Publish</button>
				</div>
			</div>
		</Wrapper>
	);
};

const mapStateToProps = (state, ownProps = {}) => {
	return {
		myInfo: state.myInfo,
		postReactions: state.contentReducer.postReactions
	};
};

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		getPostReactions: (contentId, page, limit) =>
			dispatch(getPostReactionsAction(contentId, page, limit)),
		onReactPost: (contentId, contentDescription, contentTags) =>
			dispatch(reactPostAction(contentId, contentDescription, contentTags)),
	};
};

export default connect(mapStateToProps, mapDispatchToProps)(ReactPost);
