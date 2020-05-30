// import React from 'react';
// import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
// import Layout from './components/layout/Layout';
// import Login from './components/Authentication/Login';
// import Home from './components/HomePage/Home';
// import UserProfile from './components/UserProfile/UserProfile';
// import Content from './page/Content';
// import Journals from './page/Journals';
// import Notifications from './page/Notifications';
// import Search from './page/Search';
// import SignUp from './page/Signup/SignUp';

// const Routes = ({isAuthenticated}) => {
//   return (
//     <Router>
//         {isAuthenticated ? (
//         <React.Fragment>
//         <Switch>
//         <Route exact path="/" component={() => (
//               <Layout>
//                 <Home />
//               </Layout>
//             )}
//         />
//         <Route 
//             push
//             exact
//             path="/home"
//             component={() => (
//               <Layout>
//                 <Home />
//               </Layout>
//             )}
//           />
//           <Route
//             push
//             exact
//             path="/content/:article"
//             component={Content}
//           />
//           <Route push exact path="/journals/" component={Journals} />
//           <Route
//             push
//             exact
//             path="/notifications/"
//             component={Notifications}
//           />
//           <Route push exact path="/search/:data" component={Search} />
//           <Route push exact path="/search/" component={Search} />
//           <Route
//             push
//             exact
//             path="/user-profile"
//             component={() => (
//               <Layout>
//                 <UserProfile />
//               </Layout>
//             )}
//           />
//           <Route
//             path="*"
//             component={() => 
//               <Redirect to={{ pathname: '/' }}/>
//             } 
//           />
//         </Switch>
//         </React.Fragment>  
//         ) 
//         : 
//         (
//         <Switch>
//         <Route push exact path="/login" component={Login} />
//         <Route push exact path="/signup/" component={SignUp} />
//         <Route
//             path="*"
//             component={() => 
//               <Redirect to={{ pathname: '/login' }}/>
//             } 
//           />
//         </Switch>
//         )
//         }
//     </Router>
//   );
// }

// export default Routes;
