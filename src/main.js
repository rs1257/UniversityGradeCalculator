//globals
var rowcount = 2;

window.setInterval(function(){
    gettotal();
    totalcredits();
    truepercentage();
    truetotal();
    overalltotal();
    grade();
}, 1000);

window.setInterval(function(){
    validation();
}, 500);

//table manipulation
function removeRowFromTable(){
    var tbl = document.getElementById('tbl');
    var lastRow = tbl.rows.length-2;
    if (lastRow > 1) tbl.deleteRow(lastRow);
    if (rowcount > 2){
        rowcount -=1;
    }
    else {
        alert("There is a minimum of 1 module");
    }
} 

function addRow(){
    if (rowcount < 11){
    var x=document.getElementById("tbl").tBodies[0];  //get the table
    var node=x.rows[rowcount-1].cloneNode(true);    //clone the previous node or row
    x.insertBefore(node, x.children[rowcount]);
    rowcount +=1;
    }
    else {
        alert("There is a maximum of 10 modules");
    }
}

//calculations
function gettotal(){
    for (var i = 1; i < rowcount; i++){
        var x = document.getElementById("tbl").rows[i].cells;
        var total = ((+x[2].innerHTML * +x[3].innerHTML) + 
                (+x[4].innerHTML * +x[5].innerHTML) + 
                (+x[6].innerHTML * +x[7].innerHTML))* 0.01;
        x[8].innerHTML = total.toFixed(2);
    }
 }
 
function totalcredits(){
    var tcredits = 0;
    for (var i = 1; i < rowcount; i++){
        var x = document.getElementById("tbl").rows[i].cells;
        tcredits += +x[1].innerHTML;
    }
    var y = document.getElementById("tbl").rows[rowcount].cells;
    y[1].innerHTML = tcredits;
 }
 
function truepercentage(){
        var y = document.getElementById("tbl").rows[rowcount].cells;
        for (var i = 1; i < rowcount; i++){
            var x = document.getElementById("tbl").rows[i].cells;
            var truepercentage = (100 / y[3].innerHTML) * x[1].innerHTML;
            x[9].innerHTML = truepercentage.toFixed(2);
    }
}

function truetotal(){ 
    for (var i = 1; i < rowcount; i++){
            var x = document.getElementById("tbl").rows[i].cells;
            var truetotal = x[8].innerHTML * (x[9].innerHTML / 100);
            x[10].innerHTML = truetotal.toFixed(2);
    }
}

function overalltotal(){
    var overall = 0;
    for (var i = 1; i < rowcount; i++){
        var x = document.getElementById("tbl").rows[i].cells;
        overall += +x[10].innerHTML;
    }
    var y = document.getElementById("tbl").rows[rowcount].cells;
    y[5].innerHTML = overall.toFixed(2);
}

function grade(){ //todo
    var y = document.getElementById("tbl").rows[rowcount].cells;
    var grade = y[5].innerHTML;
    if (grade < 40){y[7].innerHTML = "Fail";} 
    else if (grade < 50){y[7].innerHTML = "3";}
    else if (grade < 60){y[7].innerHTML = "2/2";}
    else if (grade < 70){y[7].innerHTML = "2/1";}
    else if (grade >= 70){y[7].innerHTML = "1";}
    else{y[7].innerHTML = "ERROR";}
}

function validation(){ //do i need to add length checks too
    for (var i = 1; i < rowcount; i++){
        var x = document.getElementById("tbl").rows[i].cells;

        //IsNaN checks
        if (isNaN(x[1].innerHTML)){
            alert("Credits must be a number");
            x[1].innerHTML = 0;
        }
        if (isNaN(x[2].innerHTML)){
            alert("Percentage 1 must be a number");
            x[2].innerHTML = 0;
        }
        if (isNaN(x[3].innerHTML)){
            alert("Grade 1 must be a number");
            x[3].innerHTML = 0;
        }
        if (isNaN(x[4].innerHTML)){
            alert("Percentage 2 must be a number");
            x[4].innerHTML = 0;
        }
        if (isNaN(x[5].innerHTML)){
            alert("Grade 2 must be a number");
            x[5].innerHTML = 0;
        }
        if (isNaN(x[6].innerHTML)){
            alert("Percentage 3 must be a number");
            x[6].innerHTML = 0;
        }
        if (isNaN(x[7].innerHTML)){
            alert("Grade 3 must be a number");
            x[7].innerHTML = 0;
        }

        //Bounds checks
        if (x[1].innerHTML < 0 || x[1].innerHTML > 120){
            alert("Credits must be between 0 and 120");
            x[1].innerHTML = 5;
        }
        if (x[2].innerHTML < 0 || x[2].innerHTML > 100){
            alert("Percentage 1 must be between 0 and 100");
            x[2].innerHTML = 0;
        }
        if (x[3].innerHTML < 0 || x[3].innerHTML > 100){
            alert("Grade 1 must be between 0 and 100");
            x[3].innerHTML = 0;
        }
        if (x[4].innerHTML < 0 || x[4].innerHTML > 100){
            alert("Percentage 2 must be between 0 and 100");
            x[4].innerHTML = 0;
        }
        if (x[5].innerHTML < 0 || x[5].innerHTML > 100){
            alert("Grade 2 must be between 0 and 100");
            x[5].innerHTML = 0;
        }
        if (x[6].innerHTML < 0 || x[6].innerHTML > 100){
            alert("Percentage 3 must be between 0 and 100");
            x[6].innerHTML = 0;
        }
        if (x[7].innerHTML < 0 || x[7].innerHTML > 100){
            alert("Grade 3 must be between 0 and 100");
            x[7].innerHTML = 0;
        }

        //if % > 100
        if ((+x[2].innerHTML + +x[4].innerHTML + +x[6].innerHTML) > 100){
            alert("Percentage can't be > 100%");
            x[2].innerHTML = 0;
            x[4].innerHTML = 0;
            x[6].innerHTML = 0;
        }
    }
}