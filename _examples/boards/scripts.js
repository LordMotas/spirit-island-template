
window.onload = function dynamicCellWidth() {
    growthCells =  document.getElementsByTagName("growth-cell");
    growthCellCount = growthCells.length;
    //console.log(growthCellCount);

    growthBorders = document.getElementsByTagName("growth-border");
    growthBorderCount = growthBorders.length;
    //console.log(growthBorderCount);

    /* Borders = 7px */
    /* Table width: 1050px */

    borderPixels = growthBorderCount*7;

    growthTable = document.getElementsByTagName("growth-table");
    growthTableStyle = window.getComputedStyle(growthTable[0]);
    growthTableWidth = growthTableStyle.getPropertyValue('width');
    //console.log(growthTableWidth);

    remainingCellWidth = (parseInt(growthTableWidth.replace(/px/,""))-borderPixels)+"px";
    //console.log(remainingCellWidth);
    equalCellWidth = (parseFloat(remainingCellWidth.replace(/px/,""))/growthCellCount)+"px";
    //console.log(equalCellWidth);

    for (i = 0; i < growthCells.length; i++){
        growthCells[i].style.maxWidth = equalCellWidth;
        growthCells[i].style.width = equalCellWidth;

    }

    thresholds = document.getElementsByTagName("threshold");
    thresholdsCount = thresholds.length;
    ICONWIDTH = 60;

    for (i = 0; i < thresholdsCount; i++){
        fire = thresholds[i].getElementsByTagName("fire");
        plant = thresholds[i].getElementsByTagName("plant");
        air = thresholds[i].getElementsByTagName("air");
        moon = thresholds[i].getElementsByTagName("moon");
        sun = thresholds[i].getElementsByTagName("sun");
        water = thresholds[i].getElementsByTagName("water");
        animal = thresholds[i].getElementsByTagName("animal");
        earth = thresholds[i].getElementsByTagName("earth");

        fireCount = fire.length;
        plantCount = plant.length;
        airCount = air.length;
        moonCount = moon.length;
        sunCount = sun.length;
        waterCount = water.length;
        animalCount = animal.length;
        earthCount = earth.length;

        console.log(fireCount);
        dynamicThresholdWidth = 
            ((fireCount * ICONWIDTH) + (fireCount * 12) + 
            (plantCount * ICONWIDTH) + (plantCount * 12) + 
            (airCount * ICONWIDTH) + (airCount * 12) + 
            (moonCount * ICONWIDTH) + (moonCount * 12) + 
            (sunCount * ICONWIDTH) + (sunCount * 12) + 
            (waterCount * ICONWIDTH) + (waterCount * 12) + 
            (animalCount * ICONWIDTH) + (animalCount * 12) + 
            (earthCount * ICONWIDTH) + (earthCount * 12));
        console.log(dynamicThresholdWidth);
        formattedWidth = dynamicThresholdWidth + "px";
        console.log(formattedWidth);
        thresholds[i].style.width = formattedWidth;
        console.log("End row");
    }

  }