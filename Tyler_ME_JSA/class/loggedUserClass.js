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

    toObject() {
        return {
            userid: this.#userid,
            fName: this.#fName,
            lName: this.#lName,
            email: this.#email,
            phone: this.#phone,
            username: this.#username,
            pass: this.#pass,
            role: this.#role
        }
    }
}

export default loggedUserClass;
