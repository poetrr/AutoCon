import React, { useState } from 'react';

const TileCalculator = () => {
  const [roomLength, setRoomLength] = useState('');
  const [roomBreadth, setRoomBreadth] = useState('');
  const [tileLength, setTileLength] = useState('');
  const [tileBreadth, setTileBreadth] = useState('');
  const [unit, setUnit] = useState('feet');
  const [tilesRequired, setTilesRequired] = useState(null);
  const [errors, setErrors] = useState({}); // State for input validation errors

  const validateInputs = () => {
    const newErrors = {};
    if (!roomLength) newErrors.roomLength = "Room length is required.";
    if (!roomBreadth) newErrors.roomBreadth = "Room breadth is required.";
    if (!tileLength) newErrors.tileLength = "Tile length is required.";
    if (!tileBreadth) newErrors.tileBreadth = "Tile breadth is required.";
    return newErrors;
  };

  const calculateTiles = (e) => {
    e.preventDefault();
    const validationErrors = validateInputs();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const roomArea = roomLength * roomBreadth;
    const tileArea = tileLength * tileBreadth;

    if (tileArea === 0) {
      setTilesRequired(0);
      return;
    }

    const requiredTiles = roomArea / tileArea; // Calculate without rounding
    setTilesRequired(requiredTiles);
  };

  const handleChangeUnit = (e) => {
    setUnit(e.target.value);
  };

  const handleAddToProject = (e) => {
    e.preventDefault();
    const validationErrors = validateInputs();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    // Logic to add to project can be implemented here
    alert("Added to project!");
  };

  return (
    <div className="p-4 flex justify-center">
      <div className="border border-gray-300 rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-center">Tile Calculator</h2>
        <form onSubmit={calculateTiles} className="space-y-4">
          <div className="flex items-center mb-2">
            <label className="block w-1/2">Room Length:</label>
            <input
              type="number"
              value={roomLength}
              onChange={(e) => {
                setRoomLength(e.target.value);
                setErrors((prev) => ({ ...prev, roomLength: '' })); // Clear error on input change
              }}
              className="border rounded px-2 py-1 w-1/2"
              required
            />
          </div>
          {errors.roomLength && <p className="text-red-500 text-sm">{errors.roomLength}</p>}
          
          <div className="flex items-center mb-2">
            <label className="block w-1/2">Room Breadth:</label>
            <input
              type="number"
              value={roomBreadth}
              onChange={(e) => {
                setRoomBreadth(e.target.value);
                setErrors((prev) => ({ ...prev, roomBreadth: '' })); // Clear error on input change
              }}
              className="border rounded px-2 py-1 w-1/2"
              required
            />
          </div>
          {errors.roomBreadth && <p className="text-red-500 text-sm">{errors.roomBreadth}</p>}
          
          <div className="flex items-center mb-2">
            <label className="block w-1/2">Tile Length:</label>
            <input
              type="number"
              value={tileLength}
              onChange={(e) => {
                setTileLength(e.target.value);
                setErrors((prev) => ({ ...prev, tileLength: '' })); // Clear error on input change
              }}
              className="border rounded px-2 py-1 w-1/2"
              required
            />
          </div>
          {errors.tileLength && <p className="text-red-500 text-sm">{errors.tileLength}</p>}
          
          <div className="flex items-center mb-2">
            <label className="block w-1/2">Tile Breadth:</label>
            <input
              type="number"
              value={tileBreadth}
              onChange={(e) => {
                setTileBreadth(e.target.value);
                setErrors((prev) => ({ ...prev, tileBreadth: '' })); // Clear error on input change
              }}
              className="border rounded px-2 py-1 w-1/2"
              required
            />
          </div>
          {errors.tileBreadth && <p className="text-red-500 text-sm">{errors.tileBreadth}</p>}

          <div className="flex items-center mb-4">
            <label className="block w-1/2">Unit:</label>
            <select value={unit} onChange={handleChangeUnit} className="border rounded px-2 py-1 w-1/2">
              <option value="feet">Feet</option>
              <option value="meters">Meters</option>
            </select>
          </div>
          
          <div className="flex justify-between">
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
              Calculate
            </button>
            <button onClick={handleAddToProject} className="bg-green-500 text-white px-4 py-2 rounded">
              Add to Project
            </button>
          </div>
        </form>

        {tilesRequired !== null && (
          <div className="mt-4">
            <h3 className="font-bold">Tiles Required: {tilesRequired.toFixed(2)}</h3> {/* Displaying exact number */}
          </div>
        )}
      </div>
    </div>
  );
};

export default TileCalculator;
