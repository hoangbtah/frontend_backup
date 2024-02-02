$(document).ready(function() {
     // lấy số lượng bản ghi trả về 
     var empNumber=null;
     // thưc hiện load dữ liệu 
    loadData();
    // sử dụng để biết lúc nào là thêm mới hay cập nhật
    var forMode=misaEnum.forMode.Edit;
    // sử dụng để lấy giá trị employeeId
    var empId=null;
    // sử dụng để lấy giá trị employeeId cho việc xóa
    var empdel=null;
    // sử dụng để lấy giá trị departmentId
    var departmentId=null;
    // sử dụng để lấy giá trị employeeId
    var empCode=null;
    // thực hiên gán các sự kiện
    // nhấn vào nút thêm mới nhân viên
   add_employee();
    //4 ẩn form thêm mới bằng nút X
    close_form_add();
    // ấn buttom show để xem chức năng nút bên cạnh nút sửa 
    show_options_employee();
  //  ấn vào nút xóa để ẩn chức năng
  // ấn vào nút hủy của formm thêm mới nhân viên để ẩn form 
  click_cancle_for_add_employee();
    // 5 nhấn đúp chuột khi chọn dòng để hiển thị form 
    double_click_row();
    // 6 validate dữ liệu khi ấn lưu(cất và thêm )
    // sau khi ấn thì form vẫn hiển thị với các trường nhập liệu
    //được để trống 
    click_save_add_employee();
    // 7 các ô dữ liệu yêu cầu nhập 
     validate_required();
    // 8 khi tích vào checkbox thì dòng đó được thay đổi background
    click_input_checkbox();
    // 9 ấn vào nút xóa hiện thị form xác nhận xóa nhân viên
    showDialogConfirmDelete();
    // 10 ấn vào nút không để tắt dialog xác nhận xóa 
    hide_dialog_confirm_del();
    // trang thái loading dữ liệu 
    status_loading();
    //xóa nhân viên khi ấn vào nút có trên form xác nhận xóa
    delete_employee();
    //show toast
    show_toast();
    // nạp lại dữ liệu
    reload_data();
    // Tìm kiếm nhân viên theo mã , tên hoặc số điện thoại
    employeeSearch();
    // chọn nút sửa lấy thông tin lên form;
    get_infor_edit_employee();
    // nhân bản nhân viên
   employee_relication();
   // hiển thị số lượng bản ghi trả về 
   show_employee_number();
   // xóa các ô input khi thêm mới 
   format_form();
   // ấn nút cất trên form 
   //thực hiện validate dữ liệu rồi ẩn form thêm mới
   click_save_employee();

})
//0 validate dữ liệu không cho để trống dữ liệu yêu cầu
//created by BVHoang(13/01/02024)
function validateInputRequired(input){
  var me=this;
  let value= $(input).val();
      if(value== null||value===""){
        
        $(input).addClass("m-input-error");
        $(input).attr("title",resource.VI.inforNotEmpty);
      }
      else{
        $(input).removeClass("m-input-error");
        $(input).removeAttr("Title",resource.VI.inforNotEmpty);
      }
}
// 1 loading dữ liệu
//created by BVHoang(13/01/02024)
function loadData(){
  $("table#tblEmployee tbody").empty();
  $(".m-loading").show();
  // 2 thực hiện binding dữ liệu lên UI
  $.ajax({
    type: "GET",      
   url:  "https://localhost:7159/api/v1/Employees/employees",
    success: function (response) {
      // lấy số lượng bản ghi trả về
      empNumber = response.length;
      var departmentData = response;
      //console.log(empNumber);
      //hiển thị số lượng bản ghi
      show_employee_number(empNumber);

    ////  Gọi hàm để hiển thị thông tin phòng ban khi trang được tải
     displayDepartments(departmentData);
   //lấy các dữ liệu trả về từ api
      for(const employee of response){
        // thực hiện lấy dữ liệu trả về format dữ liệu và hiển thị lên table
       var el= getDataAndShow(employee);
       $("table#tblEmployee tbody").append(el);
      }
      $(".m-loading").hide();
    },
    error: function(response){
      debugger;
    }
  });
}
// 2 ấn vào nút x bên phải phía trên của form thêm mới để ẩn đi
//created by BVHoang(14/01/02024)
function close_form_add(){
  $("#dialog-close").click(function(){
    // ẩn form thêm mới 
    $("#dialogadd").hide();
  })
}
// 3 ấn vào nút thêm mới nhân viên để hiển thị form 
//created by BVHoang(14/01/02024)
function add_employee(){
  $("#btn-add").click(function(){
    forMode=misaEnum.forMode.Add;
    // 3 hiển thị form thêm mới 
    add_new_employee();
    // làm trắng các ô input khi thêm
    format_form();
  })
}
// 4 show chức năng tùy chỉnh nhân viên 
function show_options_employee(){
  $(".m-table").on("click", ".m-show", function() {
    // Xử lý khi nút được nhấn
    // Lấy dữ liệu của cả dòng chứa nút
    let rowData = $(this).closest("tr").data("entity");
    empdel =rowData.EmployeeId;
    empCode=rowData.EmployeeCode;
     //lấy ra vị trí của nút vừa ấn 
    var buttonPosition = $(this).offset();
    // css để hiển thị so với nút vừa ấn
    $('.m-btn-options-list').css({
      'position': 'absolute',
      'top': buttonPosition.top + 'px',
      'left': (buttonPosition.left-100) + 'px',
    });
    $("#optionlist").show();
});
}
// 5 click button hủy trên form thêm mới để ẩn form 
//created by BVHoang(14/01/02024)
function click_cancle_for_add_employee(){
  $(document).on("click","#m-btn-add-cancle",function(){
    $("#dialogadd").hide();
  })
}
// 6 double click vào dòng trong bảng để hiện thị form thêm mới với dữ liệu của dòng
//created by BVHoang(14/01/02024)
function double_click_row(){
  $(".m-table").on("dblclick","tr",function(){
      forMode=misaEnum.forMode.Edit;
    // lấy dữ liệu ở dòng lên form 
       let employee= $(this).data("entity");
       console.log(employee);
       empId=employee.EmployeeId;
       departmentId=employee.DepartmentId;
      get_rowdata_to_form(employee);
      // hiển thị form 
     add_new_employee();
     
  })
}
// khi ấn nút cất và thêm của form thêm mới thì validate dữ liệu 
//created by BVHoang(14/01/02024)
function click_save_add_employee(){
  $("#btnSaveAndAdd").click(function(){
    //validate dữ liệu
    //1 họ tên không được để trống
    // mã nhân viên không được để trống
    // ngay sinh không được lớn hơn ngày hiện tại
    // email phải đúng định dạng
    let employeeCode= $("#txtEmployeeCode").val();
    empCode=employeeCode;
    let employeeName= $("#txtEmployeeName").val();
    let dateOfBrith= $("#txtDateOfBrith").val();
    let identityCode=$("#txtIdentityCode").val();
    let identityDate=$("#txtIdentityDate").val();
    let eployeePosition=$("#txtPosition").val();
    let identityPlace=$("#txtIdentityPlace").val();
    let employeeAddress=$("#txtAddress").val();
    let employeePhoneNumber=$("#txtPhoneNumber").val();
    let employeePhone=$("#txtPhone").val();
    let employeeEmail=$("#txtEmail").val();
    let employeeBankAcount=$("#txtAccountBank").val();
    let employeeBankName=$("#txtBankName").val();
    let branch=$("#txtBranch").val();
    //lấy id của phòng ban được chọn trong combobox
    let selectedDepartment = $('#department').val();
    // lấy giá trị của gender
     let genderRadios = document.getElementsByName('gender');
      var selectedGender ;
      for (var i = 0; i < genderRadios.length; i++) {
        if (genderRadios[i].checked) {
          selectedGender = genderRadios[i].value;
         // console.log(selectedGender);
          break;
        }
      }
      // chuyển giới tính về dạng số 
      var genderNumber = parseInt(selectedGender, 10);
    /// kiểm tra không để trống dữ liệu mã nhân viên và tên nhân viên
    infor_not_empty(employeeCode,resource.VI.employeeCodeNotEmpty)
    ///kiểm tra không để trống dữ liệu tên nhân viên
    infor_not_empty(employeeName,resource.VI.employeeNameNotEmpty)  
    // kiểm tra ngày sinh
    dateOfBrith= exam_date(dateOfBrith,resource.VI.errorDateOfBrith);
    //kiểm tra ngày xác thực
   identityDate =exam_date(identityDate,resource.VI.errorDate);
    // 2 build object
    let employee={
      "employeeCode":employeeCode,
      "employeeName":employeeName,
      "dateOfbrith":dateOfBrith,
      "gender":genderNumber,
     "position":eployeePosition,
      "email":employeeEmail,
      "departmentId": selectedDepartment,
      "identityCode":identityCode,
      "identityDate":identityDate,
      "address":employeeAddress,
       "landlinePhone":employeePhone,
      "bankAccount":employeeBankAcount,
      "bankName":employeeBankName,
      "branch":branch,
      "phoneNumber":employeePhoneNumber,
      "identityPlace":identityPlace
    }
    console.log(employee);
    // 3 gọi api thực hiện thêm mới
     // hiển thị loading 
    
     $(".m-loading").show();
     if(forMode==misaEnum.forMode.Add)
     {
      $.ajax({
        type: "POST",
        url: "https://localhost:7159/api/v1/Employees",
        data: JSON.stringify(employee),
        dataType: "json",
        contentType:"application/json",
        success: function (response) {
           // sau khi thực hiên thêm xong form thêm mới được hiển thị để thêm mới tiếp
          loadData();
          format_form();
        },
        error:function (response) {
          //hiển thị thông báo lỗi
          showAndHideDialogExitsCode();
           
          }
      });
     }
     else{
      $.ajax({
        type: "PUT",
        url: `https://localhost:7159/api/v1/Employees/${empId}`,
        data: JSON.stringify(employee),
        dataType: "json",
        contentType:"application/json",
        success: function (response) {
           // sau khi thực hiên chỉnh sửa xong thì form hiện lên và thêm mới 
           loadData();
           format_form();
        },
        error:function (response) {
          //hiển thị thông báo lỗi
          showAndHideDialogExitsCode();
           
          }
      });
     }
   
  })
}
// 7 validate dữ liêu ở những ô bắt buộc 
//created by BVHoang(14/01/02024)
function validate_required(){
  $("input[required]").click(function(){
    var me=this;
    validateInputRequired(me);
   })
}
// 8 click input checkbox để đổi background dòng đó
//created by BVHoang(14/01/02024)
function click_input_checkbox(){
  $(document).on('change', '.m-table-select', function() {
    // click vào ô checkbox của 1 dòng thì css cho dòng đó
    $(this).closest('tr').toggleClass('m-table-selected', this.checked);
  });
}
// 9 click vào nút xóa hiển thị thông báo xác nhận xóa nhân viên 
//created by BVHoang(14/01/02024)
function showDialogConfirmDelete(){
  //show dialog confirm-del
  $("#dialog_confirm_del").click(function(){
    $("#confirmDeleteLabel").text(resource.VI.confrimDelete.replace("${employeeCode}",empCode));
      $("#show-dialog-confirm-del").show();
  })

}
// 10 click vào không để tắt dialog xác nhận xóa
//created by BVHoang(14/01/02024)
function hide_dialog_confirm_del(){
  // hide dialog confirm-del
  $("#m-dialog-confirm-del-no").click(function(){
      $("#show-dialog-confirm-del").hide();
      $("#optionlist").hide();
  })
}
// 11 trang thái loading dữ liệu
//created by BVHoang(28/01/02024)
function status_loading()
{
  !function(){function t(t){this.element=t,this.animationId,this.start=null,this.init()}if(!window.requestAnimationFrame){var i=null;window.requestAnimationFrame=function(t,n){var e=(new Date).getTime();i||(i=e);var a=Math.max(0,16-(e-i)),o=window.setTimeout(function(){t(e+a)},a);return i=e+a,o}}t.prototype.init=function(){var t=this;this.animationId=window.requestAnimationFrame(t.triggerAnimation.bind(t))},t.prototype.reset=function(){var t=this;window.cancelAnimationFrame(t.animationId)},t.prototype.triggerAnimation=function(t){var i=this;this.start||(this.start=t);var n=t-this.start;800>n||(this.start=this.start+800),this.element.setAttribute("transform","rotate("+parseInt(Math.min(n/100,8))%8*45+" 16 16)");if(document.documentElement.contains(this.element))window.requestAnimationFrame(i.triggerAnimation.bind(i))};var n=document.getElementsByClassName("nc-loop_dots-06-32"),e=[];if(n)for(var a=0;n.length>a;a++)!function(i){e.push(new t(n[i]))}(a);document.addEventListener("visibilitychange",function(){"hidden"==document.visibilityState?e.forEach(function(t){t.reset()}):e.forEach(function(t){t.init()})})}();
}
// 12 xóa dữ liệu
// created by BVHoang(28/01/2024)
function delete_employee(){
  $("#m-dialog-confirm-del-yes").click(function(){
    $.ajax({
      type: "DELETE",
      url: `https://localhost:7159/api/v1/Employees/${empdel}`,
      success: function (response) {
         // sau khi thực hiên xóa xong thì loading lại dữ liệu và 
         // chọn chức năng
        $("#optionlist").hide();
        $("#show-dialog-confirm-del").hide();
        loadData();
      },
      error:function (response) {
         // alert(response.responseJSON.userMsg);
        }
    });
  })
 }
 //13 show toast thông báo 
