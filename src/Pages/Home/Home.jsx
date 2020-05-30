import React from 'react';
import SubscriptionFeed from './SubscriptionFeed';
import {Container, Grid} from '@material-ui/core'
import Sidebar from '../../components-no-duplication/Sidebar/Sidebar'
import ArtformFeed from "./ArtformFeed";
import TrendingFeed from "./TrendingFeed";
import { Switch, Route } from 'react-router-dom';

const Home = () => {
	return (
		<Container fixed style={{ marginTop: "5rem"}}>
			<Grid spacing={1} container>
				<Grid item xs={12} md={1}>
				</Grid>
				<Grid item xs={12} md={2}>
					<Sidebar />
				</Grid>
				<Grid item xs={12}  md={9}>
					<Switch>
						<Route
							exact
							path="/"
							component={SubscriptionFeed}
						/>
						<Route
							push
							exact
							path="/artform/:artform"
							component={ArtformFeed}
						/>
						<Route
							push
							exact
							path="/trending/:subject"
							component={TrendingFeed}
						/>
					</Switch>
				</Grid>
			</Grid>

		</Container>
	);
};

export default Home;
