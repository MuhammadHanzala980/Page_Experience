import React, {useEffect} from 'react'
import {connect} from "react-redux";
import {
    getTrendingAction, getUserArtformsAction,
} from '../../store/actions';
import styles from './Sidebar.module.scss';
import {Link} from "react-router-dom";

const Sidebar = ({trending, artforms, getTrending, getUserArtforms}) => {
    useEffect(() => {
        let interval = null;

        getTrending();
        getUserArtforms();

        interval = setInterval(() => { getTrending(); }, 30000);

        return function cleanup() {
            clearInterval(interval);
        };
    }, [getTrending, getUserArtforms]);

    return (
        <div className={styles.sidebar}>
            <div className={styles.section}>
                <h5 className={styles.sectionTitle}><Link to="/">Subscriptions</Link></h5>
                <ul>
                    {artforms.map((item) => (<li key={item.id}><Link to={`/artform/${item.id}`}>{item.title}</Link></li>))}
                </ul>
            </div>
            <div className={styles.section}>
                <h5 className={styles.sectionTitle}>Trending</h5>
                <ul>
                    {trending.map((item) => (<li key={item}><Link to={`/trending/${item}`}>{item}</Link></li>))}
                </ul>
            </div>
            {/* <div className={styles.section}>
                <h5 className={styles.sectionTitle}>Following</h5>
                <ul>
                    <li>subject one</li>
                    <li>subject two</li>
                </ul>
            </div> */}

        </div>
    )
};

const mapStateToProps = (state) => {
    return {
        trending: state.sidebar.trending,
        artforms: state.sidebar.artforms
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getTrending: () => {
            dispatch(getTrendingAction());
        },
        getUserArtforms: () => {
            dispatch(getUserArtformsAction());
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(Sidebar)
