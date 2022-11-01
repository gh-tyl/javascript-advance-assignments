import { stuDetailClass } from "./data/studentChild.js";
// crealte ul element
const ul = document.createElement('ul');

let students = []
const student1 = new stuDetailClass('John', 'Doe', 'USA', [90, 80, 70], 'MBA', ['Math', 'English', 'Science']);
students.push(student1);
const student2 = new stuDetailClass('Jane', 'Doe', 'USA', [90, 80, 70], 'MBA', ['Math', 'English', 'Science']);
students.push(student2);
const student3 = new stuDetailClass('John', 'Doe', 'USA', [90, 80, 70], 'MBA', ['Math', 'English', 'Science']);
students.push(student3);
const student4 = new stuDetailClass('John', 'Doe', 'USA', [90, 80, 70], 'MBA', ['Math', 'English', 'Science']);
students.push(student4);
const student5 = new stuDetailClass('John', 'Doe', 'USA', [90, 80, 70], 'MBA', ['Math', 'English', 'Science']);
students.push(student5);

for (let i = 0; i < students.length; i++) {
    ul.appendChild(students[i].displayAll());
}

document.body.appendChild(ul);
