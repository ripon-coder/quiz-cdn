function conditionField(e){
    if(e == "above/adult"){
       $(".condition_field").addClass("d-none");
       $(".condition_field").find("input").attr('disabled',true);
    }else{
        $(".condition_field").removeClass("d-none");
        $(".condition_field").find("input").attr('disabled',false);
    }

}

$( document ).ready(function() {
    // $("iframe").addClass("d-none");
    //$('iframe').addClass('my-class');

    $(".setVideo iframe").css("height:200px");
});

