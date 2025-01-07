import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useState, useRef, useEffect } from "react";

function CustomTextarea() {
  const [text, setText] = useState("");
  const overlayRef = useRef(null);
  const textareaRef = useRef(null);

  const handleChange = (e) => {
    setText(e.target.value);
  };
  const syncScroll = () => {
    if (overlayRef.current && textareaRef.current) {
      overlayRef.current.scrollTop = textareaRef.current.scrollTop;
      overlayRef.current.scrollLeft = textareaRef.current.scrollLeft;
    }
  };
  const validateLine = (line) => {
    const isValid = /^\d{10}$/.test(line);
    return isValid;
  };
  const getStyledText = () => {
    return text.split("\n").map((line, index) => (
      <div key={index} style={{ whiteSpace: "pre-wrap" }}>
        <span
          style={{
            backgroundColor: validateLine(line) ? "transparent" : "#f87171",
          }}
        >
          {line}
        </span>
        {line.length === 0 && <br />}
      </div>
    ));
  };

  return (
    <>
    <Label>Enter Numbers (One number in each line)</Label>
    <div className="relative" style={{ width: "100%", height: "200px" }}>
        
      {/* Overlay for displaying styled text */}
      <div
        ref={overlayRef}
        className="absolute top-0 left-0 w-full h-full overflow-auto"
        style={{
          pointerEvents: "none",
          fontSize: "16px",
          lineHeight: "1.5em",
          padding: "8px",
          color: "transparent",
        }}
      >
        {getStyledText()}
      </div>
      
      <Textarea
        ref={textareaRef}
        value={text}
        onChange={handleChange}
        onScroll={syncScroll}
        className="absolute top-0 left-0 w-full h-full p-2 border rounded-md resize-none outline-none"
        placeholder="Paste here..."
        style={{
          backgroundColor: "transparent",
          color: "black",
          fontSize: "16px",
          lineHeight: "1.5em",
          resize: "none",
        }}
      />
    </div>
    </>
  );
}

export default CustomTextarea;
