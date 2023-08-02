$(document).ready(function () {
    GetregList();
    GetDetails();
});



var SaveRegistration = function () {
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
    var fullname = $("#txtFullName").val();
    var mobile = $("#txtMobile").val();
    var email = $("#txtEmail").val();
    var age = $("#txtAge").val();
    var dob = $("#txtDOB").val();
    var bloodgroup = $("#txtBloodGroup").val();
    var aadhar = $("#txtAadhar").val();
    var gender = $("#txtGender").val();
    var address = $("#txtAddress").val();
    var occupation = $("#txtOccupation").val();
    var isactive = checkbox;
    var createdate = $("#txtCreateDate").val();
    var photo = $("#file1").val();

    $formData.append('Id', id);
    $formData.append('FullName', fullname);
    $formData.append('Mobile', mobile);
    $formData.append('Email', email);
    $formData.append('Age', age);
    $formData.append('DOB', dob);
    $formData.append('BloodGroup', bloodgroup);
    $formData.append('Aadhar', aadhar);
    $formData.append('Gender', gender);
    $formData.append('Address', address);
    $formData.append('Occupation', occupation);
    $formData.append('IsActive', isactive);
    $formData.append('CreateDate', createdate);
    $formData.append('Photo', photo);
    $.ajax({
        url: "/Registration/SaveRegistration",
        method: "post",
        data: $formData,
        contentType: "application/json;charset=utf-8",
        contentType: false,
        processData: false,
        success: function (response) {
            alert("succesfully");
            GetregList();
        }
    });
};

var GetregList = function () {
    $.ajax({
        url: "/Registration/GetregList",
        method: "post",
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response) {
            tbl(response)
            //var html = "";
            //$("#tblRegistration tbody").empty();
            //$.each(response.model, function (Index, elementvalue) {
            //    html += "<tr><td>" + elementvalue.Id +
            //        "</td><td>" + elementvalue.FullName +
            //        "</td><td>" + elementvalue.Mobile +
            //        "</td><td>" + elementvalue.Email +
            //        "</td><td>" + elementvalue.Age +
            //        "</td><td>" + elementvalue.DOB +
            //        "</td><td>" + elementvalue.BloodGroup +
            //        "</td><td>" + elementvalue.Aadhar +
            //        "</td><td>" + elementvalue.Gender +
            //        "</td><td>" + elementvalue.Address +
            //        "</td><td>" + elementvalue.Occupation +
            //        "</td><td>" + elementvalue.IsActive +
            //        "</td><td>" + elementvalue.CreateDate +
            //        /*"</td><td>" + elementvalue.Photo +*/
            //        "</td><td><img src='../Content/Img/" + elementvalue.Photo + "'style='max-width: 300px;max-height:200px;'/>"
            //        + "</td><td><input type='submit'class='btn btn-danger'value='delete'onclick='deleteRegistration(" + elementvalue.Id + ")'/> <input type='submit'class='btn btn-danger'value='Edit'onclick='EditRegistration(" + elementvalue.Id + ")'/></td></tr>";
            //});
            //$("#tblRegistration tbody").append(html);
        }
    });
};
function tbl(response) {
   
    var datatableVariable = $("#tblRegistration").DataTable(
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
                { 'data': 'FullName', 'title': 'FullName' },
                { 'data': 'Mobile', 'title': 'Mobile' },
                //{ 'data': 'Email', 'title': 'Email' },
                //{ 'data': 'Age', 'title': 'Age' },
                //{ 'data': 'DOB', 'title': 'DOB' },
                //{ 'data': 'BloodGroup', 'title': 'BloodGroup' },
                //{ 'data': 'Aadhar', 'title': 'Aadhar' },
                //{ 'data': 'Gender', 'title': 'Gender' },
                //{ 'data': 'Address', 'title': 'Address' },
                //{ 'data': 'Occupation', 'title': 'Occupation' },
                //{ 'data': 'IsActive', 'title': 'IsActive' },
                //{ 'data': 'CreateDate', 'title': 'CreateDate' },
                {
                    'title': 'Photo',
                    "render": function (data, type, JsonResultRow, meta) {
                        return '<center><img src="../Content/Img/' + JsonResultRow.Photo + '" style="height:180px;width:320px;"/></center>';
                    }
                },

                {
                    'data': null, title: 'Details', wrap: true, "bAutoWidth": true, "render": function (item) {
                        return '<center><div class="btn-group"><button type="button" data-toggle="modal" onclick = "deleteRegistration(' + "'" + item.Id + "'" + ')" value="0" class="btn btn-danger btn-sm" id="btn-sa-confirm" > <i class="bi bi-trash-fill"></i></button></div>&nbsp;' +
                            '&nbsp;&nbsp;&nbsp;<div class="btn-group"><button type="button" onclick="EditRegistration(' + "'" + item.Id + "'" + ');" class="btn btn-primary btn-sm"><i class="bi bi-pencil-square"></i></button></div>&nbsp;' +
                            '&nbsp;&nbsp;&nbsp;<div class="btn-group"><button type="button" onclick="GetDetails(' + "'" + item.Id + "'" + ');" class="btn btn-primary btn-sm"><i class="bi bi-eye-fill"></i></button></div ></center > '
                    },
                },
            ]
        }).buttons().container().appendTo('#tbluser_wrapper .col-md-6:eq(0)');
};

