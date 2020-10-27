var sw = 0;
var db = [];

function add(){
    sw = 1;
    var save_btn = document.getElementById("save_btn");
    var name_box = document.getElementById("name");
    var part_box = document.getElementById("part");

    if(save_btn.disabled == true){
        save_btn.disabled = false;
        name_box.disabled = false;
        part_box.disabled = false;
    }
}

function edit(){
    sw = 2;
}

function save(){
    var name = document.getElementById("name").value;
    var part = document.getElementById("part").value;
    var grid = document.getElementById("grid_main");
    var grid_rowcnt = grid.rows.length;

    switch(sw){
        case 1:
            var grid_newrow = grid.insertRow(grid_rowcnt);
            var newnum = grid_newrow.insertCell(0);
            var newname = grid_newrow.insertCell(1);
            var newpart = grid_newrow.insertCell(2);
            newnum.innerHTML = grid_rowcnt;
            newname.innerHTML = name;
            newpart.innerHTML = part;
            db[db.length] = [grid_rowcnt, name, part];
            break;
        case 2:
            break;
        default:
            alert('수정하시려면 해당 행을 누르시고, 추가하려면 [추가]를 누르세요')
            break;
    }
}