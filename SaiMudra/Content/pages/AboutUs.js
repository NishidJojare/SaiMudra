$(document).ready(function () {
    GetAboutList();
    AboutList();
    GetDetails();
});

var SaveAboutus = function () {
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
    var photo = $("#file1").val();
    var descipition = $("#txtDescripition").val();
    var isactive = checkbox;
    var createdate = $("#txtCreateDate").val();

    $formData.append('Id', id);
    $formData.append('Photo', photo);
    $formData.append('Descripition', descipition);
    $formData.append('IsActive', isactive);
    $formData.append('CreateDate', createdate);
    $.ajax({
        url: "/About/SaveAboutus",
        method: "post",
        data: $formData,
        contentType: "application/json;charset=utf-8",
        contentType: false,
        processData: false,
        success: function (response) {
            alert("succesfully");
            GetAboutList();
            AboutList();
        }
    });
}

var GetAboutList = function () {
    /*debugger;*/
    $.ajax({
        url: "/About/GetAboutList",
        method: "post",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response) {
            var html = "";
            $("#tblAbout tbody").empty();
            $.each(response.model, function (Index, elementvalue) {

                html += "<div class='row'>";
                html += "<div class='col - md - 7'>";
                html+="<div class='about_img'>";
                html += "<figure><img src='../Content/Img/" + elementvalue.Photo + "'/></figure>";
                html += "</div>";
                html += "</div>";
                html += "<div class='col-md-5'>";
                html+="<div class='titlepage'>";
                html += "<p class='margin_0'>";
                html += "<p><i class='descText'>" + elementvalue.Descripition + "</i></p>";
                html += "</div>";
                html += "</div>";
                html += "</div>";
            });
            $("#tblAbout ").append(html);
        }
    });
};
var AboutList = function () {
    $.ajax({
        url: "/About/GetAboutList",
        method: "post",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response) {
            tbl(response)
            //var html = "";
            //$("#tblAbout tbody").empty();
            //$.each(response.model, function (Index, elementvalue) {
            //    html += "<tr><td>" + elementvalue.Id +
                    
            //        "</td><td>" + elementvalue.Descripition +
            //        "</td><td>" + elementvalue.IsActive +
            //        "</td><td>" + elementvalue.CreateDate +
            //        "</td><td><img src='../Content/Img/" + elementvalue.Photo + "'style='max-width: 300px;max-height:200px;'/>"
            //        + "</td><td><input type='submit'class='btn btn-danger'value='delete'onclick='deleteAboutus(" + elementvalue.Id + ")'/> <input type='submit'class='btn btn-danger'value='Edit'onclick='EditAboutus(" + elementvalue.Id + ")'/></td></tr>";
            //});
            //$("#tblAbout tbody").append(html);
        }
    });
};
function tbl(response) {
    
    var datatableVariable = $("#tblAbout").DataTable(
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
                {
                    'title': 'Photo',
                    "render": function (data, type, JsonResultRow, meta) {
                        return '<center><img src="../Content/Img/' + JsonResultRow.Photo + '" style="height:110px;width:110px; "/></center>';
                    }
                },
                { 'data': 'Descripition', 'title': 'Descripition' },
                { 'data': 'IsActive', 'title': 'IsActive' },
                { 'data': 'CreateDate', 'title': 'CreateDate' },

                {
                    'data': null, title: 'Details', wrap: true, "bAutoWidth": true, "render": function (item) {
                        return '<center><div class="btn-group"><button type="button" data-toggle="modal" onclick = "deleteAboutus(' + "'" + item.Id + "'" + ')" value="0" class="btn btn-danger btn-sm" id="btn-sa-confirm" > <i class="bi bi-trash-fill"></i></button></div>&nbsp;' +
                            '&nbsp;&nbsp;&nbsp;<div class="btn-group"><button type="button" onclick="EditAboutus(' + "'" + item.Id + "'" + ');" class="btn btn-primary btn-sm"><i class="bi bi-pencil-square"></i></button></div>&nbsp;' +
                            '&nbsp;&nbsp;&nbsp;<div class="btn-group"><button type="button" onclick="GetDetails(' + "'" + item.Id + "'" + ');" class="btn btn-primary btn-sm"><i class="bi bi-eye-fill"></i></button></div ></center > '
                    },
                },
            ]
        }).buttons().container().appendTo('#tbluser_wrapper .col-md-6:eq(0)');
};

var deleteAboutus = function (Id) {
    var model = { Id: Id };
    $.ajax({
        url: "/About/deleteAboutus",
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

var EditAboutus = function (Id) {
  
    var model = { Id: Id };
    $.ajax({
        url: "/About/EditAboutus",
        method: "post",
        data: JSON.stringify(model),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response) {
            $("#WriteToUsModal").modal('show');

           
            $("#hdnId").val(response.model.Id);
            //$("#file1").val(response.model.Photo);
            $("#txtDescripition").val(response.model.Descripition);
            $("#txtIsActive").val(response.model.IsActive);
            $("#CreateDate").val(response.model.CreateDate);
        }
    });
};

var GetDetails = function (Id) {
   
    var model = { Id: Id }
    $.ajax({
        url: "/About/GetDetails",
        method: "post",
        data: JSON.stringify(model),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response) {
            $("#AboutModal").modal('show');
            
            $("#AboutDetail").empty();
            var html = "";
            html += "<div class='row'>";
            html += "<div class='col-sm-6'>";
            html += " <img src='../Content/Img/" + response.model.Photo + "' style='max-widht:400px;max-height:200px;' />";
            html += "  </div>";
            html += "<div class='col-sm-6'>";
            html += "<b>Full Descripition:</b>&nbsp&nbsp&nbsp<span>" + response.model.Descripition + "</span>";
            html += "</br>";
            html += "<b>Full Date:</b>&nbsp&nbsp&nbsp<span>" + response.model.CreateDate + "</span>";
            html += "</br>";
            html += "</div>";
            html += "</div>";

            $("#AboutDetail").append(html);
        }
    });
};

