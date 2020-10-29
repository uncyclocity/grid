var sw = 0;
var db = [];
var tmp = -1;

function cell_reset(){
    var num = document.getElementById(tmp + "_1");
    var name = document.getElementById(tmp + "_2");
    var part = document.getElementById(tmp + "_3");
    num.style.backgroundColor = "#ffffff"
    name.style.backgroundColor = "#ffffff"
    part.style.backgroundColor = "#ffffff"
    num.style.color = "#616161"
    name.style.color = "#616161"
    part.style.color = "#616161"
    tmp = -1;
}

function disabled(){
    var save_btn = document.getElementById("save_btn");
    var name_box = document.getElementById("name");
    var part_box = document.getElementById("part");
    var hint1 = document.getElementById("hint1");
    var hint2 = document.getElementById("hint2");
    //var text_box_color = document.getElementsByClassName("text_box").style.borderColor;
    var disabled_color = "#b1b1b1"

    save_btn.disabled = true;
    name_box.disabled = true;
    part_box.disabled = true;

    save_btn.style.borderColor = disabled_color;
    save_btn.style.color = disabled_color;
    hint1.style.color = disabled_color;
    hint2.style.color = disabled_color;
    
    text_box_color = disabled_color;

}

function abled(){
    var save_btn = document.getElementById("save_btn");
    var name_box = document.getElementById("name");
    var part_box = document.getElementById("part");
    var hint1 = document.getElementById("hint1");
    var hint2 = document.getElementById("hint2");
    //var text_box_color = document.getElementsByClassName("text_box").style.borderColor;
    var abled_color = "#00c2ab"

    save_btn.disabled = false;
    name_box.disabled = false;
    part_box.disabled = false;

    save_btn.style.borderColor = abled_color;
    save_btn.style.color = abled_color;
    hint1.style.color = abled_color;
    hint2.style.color = abled_color;
    text_box_color = abled_color;
}

function isEmpty(name, part){
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

function add(){
    if(sw!=1){
        sw = 1;

        var add_btn = document.getElementById("add_btn");

        add_btn.style.backgroundColor = "#00c2ab";

        document.getElementById("add_btn").style.color = " #e9fffc";

        if(tmp != -1)
            cell_reset();

        abled();

        document.getElementById("name").value = "";
        document.getElementById("part").value = "";
    }
    else{
        sw = 0;

        document.getElementById("add_btn").style.backgroundColor = "#e9fffc";
        document.getElementById("add_btn").style.color = "#00c2ab";

        disabled();

        document.getElementById("name").value = "";
        document.getElementById("part").value = "";
    }
}

function cell_focus(grid_rowcnt){
    if(sw!=2){
        sw = 2;

        document.getElementById("add_btn").style.backgroundColor = "#e9fffc";
        document.getElementById("add_btn").style.color="#00c2ab"

        abled();

        if(tmp != -1){
            cell_reset();
        }

        var num = document.getElementById(grid_rowcnt + "_1");
        var name = document.getElementById(grid_rowcnt + "_2");
        var part = document.getElementById(grid_rowcnt + "_3");
        var output = document.getElementById("output_area");

        num.style.backgroundColor = "#00c2ab"
        name.style.backgroundColor = "#00c2ab"
        part.style.backgroundColor = "#00c2ab"
        num.style.color = "#ffffff"
        name.style.color = "#ffffff"
        part.style.color = "#ffffff"

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

        num.style.backgroundColor = "#00c2ab"
        name.style.backgroundColor = "#00c2ab"
        part.style.backgroundColor = "#00c2ab"
        num.style.color = "#ffffff"
        name.style.color = "#ffffff"
        part.style.color = "#ffffff"

        tmp = grid_rowcnt;

        document.getElementById("name").value = db[grid_rowcnt-1][1];
        document.getElementById("part").value = db[grid_rowcnt-1][2];

        output.value = db[grid_rowcnt-1][1] + ", " + db[grid_rowcnt-1][2];
    }
    else{
        console.log(grid_rowcnt, tmp);

        cell_reset();

        sw = 0;

        disabled();

        document.getElementById("name").value = "";
        document.getElementById("part").value = "";
    }
    
}

function save(){
    var name = document.getElementById("name").value;
    var part = document.getElementById("part").value;

    switch(sw){
        case 1:
            if(isEmpty(name, part)){
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
                document.getElementById("name").value = "";
                document.getElementById("part").value = "";
            }
            break;
        case 2:
            if(isEmpty(name, part)){
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