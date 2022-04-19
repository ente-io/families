import UserNotFoundMessage from '../components/utils/UserNotFoundMessage';
import { Member } from '../pages';
import HTTPService from './HTTPService';

export const getEndpoint = () => {
    const endPoint =
        process.env.NEXT_PUBLIC_ENTE_ENDPOINT ?? 'https://api.ente.io';
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
                msg: 'Sorry, you need to upgrade your account to create a family.',
            };
        } else {
            return {
                success: false,
                msg: 'Sorry, something went wrong.',
            };
        }
    } catch (e) {
        return {
            success: false,
            msg: 'Sorry, something went wrong.',
        };
    }
}

export async function acceptInvite(inviteToken: string): Promise<{
    success: boolean;
    msg?: string;
}> {
    try {
        const res = await HTTPService.post(
            `${getEndpoint()}/family/accept-invite`,
            { token: inviteToken }
        );
        if (res.status === 200) {
            return {
                success: true,
            };
        }
        // TODO: add case for invite expired
        return {
            success: false,
            msg: 'Sorry, something went wrong.',
        };
    } catch (e) {
        return {
            success: false,
            msg: 'Sorry, something went wrong.',
        };
    }
}

export async function getMembers(authToken: string): Promise<{
    success: boolean;
    msg?: string;
    data?: {
        members: Member[];
        storage: number;
        expiryTime: number;
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
        }
        return {
            success: false,
            msg: 'Sorry, something went wrong.',
        };
    } catch (e) {
        return {
            success: false,
            msg: 'Sorry, something went wrong.',
        };
    }
}

export async function inviteMember(
    authToken: string,
    email: string
): Promise<{
    success: boolean;
    msg?: string | JSX.Element;
}> {
    try {
        const res = await HTTPService.post(
            `${getEndpoint()}/family/add-member`,
            { email },
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
                msg: 'You have reached the maximum number of family members.',
            };
        }
        return {
            success: false,
            msg: 'Oops, something went wrong.',
        };
    } catch (e) {
        return {
            success: false,
            msg: 'Oops, something went wrong.',
        };
    }
}
