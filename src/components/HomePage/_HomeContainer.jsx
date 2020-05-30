import React from 'react';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { Row, Col } from 'react-bootstrap';

import { fetchMyInfo } from '../../actions/userActions';
import NavBar from './NavBar';
import SideBar from './SideBar';
// import Blogs from './Blogs';
import UserProfile from '../UserProfile/UserProfile';

function HomeContainer(props) {
  const dispatch = useDispatch();
  // const MyInfo = useSelector(state => state.loggedInMyInfo);

  useEffect(() => {
    async function callFetchMyInfo() {
      try {
        await dispatch(fetchMyInfo());
      } catch (e) {}
    }
    callFetchMyInfo();
  }, [dispatch]);

  return (
    <React.Fragment>
      <Row style={{ height: '100%' }}>
        <SideBar />
        <Col md={{ span: 10, offset: 2 }} className="home-page-col">
          <NavBar />
          <Row>
            <Col>
              {/* <Blogs/> */}
              <UserProfile />
            </Col>
            {/* <Col className='home-page-col' md={2} ></Col> */}
          </Row>
        </Col>
      </Row>
    </React.Fragment>
  );
}

export default HomeContainer;
