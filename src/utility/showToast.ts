import { toast } from 'react-toastify';

const displayedToastIds: Set<string> = new Set();

export const showToast = (message: string, id: string) => {
    if (!displayedToastIds.has(id)) {
        displayedToastIds.add(id);
        toast.error(message, {
            onClose: () => {
                displayedToastIds.delete(id);
            },
        });
    }
};
