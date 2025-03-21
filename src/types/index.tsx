export interface AppContextType {
    isLargerDisplay: boolean;
    isUserAdmin: boolean;
    members: Member[];
    setMembers: (members: Member[]) => void;
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
    storageLimit?: number;
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

export const defaultAppContext: AppContextType = {
    isLargerDisplay: false,
    isUserAdmin: false,
    members: [],
    setMembers: () => {},
    familyManagerEmail: '',
    setFamilyManagerEmail: () => {},
    totalStorage: 0,
    setTotalStorage: () => {},
    authToken: '',
    setAuthToken: () => {},
    inviteDialogView: false,
    setInviteDialogView: () => {},
    messageDialogView: false,
    setMessageDialogView: () => {},
    message: '',
    setMessage: () => {},
    actionDialogView: false,
    setActionDialogView: () => {},
    actionDialogOptions: defaultActionDialogOptions,
    setActionDialogOptions: () => {},
    setIsLoading: () => {},
};
