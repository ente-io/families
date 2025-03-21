import { Member } from '../../types';

export function convertBytesToHumanReadable(
    bytes: number,
    precision = 2
): string {
    if (bytes === 0) {
        return '0 MB';
    }
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

    return (bytes / Math.pow(1024, i)).toFixed(precision) + ' ' + sizes[i];
}

export function convertBytesToGBs(bytes: number): string {
    return (bytes / (1024 * 1024 * 1024)).toFixed(0);
}

export function convertGBsToBytes(gbs: number): number {
    return gbs * (1024 ** 3);
}

export function runningInBrowser() {
    return typeof window !== 'undefined';
}

export function sortMembersByUsageDesc(members: Member[]): Member[] {
    const sortedMembers = [...members].sort((a, b) => b.usage - a.usage);
    return sortedMembers;
}
