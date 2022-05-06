import React from 'react';
import constants from '../../util/strings/constants';

function UserNotFoundMessage() {
    return (
        <>
            {constants.COULD_NOT_FIND_USER}
            <br />
            {constants.PLEASE_ASK_THEM_TO_SIGN_UP}
        </>
    );
}

export default UserNotFoundMessage;
