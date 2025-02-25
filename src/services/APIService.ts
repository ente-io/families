import UserNotFoundMessage from '../components/utils/UserNotFoundMessage';
import { Member } from '../types';
import { logError } from '../util/sentry';
import constants from '../util/strings/constants';
import HTTPService from './HTTPService';

export const getEndpoint = () => {
    const endPoint =
        process.env.NEXT_PUBLIC_ENTE_ENDPOINT ?? 'https://api.ente.io';
    return endPoint;
};

export const getWebEndpoint = () => {
    const endPoint =
        process.env.NEXT_WEB_ENTE_ENDPOINT ?? 'https://web.ente.io';
    return endPoint;
};

export async function createFamily(authToken: string): Promise<{
    success: boolean;
    msg?: string;
}> {
    try {
        const res = await HTTPService.post(
            `${getEndpoint()}/family/create`,
            {},
            undefined,
            {
                'X-Auth-Token': authToken,
            }
        );
        if (res.status === 200) {
            return {
                success: true,
            };
        } else if (res.status === 402) {
            return {
                success: false,
                msg: constants.SORRY_YOU_NEED_TO_UPGRADE,
            };
        }
        throw new Error(res.statusText);
    } catch (e) {
        logError(e, 'createFamily failed');
        return {
            success: false,
            msg: constants.SORRY_SOMETHING_WENT_WRONG,
        };
    }
}

export async function acceptInvite(inviteToken: string): Promise<{
    success: boolean;
    msg?: string;
    data?: {
        adminEmail: string;
        storage: number;
        expiryTime: number;
    };
}> {
    try {
        const res = await HTTPService.post(
            `${getEndpoint()}/family/accept-invite`,
            { token: inviteToken }
        );
        if (res.status === 200) {
            return {
                success: true,
                data: res.data,
            };
        } else if (res.status == 404) {
            return {
                success: false,
                msg: constants.SORRY_INVITE_TOKEN_INVALID,
            };
        }
        // TODO: add case for invite expired
        throw new Error(res.statusText);
    } catch (e) {
        logError(e, 'acceptInvite failed');
        return {
            success: false,
            msg: constants.SORRY_SOMETHING_WENT_WRONG,
        };
    }
}

export async function getMembers(authToken: string): Promise<{
    success: boolean;
    msg?: string;
    status?: number;
    data?: {
        members: Member[];
        storage: number;
        expiryTime: number;
        adminBonus: number;
    };
}> {
    try {
        const res = await HTTPService.get(
            `${getEndpoint()}/family/members`,
            undefined,
            {
                'X-Auth-Token': authToken,
            }
        );
        if (res.status === 200) {
            return {
                success: true,
                data: res.data,
            };
        } else if (res.status === 401) {
            return {
                success: false,
                msg: constants.SORRY_SOMETHING_WENT_WRONG,
                status: 401,
            };
        }
        throw new Error(res.statusText);
    } catch (e) {
        logError(e, 'getMembers failed');
        return {
            success: false,
            msg: constants.SORRY_SOMETHING_WENT_WRONG,
        };
    }
}

export async function inviteMember(
    authToken: string,
    email: string,
    storageLimit?: number
): Promise<{
    success: boolean;
    msg?: string | JSX.Element;
}> {
    try {
        const res = await HTTPService.post(
            `${getEndpoint()}/family/add-member`,
            { email, storageLimit },
            undefined,
            {
                'X-Auth-Token': authToken,
            }
        );
        if (res.status === 200) {
            return {
                success: true,
            };
        } else if (res.status === 404) {
            return {
                success: false,
                msg: UserNotFoundMessage(),
            };
        } else if (res.status === 412) {
            return {
                success: false,
                msg: constants.REACHED_MAX_FAMILY_SIZE,
            };
        } else if (res.status === 406) {
            return {
                success: false,
                msg: constants.USER_ALREADY_IN_FAMILY,
            };
        } else if (res.status === 409) {
            return {
                success: false,
                msg: constants.USER_ALREADY_HAS_SUBSCRIPTION,
            };
        }
        throw new Error(res.statusText);
    } catch (e) {
        logError(e, 'inviteMember failed');
        return {
            success: false,
            msg: constants.OOPS_SOMETHING_WENT_WRONG,
        };
    }
}

export async function revokeInvite(
    authToken: string,
    userId: string
): Promise<{
    success: boolean;
    msg?: string;
}> {
    try {
        const res = await HTTPService.delete(
            `${getEndpoint()}/family/revoke-invite/${userId}`,
            {},
            undefined,
            {
                'X-Auth-Token': authToken,
            }
        );

        if (res.status === 200) {
            return {
                success: true,
            };
        }

        throw new Error(res.statusText);
    } catch (e) {
        logError(e, 'revokeInvite failed');
        return {
            success: false,
            msg: constants.SORRY_SOMETHING_WENT_WRONG,
        };
    }
}

export async function modifyMemberStorage(
    authToken: string,
    id: string,
    storageLimit: number
): Promise<{
    success: boolean;
    msg?: string;
}> {
    try {
        const res = await HTTPService.post(
            `${getEndpoint()}/family/modify-storage`,
            { id, storageLimit },
            undefined,
            {
                'X-Auth-Token': authToken,
            }
        );

        if (res.status === 200) {
            return {
                success: true,
            };
        } else if (res.status === 401) {
            return {
                success: false,
                msg: constants.ERR_PERMISISON_DENIED,
            };
        } else {
            return {
                success: false,
                msg: constants.FAILED_TO_MODIFY_STORAGE,
            };
        }
    } catch (e) {
        logError(e, `modifyMemberStorage failed`);
    }
    return;
}

export async function removeMember(
    authToken: string,
    userId: string
): Promise<{
    success: boolean;
    msg?: string;
}> {
    try {
        const res = await HTTPService.delete(
            `${getEndpoint()}/family/remove-member/${userId}`,
            {},
            undefined,
            {
                'X-Auth-Token': authToken,
            }
        );

        if (res.status === 200) {
            return {
                success: true,
            };
        }

        throw new Error(res.statusText);
    } catch (e) {
        logError(e, 'removeMember failed');
        return {
            success: false,
            msg: constants.SORRY_SOMETHING_WENT_WRONG,
        };
    }
}
