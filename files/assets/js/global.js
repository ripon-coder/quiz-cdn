var book_tbl;
var video_tbl;
$(document).ready(function(){
	var quizStatus = $('#quiz-status').val();
	var quizId = $('#quizId').val();
	if(quizStatus == 3){
		book_tbl = $('#book-tbl').DataTable({
	        "processing": true,
	        "serverSide": true,
	        "ordering":true,
	        "order": [[ 0, "desc" ]], 
	        "ajax":{
	             "url": window.get_book_url,
	             "dataType": "json",
	             "type": "POST",
	             "data":{ _token: window.token, quizId:quizId}
	        },
	        "columns": [
	            { "data": "id" },
	            { "data": "title" },
	            { "data": "language" },
	            { "data": "active"},
	            { "data": "options" } 
	        ],
	        "columnDefs":[  
	            {  
	                 "targets":[3],  
	                 "orderable":false,  
	            },
	            {  
	                 "targets":[4],  
	                 "orderable":false,  
	            },  
	       ],

	    });
	}

	//GET ALL VIDEO 
	if(quizStatus == 4){
		video_tbl = $('#video-tbl').DataTable({
	        "processing": true,
	        "serverSide": true,
	        "ordering":true,
	        "order": [[ 0, "desc" ]], 
	        "ajax":{
	             "url": window.get_video_url,
	             "dataType": "json",
	             "type": "POST",
	             "data":{ _token: window.token, quizId:quizId}
	        },
	        "columns": [
	            { "data": "id" },
	            { "data": "title" },
	            { "data": "language" },
	            { "data": "active"},
	            { "data": "options" } 
	        ],
	        "columnDefs":[  
	            {  
	                 "targets":[3],  
	                 "orderable":false,  
	            },
	            {  
	                 "targets":[4],  
	                 "orderable":false,  
	            },  
	       ],

	    });
	}

})


$(document).on('submit','#add-book-form', function(event){
    event.preventDefault();
	var link = $(this).attr('action');
  	var data = new FormData( $( 'form#add-book-form' )[ 0 ] );
  	$.ajax({
	    processData: false,
	    contentType: false,
	    data: data,
	    type: 'POST',
	    url: link,
	    success: function(response) {
            $('#add-book-modal').modal('hide');
            $("#add-book-form")[0].reset();
            toastr["success"](response.success);
            book_tbl.ajax.reload( null, false );
	    }
    });
})

$(document).on('click', '.edt-quiz-btn',function(){
	var id = $(this).attr('quiz-id');
	var data = new FormData();
	data.append('id', id);
	data.append('_token',window.token);
  	$.ajax({
	    processData: false,
	    contentType: false,
	    data: data,
	    type: 'POST',
	    url: window.edit_quiz,
	    success: function(response) {
	    	$('.set-edit-quiz').html(response);
	    	$('#edit-quiz-modal').modal('show');
	    }
    });
})




function editBook(book_id)
{
    var data = new FormData();
	data.append('book_id',book_id);
	data.append('_token',window.token);
	$.ajax({
	    processData: false,
	    contentType: false,
	    data: data,
	    type: 'POST',
	    url: window.edit_book,
	    success: function(response) {
            $('.set-edit-book-modal').html(response.book_modal);
            $('#edit-book-modal').modal('show');
	    }
	});
}

$(document).on('submit','#edit-book-form', function(event){
    event.preventDefault();
	var link = $(this).attr('action');
  	var data = new FormData( $( 'form#edit-book-form' )[ 0 ] );
  	$.ajax({
	    processData: false,
	    contentType: false,
	    data: data,
	    type: 'POST',
	    url: link,
	    success: function(response) {
            $('#edit-book-modal').modal('hide');
            book_tbl.ajax.reload( null, false );
            toastr["success"](response.success);
	    }
    });
})

function deleteBook(quiz_id, book_id)
{
    $.confirm({
    	title: 'Alert!',
    	content: 'Are you sure to delete this item?',
    	buttons: {
        	confirm: function () {
            	var data = new FormData();
                data.append('quiz_id',quiz_id);
                data.append('book_id',book_id);
  				data.append('_token',window.token);
				$.ajax({
				    processData: false,
				    contentType: false,
				    data: data,
				    type: 'POST',
				    url: window.delete_book,
				    success: function(response) {
                        book_tbl.ajax.reload( null, false );
				    	toastr["success"](response.success);
				    }
				});
       		},
        	cancel: function () {

        	},
    	}
	});
}


$(document).on('submit','#add-video-form', function(event){
    event.preventDefault();
	var link = $(this).attr('action');
  	var data = new FormData( $( 'form#add-video-form' )[ 0 ] );
  	$.ajax({
	    processData: false,
	    contentType: false,
	    data: data,
	    type: 'POST',
	    url: link,
	    success: function(response) {
	    	video_tbl.ajax.reload( null, false );
            $('#add-video-modal').modal('hide');
            $("#add-video-form")[0].reset();
            toastr["success"](response.success);
	    }
    });
})

function editVideo(video_id)
{

    var data = new FormData();
	data.append('video_id',video_id);
	data.append('_token',window.token);
	$.ajax({
	    processData: false,
	    contentType: false,
	    data: data,
	    type: 'POST',
	    url: window.edit_video,
	    success: function(response) {
            $('.set-edit-video-modal').html(response.video_modal);
            $('#edit-video-modal').modal('show');
	    }
	});
}

$(document).on('submit','#edit-video-form', function(event){
    event.preventDefault();
	var link = $(this).attr('action');
  	var data = new FormData( $( 'form#edit-video-form' )[ 0 ] );
  	$.ajax({
	    processData: false,
	    contentType: false,
	    data: data,
	    type: 'POST',
	    url: link,
	    success: function(response) {
	    	video_tbl.ajax.reload( null, false );
            $('#edit-video-modal').modal('hide');
            toastr["success"](response.success);
	    }
    });
})

