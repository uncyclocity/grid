var sw = 0;
var db = [];
var tmp = -1;
var greenblue = "#00c2ab";
var bright_greenblue = "#e9fffc";
var white = "#ffffff";

window.onload = function(){
    for(i = 0; i < $(".cell").length ; i = i+3){
        var row = $(".cell").eq(i).html();

        $(".cell").eq(i).attr("id", row + "_1");
        $(".cell").eq(i+1).attr("id", row + "_2");
        $(".cell").eq(i+2).attr("id", row + "_3");

        $(".cell").eq(i).attr("onclick", "cell_focus(" + row + ")");
        $(".cell").eq(i+1).attr("onclick", "cell_focus(" + row + ")");
        $(".cell").eq(i+2).attr("onclick", "cell_focus(" + row + ")");

        db[db.length] = [row, $(".cell").eq(i+1).html(), $(".cell").eq(i+2).html()];
    }
}

function cell_reset(){
    var num = $("#" + tmp + "_1");
    var name = $("#" + tmp + "_2");
    var part = $("#" + tmp + "_3");
    var grid_charColor = "#616161";

    num.css("backgroundColor", white);
    name.css("backgroundColor", white);
    part.css("backgroundColor", white);
    num.css("color", grid_charColor);
    name.css("color", grid_charColor);
    part.css("color", grid_charColor);
    $("#output_area").val("");

    tmp = -1;
}

function disabled(){
    var save_btn = $("#save_btn");
    var name_box = $("#name");
    var part_box = $("#part");
    var hint1 = $("#hint1");
    var hint2 = $("#hint2");
    var disabled_color = "#b1b1b1"

    save_btn.attr("disabled", true);
    name_box.attr("disabled", true);
    part_box.attr("disabled", true);

    save_btn.css("borderColor", disabled_color);
    save_btn.css("color", disabled_color);
    hint1.css("color", disabled_color);
    hint2.css("color", disabled_color);

}

function abled(){
    var save_btn = $("#save_btn");
    var name_box = $("#name");
    var part_box = $("#part");
    var hint1 = $("#hint1");
    var hint2 = $("#hint2");
    var abled_color = greenblue;

    save_btn.attr("disabled", false);
    name_box.attr("disabled", false);
    part_box.attr("disabled", false);

    save_btn.css("borderColor" , abled_color);
    save_btn.css("color", abled_color);
    hint1.css("color", abled_color);
    hint2.css("color", abled_color);
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
    $("#name").val("");
    $("#part").val("");
}

function add(){
    var add_btn = $("#add_btn");

    if(sw!=1){
        sw = 1;      

        add_btn.css("backgroundColor", greenblue);
        add_btn.css("color", bright_greenblue);

        if(tmp != -1)
            cell_reset();

        abled();

        clear();
    }
    else{
        sw = 0;

        add_btn.css("backgroundColor", bright_greenblue);
        add_btn.css("color", greenblue);

        disabled();

        clear();
    }
}

function view(){
    if(confirm("마지막으로 저장을 한 이후의 변경사항이 있을 경우 초기화됩니다.\n계속하시겠습니까?"))
        location.href= window.location.href;
}

function send(){
    var grid_contents = "";

    for(var i = 0; i < db.length; i++){
        for(var j = 0; j < 3; j++){
            grid_contents += "<input type='hidden' name='db_" + i + "_" + j + "' value='" + db[i][j] + "'> ";
        }
    }
    grid_contents += "<input type='hidden' name='db_length' value='" + db.length + "'>";
    document.write("<form action='/delete' id='post' method='post'> " + grid_contents + "</form>");

    document.getElementById("post").submit();
}

function cell_focus(grid_rowcnt){
    if(sw!=2){
        var add_btn = $("#add_btn");

        if(sw == 1){
            add_btn.css("backgroundColor", bright_greenblue);
            add_btn.css("color", greenblue);
        }

        sw = 2;

        abled();

        var num = $("#" + grid_rowcnt + "_1");
        var name = $("#" + grid_rowcnt + "_2");
        var part = $("#" + grid_rowcnt + "_3");
        var output = $("#output_area");

        num.css("backgroundColor", greenblue);
        name.css("backgroundColor", greenblue);
        part.css("backgroundColor", greenblue);
        num.css("color", white);
        name.css("color", white);
        part.css("color", white);

        tmp = grid_rowcnt;

        $("#name").val(db[grid_rowcnt-1][1]);
        $("#part").val(db[grid_rowcnt-1][2]);

        output.val(db[grid_rowcnt-1][1] + ", " + db[grid_rowcnt-1][2]);

    }else if(grid_rowcnt != tmp){

        cell_reset();

        var num = $("#" + grid_rowcnt + "_1");
        var name = $("#" + grid_rowcnt + "_2");
        var part = $("#" + grid_rowcnt + "_3");
        var output = $("#output_area");

        num.css("backgroundColor", greenblue);
        name.css("backgroundColor", greenblue);
        part.css("backgroundColor", greenblue);
        num.css("color", white);
        name.css("color", white);
        part.css("color", white);

        tmp = grid_rowcnt;

        $("#name").val(db[grid_rowcnt-1][1]);
        $("#part").val(db[grid_rowcnt-1][2]);

        output.val(db[grid_rowcnt-1][1] + ", " + db[grid_rowcnt-1][2]);
    }
    else{
        
        cell_reset();

        sw = 0;

        disabled();

        clear();
    }
    
}

function save(){
    var name = $("#name").val();
    var part = $("#part").val();

    switch(sw){
        case 1:
            if(isNotEmpty(name, part)){
                var grid = $("#grid_main");
                var grid_rowcnt = $("#grid_main tr").length;
                var html = "";
                html += "<tr>";
                html += "<td><center><div class='cell' id='"+ grid_rowcnt +"_1' onclick='cell_focus("+ grid_rowcnt +")'>" + grid_rowcnt + "</div></center></td>";
                html += "<td><center><div class='cell' id='"+ grid_rowcnt +"_2' onclick='cell_focus("+ grid_rowcnt +")'>" + name + "</div></center></td>";
                html += "<td><center><div class='cell' id='"+ grid_rowcnt +"_3' onclick='cell_focus("+ grid_rowcnt +")'>" + part + "</div></center></td>";
                html += "</tr>"
                grid.append(html);
                db[db.length] = [grid_rowcnt, name, part];

                alert('추가완료');

                clear();
            }
            break;
        case 2:
            if(isNotEmpty(name, part)){
                $("#" + tmp + "_2").html(name);
                $("#" + tmp + "_3").html(part);
                db[tmp-1] = [tmp, name, part];
                $("#output_area").val(name + ", " + part);

                alert('수정완료');
            }
            break;
        default:
            alert('수정하시려면 해당 행을 누르시고, 추가하려면 [추가]를 누르세요')
            break;
    }
}