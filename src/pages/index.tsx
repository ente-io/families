import Landing from '../components/Landing';
import { useEffect, useContext } from 'react';
import { acceptInvite } from '../services/APIService';
import { AppContext } from './_app';
import { useRouter } from 'next/router';
import { logError } from '../util/sentry';

function Home() {
    const {
        authToken,
        setIsLoading,
        setFamilyManagerEmail,
        setTotalStorage,
        setMessage,
        setMessageDialogView,
    } = useContext(AppContext);

    const router = useRouter();

    useEffect(() => {
        try {
            const params = new URLSearchParams(window.location.search);
            const token = params.get('token');
            const isFamilyCreated =
                params.get('isFamilyCreated') ?? params.get('familyCreated'); // handle both flag till internal APK is released
            if (isFamilyCreated === 'true') {
                router.replace({ pathname: '/members', query: { token } });
            }
            const inviteToken = params.get('inviteToken');
            if (inviteToken) {
                handleAcceptInvite(inviteToken);
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
                router.replace({ pathname: '/invite' });
            } else {
                setMessage(acceptInviteRes.msg);
                setMessageDialogView(true);
            }
        } catch (e) {
            logError(e, 'failed to accept invite');
        }
    };

    const setPageToMembers = () => {
        router.replace({
            pathname: '/members',
            query: { token: authToken },
        });
    };

    return (
        <>
            <Landing setPageToMembers={setPageToMembers} />
        </>
    );
}

export default Home;
