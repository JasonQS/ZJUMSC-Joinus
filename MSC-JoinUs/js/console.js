var json = {
    area: "",
    subGroup: "",
    sex: "",
    studentID: "",
    time: [],
    time1: [],
    time2: [],
    time3: [],
    major: "",
    phone: "",
    name: "",
    comment: "",
    id: "",
    email: "",
    group: ""
};
var id = 0;

(function () {
    $('#modal').modal('show');

    $('#form-verify').submit(function () {
        $.ajax({
            type: 'POST',
            url: "/j/data",
            data: $('#form-verify').serialize(),
            success: function (data) {
                json = data;
                loadTable(data);
                $('#modal').modal('hide');
                $('#table-info').show();
            },
            error: function (data) {
                if (data.status === 403)
                    $('#reason').text("密码错误");
            }
        });
        return false;
    });

    $('#switch-to-table-info').click(function () {
        $('#table-info').show();
        $('#table-time').hide();
    });

    $('#switch-to-table-time').click(function () {
        $('#table-time').show();
        $('#table-info').hide();
    })

})();

function loadTable(data) {

    for (var i in data) {
        if (data[i].name.match(/(?:钱盛|胡图图|刘海峰|于振云|王宇晗)/))
            continue;
        loadRowInfo(data[i], $('#table-body-info'));
        loadRowTime(data[i], $('#table-body-time'));
    }

}

function loadRowInfo(data, table) {
    id++;
    data = format(data);
    table.append("<tr>");

    table.append("<th scope=\"row\">" + id + "</th>");
    table.append("<td>" + data.name + "</td>");
    table.append("<td>" + data.studentID + "</td>");
    drawCol(true, table, data.group);
    drawCol(true, table, data.subGroup);
    table.append("<td>" + data.sex + "</td>");
    table.append("<td>" + data.area + "</td>");
    table.append("<td>" + data.major + "</td>");
    table.append("<td>" + data.email + "</td>");
    table.append("<td>" + data.phone + "</td>");

    table.append('<td><a class="btn btn-sm border-primary" data-toggle="modal" data-target="#modal' + data.id + '">简介</a></td>');

    table.append("</tr>");

    $('body').append('<div class="modal fade" id="modal' + data.id + '" tabindex="-1" role="dialog" aria-hidden="true"><div class="modal-dialog" role="document"> <div class="modal-content"> <div class="modal-header"> <h5 class="modal-title" id="exampleModalLabel">' + data.name + '</h5> <button type="button" class="close" data-dismiss="modal" aria-label="Close"> <span aria-hidden="true">&times;</span> </button> </div> <div class="modal-body">' + data.comment + '</div> </div> </div> </div>')
}

function format(data) {
    data.sex = data.sex.replace(/female/, "女");
    data.sex = data.sex.replace(/male/, "男");

    data.area = data.area.replace(/zjg/, "紫金港");
    data.area = data.area.replace(/yq/, "玉泉");
    data.area = data.area.replace(/xx/, "西溪");
    data.area = data.area.replace(/hjc/, "华家池");

    data.major = data.major.replace(/计算机科学与技术/, "计科");

    return data;
}


function loadRowTime(data, table) {
    table.append("<tr>");

    table.append('<td data-toggle="modal" data-target="#modal' + data.id + '">' + data.name + '</td>');
    drawCol(true, table, data.group);
    drawCol(true, table, data.subGroup);
    table.append("<td>" + data.sex + "</td>");


    $('.table-time1').each(function () {
        var times = data.time1.split(',');
        drawCol(timeContains(times, $(this).html()), table);

    });

    $('.table-time2').each(function () {
        var times = data.time2.split(',');
        drawCol(timeContains(times, $(this).html()), table);

    });

    $('.table-time3').each(function () {
        var times = data.time3.split(',');
        drawCol(timeContains(times, $(this).html()), table);

    });

    table.append("</tr>");
}

function timeContains(times, tableTime) {
    for (var i in times) {
        var time = times[i].match(/\d\d:\d\d/g);
        var start = time[0];
        var end = time[1];
        if (start === "13:00" && end === "17:00" || start === "19:00" && end === "22:00")
            return true;
        if (tableTime === start)
            return true;
    }
    return false;
}

function drawCol(isColored, table, data) {
    if (data === undefined)
        if (isColored)
            table.append("<td class='table-success'></td>");
        else
            table.append("<td></td>");

    switch (data) {
        case 'tg':
            table.append("<td class='table-danger'>" + data + "</td>");
            break;
        case 'cg':
            table.append("<td class='table-success'>" + data + "</td>");
            break;
        case 'pg':
            table.append("<td class='table-primary'>" + data + "</td>");
            break;
        case 'og':
            table.append("<td class='table-warning'>" + data + "</td>");
            break;
        case '--':
            table.append("<td >" + data + "</td>");
            break;
    }

}