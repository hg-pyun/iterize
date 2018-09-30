export const removedNotDigits = (numberContainsNotDigits: string): string => {
    return numberContainsNotDigits.replace(/[^\d]/g, '');
};