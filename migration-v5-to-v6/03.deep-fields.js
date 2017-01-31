// v5
function render() {
  const {
    fields: {
      contact: {
        shipping: { street }
        }
      }
    } = this.props;
  return (
    <div>
      <input type="text" {...street}/>
    </div>
  )
}

// v6
// You simply use dot-syntax on your field name.
function render() {
  return (
    <div>
      <Field name="contact.shipping.street" component="input" type="text"/>
    </div>
  )
}