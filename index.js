

{

  $(() => {

    const $colorGridBox = $("#color-grid-box");

    generateColorGrid(colorBoxInitSettings, $colorGridBox);


  });


  // const blockColors = [{ red: "00", green: "00", blue: "00" }];
  // let currentColor = '9ACD32';
  let colorObj = { red: 0x00, green: 0x00, blue: 0x00 };

  const colorBoxInitSettings = {
    size: { column: 8, row: 8 },
    colors: { column: "red", row: "blue" }
  };



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

  const setColorInColorObj = (colorObj, colorName, newValue) => {
    colorObj[colorName] = newValue;
  };

  const updateColorInColorObj = (colorObj, colorName, boxCount) => {
    const nextColor = Math.min(colorObj[colorName] + Math.floor(256 / boxCount, 255));
    setColorInColorObj(colorObj, colorName, nextColor);

  };

  const resetColorInColorObj = (colorObj, colorName) => {
    setColorInColorObj(colorObj, colorName, 0);
  };

  const generateColorGrid = (initSettings, $colorPickerBox) => {
    const { size, colors } = initSettings;

    for (let i = 0; i < size.row; i++) {
      $colorPickerBox.css("--num-of-rows", "+=1");
      for (let j = 0; j < size.column; j++) {
        createColorBox(colorObj, $colorPickerBox, i === 1);
        updateColorInColorObj(colorObj, colors.column, size.column);
      }
      resetColorInColorObj(colorObj, colors.column);
      updateColorInColorObj(colorObj, colors.row, size.row);
    }

  };



}