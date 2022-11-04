class userClass {
    #firstName;
    #lastName;
    #email;
    #telephone;
    #address;
    #dob;
    #ed;
    #departmentId;
    #positionId;
    #depName;
    #depPhone;
    #poName;
    constructor(firstName, lastName, email, telephone, address, dob, ed, did, pid) {
        this.#firstName = firstName;
        this.#lastName = lastName;
        this.#email = email;
        this.#telephone = telephone;
        this.#address = address;
        this.#dob = dob;
        this.#ed = ed;
        this.#departmentId = did;
        this.#positionId = pid;
    }
    get email() {
        return this.#email;
    }
    #searchId(obj, id, proName) {
        if (obj[proName] == id) {
            return obj;
        }
        return false;
    }
    fillPosition() {
        fetch('./data/positions.json').then(
            (response) => {
                response.json().then(
                    (jsonData) => {
                        jsonData.forEach((obj) => {
                            let pObj = this.#searchId(obj, this.#positionId, 'pid');
                            if (pObj) {
                                this.#poName = pObj['p_name'];
                                return false;
                            }
                        })
                    }
                )
            }
        )
    }
    fillDepartment() {
        fetch('./data/departments.json').then(
            (response) => {
                response.json().then(
                    (jsonData) => {
                        jsonData.forEach((obj) => {
                            let dObj = this.#searchId(obj, this.#departmentId, 'did');
                            if (dObj) {
                                this.#depName = dObj['d_name'];
                                this.#depPhone = dObj['p_phone'];
                                return false;
                            }
                        })
                    }
                )
            }
        )
    }
    // table poper
    tablePop() {
        // init the table
        let table = document.querySelector('table');
        let tbody = document.createElement('tbody');
        let tr = document.createElement('tr');
        let td = document.createElement('td');
        td.innerHTML = this.#firstName;
        tr.appendChild(td);
        td = document.createElement('td');
        td.innerHTML = this.#lastName;
        tr.appendChild(td);
        td = document.createElement('td');
        td.innerHTML = this.#email;
        tr.appendChild(td);
        td = document.createElement('td');
        td.innerHTML = this.#telephone;
        tr.appendChild(td);
        td = document.createElement('td');
        td.innerHTML = this.#address;
        tr.appendChild(td);
        td = document.createElement('td');
        td.innerHTML = this.#dob;
        tr.appendChild(td);
        td = document.createElement('td');
        td.innerHTML = this.#ed;
        tr.appendChild(td);
        td = document.createElement('td');
        td.innerHTML = this.#depName;
        tr.appendChild(td);
        td = document.createElement('td');
        td.innerHTML = this.#depPhone;
        tr.appendChild(td);
        td = document.createElement('td');
        td.innerHTML = this.#poName;
        tr.appendChild(td);
        tbody.appendChild(tr);
        table.appendChild(tbody);
    }
}
export default userClass;
