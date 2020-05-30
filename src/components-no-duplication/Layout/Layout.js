import React, { useEffect } from 'react';
import NavBar from '../navigation/navbar/NavBar';
import {closeShowPictureModalAction} from '../../store/actions/ModalsAction/ModalsAction'
//import SideBar from '../navigation/sidebar/SideBar';
import { connect } from 'react-redux';
import './Layout.css';
function Layout({children, modals, closeShowPictureModal}) {
   const {promotePostisOpen, reactToPostisOpen, publishContributionisOpen, publishWorkisOpen, editProfileOpen, showPictureisOpen } = modals;
   let style = { };
   if(promotePostisOpen || reactToPostisOpen || publishContributionisOpen || publishWorkisOpen || editProfileOpen || showPictureisOpen){
      style = { filter: 'blur(1px) opacity(30%)'};
   }
   useEffect(()=>{
      if(closeShowPictureModal){
         document.addEventListener('keydown', (event)=>{
            if(event.key === "Escape"){
               closeShowPictureModal();
            }
         })
      }
   },[closeShowPictureModal])
   
   return (
         <div className="layout-container" style={style}>
         {/* <div className="layout-lef-side">
            <SideBar /> 
         </div> */}
         <div className="layout-rigth-side">
         <div className="layout-nav-bar">
            <NavBar />
         </div>
         <div className="layout-content">
            {children}
         </div>
         </div>
         </div>
   );
}

const mapStateToProps  = (state) => {
   return {
     modals: state.modals,
   };
 };
 
const mapDispatchToProps = (dispatch) => (
   {
     closeShowPictureModal: (data) => dispatch(closeShowPictureModalAction(data)),
   }
)

export default connect(mapStateToProps, mapDispatchToProps)(Layout);
