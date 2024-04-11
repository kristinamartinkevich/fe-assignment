export const calculatePercentage = (numerator: number, denominator: number): string => {
    return ((numerator / denominator) * 100).toFixed() + '%';
};