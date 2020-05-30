import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import moment from 'moment';
import './Contribution.scss';
import { getImageFullUrl } from '../../Utils/utils';
import { Dropdown, ButtonGroup } from 'react-bootstrap';

const customNotification = require('../../Utils/notification');

const Contribution = ({
                          onClick,
                          content,
                          openPromotePostModal,
                          openReactToPostModal,
                          openShowPictureModal,
                          deleteContribution,
                          editContribution,
                          myUserId,
                          history,
                      }) => {
    const [editMode, setEditMode] = useState(false);
    const [description, setDescription] = useState(false);

    useEffect(() => {
        setDescription(content.contentDescription);
    }, [content]);

    const handleEditItem = (event) => {
        event.stopPropagation();

        editContribution(content._id);
    };

    const handleDeleteItem = (event) => {
        event.stopPropagation();

        deleteContribution(content._id).then((res) => {
            if (res.error) customNotification.fireNotification('warning', res.error);
            if (res.msg) customNotification.fireNotification('success', res.msg);
        });
    };

    const handleOnClickUser = (event, user) => {
        event.stopPropagation();

        if (user && user._id) {
            if (user._id === myUserId) history.push('/user-profile');
            else history.push(`/user/${user._id}`);
        }
    };

    const handleReportItem = (event) => {
        event.stopPropagation();
    };

    // const renderEditDelete = () => {
    //   if(!content.user || !content.user._id) return null;
    //   if(content.user._id === myUserId) {
    //     return (
    //       <div>
    //         <p className="button" onClick={handleShowOptions}>...</p>
    //         {showOptions ?
    //           <div className ="options" onMouseLeave={handleHideOptions}>
    //             <p className="option" onClick={handleEditItem}> Edit </p>
    //             <p className="option" onClick={handleDeleteItem}> Delete </p>
    //           </div>
    //         :
    //          null
    //         }
    //       </div>
    //     )
    //   } else {
    //     return (
    //       <div>
    //         <p className="button" onClick={handleShowOptions}>...</p>
    //         {showOptions ?
    //           <div className ="options" onMouseLeave={handleHideOptions}>
    //             <p className="option" onClick={handleReportItem}> Report </p>
    //           </div>
    //         :
    //          null
    //         }
    //       </div>
    //     )
    //   }

    // };

    const handleDescriptionChange = (event) => {
        setDescription(event.target.value);
    };

    const handleClickContent = () => {
        if (onClick) {
            onClick(content);
        }
    };

    const handleClickParentContent = (event) => {
        event.stopPropagation();

        if (onClick) {
            onClick(content.parentContent);
        }
    };

    const handleSave = () => {
        setEditMode(false);
    };

    const handleShowPictureModal = (event, image) => {
        event.stopPropagation();
        openShowPictureModal(image);
    };

    const handlePromotePost = (event, content) => {
        event.stopPropagation();
        openPromotePostModal(content);
    };

    const handleReactPost = (event, content) => {
        event.stopPropagation();
        openReactToPostModal(content);
    };

    let contributionCss = 'contribution';

    if (onClick) {
        contributionCss += ' contribution-clickable';
    }

    const elementId = 'content_' + content._id;

    const ContributionHead = ({ content, onClickUser }) => {
        let user = content.user;

        if (!user || typeof user != 'object') {
            user = { fullname: 'No name' };
        }

        const name = user.fullname;
        const hours = moment(content.dateOfCreation).fromNow();

        const headline = user.headline && user.headline !== 'no headline' ? user.headline : '';

        return (
            <React.Fragment>
                <img
                    alt='as'
                    src={getImageFullUrl(user.profilePhoto)}
                    className={'avatar'}
                    onClick={(event, content) => onClickUser(event, user)}
                />
                <div style={{width: "100%"}}>
                    <h1 className='heading' onClick={(event) => onClickUser(event, user)}>
                        {name}{headline && <span className="headline">, {headline}</span>}
                    </h1>
                    <p className='ago'>{hours}</p>
                    {(!content.parentContent || (content.parentContent && Object.keys(content.parentContent).length === 0)) && content.artForms && content.artForms.titles[0] && <div className="artform-tag"><span>{content.artForms.titles[0]}</span></div>}

                </div>
            </React.Fragment>
        );
    };

    const ParentContent = ({ content }) => {
        return (
            <div className='parentContent' onClick={handleClickParentContent}>
                <div className='contribution-header small'>
                    <ContributionHead content={content} onClickUser={handleOnClickUser} />
                </div>

                <p className='fullDesc'>{content.contentDescription}</p>
                {content.contentImage ? (
                    <div className='post-pic'>
                        <div
                            className='post-pic-img'
                            style={{
                                backgroundImage: `url(${getImageFullUrl(
                                    content.contentImage
                                )})`,
                            }}
                            onClick={(event) =>
                                handleShowPictureModal(event, content.contentImage)
                            }
                        />
                    </div>
                ) : null}
            </div>
        );
    };

    let parentContent = null;

    if (content.parentContent && content.parentContent._id) {
        parentContent = content.parentContent;
    }

    const contentType = content.contentType;

    return (
        <div className='contributions'>
            <div
                className={contributionCss}
                id={elementId}
                onClick={handleClickContent}
            >
                <div className='contribution-header'>
                    <ContributionHead content={content} onClickUser={handleOnClickUser} />
                    <div className='space-holder' />
                    <div className='actions' onClick={(e) => e.stopPropagation()}>
                        <Dropdown className='post-actions' as={ButtonGroup}>
                            <Dropdown.Toggle>• • •</Dropdown.Toggle>
                            {content.user._id === myUserId ? (
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={handleEditItem}>
                                        { contentType === 'Work' ? 'Edit Work' : 'Edit Contribution' }
                                    </Dropdown.Item>
                                    <Dropdown.Item onClick={handleDeleteItem}>
                                        { contentType === 'Work' ? 'Delete Work' : 'Delete Contribution' }
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            ) : (
                                <Dropdown.Menu>
                                    <Dropdown.Item onClick={handleReportItem}>
                                        Report Contribution
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            )}
                        </Dropdown>
                    </div>
                </div>

                <div className='desc'>
                    {editMode ? (
                        <div className='description-editor-wrapper'>
							<textarea
                                className='description-editor'
                                value={description}
                                onChange={handleDescriptionChange}
                            />
                            <button className='btn-save' onClick={handleSave}>
                                Save
                            </button>
                        </div>
                    ) : (
                        <p className='fullDesc'>{description}</p>
                    )}

                    {content.contentImage ? (
                        <div className='post-pic'>
                            <div
                                className='post-pic-img'
                                style={{
                                    backgroundImage: `url(${getImageFullUrl(
                                        content.contentImage
                                    )})`,
                                }}
                                onClick={(event) =>
                                    handleShowPictureModal(event, content.contentImage)
                                }
                            />
                        </div>
                    ) : null}

                    {parentContent && <ParentContent content={parentContent} />}

                    <div className='footer'>
                        <div className='stats'>
                            {/* <span className="views">{views}</span> */}
                            {/* <span className="shares">shares</span> */}
                        </div>

                        <div className='actions'>
							<span
                                className='action'
                                onClick={(event) => handlePromotePost(event, content)}
                            >
								Promote
							</span>
                            <span
                                className='action'
                                onClick={(event) => handleReactPost(event, content)}
                            >
								React{' '}
							</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default withRouter(Contribution);
