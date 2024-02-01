$(document).ready(function(){
    show_toast();
   showAndHideDialogEmpty();
    showAndHideDialogExitsCode();
   showAndHideDialogConfirmDelete();
    $('.m-table-selected').change(function() {
        // Find the closest 'tr' (table row) and toggle the 'selected-row' class
        $(this).closest('tr').toggleClass('m-table-selected', this.checked);
      });
    })


//1 show and hide dialog empty
//created by BVHoang(14/01/02024)
function showAndHideDialogEmpty(){
     // show dialog empty
     $("#btn-show-dialog-empty").click(function(){
        $("#show-dialog-empty").show();
    })
    // hide dialog-empty
    $("#m-btn-hide-dialog-empty").click(function(){
        $("#show-dialog-empty").hide();
    })
}
//2 show and hide dialog exits code
//created by BVHoang(14/01/02024)
function showAndHideDialogExitsCode(){
       // show dialog exits-code
       $("#btn-show-dialog-exits-code").click(function(){
        $("#show-dialog-exits-code").show();
    })
    // hide dialog exits-code
    $("#m-btn-hide-dialog-exits-code").click(function(){
        $("#show-dialog-exits-code").hide();
    })
}
//3 show and hide dialog confirm delete
//created by BVHoang(14/01/02024)
function showAndHideDialogConfirmDelete(){
    // show dialog confirm-del
    $("#btn-show-dialog-confirm-del").click(function(){
        $("#show-dialog-confirm-del").show();
    })
    // hide dialog confirm-del
    $("#m-dialog-confirm-del-yes").click(function(){
        $("#show-dialog-confirm-del").hide();
    })
}
//4 show toast thông báo 
//created by BVHoang(14/01/02024)
function show_toast(){
    $("#show-toast").click(function(){
        $(".m-toast-box").show();
        setTimeout(function(){
            $(".m-toast-box").hide();
        }, 3000);
    })
}