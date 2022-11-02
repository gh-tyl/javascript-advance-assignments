import { prodClass } from "./data/prodClass.js";

export const asyncLoadJson = async () => {
    const loadJson = new Promise((res, rej) => {
        const xmlReq = new XMLHttpRequest();
        xmlReq.onreadystatechange = () => {
            if (xmlReq.readyState === 4 && xmlReq.status === 200) {
                const data = JSON.parse(xmlReq.responseText);
                res(data);
            }
        };
        xmlReq.open('GET', './data/products.json', true);
        xmlReq.send();
    }
    );
    const data = await loadJson;

    let products = [];
    let createProducts = (obj, idx) => {
        products.push(new prodClass(obj.id, obj.item_name, obj.price));
    }
    data.forEach(createProducts);

    // cal max price
    let max = products[0].price;
    let calMax = (val, idx) => {
        if (val.price > max) {
            max = val.price;
        }
    };
    products.forEach(calMax);
    // cal min price
    let min = products[0].price;
    let minCal = (val, idx) => {
        if (val.price < min) {
            min = val.price;
        }
    };
    products.forEach((minCal));
    // cal avg price
    let sum = 0;
    let avg = 0;
    let calSum = (val, idx) => {
        sum += val.price;
    };
    products.forEach((calSum));
    avg = sum / products.length;

    tableCreater(data);
    data.forEach(tablePoper);
    tableFooter(max, min, avg);

};

const tableCreater = (objs) => {
    let header = Object.keys(objs[0]);
    let table = document.createElement('table');
    let theader = document.createElement('thead');
    let tr = document.createElement('tr');
    header.forEach((key) => {
        let th = document.createElement('th');
        th.innerHTML = key;
        tr.appendChild(th);
    });
    theader.appendChild(tr);
    table.appendChild(theader);
    document.body.appendChild(table);
    return table;
}

const tablePoper = (objs, idx) => {
    let table = document.getElementsByTagName('table')[0];
    let tbody = document.createElement('tbody');
    let tr = document.createElement('tr');
    Object.entries(objs).forEach((obj) => {
        let td = document.createElement('td');
        td.innerHTML = obj[1];
        tr.appendChild(td);
    });
    tbody.appendChild(tr);
    table.appendChild(tbody);
}

const tableFooter = (max, min, avg) => {
    let table = document.getElementsByTagName('table')[0];
    let tfooter = document.createElement('tfoot');
    let trMax = document.createElement('tr');
    let trMin = document.createElement('tr');
    let trAvg = document.createElement('tr');
    let tdMax = document.createElement('td');
    tdMax.setAttribute('colspan', '2');
    let tdMaxVal = document.createElement('td');
    tdMax.innerHTML = 'Max';
    tdMaxVal.innerHTML = max;
    trMax.appendChild(tdMax);
    trMax.appendChild(tdMaxVal);
    tfooter.appendChild(trMax);
    let tdMin = document.createElement('td');
    tdMin.setAttribute('colspan', '2');
    let tdMinVal = document.createElement('td');
    tdMin.innerHTML = 'Min';
    tdMinVal.innerHTML = min;
    trMin.appendChild(tdMin);
    trMin.appendChild(tdMinVal);
    tfooter.appendChild(trMin);
    let tdAvg = document.createElement('td');
    tdAvg.setAttribute('colspan', '2');
    let tdAvgVal = document.createElement('td');
    tdAvg.innerHTML = 'Avg';
    tdAvgVal.innerHTML = avg;
    trAvg.appendChild(tdAvg);
    trAvg.appendChild(tdAvgVal);
    tfooter.appendChild(trAvg);
    table.appendChild(tfooter);
}

asyncLoadJson();
