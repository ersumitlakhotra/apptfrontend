export function setCellFormat (cellValue)  {
    let phoneNumber = cellValue.replace(/[^0-9]/g, ''); // Remove non-numeric characters
    if (phoneNumber.length > 3) {
        phoneNumber = phoneNumber.substring(0, 3) + '-' + phoneNumber.substring(3);
    }
    if (phoneNumber.length > 7) {
        phoneNumber = phoneNumber.substring(0, 7) + '-' + phoneNumber.substring(7);
    }
    if (phoneNumber.length < 13)
        return phoneNumber;
    else
        return phoneNumber.substring(0, 12);
}

export function setPriceNumberOnly(inputValue) {
        const regex = /^\d*(\.\d*)?$/;

        if (regex.test(inputValue) || inputValue === '') {
            return  inputValue;
        }
    };