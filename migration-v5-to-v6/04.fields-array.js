/**
 * To get the field array object that was passed as a prop to the whole form in v5,
 * you must use the FieldArray component, much like the Field component is used.
 */

// v5
function render() {
  const { fields: { awards } } = this.props;
  return (
    <div>
      <ul>
        {awards.map((award, index) => <li key={index}>
          <label htmlFor="award">Award #{index + 1}</label>
          <input type="text" {...award.input}/>
        </li>)}
      </ul>
      <button onClick={() => awards.addField()}>Add Award</button>
    </div>
  )
}

// v6
const renderAwards = ({ fields }) =>
  <div>
    <ul>
      {fields.map((name, index) => <li key={index}>
        <label htmlFor={name}>Award #{index + 1}</label>
        <Field name={name} type="text" component="input"/>
      </li>)}
    </ul>
    <button onClick={() => fields.push()}>Add Award</button>
  </div>;

function render() {
  return (
    <div>
      <FieldArray name="awards" component={renderAwards}/>
    </div>
  )
}
