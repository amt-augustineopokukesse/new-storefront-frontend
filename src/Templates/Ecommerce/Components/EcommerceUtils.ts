export const referenceGenerator = (id: string) => {
    const firstTwoDigits = id.substring(0, 4);
    const lastFourDigits = id.substring(id.length - 4);
    const combinedDigits = firstTwoDigits + lastFourDigits;
  
    return combinedDigits || '';
}