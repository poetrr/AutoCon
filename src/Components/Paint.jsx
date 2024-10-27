import React, { useState } from 'react';

function PaintComponent() {
  const [unit, setUnit] = useState('Feet/Inch');
  const [length, setLength] = useState(null);
  const [width, setWidth] = useState(null);
  const [height, setHeight] = useState(null);
  const [kgs, setKgs] = useState(null);
  const [sqft, setSqft] = useState(null);
  const [emulsion, setEmulsion] = useState(null);
  const [primer, setPrimer] = useState(null);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [showResult, setShowResult] = useState(false);

  const calculate = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setShowResult(false);

    if (length && width && height) {
      const calculatedSqft = (2 * length * 10) + (2 * width * 10) + (length * width);
      const calculatedKgs = calculatedSqft * 0.176;
      const calculatedPrimer = calculatedSqft * 0.0147;
      const calculatedEmulsion = calculatedSqft * 0.0147;

      setSqft(calculatedSqft);
      setKgs(calculatedKgs);
      setPrimer(calculatedPrimer);
      setEmulsion(calculatedEmulsion);
      setShowResult(true);
    }
  };

  const handleInputChange = () => {
    setShowResult(false); // Hide results if inputs are changed
  };

  const addToProject = () => {
    // Check if all fields are filled before allowing "Add to Project"
    if (length && width && height) {
      alert('Added to project');
    } else {
      setFormSubmitted(true); // Mark the form as submitted to show validation errors
      alert('Please fill in all the required fields before adding to the project');
    }
  };

  return (
    <div style={styles.container}>
      <form className="form needs-validation" onSubmit={calculate} noValidate>
        <div className="paint container mt-4">
            <h2>Paint Calculation</h2>
          <div className="form-group row" style={styles.formGroup}>
            <label htmlFor="unit" style={styles.label}>Unit:</label>
            <select
              id="unit"
              name="unit"
              className="form-control"
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              style={styles.input}
            >
              <option value="Feet/Inch">Feet/Inch</option>
              <option value="Meter">Meter/CM</option>
            </select>
          </div>

          <div className="form-group row" style={styles.formGroup}>
            <label htmlFor="length" style={styles.label}>Length:</label>
            <input
              type="number"
              id="length"
              name="length"
              className="form-control"
              placeholder="example: 10"
              value={length || ''}
              onChange={(e) => setLength(Number(e.target.value))}
              required
              min="1"
              onInput={handleInputChange}
              style={styles.input}
            />
            {formSubmitted && !length && (
              <div className="invalid-feedback d-block" style={styles.error}>
                Input not entered or invalid.
              </div>
            )}
          </div>

          <div className="form-group row" style={styles.formGroup}>
            <label htmlFor="width" style={styles.label}>Width:</label>
            <input
              type="number"
              id="width"
              name="width"
              className="form-control"
              placeholder="example: 16"
              value={width || ''}
              onChange={(e) => setWidth(Number(e.target.value))}
              required
              min="1"
              onInput={handleInputChange}
              style={styles.input}
            />
            {formSubmitted && !width && (
              <div className="invalid-feedback d-block" style={styles.error}>
                Input not entered or invalid.
              </div>
            )}
          </div>

          <div className="form-group row" style={styles.formGroup}>
            <label htmlFor="height" style={styles.label}>Height:</label>
            <input
              type="number"
              id="height"
              name="height"
              className="form-control"
              placeholder="example: 10"
              value={height || ''}
              onChange={(e) => setHeight(Number(e.target.value))}
              required
              min="1"
              onInput={handleInputChange}
              style={styles.input}
            />
            {formSubmitted && !height && (
              <div className="invalid-feedback d-block" style={styles.error}>
                Input not entered or invalid.
              </div>
            )}
          </div>

          <div className="form-group row" style={styles.buttonGroup}>
            <button type="submit" className="btn btn-primary" style={styles.button}>
              Calculate
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              style={styles.button}
              onClick={addToProject}
            >
              Add to Project
            </button>
          </div>
        </div>

        {showResult && (
          <div className="mt-4">
            <div className="alert alert-info">
              <p>Putty: {kgs} kgs</p>
              <p>Primer: {primer} litres</p>
              <p>Emulsion: {emulsion} litres</p>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

const styles = {
  container: {
    border: '1px solid #ccc',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    maxWidth: '600px',
    margin: '20px auto',
    backgroundColor: '#f9f9f9',
  },
  formGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '1rem',
  },
  label: {
    flex: '1',
    fontSize: '1.1rem',
    marginRight: '1rem',
    textAlign: 'right',
  },
  input: {
    flex: '2',
    padding: '0.5rem',
    borderRadius: '5px',
    border: '1px solid #ced4da',
  },
  error: {
    color: 'red',
    fontSize: '0.9rem',
  },
  buttonGroup: {
    display: 'flex',
    justifyContent: 'center',
    gap: '1rem',
  },
  button: {
    flex: '1',
    padding: '0.75rem',
  },
};

export default PaintComponent;
