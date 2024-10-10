import React, { useState, useRef, useEffect } from 'react';
import './App.css';

function App() {
  const [lines, setLines] = useState([]);
  const [redoStack, setRedoStack] = useState([]);
  const [currentLine, setCurrentLine] = useState(null);
  const [drawing, setDrawing] = useState(false);
  const [selectedLine, setSelectedLine] = useState(null);
  const [lineThickness, setLineThickness] = useState(2); // Default line thickness
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = window.innerWidth * 0.75;
    canvas.height = window.innerHeight * 0.9;
    const context = canvas.getContext('2d');
    context.strokeStyle = 'black';
    context.lineWidth = lineThickness; // Set line thickness
    contextRef.current = context;

    drawGrid();
    redrawLines();
  }, [lines, selectedLine, lineThickness]);

  const drawGrid = () => {
    const canvas = canvasRef.current;
    const context = contextRef.current;
    const gridSize = 20;

    context.clearRect(0, 0, canvas.width, canvas.height);

    context.strokeStyle = '#ddd';
    context.lineWidth = 0.5;

    for (let x = 0; x < canvas.width; x += gridSize) {
      context.beginPath();
      context.moveTo(x, 0);
      context.lineTo(x, canvas.height);
      context.stroke();
    }

    for (let y = 0; y < canvas.height; y += gridSize) {
      context.beginPath();
      context.moveTo(0, y);
      context.lineTo(canvas.width, y);
      context.stroke();
    }

    context.strokeStyle = 'black';
    context.lineWidth = lineThickness;
  };

  const redrawLines = () => {
    const context = contextRef.current;
    drawGrid();

    lines.forEach((line, index) => {
      if (index === selectedLine) {
        context.strokeStyle = 'red';
      } else {
        context.strokeStyle = 'black';
      }
      context.lineWidth = line.thickness; // Use line-specific thickness
      drawLine(line.start, line.end);
    });

    if (currentLine && currentLine.end) {
      context.strokeStyle = 'black';
      context.lineWidth = lineThickness; // Use current line thickness
      drawLine(currentLine.start, currentLine.end);
    }
  };

  const drawLine = (start, end) => {
    const context = contextRef.current;
    context.beginPath();
    context.moveTo(start.x, start.y);
    context.lineTo(end.x, end.y);
    context.stroke();
  };

  const handleMouseDown = (event) => {
    const { offsetX, offsetY } = event.nativeEvent;
    if (!drawing) {
      setCurrentLine({ start: { x: offsetX, y: offsetY }, end: { x: offsetX, y: offsetY } });
      setDrawing(true);
    } else {
      const newLine = { start: currentLine.start, end: { x: offsetX, y: offsetY }, thickness: lineThickness };
      setLines((prevLines) => [...prevLines, newLine]);
      setRedoStack([]); // Clear redo stack after a new line
      setCurrentLine(null);
      setDrawing(false);
    }
  };

  const handleMouseMove = (event) => {
    if (!drawing) return;
    const { offsetX, offsetY } = event.nativeEvent;
    setCurrentLine((prevLine) => ({
      ...prevLine,
      end: { x: offsetX, y: offsetY }
    }));
    redrawLines();
  };

  const handleLineClick = (event) => {
    const { offsetX, offsetY } = event.nativeEvent;
    const nearestLineIndex = findNearestLine(offsetX, offsetY);
    if (nearestLineIndex !== null) {
      setSelectedLine(nearestLineIndex);
    } else {
      setSelectedLine(null);
    }
    redrawLines();
  };

  const findNearestLine = (x, y) => {
    const threshold = 5;
    let nearestLineIndex = null;
    let minDistance = Infinity;

    lines.forEach((line, index) => {
      const distance = pointToLineDistance(x, y, line.start, line.end);
      if (distance < threshold && distance < minDistance) {
        nearestLineIndex = index;
        minDistance = distance;
      }
    });

    return nearestLineIndex;
  };

  const pointToLineDistance = (x, y, start, end) => {
    const A = x - start.x;
    const B = y - start.y;
    const C = end.x - start.x;
    const D = end.y - start.y;

    const dot = A * C + B * D;
    const len_sq = C * C + D * D;
    const param = len_sq !== 0 ? dot / len_sq : -1;

    let xx, yy;

    if (param < 0) {
      xx = start.x;
      yy = start.y;
    } else if (param > 1) {
      xx = end.x;
      yy = end.y;
    } else {
      xx = start.x + param * C;
      yy = start.y + param * D;
    }

    const dx = x - xx;
    const dy = y - yy;
    return Math.sqrt(dx * dx + dy * dy);
  };

  const handleKeyDown = (event) => {
    if (event.key === 'Delete' && selectedLine !== null) {
      setRedoStack((prev) => [...prev, lines[selectedLine]]); // Save deleted line for redo
      setLines((prevLines) => prevLines.filter((_, index) => index !== selectedLine));
      setSelectedLine(null);
    } else if (event.key === 'z' && event.ctrlKey) { // Undo action
      if (lines.length > 0) {
        const lastLine = lines[lines.length - 1];
        setRedoStack((prev) => [...prev, lastLine]); // Save for redo
        setLines((prevLines) => prevLines.slice(0, -1));
      }
    } else if (event.key === 'y' && event.ctrlKey) { // Redo action
      if (redoStack.length > 0) {
        const lastRedo = redoStack[redoStack.length - 1];
        setLines((prevLines) => [...prevLines, lastRedo]);
        setRedoStack((prev) => prev.slice(0, -1)); // Remove from redo stack
      }
    }
    redrawLines();
  };

  const handleThicknessChange = (event) => {
    setLineThickness(parseInt(event.target.value));
  };

  const calculateTotalLengths = () => {
    return lines.reduce(
      (totals, line) => {
        const length = Math.sqrt(
          Math.pow(line.end.x - line.start.x, 2) +
          Math.pow(line.end.y - line.start.y, 2)
        );

        if (line.thickness === 5) {
          totals.thick += length;
        } else {
          totals.thin += length;
        }
        return totals;
      },
      { thick: 0, thin: 0 }
    );
  };

  const { thick, thin } = calculateTotalLengths();

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [selectedLine, redoStack, lines]);

  return (
    <div className="app-container">
      <canvas
        ref={canvasRef}
        className="canvas"
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onClick={handleLineClick}
      />
      <div className="right-panel">
        <h4>Total Lines: {lines.length}</h4>
        <h4>Total Length (Thick): {thick.toFixed(2)} units</h4>
        <h4>Total Length (Thin): {thin.toFixed(2)} units</h4>
        <div>
          <label>Line Thickness: </label>
          <select value={lineThickness} onChange={handleThicknessChange}>
            <option value={2}>Thin</option>
            <option value={5}>Thick</option>
          </select>
        </div>
        <button className="button" onClick={() => {
          if (lines.length > 0) {
            const lastLine = lines[lines.length - 1];
            setRedoStack((prev) => [...prev, lastLine]); // Save for redo
            setLines((prevLines) => prevLines.slice(0, -1));
          }
        }}>Undo</button>
        <button className="button" onClick={() => {
          if (redoStack.length > 0) {
            const lastRedo = redoStack[redoStack.length - 1];
            setLines((prevLines) => [...prevLines, lastRedo]);
            setRedoStack((prev) => prev.slice(0, -1)); // Remove from redo stack
          }
        }}>Redo</button>
        <button className="button" onClick={() => {
          if (selectedLine !== null) {
            setLines((prevLines) => prevLines.filter((_, index) => index !== selectedLine));
            setSelectedLine(null);
          }
        }}>Delete Selected Line</button>
      </div>
    </div>
  );
}

export default App;
