import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';

const ACCalculator = () => {
  const [formData, setFormData] = useState({
    length_ft: '',
    length_in: '',
    breadth_ft: '',
    breadth_in: '',
    height_ft: '',
    height_in: '',
    persons: '',
    temperature: ''
  });
  
  const [result, setResult] = useState(null);
  const [error, setError] = useState('');

  const validateForm = () => {
    const requiredFields = ['length_ft', 'breadth_ft', 'height_ft', 'persons', 'temperature'];
    for (const field of requiredFields) {
      if (formData[field] === '') {
        setError('Please fill in all required fields (feet measurements, persons, and temperature)');
        return false;
      }
    }
    setError('');
    return true;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const calculateTonnage = () => {
    if (!validateForm()) return;

    const length = parseFloat(formData.length_ft) + 
                  (formData.length_in ? parseFloat(formData.length_in) / 12 : 0);
    const breadth = parseFloat(formData.breadth_ft) + 
                   (formData.breadth_in ? parseFloat(formData.breadth_in) / 12 : 0);
    const height = parseFloat(formData.height_ft) + 
                  (formData.height_in ? parseFloat(formData.height_in) / 12 : 0);
    const persons = parseFloat(formData.persons);
    const temperature = parseFloat(formData.temperature);

    const tons = ((length * breadth * 20) / 12000) + 
                 (persons * 0.088) + 
                 (temperature * 0.00575) +
                 (height * 0.0167);

    setResult(tons.toFixed(2));
  };

  const handleAddToProject = () => {
    if (!result) {
      setError('Please calculate tonnage first');
      return;
    }
    alert('Project added successfully!');
  };

  const handleReset = () => {
    setFormData({
      length_ft: '',
      length_in: '',
      breadth_ft: '',
      breadth_in: '',
      height_ft: '',
      height_in: '',
      persons: '',
      temperature: ''
    });
    setResult(null);
    setError('');
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex items-center gap-2 mb-6">
        <h2 className="text-xl font-semibold text-gray-700">AIR CONDITIONER TONNAGE CALCULATION</h2>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 text-red-700 rounded-md flex items-center gap-2">
          <AlertCircle size={20} />
          <span>{error}</span>
        </div>
      )}

      <div className="space-y-4">
        {/* Length Input */}
        <div className="flex items-center gap-4">
          <label className="w-32 text-gray-700">Length of Room*</label>
          <div className="flex gap-2 items-center">
            <input
              type="number"
              name="length_ft"
              value={formData.length_ft}
              onChange={handleInputChange}
              className="w-24 p-2 border rounded"
              placeholder="Feet"
              required
            />
            <span>feet</span>
            <input
              type="number"
              name="length_in"
              value={formData.length_in}
              onChange={handleInputChange}
              className="w-24 p-2 border rounded"
              placeholder="Inches (optional)"
            />
            <span>inch</span>
          </div>
        </div>

        {/* Breadth Input */}
        <div className="flex items-center gap-4">
          <label className="w-32 text-gray-700">Breadth of Room*</label>
          <div className="flex gap-2 items-center">
            <input
              type="number"
              name="breadth_ft"
              value={formData.breadth_ft}
              onChange={handleInputChange}
              className="w-24 p-2 border rounded"
              placeholder="Feet"
              required
            />
            <span>feet</span>
            <input
              type="number"
              name="breadth_in"
              value={formData.breadth_in}
              onChange={handleInputChange}
              className="w-24 p-2 border rounded"
              placeholder="Inches (optional)"
            />
            <span>inch</span>
          </div>
        </div>

        {/* Height Input */}
        <div className="flex items-center gap-4">
          <label className="w-32 text-gray-700">Height of Room*</label>
          <div className="flex gap-2 items-center">
            <input
              type="number"
              name="height_ft"
              value={formData.height_ft}
              onChange={handleInputChange}
              className="w-24 p-2 border rounded"
              placeholder="Feet"
              required
            />
            <span>feet</span>
            <input
              type="number"
              name="height_in"
              value={formData.height_in}
              onChange={handleInputChange}
              className="w-24 p-2 border rounded"
              placeholder="Inches (optional)"
            />
            <span>inch</span>
          </div>
        </div>

        {/* Persons Input */}
        <div className="flex items-center gap-4">
          <label className="w-32 text-gray-700">No of Person*</label>
          <input
            type="number"
            name="persons"
            value={formData.persons}
            onChange={handleInputChange}
            className="w-24 p-2 border rounded"
            required
          />
        </div>

        {/* Temperature Input */}
        <div className="flex items-center gap-4">
          <label className="w-32 text-gray-700">Max Temperature*</label>
          <input
            type="number"
            name="temperature"
            value={formData.temperature}
            onChange={handleInputChange}
            className="w-24 p-2 border rounded"
            required
          />
          <span>°C</span>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-6">
          <button
            onClick={calculateTonnage}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
          >
            Calculate
          </button>
          <button
            onClick={handleReset}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
          >
            Reset
          </button>
          <button
            onClick={handleAddToProject}
            className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600 transition-colors"
          >
            Add to Project
          </button>
        </div>

        {/* Simplified Result */}
        {result && (
          <div className="mt-6 text-lg">
            AC Ton - {result}
          </div>
        )}
      </div>
    </div>
  );
};

export default ACCalculator;