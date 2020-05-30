import React from 'react';
import { connect } from "react-redux";
import { push } from "react-router-redux";
import { getData, getDummyUser } from '../store/actions/GetDataAction/GetDataAction';

class TestRedux extends React.Component {

    render() {
        // get users from state
        const { users } = this.props;
        return (
            <div className="App">
                <h1>I am a redux test page</h1>
                <button onClick={() => { this.props.onGetData() }}>Render</button>
                <div>
                    <table>
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Phone</th>
                                <th>Website</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => {
                                return (
                                    <tr key={user.id}>
                                        <td>{user.name}</td>
                                        <td>{user.email}</td>
                                        <td>{user.phone}</td>
                                        <td>{user.website}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        );
    }
}

const state = (state, ownProps = {}) => {
    return {
        getDataReducer: state.getDataReducer,
        // get users from store
        users: state.getDataReducer.users
    }
}

const mapDispatchToProps = (dispatch, ownProps) => {
    return {
        navigateTo: (location) => {
            dispatch(push(location));
        },
        onGetData: () => dispatch(getData()),
        getDummyUser: dispatch(getDummyUser) // call function to fetch dummy user data
    }
};

export default connect(state, mapDispatchToProps)(TestRedux)
