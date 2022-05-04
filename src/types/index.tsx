export interface AppContextType {
    isSmallerDisplay: boolean;
    isUserAdmin: boolean;
    members: Member[];
    setMembers: (members: Member[]) => void;
    shouldSyncMembers: boolean;
    setShouldSyncMembers: (shouldSyncMembers: boolean) => void;
    familyManagerEmail: string;
    setFamilyManagerEmail: (email: string) => void;
    totalStorage: number;
    setTotalStorage: (storage: number) => void;
    authToken: string;
    setAuthToken: (token: string) => void;
    inviteDialogView: boolean;
    setInviteDialogView: (open: boolean) => void;
    messageDialogView: boolean;
    setMessageDialogView: (open: boolean) => void;
    message: string;
    setMessage: (message: string) => void;
    actionDialogView: boolean;
    setActionDialogView: (open: boolean) => void;
    actionDialogOptions: ActionDialogOptions;
    setActionDialogOptions: (options: ActionDialogOptions) => void;
    setIsLoading: (isLoading: boolean) => void;
}

export type MemberStatusOptions = 'ACCEPTED' | 'INVITED' | 'SELF';

export interface Member {
    id: string;
    email: string;
    status: MemberStatusOptions;
    usage: number;
    isAdmin: boolean;
}

export interface ActionDialogOptions {
    msg: string | JSX.Element;
    defaultText: string;
    warningText?: string;
    onDefaultClick: () => void;
    onWarningClick?: () => void;
    title: string;
}

export const defaultActionDialogOptions: ActionDialogOptions = {
    msg: '',
    defaultText: '',
    warningText: '',
    onDefaultClick: () => {},
    onWarningClick: () => {},
    title: '',
};
