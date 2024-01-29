$(document).ready(function() {
    // thưc hiện load dữ liệu 
    //1 gọi api lấy dữ liệu 
    // loading dữ liệu
    loadData();
    var forMode="edit";
    var empId=null;
    var empdel=null;
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
})
//0 validate dữ liệu không cho để trống dữ liệu yêu cầu
//created by BVHoang(13/01/02024)
function validateInputRequired(input){
  var me=this;
  let value= $(input).val();
      if(value== null||value===""){
        
        $(input).addClass("m-input-error");
        $(input).attr("title","Thông tin này không được để trống");
      }
      else{
        $(input).removeClass("m-input-error");
      
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
   // url:  "https://cukcuk.manhnv.net/api/v1/Employees",
   url:  "https://localhost:7159/api/v1/Employees",
    success: function (response) {
      for(const employee of response){
       // let employeeId=employee.EmployeeId;
        // let employeeCode= employee.EmployeeCode;
        // let employName= employee.FullName;
        // let employGender= employee.GenderName;
        // let employeedob= employee.DateOfBirth;
        // let employeeCMND= employee.PersonalTaxCode;
        // let employeePosition= employee.PositionName;
        // let employeeDepartment= employee.DepartmentName;
      //  let employeeId= employee.employeeId;
        let employeeCode= employee.employeeCode;
        let employName= employee.employeeName;
        let employGender= employee.genderName;
        let employeedob= employee.dateOfbrith;
        let employeeCMND= employee.identityCode;
        let employeePosition= employee.position;
        let employeeDepartment= employee.departmentId;
       // định dạng ngày tháng hiển thị ra là ngày tháng năm
        if(employeedob)
        {
          employeedob= new Date(employeedob);
          let date= employeedob.getDate();
          date =date<10 ?  `0${date}`:date;
          // lấy ngày 
          let month= employeedob.getMonth()+1;
          // lấy tháng
          month= month <10 ? `0${month}`:month;
          let year = employeedob.getFullYear();
          //lấy giá trị là ngày tháng năm
          employeedob= `${date}/${month}/${year}`;
        }
        else{
          employeedob="";
        }
        var el=$(`<tr>
        <td class="m-content-center" ><input type="checkbox" class="m-table-select"></td>
         <td class="m-content-left">${employeeCode}</td>
         <td class="m-content-left">${employName}</td>
         <td class="m-content-left">${employGender}</td>
         <td class="m-content-center">${employeedob}</td>
         <td class="m-content-left" >${employeeCMND}</td>
         <td class="m-content-left">${employeePosition}</td>
         <td>${employeeDepartment}</td>
         <td></td>
         <td></td>
         <td></td>
         <td class="m-content-center">
         <div class="m-show-options m-content-center">
                <div class="m-btn-show">
                   <div><label for="">Sửa</label></div>
                    <div><button id="m-show" class="m-show m-icon-show-options">
                   </button></div>
                </div> 
               
         </div>
        
         
         </td>
     </tr>`);
     el.data("entity",employee);
     $("table#tblEmployee tbody").append(el);
     $(".m-loading").hide();
      }
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
    forMode="add";
    // 3 hiển thị form thêm mới 
    $("#dialogadd").show();
    // focus vào ô nhập liệu đầu tiên
    $("#txtEmployeeCode").focus();
  })
}
// 4 show chức năng tùy chỉnh nhân viên 
//created by BVHoang(14/01/02024)
// function show_options_employee(){
//   $(document).on('click', '.m-show', function() {
//     //lấy ra vị trí của nút vừa ấn 
//     var buttonPosition = $(this).offset();
//     // css để hiển thị so với nút vừa ấn
//     $('.m-btn-options-list').css({
//       'position': 'absolute',
//       'top': buttonPosition.top + 'px',
//       'left': (buttonPosition.left-100) + 'px',
//     });
//     $("#optionlist").show();
//     // lấy dữ liệu là khóa chính ở dòng 
//     let employee= $(this).data("entity");
//     employeeId=employee.employeeId;
//     console.log(empId);
//   })
//   // ấn vào dòng bên cạnh để ẩn đi chức năng tùy chỉnh
//   $(".m-table").on("click","tr",function(){
//     $("#optionlist").hide();
//   })
// }
function show_options_employee(){
  $(".m-table").on("click", ".m-show", function() {
    // Xử lý khi nút được nhấn
    // Lấy dữ liệu của cả dòng chứa nút
    let rowData = $(this).closest("tr").data("entity");
    console.log(rowData);
    empdel =rowData.employeeId;
    console.log(empdel);
     //lấy ra vị trí của nút vừa ấn 
    var buttonPosition = $(this).offset();
    // css để hiển thị so với nút vừa ấn
    $('.m-btn-options-list').css({
      'position': 'absolute',
      'top': buttonPosition.top + 'px',
      'left': (buttonPosition.left-100) + 'px',
    });
    $("#optionlist").show();

    // Tiếp tục xử lý dữ liệu cần thiết tại đây
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
    forMode="edit";
    // lấy dữ liệu ở dòng lên form 
       let employee= $(this).data("entity");
       console.log(employee);
       empId=employee.employeeId;
      $("#txtEmployeeCode").val(employee.employeeCode);
      $("#txtEmployeeName").val(employee.employeeName);
     // $("#dtDateOfBrith").val(employee.DateOfBirth);
      // hiển thị form 
      $("#dialogadd").show();
      console.log(empId);
  })
}
// khi ấn nút cất và thêm của form thêm mới thì validate dữ liệu 
//created by BVHoang(14/01/02024)
function click_save_add_employee(){
  $("#btnSave").click(function(){
    //validate dữ liệu
    //1 họ tên không được để trống
    // mã nhân viên không được để trống
    // ngay sinh không được lớn hơn ngày hiện tại
    // email phải đúng định dạng
    // tiền lương phải là số
    let employeeCode= $("#txtEmployeeCode").val();
    let employeeName= $("#txtEmployeeName").val();
    let dateOfBrith= $("#txtDateOfBrith").val();
    // Xử lý sự kiện khi có thay đổi trạng thái của radio button
//     $('input[type="radio"]').change(function() {
//       // Lấy giá trị của radio button được chọn
//       let gender = $('input[name="gender"]:checked').val();
      
//       // In giá trị ra console để kiểm tra
//       console.log(gender);
//  });
    //let gender= $("#txtEmployeeCode").val();
    let unit=$("#cboUnit").val();
    let identityCode=$("#txtIdentityCode").val();
    let identityDate=$("#txtidentityDate").val();
    let eployeePosition=$("#txtPosition").val();
    let identityPlace=$("#txtIdentityPlace").val();
    let employeeAddress=$("#txtAddress").val();
    let employeePhoneNumber=$("#txtPhoneNumber").val();
    let employeePhone=$("#txtPhone").val();
    let employeeEmail=$("#txtEmail").val();
    let employeeBankAcount=$("#txtAccountBank").val();
    let employeeBankName=$("#txtBankName").val();
    let branch=$("#txtBranch").val();
    // let salary= $("#txtSalary").val();
    if(employeeCode== null||employeeCode===""){
      // alert("tên sinh viên không được để trống");
    }
    if(dateOfBrith){
      dateOfBrith=new Date(dateOfBrith);
    }
    if(dateOfBrith> new Date())
    {
      alert("Ngày sinh không được lớn hơn ngày hiện tại");
    }

    // 2 build object
    let employee={
      "employeeCode":employeeCode,
      "employeeName":employeeName,
      "dateOfbrith":dateOfBrith,
      "identityCode":identityCode,
      "position":eployeePosition,
      "email":employeeEmail,
    //  "gender":gender
      //"DepartmentName":donVi
    }

    // 3 gọi api thực hiện thêm mới
     // hiển thị loading 
    
     $(".m-loading").show();
     if(forMode=="add")
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
            // alert(response.responseJSON.userMsg);
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
           // sau khi thực hiên thêm xong thì ẩn loading , ẩn form chi tiết, loading lại dữ liệu
          $(".m-loading").hide();
          $("#dialogadd").hide();
          loadData();
        },
        error:function (response) {
           // alert(response.responseJSON.userMsg);
            $(".m-loading").hide();
          }
      });
     }
    
    // sau khi thực hiên thêm xong thì ẩn loading , ẩn form chi tiết, loading lại dữ liệu

    //hiển thị trạng thái lỗi validate khi không nhập vào các trường bắt buộc
   
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
    // Find the closest 'tr' (table row) and toggle the 'selected-row' class
    $(this).closest('tr').toggleClass('m-table-selected', this.checked);
  });
}
// 9 click vào nút xóa hiển thị thông báo xác nhận xóa nhân viên 
//created by BVHoang(14/01/02024)
function showDialogConfirmDelete(){
 $(document).on("click","#dialog_confirm_del",function(){
   
    // lấy dữ liệu ở dòng lên form 
      // let employee= $(this).data("entity");
      // empId=employee.employeeId;
      // $("#txtEmployeeCode").val(employee.employeeCode);
      // $("#txtEmployeeName").val(employee.employeeName);
     // $("#dtDateOfBrith").val(employee.DateOfBirth);
      // hiển thị form 
      //$("#dialogadd").show();
      //console.log(empId);
  //  $("#dialog_confirm_del").click(function(){
  //     // lấy dữ liệu là khóa chính ở dòng 
  //     let employee= $(this).data("entity");
  //     empdel=employee.employeeId;
  //     console.log(del);
  //     $("#show-dialog-confirm-del").show();
      
 })
  //})
  //show dialog confirm-del
  $("#dialog_confirm_del").click(function(){
      // lấy dữ liệu là khóa chính ở dòng 
      // let employee= $(this).data("entity");
      // employeeId=employee.EmployeeId;
      // console.log(empId);
      $("#show-dialog-confirm-del").show();
  })

}
// 10 click vào không để tắt dialog xác nhận xóa
//created by BVHoang(14/01/02024)
function hide_dialog_confirm_del(){
  // hide dialog confirm-del
  $("#m-dialog-confirm-del-no").click(function(){
      $("#show-dialog-confirm-del").hide();
  })
  $(".m-table").on("dblclick","tr",function(){
   
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
      // lấy dữ liệu là khóa chính ở dòng 
      // let employee= $(this).data("entity");
      // employeeId=employee.employeeId;
      // console.log(empId);
    $.ajax({
      type: "DELETE",
      url: `https://cukcuk.manhnv.net/api/v1/Employees/${empdel}`,
      data: JSON.stringify(rowData),
      dataType: "json",
      contentType:"application/json",
      success: function (response) {
         // sau khi thực hiên xóa xong thì loading lại dữ liệu
        //$(".m-loading").hide();
        $("#optionlist").hide();
       // show_toast();
        loadData();

      },
      error:function (response) {
         // alert(response.responseJSON.userMsg);
          //$(".m-loading").hide();
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


