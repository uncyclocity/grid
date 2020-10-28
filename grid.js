var sw = 0;
var db = [];
var tmp = -1;

function cell_reset(){
    var num = document.getElementById(tmp + "_1");
    var name = document.getElementById(tmp + "_2");
    var part = document.getElementById(tmp + "_3");
    num.style.backgroundColor = "#f0f8ff"
    name.style.backgroundColor = "#f0f8ff"
    part.style.backgroundColor = "#f0f8ff"
    tmp = -1;
}

function add(){
    sw = 1;

    var add_btn = document.getElementById("add_btn");
    var save_btn = document.getElementById("save_btn");
    var name_box = document.getElementById("name");
    var part_box = document.getElementById("part");

    add_btn.style.backgroundColor = "#71deff";

    cell_reset();

    if(save_btn.disabled == true){
        save_btn.disabled = false;
        name_box.disabled = false;
        part_box.disabled = false;
    }

    document.getElementById("name").value = "";
    document.getElementById("part").value = "";
}

function cell_focus(grid_rowcnt){
    sw = 2;
    document.getElementById("add_btn").style.backgroundColor = "#f0f8ff";

    if(tmp>=0){
        cell_reset();
    }


    var num = document.getElementById(grid_rowcnt + "_1");
    var name = document.getElementById(grid_rowcnt + "_2");
    var part = document.getElementById(grid_rowcnt + "_3");
    var output = document.getElementById("output_area");

    num.style.backgroundColor = "#71deff"
    name.style.backgroundColor = "#71deff"
    part.style.backgroundColor = "#71deff"

    tmp = grid_rowcnt;

    document.getElementById("name").value = db[grid_rowcnt-1][1];
    document.getElementById("part").value = db[grid_rowcnt-1][2];

    output.value = db[grid_rowcnt-1][1] + ", " + db[grid_rowcnt-1][2];
}

function save(){
    var name = document.getElementById("name").value;
    var part = document.getElementById("part").value;

    switch(sw){
        case 1:
            var grid = document.getElementById("grid_main");
            var grid_rowcnt = grid.rows.length;
            var grid_newrow = grid.insertRow(grid_rowcnt);
            var newNum = grid_newrow.insertCell(0);
            var newName = grid_newrow.insertCell(1);
            var newPart = grid_newrow.insertCell(2);

            newNum.innerHTML = "<input type='button' class='cell' id='"+ grid_rowcnt +"_1' value='" + grid_rowcnt + "' onclick='cell_focus("+ grid_rowcnt +")'>";
            newName.innerHTML = "<input type='button' class='cell' id='"+ grid_rowcnt +"_2' value='" + name + "' onclick='cell_focus("+ grid_rowcnt +")'>";
            newPart.innerHTML = "<input type='button' class='cell' id='"+ grid_rowcnt +"_3' value='" + part + "' onclick='cell_focus("+ grid_rowcnt +")'>";
            db[db.length] = [grid_rowcnt, name, part];
            alert('추가완료');
            document.getElementById("name").value = "";
            document.getElementById("part").value = "";
            break;
        case 2:
            document.getElementById(tmp + "_2").value = name;
            document.getElementById(tmp + "_3").value = part;
            db[tmp-1] = [tmp, name, part];
            alert('수정완료');
            break;
        default:
            alert('수정하시려면 해당 행을 누르시고, 추가하려면 [추가]를 누르세요')
            break;
    }
}