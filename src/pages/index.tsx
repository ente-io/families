import Landing from '../components/Landing';
import { useEffect, useContext } from 'react';
import { acceptInvite } from '../services/APIService';
import { AppContext } from './_app';
import { useRouter } from 'next/router';

function Home() {
    const {
        setAuthToken,
        setIsLoading,
        setFamilyManagerEmail,
        setTotalStorage,
        setMessage,
        setMessageDialogView,
        setShouldSyncMembers,
    } = useContext(AppContext);

    const router = useRouter();

    useEffect(() => {
        const params = new URLSearchParams(window.location.search);
        const inviteToken = params.get('inviteToken');
        if (inviteToken) {
            handleAcceptInvite(inviteToken);
        }
        const token = params.get('token');
        if (token) {
            setAuthToken(token);
        }
        if (
            (params.get('familyCreated') &&
                params.get('familyCreated') === 'true') || // handle both flag till internal APK is released
            (params.get('isFamilyCreated') &&
                params.get('isFamilyCreated') === 'true')
        ) {
            setShouldSyncMembers(true);
        }
    }, []);

    const handleAcceptInvite = async (inviteToken: string) => {
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
