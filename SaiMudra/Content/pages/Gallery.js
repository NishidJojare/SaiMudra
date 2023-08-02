$(document).ready(function () {
    GetGalleryList();
    GalleryList();
    GetDetails();
});

var SaveGallery = function () {
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
    var video = $("#txtVideo").val();
    var isactive = checkbox;
    var createdate = $("#txtCreateDate").val();

    $formData.append('Id', id);
    $formData.append('Photo', photo);
    $formData.append('Video', video);
    $formData.append('IsActive', isactive);
    $formData.append('CreateDate', createdate);
    $.ajax({
        url: "/Gallery/SaveGallery",
        method: "post",
        data: $formData,
        contentType: "application/json;charset=utf-8",
        contentType: false,
        processData: false,
        success: function (response) {
            alert("succesfully");
            GetAboutList();
        }
    });
}



//var GetGalleryList = function () {
//    debugger
//    $.ajax({
//        url: "/Gallery/GalleryList",
//        method: "post",
//        contentType: "appliaction/json;charset=utf-8",
//        datatype: "json",
//        async: false,
//        success: function (response) {
//            var html = "";
//            $("#tblGallery ").empty();
//            $.each(response.model, function (index, elementValue) {
             
//                html +="<div class='col-md-3 col-sm-6'>";
//                html +="<div class='gallery_img'>";
//                html +="<figure> <img src='../Content/images/gallery1.jpg' class='img1'/></figure>";
//                html +="</div>";
//                html +="</div>";

//            })
//            $("#tblGallery tbody").append(html);
//        }
//    });
//}

var GetGalleryList = function () {
    $.ajax({
        url: "/Gallery/GetGalleryList",
        method: "post",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response) {
            var html = "";
            $("#tblGallery tbody").empty();
            $.each(response.model, function (Index, elementvalue) {

                html += "<div class='col-md-3 col-sm-6'>";
                html += "<div class='gallery_img'>";
                html += "<figure> <img src='../Content/Img/" + elementvalue.Photo + "' class='img1'/></figure>";
                html +="</div>";
                html +="</div>";
            });
            $("#tblGallery ").append(html);
        }
    });
};
var GalleryList = function () {
    $.ajax({
        url: "/Gallery/GetGalleryList",
        method: "post",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response) {
            tbl(response)
        //    var html = "";
        //    $("#tblGallery tbody").empty();
        //    $.each(response.model, function (Index, elementvalue) {
        //        html += "<tr><td>" + elementvalue.Id +

        //            "</td><td>" + elementvalue.Video +
        //            "</td><td>" + elementvalue.IsActive +
        //            "</td><td>" + elementvalue.CreateDate +
        //            "</td><td><img src='../Content/Img/" + elementvalue.Photo + "'style='max-width: 300px;max-height:200px;'/>"
        //            + "</td><td><input type='submit'class='btn btn-danger'value='delete'onclick='deleteGallery(" + elementvalue.Id + ")'/> <input type='submit'class='btn btn-danger'value='Edit'onclick='EditGallery(" + elementvalue.Id + ")'/></td></tr>";
        //    });
        //    $("#tblGallery tbody").append(html);
        }
    });
};
function tbl(response) {
   
    var datatableVariable = $("#tblGallery").DataTable(
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
                { 'data': 'Video', 'title': 'Video' },
                { 'data': 'IsActive', 'title': 'IsActive' },
                { 'data': 'CreateDate', 'title': 'CreateDate' },

                {
                    'data': null, title: 'Details', wrap: true, "bAutoWidth": true, "render": function (item) {
                        return '<center><div class="btn-group"><button type="button" data-toggle="modal" onclick = "deleteGallery(' + "'" + item.Id + "'" + ')" value="0" class="btn btn-danger btn-sm" id="btn-sa-confirm" > <i class="bi bi-trash-fill"></i></button></div>&nbsp;' +
                            '&nbsp;&nbsp;&nbsp;<div class="btn-group"><button type="button" onclick="EditGallery(' + "'" + item.Id + "'" + ');" class="btn btn-primary btn-sm"><i class="bi bi-pencil-square"></i></button></div>&nbsp;' +
                            '&nbsp;&nbsp;&nbsp;<div class="btn-group"><button type="button" onclick="GetDetails(' + "'" + item.Id + "'" + ');" class="btn btn-primary btn-sm"><i class="bi bi-eye-fill"></i></button></div ></center > '
                    },
                },
            ]
        }).buttons().container().appendTo('#tbluser_wrapper .col-md-6:eq(0)');
};

var deleteGallery = function (Id) {
    var model = { Id: Id };
    $.ajax({
        url: "/Gallery/deleteGallery",
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

var EditGallery = function (Id) {

    var model = { Id: Id };
    $.ajax({
        url: "/Gallery/EditGallery",
        method: "post",
        data: JSON.stringify(model),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response) {
            $("#WriteToUsModal").modal('show');
            debugger
            $("#hdnId").val(response.model.Id);
            $("#file1").val(response.model.Photo);
            $("#txtVideo").val(response.model.Video);
            $("#txtIsActive").val(response.model.IsActive);
            $("#CreateDate").val(response.model.CreateDate);
        }
    });
};
var GetDetails = function (Id) {
   
    var model = { Id: Id }
    $.ajax({
        url: "/Gallery/GetDetails",
        method: "post",
        data: JSON.stringify(model),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response) {
            $("#GalleryModal").modal('show');
            debugger
            $("#GalleryDetail").empty();
            var html = "";
            html += "<div class='row'>";
            html += "<div class='col-sm-6'>";
            html += " <img src='../Content/Img/" + response.model.Photo + "' style='max-widht:400px;max-height:200px;' />";
            html += "</div>";
            html += "</div>";

            $("#GalleryDetail").append(html);
        }
    });
};


