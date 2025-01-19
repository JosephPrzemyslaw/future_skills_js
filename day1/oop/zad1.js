function getPhone(home) {
    function isPhoneNumberInvalid(home) {
        return home.match(/^[0-9]{9}$/) === null;
    }

    if (isPhoneNumberInvalid(home)) {
        throw new Error("Phone number must have 9 digits");
    }

    const phone = {
        setHome: function (home) {
            if (isPhoneNumberInvalid(home)) {
                throw new Error("Phone number must have 9 digits");
            }
            this.home = home;
        },
    };
    phone.setHome(home);

    return phone;
}

phone2 = getPhone("123456789"); // OK
phone2.setHome("CostTam");
