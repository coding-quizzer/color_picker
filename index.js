


const convertHexColorValueToString = (hexNum) => {
  // Add 0x100 to preserve the zeros as padding in the final string values
  let newColor = hexNum + 0x100;
  newColor = newColor.toString(16).slice(1);
  return newColor;
};

const createColorBox = (colorValues, $colorPickerBox, isFirstRow) => {
  const [red, green, blue] = Object.values(colorValues).map(colorNum => convertHexColorValueToString(colorNum));
  currentColor = `#${red}${green}${blue}`;
  let $currentBlock = $('<div class = "color-block">')
    .css("background-color", currentColor)
    .appendTo($colorPickerBox);

  if (isFirstRow) {
    $colorPickerBox.css({ "--num-of-columns": "+=1" });
  }

  return $colorPickerBox;


};

const updateColorObj = (colorObj, updateColor, boxCount) => {
  colorObj[updateColor] = Math.min(colorObj[updateColor] + Math.floor(256 / boxCount), 255);

};

const resetColorObj = (colorObj, updateColor) => {
  colorObj[updateColor] = 0;

};

const blockColors = [{ red: "00", green: "00", blue: "00" }];
let currentColor = '9ACD32';
let currentColorObj = { red: 0x00, green: 0x00, blue: 0x00 };

$(() => {
  const boxColumnSize = 8;
  const boxRowSize = 8;
  const $colorPickerBox = $("#color-picker-box");

  const columnColor = "red";
  const rowColor = "blue";

  for (let i = 0; i < boxRowSize; i++) {
    $colorPickerBox.css("--num-of-rows", "+=1");
    for (let j = 0; j < boxColumnSize; j++) {
      createColorBox(currentColorObj, $colorPickerBox, i === 1);
      updateColorObj(currentColorObj, columnColor, boxColumnSize);
    }
    resetColorObj(currentColorObj, columnColor);
    console.log(currentColorObj);

    updateColorObj(currentColorObj, rowColor, boxRowSize);
  }

});