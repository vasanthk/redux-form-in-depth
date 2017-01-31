/**
 * The only thing that has changed about form submission is that your submit validation errors must now
 * be wrapped in a SubmissionError object. This is to distinguish between validation errors
 * and AJAX or server errors.
 */

// v5
function render() {
  return <MyForm onSubmit={values =>
    ajax.send(values) // however you send data to your server...
      .catch(error => {
        // how you pass server-side validation errors back is up to you
        if(error.validationErrors) {
          return Promise.reject(error.validationErrors)
        } else {
          // what you do about other communication errors is up to you
          reportServerError(error)
        }
      })
}/>
}

// v6
function render() {
  return <MyForm onSubmit={values =>
    ajax.send(values)
      .catch(error => {
        if(error.validationErrors) {
          throw new SubmissionError(error.validationErrors); // <----- only difference
        } else {
          reportServerError(error)
        }
      })
}/>
}
