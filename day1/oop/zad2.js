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

phone = getPhone("123456789");
phone.home = "costakiego";




function getPhone(home) {
    function isPhoneNumberInvalid(home) {
        return home.match(/^[0-9]{9}$/) === null;
    }

    if (isPhoneNumberInvalid(home)) {
        throw new Error("Phone number must have 9 digits");
    }

    let currHome = home;
    const phone = {
        setHome: function (home) {
            if (isPhoneNumberInvalid(home)) {
                throw new Error("Phone number must have 9 digits");
            }
            currHome = home;
        },
        getHome() {
            return currHome;
        }
    };
    phone.setHome(currHome);

    return phone;
}

phone = getPhone("123456789");
phone.home = "costakiego";
console.log(phone.getHome());
debugger