class loggedUserClass {
    #userid;
    #fName;
    #lName;
    #email;
    #phone;
    #username;
    #pass;
    #role;
    constructor(userid, fName, lName, email, phone, username, pass, role) {
        this.#userid = userid;
        this.#fName = fName;
        this.#lName = lName;
        this.#email = email;
        this.#phone = phone;
        this.#username = username;
        this.#pass = pass;
        this.#role = role;
    }

    setLoggedUser(user) {
        this.loggedUser = user;
    }

    getLoggedUser() {
        return this.loggedUser;
    }
}

export default loggedUserClass;