function deleteVideo(quiz_id, video_id)
{
    $.confirm({
    	title: 'Alert!',
    	content: 'Are you sure to delete this item?',
    	buttons: {
        	confirm: function () {
            	var data = new FormData();
                data.append('quiz_id',quiz_id);
                data.append('video_id',video_id);
  				data.append('_token',window.token);
				$.ajax({
				    processData: false,
				    contentType: false,
				    data: data,
				    type: 'POST',
				    url: window.delete_video,
				    success: function(response) {
				    	toastr["success"](response.success);
				    	video_tbl.ajax.reload( null, false );
				    }
				});
       		},
        	cancel: function () {

        	},
    	}
	});
}


$(document).on('click','.remove-option',function(){
    $(this).closest('.option-name').remove();
})

$(document).on('click','.add-new-optiion',function(){
       var op = $( ".option-name" ).length;
    var html = '<div class="col-sm-6 option-name"><div class="row"><div class="col-sm-10"><div class="form-group form-default d-flex align-items-center"><span class="indentity-txt mr-2">'+(op+1)+'.</span><input type="text" name="option[]" class="form-control" placeholder="Option Name"></div></div><div class="col-sm-1"> <button class="btn waves-effect waves-dark btn-danger btn-outline-danger edit-del-btn remove-option"><i class="ti-trash"></i></button></div></div></div>';
    $('.set-new-option').append(html);
})

$(document).on('submit','#add-question-form', function(event){
    event.preventDefault();
    var variation_id = '';
    var language = ''
    var quiz_status = $('#quiz-status').val();
    console.log(quiz_status)
    if(quiz_status == 3){
    	$('#book-tbl tbody tr').each(function(){
	        if($(this).find('input[type="radio"]:checked').length > 0)
	        {
	            variation_id = $(this).find('input[type="radio"]:checked').val();
	        }
	    });
	    if(variation_id == ''){
	    	toastr["error"]("Please select Book");
        	return false;
	    }  
    } 
    if(quiz_status == 4){
    	$('#video-tbl tbody tr').each(function(){
	        if($(this).find('input[type="radio"]:checked').length > 0)
	        {
	            variation_id = $(this).find('input[type="radio"]:checked').val();
	        }
	    });
	    if(variation_id == ''){
	    	toastr["error"]("Please select Video");
        	return false;
	    }
        
    }
    if(quiz_status == 1 || quiz_status == 2){
    	$('#set-all-languages tr').each(function(){
	        if($(this).find('input[type="radio"]:checked').length > 0)
	        {
	            language = $(this).find('input[type="radio"]:checked').val();
	        }
	    });
	    variation_id = $('#quizId').val();
	    if(language == ''){
	    	toastr["error"]("Please select Language");
        	return false;
	    }
        
    }
	var link = $(this).attr('action');
    var data = new FormData( $( 'form#add-question-form' )[ 0 ] );
    data.append('variation_id',variation_id);
    data.append('status',quiz_status);
    data.append('language',language);
  	$.ajax({
	    processData: false,
	    contentType: false,
	    data: data,
	    type: 'POST',
	    url: link,
	    success: function(response) {
	    	$('#add-question-form')[0].reset();
	    	toastr["success"]("Saved!");
	    	console.log(response);
           getAllQuestion(variation_id, quiz_status, language);
	    }
    });
}) 

function getAllQuestion(variation_id, quiz_status, language)
{
	if(quiz_status == 1 || quiz_status == 2){
		$('.variationId').val(language);
	}

	if(quiz_status == 3 || quiz_status == 4){
		$('.variationId').val(variation_id);
	}
		
	//console.log("none");
    var data = new FormData();
	data.append('variation_id',variation_id);
	data.append('status',quiz_status);
	data.append('language',language);
	data.append('_token',window.token);
	$.ajax({
	    processData: false,
	    contentType: false,
	    data: data,
	    type: 'POST',
	    url: window.all_questions,
	    success: function(response) {
            $('.set-all-question').html(response.all_question);
            console.log(response);
	    }
	});

	$('.r_variation_id').val(variation_id);
	$('.r_quiz_status').val(quiz_status);
	$('.r_language').val(language);

}


function bookActive(book_id, quiz_id, status)
{
	console.log(book_id);
	var data = new FormData();
	data.append('book_id',book_id);
	data.append('status',status);
	data.append('quiz_id',quiz_id);
	data.append('_token',window.token);
	$.ajax({
	    processData: false,
	    contentType: false,
	    data: data,
	    type: 'POST',
	    url: window.book_active,
	    success: function(response) {
	    	book_tbl.ajax.reload( null, false );
	    }
	});
}

function videoActive(video_id, quiz_id, status)
{
	var data = new FormData();
	data.append('video_id',video_id);
	data.append('status',status);
	data.append('quiz_id',quiz_id);
	data.append('_token',window.token);
	$.ajax({
	    processData: false,
	    contentType: false,
	    data: data,
	    type: 'POST',
	    url: window.video_active,
	    success: function(response) {
            video_tbl.ajax.reload( null, false );
	    }
	});
}

function languageActive(quiz_id, column, status)
{
	var quiz_status = $('#quiz-status').val();
	var data = new FormData();
	data.append('column',column);
	data.append('status',status);
	data.append('quiz_id',quiz_id);
	data.append('quiz_status',quiz_status);
	data.append('_token',window.token);
	$.ajax({
	    processData: false,
	    contentType: false,
	    data: data,
	    type: 'POST',
	    url: window.language_active,
	    success: function(response) {
           	$('#set-all-languages').html(response);
	    }
	});
}



