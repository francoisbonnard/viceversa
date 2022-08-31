import React, { useState } from "react";
import { Slider, Sketch, Material, Colorful, Compact, Circle, Wheel, Block, Github, Chrome } from '@uiw/react-color';
import { Alpha, Hue, ShadeSlider, Saturation, Interactive, hsvaToHslaString } from '@uiw/react-color';
import { EditableInput, EditableInputRGBA, EditableInputHSLA } from '@uiw/react-color';

// https://uiwjs.github.io/react-color/
function WheelColor(props) {
  const [hex, setHex] = useState(props.currentColor);
  return (
    <Wheel
      style={{ marginLeft: 20 }}
      color={hex}
      onChange={(color) => {
        setHex(color.hex);
        props.onChange(color.hex)
      }}
    />
  );
}

export default WheelColor