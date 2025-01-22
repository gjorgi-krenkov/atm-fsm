import { useEffect } from "react";

export default function useButtonPressed() {
    useEffect(() => {
        // Track the button that is currently being pressed
        let pressedButton = null;
    
        const handleMouseDown = (event) => {
          const button = event.target.closest('button');
          if (button) {
            // Get the color of the text (h1, h3, Icon, etc.) inside the button
            const textElement = button.querySelector('h1, h3, svg, .icon'); // Target the text or icon
            if (textElement) {
              const textColor = window.getComputedStyle(textElement).color; // Get the text color
              const rgbValues = textColor
                .match(/\d+/g) // Extract the RGB values from the color
                .map(Number);
    
              // Convert the RGB to rgba with 12% opacity
              const rgbaColor = `rgba(${rgbValues[0]}, ${rgbValues[1]}, ${rgbValues[2]}, 0.12)`;
    
              // Set the background color of the button
              button.style.backgroundColor = rgbaColor;
    
              // Mark the button as pressed
              pressedButton = button;
            }
          }
        };
    
        const handleMouseUp = (event) => {
          if (pressedButton) {
            // Reset the background color when the mouse button is released
            pressedButton.style.backgroundColor = 'white';
            pressedButton = null; // Reset pressed button reference
          }
        };
    
        // Handle mouseout to ensure the button is reset when mouse leaves
        const handleMouseOut = (event) => {
          if (pressedButton) {
            pressedButton.style.backgroundColor = 'white';
            pressedButton = null; // Reset pressed button reference
          }
        };
    
        // Add global event listeners for mouse down, mouse up, and mouse out
        document.addEventListener('mousedown', handleMouseDown);
        document.addEventListener('mouseup', handleMouseUp);
        document.addEventListener('mouseout', handleMouseOut); // Ensure reset when mouse leaves the button
    
        // Cleanup event listeners on component unmount
        return () => {
          document.removeEventListener('mousedown', handleMouseDown);
          document.removeEventListener('mouseup', handleMouseUp);
          document.removeEventListener('mouseout', handleMouseOut);
        };
      }, []);
}