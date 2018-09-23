(function () {

    $('#btn-next').click(function () {
        myFullpage.moveSlideRight();
    });
    $('#btn-tg').click(function () {
        $('#form-group').find('option[value=tg]').attr("selected", true);
        myFullpage.moveSectionDown();
    });
    $('#btn-cg').click(function () {
        $('#form-group').find('option[value=cg]').attr("selected", true);
        myFullpage.moveSectionDown();
    });
    $('#btn-og').click(function () {
        $('#form-group').find('option[value=og]').attr("selected", true);
        myFullpage.moveSectionDown();
    });
    $('#btn-pg').click(function () {
        $('#form-group').find('option[value=pg]').attr("selected", true);
        myFullpage.moveSectionDown();
    });

})();

function doSubmit() {
    $.ajax({
        type: "post",
        url: "/j/submit",
        data: $('#form-signup').serialize(),
        success: function (data) {
            $('#modal-body').text(data);
            console.log('data: ' + data);
        },
        error: function () {
            $('#modal-body').text("error");
        }
    });
}

var myFullpage = new fullpage('#fullpage', {
    anchors: ['page1', 'page2', 'page3'],
    scrollOverflow: true,
    resize: true,
    controlArrows: false
});