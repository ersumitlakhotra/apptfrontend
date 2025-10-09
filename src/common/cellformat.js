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

export function isValidEmail (email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
};

export function getPermission(role) {
    if (role === 'Employee') {
        return [{
            dashboard: false,
            tasks: false,
            order: false,
            event: false,
            payment: false,
            services: false,
            users: false,
            sales: false,
            setting: false,
        }]
    } if (role === 'Administrator') {
        return [{
            dashboard: true,
            tasks: true,
            order: true,
            event: true,
            payment: true,
            services: true,
            users: true,
            sales: true,
            setting: true,
        }]
    }  
}