//created by BVHoang(28/01/02024)
function show_toast(){
      $(".m-toast-box").show();
      setTimeout(function(){
          $(".m-toast-box").hide();
      }, 3000);
}
// 14 ấn vào nút reload bên trái ô tìm kiếm để load lại dữ liệu
// created by BVHoang(29/01/2024)
function reload_data(){
  $("#reload").click(function(){
    loadData();
})
}
/// 15 Tìm kiếm nhân viên theo mã tên hoặc số điện thoại
// created by BVhoang(31/01/2024)
function employeeSearch(){
  // Lắng nghe sự kiện khi người dùng nhấn phím
  $("#txtSearch").on('keypress', function(e) {
    
    // Kiểm tra nếu phím được nhấn là phím Enter (keyCode 13)
    if (e.which === 13) {
        // Gọi hàm tìm kiếm ở đây
        let searchString= $("#txtSearch").val();
        // thực hiện làm trống bảng khi tìm kiếm để hiển thị dữ liệu tìm kiếm
        $("table#tblEmployee tbody").empty();
       // performSearch();
       $.ajax({
        type: "GET",
        url: `https://localhost:7159/api/v1/Employees/employee/${searchString}`,
        success: function (response) {
          show_employee_number(response.length);
           // hiển thị dữ liệu tìm kiếm
           console.log(response);
           for(const employee of response)
           {
             var el=getDataAndShow(employee);
              $("table#tblEmployee tbody").append(el);
           }
            $(".m-loading").hide();
          
        },
        error:function (response) {
            // alert(response.responseJSON.userMsg);
          //  $(".m-loading").hide();
          }
      });
    }
});
}
// hiện thị thông báo mã nhân viên đã tồn tại 
// created By BVhoang(01/02/2024)
function showAndHideDialogExitsCode(){
  // show dialog exits-code
  $("#employeeCodeExistsLabel").text(resource.VI.employeeCodeExists.replace("${employeeCode}",empCode));
   $("#show-dialog-exits-code").show();
  // hide dialog exits-code
  $("#m-btn-hide-dialog-exits-code").click(function(){
   $("#show-dialog-exits-code").hide();
})
}

