 // Replace with your actual reCAPTCHA Site Key
      var RECAPTCHA_SITE_KEY = '6LeCiP4rAAAAAGrebB490_34Dyc27C7AkW_tCDhI';
      
      // Load reCAPTCHA v3 dynamically
      (function() {
        var script = document.createElement('script');
        script.src = 'https://www.google.com/recaptcha/api.js?render=' + RECAPTCHA_SITE_KEY;
        script.async = true;
        script.defer = true;
        document.head.appendChild(script);
      })();
      
      $(document).ready(function() {
        // jQuery Validation
        $("#contact-form").validate({
          rules: {
            name: {
              required: true,
              minlength: 2
            },
            phone: {
              required: true,
              minlength: 10,
              digits: true
            },
            email: {
              required: true,
              email: true
            },
            message: {
              required: true,
              minlength: 10
            }
          },
          messages: {
            name: {
              required: "Please enter your name",
              minlength: "Name must be at least 2 characters"
            },
            phone: {
              required: "Please enter your phone number",
              minlength: "Please enter a valid phone number",
              digits: "Please enter only numbers"
            },
            email: {
              required: "Please enter your email",
              email: "Please enter a valid email address"
            },
            message: {
              required: "Please enter your message",
              minlength: "Message must be at least 10 characters"
            }
          },
          errorPlacement: function(error, element) {
            error.insertAfter(element);
          },
          highlight: function(element) {
            $(element).addClass('error').removeClass('valid');
          },
          unhighlight: function(element) {
            $(element).removeClass('error').addClass('valid');
          },
          submitHandler: function(form) {
            // Check if grecaptcha is loaded
            if (typeof grecaptcha === 'undefined') {
              $('#form-messages').html(
                '<div class="alert-message alert-error" style="display:block;">' + 
                'reCAPTCHA is still loading. Please wait a moment and try again.' + 
                '</div>'
              );
              return false;
            }
            
            // Get reCAPTCHA token before submit
            grecaptcha.ready(function() {
              grecaptcha.execute(RECAPTCHA_SITE_KEY, {action: 'submit'}).then(function(token) {
                $('#recaptcha-token').val(token);
                
                // Show loading state
                var $btn = $(form).find('button[type="submit"]');
                var originalText = $btn.text();
                $btn.addClass('btn-loading').text('Sending...').prop('disabled', true);
                
                // Submit form via AJAX
                $.ajax({
                  type: 'POST',
                  url: $(form).attr('action'),
                  data: $(form).serialize(),
                  dataType: 'json',
                  success: function(response) {
                    $btn.removeClass('btn-loading').text(originalText).prop('disabled', false);
                    
                    if (response.success) {
                      $('#form-messages').html(
                        '<div class="alert-message alert-success" style="display:block;">' + 
                        response.message + 
                        '</div>'
                      );
                      form.reset();
                      $(form).find('.valid').removeClass('valid');
                    } else {
                      $('#form-messages').html(
                        '<div class="alert-message alert-error" style="display:block;">' + 
                        response.message + 
                        '</div>'
                      );
                    }
                    
                    // Scroll to message
                    $('html, body').animate({
                      scrollTop: $('#form-messages').offset().top - 100
                    }, 500);
                    
                    // Hide message after 5 seconds
                    setTimeout(function() {
                      $('#form-messages').fadeOut();
                    }, 5000);
                  },
                  error: function(xhr, status, error) {
                    $btn.removeClass('btn-loading').text(originalText).prop('disabled', false);
                    $('#form-messages').html(
                      '<div class="alert-message alert-error" style="display:block;">' + 
                      'An error occurred. Please try again later.' + 
                      '</div>'
                    );
                    console.error('Form submission error:', error);
                  }
                });
              }).catch(function(error) {
                console.error('reCAPTCHA error:', error);
                $('#form-messages').html(
                  '<div class="alert-message alert-error" style="display:block;">' + 
                  'reCAPTCHA verification failed. Please refresh the page and try again.' + 
                  '</div>'
                );
              });
            });
            return false;
          }
        });
      });