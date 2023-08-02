$(document).ready(function () {
    BlogList();
    GetBlogList();
    GetDetails();
});



var SaveBlog = function () {
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
    var title = $("#txtTitle").val();
    var desciption = $("#txtDescription").val();
    var photo = $("#file1").val();
    var isactive = checkbox;
    var createdate = $("#txtCreateDate").val();

    $formData.append('Id', id);
    $formData.append('Title', title);
    $formData.append('Description', desciption);
    $formData.append('Photo', photo);
    $formData.append('IsActive', isactive);
    $formData.append('CreateDate', createdate);
    $.ajax({
        url: "/Blog/SaveBlog",
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

var BlogList = function () {
    $.ajax({
        url: "/Blog/GetBlogList",
        method: "post",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response) {
            var html = "";
            $("#tblBlog tbody").empty();
            $.each(response.model, function (Index, elementvalue) {

                html += " <div class='col - md - 4''>";
                html += "<div class='blog_box''>";    
                html += " <div class='blog_img'>";
                html += " <figure><img src='../Content/Img/ " + elementvalue.Photo + "' /></figure>";   
                html += "</div>";    
                html += "<div class='blog_room'>";
                html += "<span>" + elementvalue.Title + "</span>";
                html += "<p>" + elementvalue.Description + "</p>";      
                html += "</div>";  
                html += "</div>";
                html += "</div>"; 
            });
            $("#tblBlog ").append(html);
        }
    });
};
var GetBlogList = function () {
    $.ajax({
        url: "/Blog/GetBlogList",
        method: "post",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response) {
            tbl(response)
            //var html = "";
            //$("#tblBlog tbody").empty();
            //$.each(response.model, function (Index, elementvalue) {
            //    html += "<tr><td>" + elementvalue.Id +
            //        "</td><td>" + elementvalue.Title +
            //        "</td><td>" + elementvalue.Description +
            //        "</td><td>" + elementvalue.IsActive +
            //        "</td><td>" + elementvalue.CreateDate +
            //        "</td><td><img src='../Content/Img/" + elementvalue.Photo + "'style='max-width: 300px;max-height:200px;'/>"
            //        + "</td><td><input type='submit'class='btn btn-danger'value='delete'onclick='deleteBlog(" + elementvalue.Id + ")'/> <input type='submit'class='btn btn-danger'value='Edit'onclick='EditBlog(" + elementvalue.Id + ")'/></td></tr>";
            //});
            //$("#tblBlog tbody").append(html);
        }
    });
};
function tbl(response) {

    var datatableVariable = $("#tblBlog").DataTable(
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
                { 'data': 'Title', 'title': 'Title' },
                { 'data': 'Description', 'title': 'Description' },
                {
                    'title': 'Blog Photo',
                    "render": function (data, type, JsonResultRow, meta) {
                        return '<center><img src="../Content/Img/' + JsonResultRow.Photo + '" style="height:110px;width:110px; "/></center>';
                    }
                },
                { 'data': 'IsActive', 'title': 'IsActive' },
                { 'data': 'CreateDate', 'title': 'CreateDate' },

                {
                    'data': null, title: 'Details', wrap: true, "bAutoWidth": true, "render": function (item) {
                        return '<center><div class="btn-group"><button type="button" data-toggle="modal" onclick = "deleteBlog(' + "'" + item.Id + "'" + ')" value="0" class="btn btn-danger btn-sm" id="btn-sa-confirm" > <i class="bi bi-trash-fill"></i></button></div>&nbsp;' +
                            '&nbsp;&nbsp;&nbsp;<div class="btn-group"><button type="button" onclick="EditBlog(' + "'" + item.Id + "'" + ');" class="btn btn-primary btn-sm"><i class="bi bi-pencil-square"></i></button></div>&nbsp;' +
                            '&nbsp;&nbsp;&nbsp;<div class="btn-group"><button type="button" onclick="GetDetails(' + "'" + item.Id + "'" + ');" class="btn btn-primary btn-sm"><i class="bi bi-eye-fill"></i></button></div ></center > '
                    },
                },
            ]
        }).buttons().container().appendTo('#tbluser_wrapper .col-md-6:eq(0)');
};

var deleteBlog = function (Id) {
    var model = { Id: Id };
    $.ajax({
        url: "/Blog/deleteBlog",
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

var EditBlog = function (Id) {
  
    var model = { Id: Id };
    $.ajax({
        url: "/Blog/EditBlog",
        method: "post",
        data: JSON.stringify(model),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response) {
            $("#WriteToUsModal").modal('show');
            debugger
            $("#hdnId").val(response.model.Id);
            $("#txtTitle").val(response.model.Title);
            $("#txtDescription").val(response.model.Description);
            //$("#file1").val(response.model.Photo);
            $("#txtIsActive").val(response.model.IsActive);
            $("#CreateDate").val(response.model.CreateDate);
        }
    });
};

var GetDetails = function (Id) {
 
    var model = { Id: Id }
    $.ajax({
        url: "/Blog/GetDetails",
        method: "post",
        data: JSON.stringify(model),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response) {
            $("#BlogModal").modal('show');
           
            $("#BlogDetail").empty();
            var html = "";
            html += "<div class='row'>";
            html += "<div class='col-sm-6'>";
            html += " <img src='../Content/img/" + response.model.Photo + "' style='max-widht:350px;max-height:200px;' />";
            html += "  </div>";
            html += "<div class='col-sm-6'>";
            html += "<b>Title:</b>&nbsp&nbsp&nbsp<span>" + response.model.Title + "</span>";
            html += "</br>";
            html += "<b>Description:</b>&nbsp&nbsp&nbsp<span>" + response.model.Description + "</span>";
            html += "</br>";
            html += "<b>IsActive:</b>&nbsp&nbsp&nbsp<span>" + response.model.IsActive + "</span>";
            html += "</br>";
            html += "<b>Date:</b>&nbsp&nbsp&nbsp<span>" + response.model.CreateDate + "</span>";
            html += "</div>";
            html += "</div>";

            $("#BlogDetail").append(html);
        }
    });
};


