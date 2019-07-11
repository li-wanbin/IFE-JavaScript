let sourceData = [{
    product: "手机",
    region: "华东",
    sale: [120, 100, 140, 160, 180, 185, 190, 210, 230, 245, 255, 270]
}, {
    product: "手机",
    region: "华北",
    sale: [80, 70, 90, 110, 130, 145, 150, 160, 170, 185, 190, 200]
}, {
    product: "手机",
    region: "华南",
    sale: [220, 200, 240, 250, 260, 270, 280, 295, 310, 335, 355, 380]
}, {
    product: "笔记本",
    region: "华东",
    sale: [50, 60, 80, 110, 30, 20, 70, 30, 420, 30, 20, 20]
}, {
    product: "笔记本",
    region: "华北",
    sale: [30, 35, 50, 70, 20, 15, 30, 50, 710, 130, 20, 20]
}, {
    product: "笔记本",
    region: "华南",
    sale: [80, 120, 130, 140, 70, 75, 120, 90, 550, 120, 110, 100]
}, {
    product: "智能音箱",
    region: "华东",
    sale: [10, 30, 4, 5, 6, 5, 4, 5, 6, 5, 5, 25]
}, {
    product: "智能音箱",
    region: "华北",
    sale: [15, 50, 15, 15, 12, 11, 11, 12, 12, 14, 12, 40]
}, {
    product: "智能音箱",
    region: "华南",
    sale: [10, 40, 10, 6, 5, 6, 8, 6, 6, 6, 7, 26]
}];

//测试
console.log(123);

//获取元素
var regionSelect = document.querySelector(".region-select");
var tableWrap = document.querySelector("#table-wrapper");


//页面加载完成显示内容
window.onload = function() {
        renderTable();
    }
    // region-select的change事件 = function() {
    //     渲染新的表格(根据select选项获取数据)
    // }
regionSelect.addEventListener("change", function() {
    getContentByData();
})

// function 根据select选项获取数据() {
//     dosomething
//     返回数据
// }
function getContentByData() {
    if (regionSelect.value == "华东") {
        renderTable();
    } else if (regionSelect.value == "华南") {
        renderTable();
    } else if (regionSelect.value == "华北") {
        renderTable();
    }
}

// function 渲染新的表格(data) {
//     输出表头：商品、地区、1月、2月、…… 12月
//     遍历数据 {
//         输出每一行的表格HTML内容
//     }
//     把生成的HTML内容赋给table-wrapper
// }

//渲染表格
function renderTable() {
    //输出表头
    tableWrap.innerHTML = "";
    var table = document.createElement("table");
    var tr = document.createElement("tr");
    var th = document.createElement("th");
    th.textContent = "商品";
    tr.appendChild(th);
    var th = document.createElement("th");
    th.textContent = "地区";
    tr.appendChild(th);
    for (var i = 0; i < 12; i++) {
        var th = document.createElement("th");
        th.textContent = i + 1 + "月";
        tr.appendChild(th);
    }
    table.appendChild(tr);
    table.border = "1";
    tableWrap.appendChild(table);


    for (let i = 0; i < sourceData.length; i++) {
        var twoTr = document.createElement("tr");
        if (sourceData[i].region == regionSelect.value) {
            var td = document.createElement("td");
            td.innerHTML = sourceData[i].product;
            twoTr.appendChild(td);
            var td = document.createElement("td");
            td.innerHTML = sourceData[i].region;
            twoTr.appendChild(td);
            for (let j = 0; j < sourceData[i].sale.length; j++) {
                var td = document.createElement("td");
                td.innerHTML = sourceData[i].sale[j];
                twoTr.appendChild(td);
            }
        }
        table.appendChild(twoTr);
    }
}