import { useState, useRef, useEffect, KeyboardEvent } from 'react';

type Props = {
  onSubmit: (authPin: string) => void;
}
const PinInput = ({onSubmit}: Props) => {
  const [pin, setPin] = useState(["", "", "", ""]);
  const inputsRef = useRef([]);

  useEffect(() => {
    // Find the first empty input and focus it
    const firstEmptyIndex = pin.findIndex((digit) => digit === "");
    if (firstEmptyIndex !== -1 && inputsRef.current[firstEmptyIndex]) {
      inputsRef.current[firstEmptyIndex].focus();
    }
  }, [pin]);

  const handleChange = (value: string | any, index: number) => {
    if (value.length > 1) value = value[0]; // Limit to one character

    const newPin = [...pin];
    newPin[index] = value.replace(/\D/g, ""); // Only allow digits
    setPin(newPin);

    // Move focus to next input if a digit is entered
    if (value && index < pin.length - 1) {
      inputsRef.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Enter" && pin.every(char => /^\d$/.test(char))) {
      onSubmit(pin.join(""));
    }
    if (e.key === "Backspace" && !pin[index] && index > 0) {
      inputsRef.current[index - 1].focus();
    }
  };

  return (
    <div className="pin-input">
      {pin.map((digit, index) => (
        <div className="pin-input-wrapper" key={index}>
          <input
            ref={(el) => (inputsRef.current[index] = el)}
            type="number"
            maxLength={1}
            value={digit}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            className="pin-input-field landing-typography"
          />
          {digit ? <span className="pin-star">*</span> : undefined} {/* Star overlay */}
        </div>
      ))}
    </div>
  );
};

export default PinInput;
