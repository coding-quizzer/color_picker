const generateColorGrid = (initSettings, $colorPickerBox, colorObj, colorStep) => {
  const { size, colors } = initSettings;
  $colorPickerBox.css("--num-of-rows", "0");
  $colorPickerBox.css("--num-of-columns", "0");

  for (let i = 0; i < size.row; i++) {
    $colorPickerBox.css("--num-of-rows", "+=1");
    for (let j = 0; j < size.column; j++) {
      createColorBox(colorObj, $colorPickerBox, i === 1);
      updateColorInColorObj(colorObj, colors.column, size.column, colorStep);
    }
    resetColorInColorObj(colorObj, colors.column);
    updateColorInColorObj(colorObj, colors.row, size.row, colorStep);
  }
  resetColorInColorObj(colorObj, colors.row);

};

const createColorBox = (colorValues, $colorPickerBox, isFirstRow) => {
  let selectedColor;
  const [red, green, blue] = Object.values(colorValues).map(colorNum => convertHexColorValueToString(colorNum));
  const currentColor = `#${red}${green}${blue}`;
  let $currentBlock = $('<div class = "color-block">')
    .css("background-color", currentColor)
    .on("click", function (ev) {
      selectedColor = $(this).css("background-color");
      $colorPickerBox
        .parent()
        .css("--selected-color", selectedColor);
    })
    .appendTo($colorPickerBox);


  if (isFirstRow) {
    $colorPickerBox.css({ "--num-of-columns": "+=1" });
  }

  return $colorPickerBox;


};

const convertHexColorValueToString = (hexNum) => {
  // Add 0x100 to preserve the zeros as padding in the final string values
  let newColor = hexNum + 0x100;
  newColor = newColor.toString(16).slice(1);
  return newColor;
};


const setColorInColorObj = (colorObj, colorName, newValue) => {
  colorObj[colorName] = newValue;
};


const updateColorInColorObj = (colorObj, colorName, boxCount, colorStep) => {
  const nextColor = Math.min(colorObj[colorName] + colorStep(boxCount), 255);
  setColorInColorObj(colorObj, colorName, nextColor);

};

const resetColorInColorObj = (colorObj, colorName) => {
  setColorInColorObj(colorObj, colorName, 0);
};

export { generateColorGrid };