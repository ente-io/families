import Landing from '../components/Landing';
import { useEffect, useContext } from 'react';
import { acceptInvite } from '../services/APIService';
import { AppContext } from './_app';
import { useRouter } from 'next/router';
import { logError } from '../util/sentry';

function Home() {
    const {
        setAuthToken,
        setIsLoading,
        setFamilyManagerEmail,
        setTotalStorage,
        setMessage,
        setMessageDialogView,
        syncMembers,
    } = useContext(AppContext);

    const router = useRouter();

    useEffect(() => {
        try {
            const params = new URLSearchParams(window.location.search);
            const inviteToken = params.get('inviteToken');
            if (inviteToken) {
                handleAcceptInvite(inviteToken);
            }
            const token = params.get('token');
            if (token) {
                setAuthToken(token);
            }
            const isFamilyCreated =
                params.get('isFamilyCreated') ?? params.get('familyCreated'); // handle both flag till internal APK is released
            if (isFamilyCreated === 'true') {
                syncMembers(token); // passing token as state of authToken might not be updated
                router.push('/members');
            }
        } catch (e) {
            logError(e, 'failed to set initial query params state');
        }
    }, []);

    const handleAcceptInvite = async (inviteToken: string) => {
        try {
            setIsLoading(true);
            const acceptInviteRes = await acceptInvite(inviteToken);
            setIsLoading(false);
            if (acceptInviteRes.success) {
                setFamilyManagerEmail(acceptInviteRes.data.adminEmail);
                setTotalStorage(acceptInviteRes.data.storage);
                router.push('/invite');
            } else {
                setMessage(acceptInviteRes.msg);
                setMessageDialogView(true);
            }
        } catch (e) {
            logError(e, 'failed to accept invite');
        }
    };

    return (
        <>
            <Landing
                setPageToMembers={() => {
                    router.push('/members');
                }}
            />
        </>
    );
}

export default Home;