var deleteRegistration = function (Id) {
    var model = { Id: Id };
    $.ajax({
        url: "/Registration/deleteRegistration",
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


var EditRegistration = function (Id) {
 
    var model = { Id: Id };
    $.ajax({
        url: "/Registration/EditRegistration",
        method: "post",
        data: JSON.stringify(model),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response) {
            $("#WriteToUsModal").modal('show');

            $("#hdnId").val(response.model.Id);
            $("#txtFullName").val(response.model.FullName);
            $("#txtMobile").val(response.model.Mobile);
            $("#txtEmail").val(response.model.Email);
            $("#txtAge").val(response.model.Age);
            $("#txtDOB").val(response.model.DOB);
            $("#txtBloodGroup").val(response.model.BloodGroup);
            $("#txtAadhar").val(response.model.Aadhar);
            $("#txtGender").val(response.model.Gender);
            $("#txtAddress").val(response.model.Address);
            $("#txtOccupation").val(response.model.Occupation);
            $("#txtIsActive").val(response.model.IsActive);
            $("#CreateDate").val(response.model.CreateDate);
            $("#file1").val(response.model.Photo);
        }
    });
};

var GetDetails = function (Id) {
    
    var model = { Id: Id }
    $.ajax({
        url: "/Registration/GetDetails",
        method: "post",
        data: JSON.stringify(model),
        contentType: "application/json;charset=utf-8",
        dataType: "json",
        async: false,
        success: function (response) {
            $("#RegistrationModal").modal('show');
            debugger
            $("#RegistrationDetail").empty();
            var html = "";
            html += "<div class='row'>";
            html += "<div class='col-sm-6'>";
            html += "<img src='../Content/img/" + response.model.Photo + "'style='max-widht:400px;max-height:200px;'/>";
            html += "</div>";
            html += "<div class='col-sm-6'>";
            html += "<b>Full Name:</b>&nbsp&nbsp&nbsp<span>" + response.model.FullName + "</span>";
            html += "</br>";
            html += "<b>Mobile:</b>&nbsp&nbsp&nbsp<span>" + response.model.Mobile + "</span>";
            html += "</br>";
            html += "<b>Email:</b>&nbsp&nbsp&nbsp<span>" + response.model.Email + "</span>";
            html += "</br>";
            html += "<b>Age:</b>&nbsp&nbsp&nbsp<span>" + response.model.Age + "</span>";
            html += "</br>";
            html += "<b>DOB:</b>&nbsp&nbsp&nbsp<span>" + response.model.DOB + "</span>";
            html += "</br>";
            html += "<b>BloodGroup:</b>&nbsp&nbsp&nbsp<span>" + response.model.BloodGroup + "</span>";
            html += "</br>";
            html += "<b>Aadhar:</b>&nbsp&nbsp&nbsp<span>" + response.model.Aadhar + "</span>";
            html += "</br>";
            html += "<b>Gender:</b>&nbsp&nbsp&nbsp<span>" + response.model.Gender + "</span>";
            html += "</br>";
            html += "<b>Address:</b>&nbsp&nbsp&nbsp<span>" + response.model.Address + "</span>";
            html += "</br>";
            html += "<b>Occupation:</b>&nbsp&nbsp&nbsp<span>" + response.model.Occupation + "</span>";
            html += "</div>";
            html += "</div>";

            $("#RegistrationDetail").append(html);
        }
    });
};