/// lấy dữ liệu gửi lên form khi ấn sửa
function get_infor_edit_employee(){
  $(".m-table").on("click", ".edit-employee", function() {
    // Xử lý khi nút được nhấn
    // Lấy dữ liệu của cả dòng chứa nút
    forMode=misaEnum.forMode.Edit;
    // lấy dữ liệu ở dòng lên form 
    let employee = $(this).closest("tr").data("entity");
       console.log(employee);
       empId=employee.EmployeeId;
       departmentId=employee.DepartmentId;
     // gọi lại hàm để lấy dữ liệu lên form
     get_rowdata_to_form(employee);
      // hiển thị form
      add_new_employee();
     
     
});
}
/// nhân bản nhân viên
function employee_relication(){
  $(".m-table").on("click", ".m-show", function() {
    // Xử lý khi nút được nhấn
    // Lấy dữ liệu của cả dòng chứa nút
    forMode=misaEnum.forMode.Edit;
    // lấy dữ liệu ở dòng lên form 
    let employee =$(this).closest("tr").data("entity");
       console.log(employee);
       empId=employee.EmployeeId;
       departmentId=employee.DepartmentId;
      // gọi hàm để lấy dữ liệu lên form 
      get_rowdata_to_form(employee);
      $("#txtEmployeeCode").val("NV-");
      // hiển thị form 
      $("#replication").click(function(){
       // hiển thị form 
       add_new_employee();
        $("#optionlist").hide();
     })
     
});
}
/// hiển thị số lượng bản ghi trả về 
//created by BVhoang(02/02/2024)
function show_employee_number(em){
  $("#employeeNumber").text(resource.VI.employeeNumber.replace("${employeeNumber}",em));
}
// format form khi thêm mới 
//created by BVhoang(02/02/2024)
function format_form(){
  // các input có class là .loadel sẽ được làm trống.
  $('.loaddel').val('');
  $("#txtEmployeeCode").val("NV-");
}
// Hàm để hiển thị thông tin phòng ban trong combobox
//created by BVhoang(02/02/2024)
function displayDepartments(departmentData) {
  var departmentSelect = $('#department');
  var uniqueDepartmentNames = []; // Mảng tạm để lưu trữ các giá trị không trùng lặp

  // Điền combobox từ danh sách đối tượng phòng ban
  $.each(departmentData, function(index, department) {
      // Kiểm tra xem giá trị đã tồn tại trong mảng chưa
      if (uniqueDepartmentNames.indexOf(department.DepartmentName) === -1) {
          uniqueDepartmentNames.push(department.DepartmentName); 
          // Nếu chưa tồn tại, thêm vào mảng
          departmentSelect.append('<option value="' + department.DepartmentId + '">' + department.DepartmentName + '</option>');
      }
  });
}
// hàm định dạng giới tính 
//created by BVhoang(02/02/2024)
function format_gender(epmGender){
  if(epmGender==1)
  {
    epmGender=resource.VI.Male;
  }
  else if(epmGender==0)
  {
    epmGender=resource.VI.Female;
  }
  else{
    epmGender=resource.VI.Other;
  }
  return epmGender;
}
/// hàm định dạng ngày tháng hiển thị ra là ngày tháng năm
//created by BVhoang(02/02/2024)
function format_date(dob){
  if(dob)
  {
    dob= new Date(dob);
    let date= dob.getDate();
    date =date<10 ?  `0${date}`:date;
    // lấy ngày 
    let month= dob.getMonth()+1;
    // lấy tháng
    month= month <10 ? `0${month}`:month;
    let year = dob.getFullYear();
    //lấy giá trị là ngày tháng năm
    dob= `${date}/${month}/${year}`;
  }
  else{
    dob = "";
  }
  return dob;
}
/// hiển thị form thêm mới 
//created by BVhoang(02/02/2024)
function add_new_employee(){
  // 3 hiển thị form thêm mới 
  $("#dialogadd").show();
  // focus vào ô nhập liệu đầu tiên
  $("#txtEmployeeCode").focus();
}
/// kiểm tra ngày sinh hay ngày xác thực , nếu lớn hơn ngày hiện tại thì đưa ra thông báo lỗi
//created by BVhoang(02/02/2024)
function exam_date(examDate,infor){
  if(examDate){
    examDate=new Date(examDate);
    if(examDate> new Date())
    {
      alert(infor);
    }
  }
  else {
    examDate=null;
  }
  return examDate;
}
/// kiểm tra thông tin không được để trống
function infor_not_empty(input,infor){
  if(input== null||input===""){
    $("#inforNotEmpty").text(infor);
      $("#show-dialog-empty").show();
      $("#m-btn-hide-dialog-empty").click(function(){
       $("#show-dialog-empty").hide();
      })
   }
}

