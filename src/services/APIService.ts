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

export async function getMembers(authToken: string){
    
}