import { stuClass } from './studentGeneral.js';

export class stuDetailClass extends stuClass {
    #program;
    #courses;
    constructor(fname, lname, country, scores, program, courses) {
        super(fname, lname, country, scores);
        this.#program = program;
        this.#courses = courses;
    }
    displayAll() {
        // create unordered list
        const ul = document.createElement('ul');
        // create list item
        for (let i = 0; i < this.returnAll().length; i++) {
            const li = document.createElement('li');
            li.textContent = this.returnAll()[i];
            ul.appendChild(li);
        }
        //
        const ulDetail = document.createElement('ul');
        let liProgram = document.createElement('li');
        liProgram.textContent = this.#program;
        ulDetail.appendChild(liProgram);
        // create courses list
        for (let i = 0; i < this.#courses.length; i++) {
            const liCourse = document.createElement('li');
            liCourse.textContent = this.#courses[i];
            ulDetail.appendChild(liCourse);
        }
        ul.appendChild(ulDetail);
        return ul;
    }
}
