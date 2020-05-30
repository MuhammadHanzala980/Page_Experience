import React, { useState, useEffect, useRef } from 'react';
import { getImageFullUrl } from "../../Utils/utils";
import './userProfileEditor.scss';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { MyContext } from '../../components-no-duplication/ImageCrop/imageCropper';

import ImgCrp from '../../components-no-duplication/ImageCrop/imageCropper'

import ReactCrop from 'react-image-crop';
const customNotification = require('../../Utils/notification');
const UserProfileEditor = ({ myInfo, updateUserProfile }) => {
    const [fullname, setFullname] = useState("Neel Thachi");
    const [headline, setHeadline] = useState("");
    const [bio, setBio] = useState("");
    const [location, setLocation] = useState("Karachi Pakistan");
    const [file, setFile] = useState("");
    const [picture, setPicture] = useState("");
    const [editProfile, setEditProfile] = useState(false);
    const [show, setShow] = useState(false);

    const ref = useRef(null);
    const handleBrowseFile = () => {
        if (ref.current) {
            ref.current.click();
        }
    }
    const handleFileChange = (event) => {
        updateTmpImage(event.target.files[0]);
        setFile(event.target.files[0]);
    }
    const updateTmpImage = (file) => {
        const fr = new FileReader();
        fr.onload = () => {
            setPicture(fr.result)
        }
        fr.readAsDataURL(file);
    }
    const handleClose = () => {
        let imgUri = localStorage.getItem('imgUri')
        // localStorage.removeItem('imgUri')
        console.log(imgUri, '99999');
        setPicture(imgUri)
        setShow(false);
    }
    const handleShow = () => {
        setShow(true);
    }


    const handleCancel = () => {
        setFullname(myInfo.fullname);
        setHeadline(myInfo.headline);
        setLocation(myInfo.location);
        setBio(myInfo.bio);
        setPicture(null);
        setEditProfile(false);
        setFile(null);
    }
    const handleSave = () => {
        if (!fullname || !bio || !location) {
            customNotification.fireNotification('warning', "all fields are mandatory");
        }
        else {
            setEditProfile(false);
            updateUserProfile({ ...myInfo, fullname, location, bio, headline, file });
        }
    }

    useEffect(() => {
        setFullname(myInfo.fullname);
        setHeadline(myInfo.headline);
        setLocation(myInfo.location);
        setBio(myInfo.bio);
        setPicture(null);
    }, [myInfo])
    return (
        <div className="user-profile-editor">
            <div className="profile-pic">
                <div className="image"
                    style={{ backgroundColor: 'gray', backgroundImage: `url(${picture || getImageFullUrl(myInfo.profilePhoto)})`, filter: editProfile && !picture ? 'blur(4px)' : '' }} />
                {editProfile ? <button onClick={handleShow} /> : null}
            </div>
            <div className="items">
                <div className="user-profile-item" style={{ marginTop: '13px' }}>
                    <input className='editableInput' style={{ fontSize: '22px', fontWeight: 'bold', wordSpacing: '3px', textTransform: 'capitalize' }} placeholder='' disabled={true} type="text" value={fullname || ""} onChange={(event) => setFullname(event.target.value)} />
                </div>
                <div className="user-profile-item headline" style={{ marginTop: '11px', marginLeft: '0px', width: '90%' }}>
                    <input style={{ fontSize: '15px' }} placeholder="Add headline | " disabled={!editProfile} type="text" value={headline || ""} onChange={(event) => setHeadline(event.target.value)} />
                </div>
                <div className="user-profile-item" style={{ marginTop: '11px', marginLeft: '0px', width: '90%' }}>
                    <textarea style={{ lineHeight: '16px', fontSize: '15px' }} placeholder="Add a short bio here | " rows="2" disabled={!editProfile} type="text" value={bio || ""} onChange={(event) => setBio(event.target.value)} />
                </div>
                <div className="user-profile-item location" style={{ marginLeft: '0px', marginTop: '3px', width: '50%' }}>
                    <input placeholder="Add your location | " disabled={!editProfile} type="text" value={location || ""} onChange={(event) => setLocation(event.target.value)} />
                </div>
                <>

                    <Modal show={show} onHide={handleClose} animation={false}>
                        <Modal.Header closeButton>
                            {/* <Modal.Title>Modal heading</Modal.Title> */}
                        </Modal.Header>
                        <Modal.Body><ImgCrp /></Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={handleClose}>Close</Button>
                            <Button variant="primary" onClick={handleClose}>Save Changes</Button>
                        </Modal.Footer>
                    </Modal>
                </>
            </div>
            <div className="controls" style={{ position: 'relative', top: '60px' }}>
                {!editProfile ? <button onClick={() => setEditProfile(true)}>Edit</button> : null}
                {editProfile ? <button onClick={handleCancel}>Cancel</button> : null}
                {editProfile ? <button onClick={handleSave}>Save</button> : null}
            </div>
            <input type="file" style={{ display: 'none' }} accept="image/png, image/jpeg" ref={ref} onChange={handleFileChange} />
        </div>
    )
}



export default UserProfileEditor;
