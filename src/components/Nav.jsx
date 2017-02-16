import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux';
import { Link } from 'react-router';
import { googleSignIn, signOut } from '../actions/user-actions';
import { PATH } from '../util/router';

class Nav extends Component {

    static propTypes = {
        signingIn: PropTypes.bool.isRequired,
        signedIn: PropTypes.bool.isRequired,
        displayName: PropTypes.string.isRequired,
        location: PropTypes.string.isRequired,
    };

    handleSignOutClick(){
        this.props.dispatch(signOut());
    }

    handleSignInWithGoogleClick(){
        this.props.dispatch(googleSignIn());
    }

    render() {
        return (
            <div className="flex-row padding-5 between">
                <div>
                    { this.props.location !== PATH.HOME &&
                        <Link className="btn btn-link btn-sm" to={PATH.HOME}>Home</Link>
                    }
                    <Link className="btn btn-link btn-sm" to={PATH.ABOUT}>About</Link>
                    <Link className="btn btn-link btn-sm" href="https://blog.vizamp.com">Blog</Link>
                    <Link className="btn btn-link btn-sm" to={PATH.TERMS}>Terms</Link>
                </div>
                { this.props.signedIn ?
                    <div>
                        <Link className="btn btn-link btn-sm" to={PATH.PROFILE}>
                            {this.props.displayName}
                        </Link>
                        <button className="btn btn-link btn-sm"
                                onClick={this.handleSignOutClick.bind(this)}>
                            Sign Out
                        </button>
                    </div>
                    : this.props.location !== PATH.HOME &&
                        <div>
                            <button className="btn btn-primary btn-sm"
                                    onClick={this.handleSignInWithGoogleClick.bind(this)}
                                    disabled={this.props.signingIn}>
                                Sign In With Google
                            </button>
                        </div>
                }
            </div>
        );
    }
}

const mapProps = state => {
    const {
        signingIn,
        signedIn,
    } = state.user;

    const location = state.routing.locationBeforeTransitions.pathname;
    const displayName = state.user.details ? state.user.details.displayName || '' : '';

    return {
        signingIn,
        signedIn,
        displayName,
        location
    }
};

export default connect(mapProps)(Nav);