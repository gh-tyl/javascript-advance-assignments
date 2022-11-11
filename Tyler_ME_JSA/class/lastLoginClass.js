class lastLoginClass {
    constructor(userid, fName, lName, lastLogin) {
        this.userid = userid;
        this.fullname = fName + ' ' + lName;
        this.lastLogin = lastLogin;
    }

    toObject() {
        return {
            userid: this.userid,
            fullname: this.fullname,
            lastLogin: this.lastLogin
        }
    }
}

export default lastLoginClass;
