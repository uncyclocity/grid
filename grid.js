var sw = 0;
var db = [];
var tmp = -1;
var greenblue = "#00c2ab";
var bright_greenblue = "#e9fffc";
var white = "#ffffff";

function cell_reset(){
    var num = document.getElementById(tmp + "_1");
    var name = document.getElementById(tmp + "_2");
    var part = document.getElementById(tmp + "_3");
    var grid_charColor = "#616161";

    num.style.backgroundColor = white;
    name.style.backgroundColor = white;
    part.style.backgroundColor = white;
    num.style.color = grid_charColor;
    name.style.color = grid_charColor;
    part.style.color = grid_charColor;
    document.getElementById("output_area").value = "";

    tmp = -1;
}

function disabled(){
    var save_btn = document.getElementById("save_btn");
    var name_box = document.getElementById("name");
    var part_box = document.getElementById("part");
    var hint1 = document.getElementById("hint1");
    var hint2 = document.getElementById("hint2");
    var disabled_color = "#b1b1b1"

    save_btn.disabled = true;
    name_box.disabled = true;
    part_box.disabled = true;

    save_btn.style.borderColor = disabled_color;
    save_btn.style.color = disabled_color;
    hint1.style.color = disabled_color;
    hint2.style.color = disabled_color;

}

function abled(){
    var save_btn = document.getElementById("save_btn");
    var name_box = document.getElementById("name");
    var part_box = document.getElementById("part");
    var hint1 = document.getElementById("hint1");
    var hint2 = document.getElementById("hint2");
    var abled_color = greenblue;

    save_btn.disabled = false;
    name_box.disabled = false;
    part_box.disabled = false;

    save_btn.style.borderColor = abled_color;
    save_btn.style.color = abled_color;
    hint1.style.color = abled_color;
    hint2.style.color = abled_color;
}

function isNotEmpty(name, part){
    if(name==""){
        alert('이름을 입력하세요');
        return false;
    }
    else if(part==""){
        alert('부서를 입력하세요');
        return false;
    }
    else
        return true;
}

function clear(){
    document.getElementById("name").value = "";
    document.getElementById("part").value = "";
}

function add(){
    var add_btn = document.getElementById("add_btn");

    if(sw!=1){
        sw = 1;      

        add_btn.style.backgroundColor = greenblue;
        add_btn.style.color = bright_greenblue;

        if(tmp != -1)
            cell_reset();

        abled();

        clear();
    }
    else{
        sw = 0;

        add_btn.style.backgroundColor = bright_greenblue;
        add_btn.style.color = greenblue;

        disabled();

        clear();
    }
}

function cell_focus(grid_rowcnt){
    if(sw!=2){
        var add_btn = document.getElementById("add_btn");

        if(sw == 1){
            add_btn.style.backgroundColor = bright_greenblue;
            add_btn.style.color = greenblue;
        }

        sw = 2;

        abled();

        var num = document.getElementById(grid_rowcnt + "_1");
        var name = document.getElementById(grid_rowcnt + "_2");
        var part = document.getElementById(grid_rowcnt + "_3");
        var output = document.getElementById("output_area");

        num.style.backgroundColor = greenblue;
        name.style.backgroundColor = greenblue;
        part.style.backgroundColor = greenblue;
        num.style.color = white;
        name.style.color = white;
        part.style.color = white;

        tmp = grid_rowcnt;

        document.getElementById("name").value = db[grid_rowcnt-1][1];
        document.getElementById("part").value = db[grid_rowcnt-1][2];

        output.value = db[grid_rowcnt-1][1] + ", " + db[grid_rowcnt-1][2];

    }else if(grid_rowcnt != tmp){

        cell_reset();

        var num = document.getElementById(grid_rowcnt + "_1");
        var name = document.getElementById(grid_rowcnt + "_2");
        var part = document.getElementById(grid_rowcnt + "_3");
        var output = document.getElementById("output_area");

        num.style.backgroundColor = greenblue;
        name.style.backgroundColor = greenblue;
        part.style.backgroundColor = greenblue;
        num.style.color = white;
        name.style.color = white;
        part.style.color = white;

        tmp = grid_rowcnt;

        document.getElementById("name").value = db[grid_rowcnt-1][1];
        document.getElementById("part").value = db[grid_rowcnt-1][2];

        output.value = db[grid_rowcnt-1][1] + ", " + db[grid_rowcnt-1][2];
    }
    else{
        
        cell_reset();

        sw = 0;

        disabled();

        clear();
    }
    
}

function save(){
    var name = document.getElementById("name").value;
    var part = document.getElementById("part").value;

    switch(sw){
        case 1:
            if(isNotEmpty(name, part)){
                var grid = document.getElementById("grid_main");
                var grid_rowcnt = grid.rows.length;
                var grid_newrow = grid.insertRow(grid_rowcnt);
                var newNum = grid_newrow.insertCell(0);
                var newName = grid_newrow.insertCell(1);
                var newPart = grid_newrow.insertCell(2);
    
                newNum.innerHTML = "<center><div class='cell' id='"+ grid_rowcnt +"_1' onclick='cell_focus("+ grid_rowcnt +")'>" + grid_rowcnt + "</div></center>";
                newName.innerHTML = "<center><div class='cell' id='"+ grid_rowcnt +"_2' onclick='cell_focus("+ grid_rowcnt +")'>" + name + "</div></center>";
                newPart.innerHTML = "<center><div class='cell' id='"+ grid_rowcnt +"_3' onclick='cell_focus("+ grid_rowcnt +")'>" + part + "</div></center>";
                db[db.length] = [grid_rowcnt, name, part];
                alert('추가완료');

                clear();
            }
            break;
        case 2:
            if(isNotEmpty(name, part)){
                document.getElementById(tmp + "_2").innerText = name;
                document.getElementById(tmp + "_3").innerText = part;
                db[tmp-1] = [tmp, name, part];
                alert('수정완료');
            }
            break;
        default:
            alert('수정하시려면 해당 행을 누르시고, 추가하려면 [추가]를 누르세요')
            break;
    }
}