import { generateColorGrid } from "./generateColorGrid.js";

{

  const colorBoxInitSettings = {
    size: { column: 20, row: 20 },
    colors: { column: "blue", row: "green" }
  };

  const colorObj = { red: 0x00, green: 0x00, blue: 0x00 };

  $(() => {
    const thirdColor = "red";
    const $colorGridBox = $("#color-grid-box");
    const $colorPicker = $("#third-color-picker").attr("max", colorBoxInitSettings.size.column);
    const $colorLabel = $colorPicker.siblings("label");

    $colorLabel.text(thirdColor);

    generateColorGrid(colorBoxInitSettings, $colorGridBox, colorObj, colorStep);

    $colorPicker.on("change", function () {
      const thirdColorRange = this.value;
      const thirdColorNumber = Math.min(parseInt(thirdColorRange) * colorStep(colorBoxInitSettings.size.column), 255);
      colorObj[thirdColor] = thirdColorNumber;
      $colorGridBox.empty();
      generateColorGrid(colorBoxInitSettings, $colorGridBox, colorObj, colorStep);
      console.log($colorGridBox.selectedColor);
    });

    console.log($colorGridBox.selectedColor);

  });

  const colorStep = (boxCount) => (Math.floor(256 / boxCount));

}

