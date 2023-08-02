$(document).ready(function () {
    GetContactList();
    GetDetails();
});


var Contactsave = function () {
    /*debugger*/
    var checkbox = false;
    if ($("#txtIsActive").is(":checked")) {
        checkbox = true;
    }
    else {
        checkbox = false;
    }

    var id = $("#hdnId").val();
    var name = $("#txtName").val();
    var email = $("#txtEmail").val();
    var mobile = $("#txtMobile").val();
    var message = $("#txtMessage").val();
    var isactive = checkbox;
    var createdate = $("#txtCreateDate").val();

    var model = { Id: id, Name: name, Email: email, Mobile: mobile, Message: message, IsActive: isactive, CreateDate: createdate };
    $.ajax({
        url: "/Contact/Contactsave",
        method: "post",
        data: JSON.stringify(model),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        success: function (response) {
            alert("Successfull");
        }
    })
};

var GetContactList = function () {
    $.ajax({
        url: "/Contact/GetContactList",
        method: "post",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response) {
            tbl(response)
            //var html = "";
            //$("#tblContact tbody").empty();
            //$.each(response.model, function (Index, elementvalue) {
            //    html += "<tr><td>" + elementvalue.Id +
            //        "</td><td>" + elementvalue.Name +
            //        "</td><td>" + elementvalue.Email +
            //        "</td><td>" + elementvalue.Mobile +
            //        "</td><td>" + elementvalue.Message +
            //        "</td><td>" + elementvalue.IsActive +
            //        "</td><td>" + elementvalue.CreateDate +

            //        "</td><td><input type ='button' value ='Delete' class='btn btn-danger' onclick='deleteContact(" + elementvalue.Id + ")'></td></tr>";
            //                   });
            //$("#tblContact tbody").append(html);
        }
    });
};
function tbl(response) {
   /* debugger*/
    var datatableVariable = $("#tblContact").DataTable(
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
                { 'data': 'Email', 'title': 'Email' },
                { 'data': 'Mobile', 'title': 'Mobile' },
                { 'data': 'Message', 'title': 'Message' },
                { 'data': 'IsActive', 'title': 'IsActive' },
                { 'data': 'CreateDate', 'title': 'CreateDate' },

                {
                    'data': null, title: 'Details', wrap: true, "bAutoWidth": true, "render": function (item) {
                        return '<center><div class="btn-group"><button type="button" data-toggle="modal" onclick = "DeleteRegistration(' + "'" + item.Registration_Id + "'" + ')" value="0" class="btn btn-danger btn-sm" id="btn-sa-confirm" > <i class="bi bi-trash-fill"></i></button></div>&nbsp;' +
                            '&nbsp;&nbsp;&nbsp;<div class="btn-group"><button type="button" onclick="GetDetails(' + "'" + item.Id + "'" + ');" class="btn btn-primary btn-sm"><i class="bi bi-eye-fill"></i></button></div></center>'
                    },
                },
            ]
        }).buttons().container().appendTo('#tbluser_wrapper .col-md-6:eq(0)');
};

var deleteContact = function (Id) {
    var model = { Id: Id };
    $.ajax({
        url: "/Contact/deleteContact",
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

//var EditContact = function (Id) {
//    debugger;
//    var model = { Id: Id };
//    $.ajax({
//        url: "/Contact/EditContact",
//        method: "post",
//        data: JSON.stringify(model),
//        contentType: "application/json;charset=utf-8",
//        dataType: "json",
//        async: false,
//        success: function (response) {
//            debugger
//            $("#hdnId").val(response.model.Id);
//            //$("#file1").val(response.model.Photo);
//            $("#txtName").val(response.model.Name);
//            $("#txtEmail").val(response.model.Email);
//            $("#txtMobile").val(response.model.Mobile);
//            $("#txtMessage").val(response.model.Message);
//            $("#txtIsActive").val(response.model.IsActive);
//            $("#CreateDate").val(response.model.CreateDate);
//        }
//    });
//};
var GetDetails = function (Id) {
    /*debugger*/
    var model = { Id: Id }
    $.ajax({
        url: "/Contact/GetDetails",
        method: "post",
        data: JSON.stringify(model),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response) {
            $("#ContactModal").modal('show');
            debugger
            $("#ContactDetail").empty();
            var html = "";
            //html += "<div class='row'>";
            //html += "<div class='col-sm-6'>";
            //html += " <img src='../Content/img/" + response.model.Photo + "' style='max-widht:400px;max-height:200px;' />";
            //html += "  </div>";
            html += "<div class='col-sm-6'>";
            html += "<b>Name:</b>&nbsp&nbsp&nbsp<span>" + response.model.Name + "</span>";
            html += "</br>";
            html += "<b>Mobile:</b>&nbsp&nbsp&nbsp<span>" + response.model.Mobile + "</span>";
            html += "</br>";
            html += "<b>Email:</b>&nbsp&nbsp&nbsp<span>" + response.model.Email + "</span>";
            html += "</br>";
            html += "<b>Message:</b>&nbsp&nbsp&nbsp<span>" + response.model.Message + "</span>";
            html += "</div>";
      

            $("#ContactDetail").append(html);
        }
    });
};


