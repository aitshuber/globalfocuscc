
  var submitted = false;
  var tokenCreated = false;
  var formEl = document.getElementById('global-focus');

  formEl.addEventListener("submit", function (event) {

	// Check if the recaptcha exists
	if (!tokenCreated) {

	  // Prevent submission
	  event.preventDefault();

	  // Prevent more than one submission
	  if (!submitted) {
		submitted = true;
		// needs for recaptacha ready
		grecaptcha.ready(function() {
		  // do request for recaptcha token
		  // response is promise with passed token
		  grecaptcha.execute('6Lfj6lQiAAAAAF9CJsXf_94GfaJLJuiMUnizqzV7', {action: 'create_comment'}).then(function (token) {
			// add token to form
			var input = document.createElement("input");
			input.type = "hidden";
			input.name = "g-recaptcha-response";
			input.value = token;
			formEl.appendChild(input);

			// resubmit the form
			tokenCreated = true;
			formEl.submit();
		  });
		});
	  }
	}
  });
