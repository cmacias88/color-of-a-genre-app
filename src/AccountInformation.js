import React from 'react';
import { Link } from 'react-router-dom';
  
const AccountInformation = ({user}) => {

    return (
        <>
            <h1>
                Your Account Information
            </h1>
            <p>
                Your Username: {user.username}
            </p>
            <p>
                <Link to={`/profile/${user.user_id}`}>Your Visualizations</Link>
            </p>
        </>
    )
};
  
export default AccountInformation;