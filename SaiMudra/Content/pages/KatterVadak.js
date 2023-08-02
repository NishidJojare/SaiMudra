$(document).ready(function () {
    GetKatterVadakList();
    GetDetails();
});



var SaveKatterVadak = function () {
    $formData = new FormData();
    var Image = document.getElementById('file1');;
    if (Image.files.length > 0) {
        for (var i = 0; i < Image.files.length; i++) {
            $formData.append('file-' + i, Image.files[i]);
        }
    }

    var checkbox = false;
    if ($("#txtIsActive").is(":checked")) {
        checkbox = true;
    }
    else {
        checkbox = false;
    }

    var id = $("#hdnId").val();
    var name = $("#txtName").val();
    var photo = $("#file1").val();
    var instagram = $("#txtInstragram").val();
    var facebook = $("#txtFacebook").val();
    var isactive = checkbox;
    var createdate = $("#txtCreateDate").val();

    $formData.append('Id', id);
    $formData.append('Name', name);
    $formData.append('Photo', photo);
    $formData.append('Instragram', instagram);
    $formData.append('Facebook', facebook);
    $formData.append('IsActive', isactive);
    $formData.append('CreateDate', createdate);
    $.ajax({
        url: "/Kattar/SaveKatterVadak",
        method: "post",
        data: $formData,
        contentType: "application/json;charset=utf-8",
        contentType: false,
        processData: false,
        success: function (response) {
            alert("succesfully");
            GetKatterVadakList();
        }
    });
}

var GetKatterVadakList = function () {
    $.ajax({
        url: "/Kattar/GetKatterVadakList",
        method: "post",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response) {
            tbl(response)
            //var html = "";
            //$("#tblKattarVadak tbody").empty();
            //$.each(response.model, function (Index, elementvalue) {
            //    html += "<tr><td>" + elementvalue.Id +
            //        "</td><td>" + elementvalue.Name +
            //        "</td><td>" + elementvalue.Instragram +
            //        "</td><td>" + elementvalue.Facebook +
            //        "</td><td>" + elementvalue.IsActive +
            //        "</td><td>" + elementvalue.CreateDate +
            //        "</td><td><img src='../Content/Img/" + elementvalue.Photo + "'style='max-width: 300px;max-height:200px;'/>"
            //        + "</td><td><input type='submit'class='btn btn-danger'value='delete'onclick='deleteKattervadak(" + elementvalue.Id + ")'/> <input type='submit'class='btn btn-danger'value='Edit'onclick='EditKatterVadak(" + elementvalue.Id + ")'/></td></tr>";
            //});
            //$("#tblKattarVadak tbody").append(html);
        }
    });
};
function tbl(response) {
    //debugger;
    var datatableVariable = $("#tblKattarVadak").DataTable(
        {
            "responsive": false, "lengthChange": true, "autoWidth": false,
            "deferRender": true,
            paging: true,
            searching: true,
            destroy: true,
            buttons: [

            ],
            initComplete: function () {
                // Apply the search
                this.api()
                    .columns()
                    .every(function () {
                        var that = this;

                        $('input', this.header()).on('keyup change clear', function () {
                            if (that.search() !== this.value) {
                                that.search(this.value).draw();
                            }
                        });
                    });
            },
            data: response.model,
            columns: [

                { 'data': 'Id', 'title': 'Id' },
                { 'data': 'Name', 'title': 'Name' },
                {
                    'title': 'Photo',
                    "render": function (data, type, JsonResultRow, meta) {
                        return '<center><img src="../Content/Img/' + JsonResultRow.Photo + '" style="height:80px;width:80px; "/></center>';
                    }
                },
                { 'data': 'Instragram', 'title': 'Instragram' },
                { 'data': 'Facebook', 'title': 'Facebook' },
                { 'data': 'IsActive', 'title': 'IsActive' },
                { 'data': 'CreateDate', 'title': 'CreateDate' },

                {
                    'data': null, title: 'Details', wrap: true, "bAutoWidth": true, "render": function (item) {
                        return '<center><div class="btn-group"><button type="button" data-toggle="modal" onclick = "deleteKattervadak(' + "'" + item.Id + "'" + ')" value="0" class="btn btn-danger btn-sm" id="btn-sa-confirm" > <i class="bi bi-trash-fill"></i></button></div>&nbsp;' +
                            '&nbsp;&nbsp;&nbsp;<div class="btn-group"><button type="button" onclick="EditKatterVadak(' + "'" + item.Id + "'" + ');" class="btn btn-primary btn-sm"><i class="bi bi-pencil-square"></i></button></div>&nbsp;' +
                            '&nbsp;&nbsp;&nbsp;<div class="btn-group"><button type="button" onclick="GetDetails(' + "'" + item.Id + "'" + ');" class="btn btn-primary btn-sm"><i class="bi bi-eye-fill"></i></button></div ></center > '
                    },
                },
            ]
        }).buttons().container().appendTo('#tbluser_wrapper .col-md-6:eq(0)');
};

var deleteKattervadak = function (Id) {
    var model = { Id: Id };
    $.ajax({
        url: "/Kattar/deleteKattervadak",
        method: "post",
        data: JSON.stringify(model),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response) {
            alert("Record delete Successfully")
        }
    });
};



var EditKatterVadak = function (Id) {
    //debugger;
    var model = { Id: Id };
    $.ajax({
        url: "/Kattar/EditKatterVadak",
        method: "post",
        data: JSON.stringify(model),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response) {
            $("#WriteToUsModal").modal('show');
            debugger
            $("#hdnId").val(response.model.Id);
            $("#txtName").val(response.model.Name);
            //$("#file1").val(response.model.Photo);
            $("#txtInstragram").val(response.model.Instragram);
            $("#txtFacebook").val(response.model.Facebook);
            $("#txtIsActive").val(response.model.IsActive);
            $("#CreateDate").val(response.model.CreateDate);
        }
    });
};
var GetDetails = function (Id) {
    //debugger
    var model = { Id: Id }
    $.ajax({
        url: "/Kattar/GetDetails",
        method: "post",
        data: JSON.stringify(model),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response) {
            $("#KattarModal").modal('show');
            debugger
            $("#KattarDetail").empty();
            var html = "";
            html += "<div class='row'>";
            html += "<div class='col-sm-6'>";
            html += " <img src='../Content/img/" + response.model.Photo + "' style='max-widht:300px;max-height:200px;' />";
            html += "  </div>";
            html += "<div class='col-sm-6'>";
            html += "<b>Name:</b>&nbsp&nbsp&nbsp<span>" + response.model.Name + "</span>";
            html += "</br>";
            html += "<b>Instragram:</b>&nbsp&nbsp&nbsp<span>" + response.model.Instragram + "</span>";
            html += "</br>";
            html += "<b>Facebook:</b>&nbsp&nbsp&nbsp<span>" + response.model.Facebook + "</span>";
            html += "</div>";
            html += "</div>";

            $("#KattarDetail").append(html);
        }
    });
};

