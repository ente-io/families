import { logError } from '../sentry';

export enum LS_KEYS {
    AnonymizeUserID = 'anonymizedUserID',
}

export const setData = (key: LS_KEYS, value: object) => {
    if (typeof localStorage === 'undefined') {
        return null;
    }
    localStorage.setItem(key, JSON.stringify(value));
};

export const removeData = (key: LS_KEYS) => {
    if (typeof localStorage === 'undefined') {
        return null;
    }
    localStorage.removeItem(key);
};

export const getData = (key: LS_KEYS) => {
    try {
        if (
            typeof localStorage === 'undefined' ||
            typeof key === 'undefined' ||
            typeof localStorage.getItem(key) === 'undefined'
        ) {
            return null;
        }
        const data = localStorage.getItem(key);
        return data && JSON.parse(data);
    } catch (e) {
        logError(e, 'Failed to Parse JSON for key ' + key);
    }
};

export const clearData = () => {
    if (typeof localStorage === 'undefined') {
        return null;
    }
    localStorage.clear();
};