/// lấy dữ liệu trả về từ api format lại và hiển thị lên table
/// created by BVHoang(02/02/2024)
function getDataAndShow(employee){
  let employeeCode= employee.EmployeeCode;
  let employeeName= employee.EmployeeName;
  let employeeGender= employee.Gender;
  let employeedob= employee.DateOfBrith ?? "";
  let employeeIdentityCode= employee.IdentityCode ?? "";
  let employeePosition= employee.Position ?? "";
  let DepartmentId= employee.DepartmentId;
  let DepartmentName= employee.DepartmentName;
  let employeeBankAcount= employee.BankAccount ?? "";
  let employeeBankName= employee.BankName ?? "";
  let employeeBranch=employee.Branch ?? "";
  // ?? "" kiểm tra giá trị có null hay ko nếu null trả về ""

  //định dạng giới tính 
  employeeGender = format_gender(employeeGender);
 // định dạng ngày tháng hiển thị ra là ngày tháng năm
 
  employeedob= format_date(employeedob);  

  var el=$(`<tr>
  <td class="m-content-center" ><input type="checkbox" class="m-table-select"></td>
   <td class="m-content-left">${employeeCode}</td>
   <td class="m-content-left">${employeeName}</td>
   <td class="m-content-left">${employeeGender}</td>
   <td class="m-content-center">${employeedob}</td>
   <td class="m-content-left" >${employeeIdentityCode}</td>
   <td class="m-content-left">${employeePosition}</td>
   <td>${DepartmentName}</td>
   <td>${employeeBankAcount}</td>
   <td>${employeeBankName}</td>
   <td>${employeeBranch}</td>
   <td class="m-content-center">
   <div class="m-show-options m-content-center">
          <div class="m-btn-show">
             <div><label id="editemployee" class="edit-employee" for="">Sửa</label></div>
              <div><button id="m-show" class="m-show m-icon-show-options">
             </button></div>
          </div> 
         
   </div>
  </td>
</tr>`);
    el.data("entity",employee);

    return el;
}
/// lấy dữ liệu từ dòng gửi lên form 
/// created by BVHoang(02/02/2024)
function get_rowdata_to_form(employee){
  $("#txtEmployeeCode").val(employee.EmployeeCode);
  $("#txtEmployeeName").val(employee.EmployeeName);
  $("#txtIdentityCode").val(employee.IdentityCode);
  $("#txtPosition").val(employee.Position);
  $("#txtAccountBank").val(employee.BankAccount);
  $("#txtBankName").val(employee.BankName);
  $("#txtBranch").val(employee.Branch);
 // $("#txtIdentityDate").val(employee.IdentityDate);
  $("#txtIdentityPlace").val(employee.IdentityPlace);
  $("#txtPhone").val(employee.LandLinePhone);
  $("#txtPhoneNumber").val(employee.PhoneNumber);
  $("#txtEmail").val(employee.Email);
  $("#txtAddress").val(employee.Address);
  // lấy dữ liệu ngày sinh lên form
  let gender= employee.Gender;
  let dob=employee.DateOfBrith;
  if(dob==null)
  {
    dob="";
  }
  else{
    $("#txtDateOfBrith").val( dob.substring(0,10));
  }
 //lấy dữ liệu này cấp lên form
 let idenDate= employee.IdentityDate;
 if(idenDate==null)
 {
  idenDate="";
 }
 else{
   $("#txtIdentityDate").val( idenDate.substring(0,10));
 }
// lấy dữ liệu giới tính lên form 
if (gender === 1) {
  document.getElementById('txtMale').checked = true;
} else if (gender===0) {
  document.getElementById('txtFemale').checked = true;
}
else{
  document.getElementById('txtOther').checked = true;
}
}
/// khi ấn nút lưu trên form
/// created by BVHoang(02/02/2024)
function click_save_employee(){
  $("#btnSave").click(function(){
    //validate dữ liệu
    //1 họ tên không được để trống
    // mã nhân viên không được để trống
    // ngay sinh không được lớn hơn ngày hiện tại
    // email phải đúng định dạng
    let employeeCode= $("#txtEmployeeCode").val();
    empCode=employeeCode;
    let employeeName= $("#txtEmployeeName").val();
    let dateOfBrith= $("#txtDateOfBrith").val();
    let identityCode=$("#txtIdentityCode").val();
    let identityDate=$("#txtIdentityDate").val();
    let eployeePosition=$("#txtPosition").val();
    let identityPlace=$("#txtIdentityPlace").val();
    let employeeAddress=$("#txtAddress").val();
    let employeePhoneNumber=$("#txtPhoneNumber").val();
    let employeePhone=$("#txtPhone").val();
    let employeeEmail=$("#txtEmail").val();
    let employeeBankAcount=$("#txtAccountBank").val();
    let employeeBankName=$("#txtBankName").val();
    let branch=$("#txtBranch").val();
    //lấy id của phòng ban được chọn trong combobox
    let selectedDepartment = $('#department').val();
    // lấy giá trị của gender
     let genderRadios = document.getElementsByName('gender');
      var selectedGender ;
      for (var i = 0; i < genderRadios.length; i++) {
        if (genderRadios[i].checked) {
          selectedGender = genderRadios[i].value;
         // console.log(selectedGender);
          break;
        }
      }
      // chuyển giới tính về dạng số 
      var genderNumber = parseInt(selectedGender, 10);
    /// kiểm tra không để trống dữ liệu mã nhân viên và tên nhân viên
    infor_not_empty(employeeCode,resource.VI.employeeCodeNotEmpty)
    ///kiểm tra không để trống dữ liệu tên nhân viên
    infor_not_empty(employeeName,resource.VI.employeeNameNotEmpty)  
    // kiểm tra ngày sinh
    dateOfBrith= exam_date(dateOfBrith,resource.VI.errorDateOfBrith);
    //kiểm tra ngày xác thực
   identityDate =exam_date(identityDate,resource.VI.errorDate);
    // 2 build object
    let employee={
      "employeeCode":employeeCode,
      "employeeName":employeeName,
      "dateOfbrith":dateOfBrith,
      "gender":genderNumber,
     "position":eployeePosition,
      "email":employeeEmail,
      "departmentId": selectedDepartment,
      "identityCode":identityCode,
      "identityDate":identityDate,
      "address":employeeAddress,
       "landlinePhone":employeePhone,
      "bankAccount":employeeBankAcount,
      "bankName":employeeBankName,
      "branch":branch,
      "phoneNumber":employeePhoneNumber,
      "identityPlace":identityPlace
    }
    console.log(employee);
    // 3 gọi api thực hiện thêm mới
     // hiển thị loading 
    
     $(".m-loading").show();
     if(forMode==misaEnum.forMode.Add)
     {
      $.ajax({
        type: "POST",
        url: "https://localhost:7159/api/v1/Employees",
        data: JSON.stringify(employee),
        dataType: "json",
        contentType:"application/json",
        success: function (response) {
           // sau khi thực hiên thêm xong thì ẩn loading , ẩn form chi tiết, loading lại dữ liệu
          $(".m-loading").hide();
          $("#dialogadd").hide();
          loadData();
          
        },
        error:function (response) {
          //hiển thị thông báo lỗi
          showAndHideDialogExitsCode();
            $(".m-loading").hide();
          }
      });
     }
     else{
      $.ajax({
        type: "PUT",
        url: `https://localhost:7159/api/v1/Employees/${empId}`,
        data: JSON.stringify(employee),
        dataType: "json",
        contentType:"application/json",
        success: function (response) {
           // sau khi thực hiên chỉnh sửa xong thì ẩn loading , ẩn form chi tiết, loading lại dữ liệu
          $(".m-loading").hide();
          $("#dialogadd").hide();
          loadData();
        },
        error:function (response) {
          //hiển thị thông báo lỗi
          showAndHideDialogExitsCode();
           
          }
      });
     }
   
  })
}

