import React, { useState } from 'react';

const styles = {
  container: {
    maxWidth: '600px',
    margin: '20px auto',
    padding: '20px',
    boxShadow: '0 0 10px rgba(0,0,0,0.1)',
    borderRadius: '8px',
    backgroundColor: 'white'
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '20px'
  },
  title: {
    fontSize: '1.5rem',
    color: '#333',
    fontWeight: 'bold'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '20px'
  },
  inputGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px'
  },
  label: {
    fontSize: '1rem',
    color: '#444'
  },
  input: {
    padding: '8px 12px',
    border: '1px solid #ccc',
    borderRadius: '4px',
    fontSize: '1rem',
    width: '200px'
  },
  buttonGroup: {
    display: 'flex',
    gap: '10px',
    flexWrap: 'wrap'
  },
  calculateButton: {
    padding: '8px 16px',
    backgroundColor: '#3498db',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem'
  },
  resetButton: {
    padding: '8px 16px',
    backgroundColor: '#e74c3c',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem'
  },
  addToProjectButton: {
    padding: '8px 16px',
    backgroundColor: '#27ae60',
    color: 'white',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    fontSize: '1rem'
  },
  error: {
    color: '#e74c3c',
    fontSize: '0.9rem',
    marginTop: '5px'
  },
  result: {
    marginTop: '20px',
    textAlign: 'center'
  },
  capacity: {
    fontSize: '2.5rem',
    color: '#e74c3c',
    fontWeight: 'bold',
    margin: '10px 0'
  },
  unit: {
    fontSize: '1.2rem',
    color: '#e74c3c',
    marginBottom: '10px'
  },
  thumbRule: {
    fontSize: '0.9rem',
    color: '#666',
    fontStyle: 'italic'
  }
};

const SolarHeaterCalculator = () => {
  const [persons, setPersons] = useState('');
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const calculateCapacity = (numPersons) => {
    if (!numPersons || numPersons <= 0) return null;
    return numPersons * 50;
  };

  const handleCalculate = (e) => {
    e.preventDefault();
    
    if (!persons || persons.trim() === '') {
      setError('Please enter the number of persons');
      setResult(null);
      return;
    }

    const numPersons = parseInt(persons);
    if (isNaN(numPersons) || numPersons <= 0) {
      setError('Please enter a valid positive number');
      setResult(null);
      return;
    }

    const capacity = calculateCapacity(numPersons);
    setResult(capacity);
    setError('');
  };

  const handleReset = () => {
    setPersons('');
    setResult(null);
    setError('');
  };

  const handleAddToProject = () => {
    if (!persons || persons.trim() === '') {
      setError('Please enter the number of persons');
      setResult(null);
      return;
    }

    const numPersons = parseInt(persons);
    if (isNaN(numPersons) || numPersons <= 0) {
      setError('Please enter a valid positive number');
      setResult(null);
      return;
    }

    // Calculate and display result
    const capacity = calculateCapacity(numPersons);
    setResult(capacity);
    setError('');

    // Show success alert
    alert(`Project Added: Solar Water Heater with capacity ${capacity} liters for ${persons} persons`);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <div style={styles.title}>Solar Water Heater Calculation</div>
      </div>

      <form onSubmit={(e) => e.preventDefault()} style={styles.form}>
        <div style={styles.inputGroup}>
          <label style={styles.label}>No. of Persons in Family</label>
          <input
            type="number"
            value={persons}
            onChange={(e) => {
              setPersons(e.target.value);
              setError(''); // Clear error when input changes
            }}
            style={styles.input}
            placeholder="Enter number of persons"
          />
          {error && <div style={styles.error}>{error}</div>}
        </div>

        <div style={styles.buttonGroup}>
          <button 
            type="button" 
            onClick={handleCalculate} 
            style={styles.calculateButton}
          >
            Calculate
          </button>
          <button 
            type="button" 
            onClick={handleReset} 
            style={styles.resetButton}
          >
            Reset
          </button>
          <button 
            type="button" 
            onClick={handleAddToProject} 
            style={styles.addToProjectButton}
          >
            Add to Project
          </button>
        </div>

        {result !== null && (
          <div style={styles.result}>
            <h3 style={styles.title}>Capacity of Solar Water Heater</h3>
            <div style={styles.capacity}>{result}</div>
            <div style={styles.unit}>liters</div>
            <p style={styles.thumbRule}>
              The thumb rule in deciding the capacity is that a person requires 30-50 litres of water per day
            </p>
          </div>
        )}
      </form>
    </div>
  );
};

export default SolarHeaterCalculator;