import React, { useEffect, useRef, useState } from 'react';
import { Canvas, Line, Text } from 'fabric';

const DrawingCanvas = () => {
  const canvasRef = useRef(null);
  const [canvasObj, setCanvasObj] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [currentLine, setCurrentLine] = useState(null);
  const [lengthText, setLengthText] = useState(null); // State to store the length text

  const pixelToMeter = 100; // Define how many pixels correspond to one meter (e.g., 100 pixels = 1 meter)

  useEffect(() => {
    const canvas = new Canvas(canvasRef.current);
    setCanvasObj(canvas);

    const gridSize = 20;
    const canvasSize = 600;

    // Draw grid lines
    for (let i = 0; i < (canvasSize / gridSize); i++) {
      canvas.add(new Line([i * gridSize, 0, i * gridSize, canvasSize], { stroke: '#ccc', selectable: false }));
      canvas.add(new Line([0, i * gridSize, canvasSize, i * gridSize], { stroke: '#ccc', selectable: false }));
    }

    // Snap to grid when moving objects
    canvas.on('object:moving', function (options) {
      options.target.set({
        left: Math.round(options.target.left / gridSize) * gridSize,
        top: Math.round(options.target.top / gridSize) * gridSize,
      });
    });

    return () => {
      canvas.dispose();
    };
  }, []);

  // Function to calculate the length of a line using the Pythagorean theorem
  const calculateLineLength = (x1, y1, x2, y2) => {
    const dx = x2 - x1;
    const dy = y2 - y1;
    return Math.sqrt(dx * dx + dy * dy); // Return the length in pixels
  };

  // Start drawing a line
  const startLine = (event) => {
    if (canvasObj) {
      const pointer = canvasObj.getPointer(event.e);
      const points = [pointer.x, pointer.y, pointer.x, pointer.y];
      const line = new Line(points, {
        strokeWidth: 2,
        fill: 'black',
        stroke: 'black',
        originX: 'center',
        originY: 'center',
        selectable: false,
      });
      setCurrentLine(line);
      canvasObj.add(line);
      setIsDrawing(true);
      setLengthText(null); // Reset the length text when starting a new line
    }
  };

  // Update the line and calculate its length as the mouse moves
  const drawLine = (event) => {
    if (!isDrawing || !currentLine || !canvasObj) return;

    const pointer = canvasObj.getPointer(event.e);
    currentLine.set({ x2: pointer.x, y2: pointer.y });

    // Calculate the length of the line in pixels
    const lengthInPixels = calculateLineLength(currentLine.x1, currentLine.y1, pointer.x, pointer.y);
    const lengthInMeters = (lengthInPixels / pixelToMeter).toFixed(2); // Convert to meters

    // Update the length text to display on the canvas
    setLengthText(new Text(`${lengthInMeters} m`, {
      left: (currentLine.x1 + pointer.x) / 2, // Center the text between the start and end points
      top: (currentLine.y1 + pointer.y) / 2,
      fontSize: 14,
      fill: 'red',
      selectable: false,
    }));

    canvasObj.renderAll();
  };

  // Finish drawing the line
  const finishLine = () => {
    setIsDrawing(false);
    setCurrentLine(null);
    if (lengthText) {
      canvasObj.add(lengthText); // Add the length text to the canvas
    }
    setLengthText(null); // Reset the length text state
  };

  // Attach mouse event handlers for drawing lines
  useEffect(() => {
    if (canvasObj) {
      canvasObj.on('mouse:down', startLine);
      canvasObj.on('mouse:move', drawLine);
      canvasObj.on('mouse:up', finishLine);
    }

    return () => {
      if (canvasObj) {
        canvasObj.off('mouse:down', startLine);
        canvasObj.off('mouse:move', drawLine);
        canvasObj.off('mouse:up', finishLine);
      }
    };
  }, [canvasObj, isDrawing, currentLine, lengthText]);

  return (
    <div>
      <canvas ref={canvasRef} width={600} height={600} style={{ border: '1px solid #000' }} />
    </div>
  );
};

export default DrawingCanvas;
