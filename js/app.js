$(document).ready(function(){

  viewLesson();
  login();
  validateLoginForm();
  validateRegisterForm();


   //validate register form 
  function validateRegisterForm(){
    $('#registerForm').validate({
    rules:{
      name:{
        required: true,
      },
      username:{
        required: true,
        minlength: 3
      },
      email:{
        required: true,
        email: true     
      },
      password:{
        required: true,
        minlength:5
      },
      confirm_password: {
        required: true,
        equalTo: "#password"
      }
    },
    messages:{
      name:{
        required: "Please enter your name"
      },
      username:{
        required: "Please enter a username",
        minlength: "Your username must atleast 3 characters"
      },
      email: {
        required: "Please enter an email",
        email: "Please provide a valid email"
        },
      password:{
        required: "Please enter  password",
        minlength: "Your password must atleast 5 characters"
        },
      confirm_password:{
        required: "Please enter confirm password",
        equalTo: "Please enter the same password as above"
        }
    },
      errorElement: "em",
      errorPlacement: function ( error, element ) {
      // Add the `help-block` class to the error element
      error.addClass( "help-block" );

      if ( element.prop( "type" ) === "checkbox" ) {
        error.insertAfter( element.parent( "label" ) );
      } else {
        error.insertAfter( element );
      }     
    },
      highlight: function ( element, errorClass, validClass ) {
        $( element ).closest( ".form-group" ).addClass( "has-error" ).removeClass( "has-success" );
      },
      unhighlight: function (element, errorClass, validClass) {
        $( element ).closest( ".form-group" ).addClass( "has-success" ).removeClass( "has-error" );
      },
        submitHandler: register
      
      });
    }
  
  //end validation for register

  //form for register user
  function register(){
    var form = $('#registerForm');
    $.ajax({
      type: 'POST',
      url: "register_user.php",
      data: form.serialize(),
      success: function(response){
        if (response == "Successfully registered" ) {
           $('#registerForm')[0].reset();
           $( ".form-group" ).removeClass( "has-success" );
           $('#message').html(response).removeClass('alert alert-danger').addClass('alert alert-success text-center');
        }else{
          $('#message').html(response).removeClass('alert alert-success').addClass('alert alert-danger text-center');
           $( ".form-group" ).removeClass( "has-success" );
          $('#password').val('');
          $('#confirm_password').val('');
        }
      }
    });
  }
 //end validation for register
  

  //validate login form
  function validateLoginForm(){
    $('#formLogin').validate({
      rules:{
        _email:{
            required:true,
        },
        _password:{
            required:true,
        }

      },
      messages:{
        _email:{
          required: "Email is required"    
        },
        _password:{
          required: "Password is required"
        }
      },
      errorElement: "em",
      errorPlacement: function ( error, element ) {
      // Add the `help-block` class to the error element
      error.addClass( "help-block" );

        if ( element.prop( "type" ) === "checkbox" ) {
          error.insertAfter( element.parent( "label" ) );
        } else {
          error.insertAfter( element );
        }     
      },
      highlight: function ( element, errorClass, validClass ) {
        $( element ).closest( ".form-group" ).addClass( "has-error" ).removeClass( "has-success" );
      },
      unhighlight: function (element, errorClass, validClass) {
        $( element ).closest( ".form-group" ).addClass( "has-success" ).removeClass( "has-error" );
      },
      submitHandler: login

    });
  }
  //end validation for login form

  //function for viewing of lesson and topics    
  function viewLesson(){
    $.ajax({
  	type: 'POST',
  	url: "view.php",
  	success: function(result){			
  	 setInterval(function(){
  	 $('#container').load('view.php');
  	 }, 1000);						
  	}
  });
}
//end view function

  //clear modal when close
  $('.modal').on('hidden.bs.modal', function(){
     $('#loginForm')[0].reset();
     $( ".form-group" ).removeClass( "has-success" );
     $('#error').hide();
  });
  
  //call login modal
   $('#btnShowLoginModal').click(function (e){
      e.preventDefault();
      $('#loginModal').modal("show");
   }); 

  //function login
  function login(){
    $('#error').hide();
    $('#formLogin').submit(function(e){
    e.preventDefault();
    var email = $('#email').val();
    var password = $('#pwd').val();

    if (email != '' && password  != '') {   
      $.ajax({
      type: 'POST',
      data:{email: email, password:password},
      url: "login.php",
      beforeSend: function(){
        $('#btnLogin').html('Logging in....');  
      }, 
      success:function(result){
      if (result == 1) {
        $('#error').hide();
          setTimeout("window.location.href='admin'", 1000);
      }else if(result == 2){
          $('#error').hide();
          setTimeout("window.location.href='user'", 1000);
      }else{  
          $('#error').show().html(result);
          $('#btnLogin').html('Login');
          $( ".form-group" ).removeClass( "has-success" );
          $('#pwd').val('');
          setTimeout(function(){
          $('#error').hide();
              }, 5000);
            }
          }
        });
      }    
    });
  }
  //end function login



});


  	
  	