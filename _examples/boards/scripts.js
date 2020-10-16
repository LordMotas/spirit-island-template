
window.onload = function startMain(){
    parseGrowthTags();
    var newEnergyTrack = parseEnergyTrackTags();
    var newCardPlayTrack = parseCardPlayTrackTags();
    setNewEnergyCardPlayTracks(newEnergyTrack, newCardPlayTrack);
    dynamicCellWidth();
}

function parseGrowthTags(){
    var fullHTML = "";
    var growthHTML = document.getElementsByTagName("growth");
    //console.log(growthHTML);
    
    var growthTitle = "<growth-title>"+growthHTML[0].title+"</growth-title>";
    //console.log(growthTitle);

    var newGrowthTableTagOpen = "<growth-table>";
    var newGrowthTableTagClose = "</growth-table>";

    //Find values between parenthesis
    var regExp = /\(([^)]+)\)/;

    var newGrowthCellHTML = "";
    for (i = 0; i < growthHTML[0].children.length; i++){
        childElement = growthHTML[0].children[i];
        //childElement is the thing that should be replaced when all is said and done
        //console.log(childElement);
        
        growthClass = childElement.className;
        //console.log(growthClass);

        var classPieces = growthClass.split(';');
        //console.log(classPieces);

        for (j = 0; j < classPieces.length; j++){
            //console.log(classPieces[j]);

            //Find a parenthesis and split out the string before it
            var growthItem = classPieces[j].split("(")[0];

            switch(growthItem) {
                case 'reclaim-all':
                    newGrowthCellHTML += "<growth-cell><reclaim-all></reclaim-all><growth-text>Reclaim Cards</growth-text></growth-cell>";
                    break;
                case 'reclaim-one':
                    newGrowthCellHTML += "<growth-cell><reclaim-one></reclaim-one><growth-text>Reclaim One</growth-text></growth-cell>";
                    break;
                case 'gain-power-card':
                    newGrowthCellHTML += "<growth-cell><gain-power-card></gain-power-card><growth-text>Gain Power Card</growth-text></growth-cell>";
                    break;
                case 'discard-cards':
                    newGrowthCellHTML += "<growth-cell><discard-cards></discard-cards><growth-text>Discard 2 Power Cards</growth-text></growth-cell>";
                    break;
                case 'gain-card-play':
                    newGrowthCellHTML += "<growth-cell><gain-card-play></gain-card-play><growth-text>Gain a Card Play</growth-text></growth-cell>";
                    break;
                case 'make-fast':
                    newGrowthCellHTML += "<growth-cell><make-fast></make-fast><growth-text>One of your Powers may be Fast</growth-text></growth-cell>";
                    break;
                case 'gain-energy':
                    var matches = regExp.exec(classPieces[j]);

                    var gainEnergyBy = matches[1];

                    if (!isNaN(gainEnergyBy)){
                        //Gain Energy has a number in it
                        newGrowthCellHTML += "<growth-cell><growth-energy><value>"+gainEnergyBy+"</value></growth-energy><growth-text>Gain Energy</growth-text></growth-cell>";
                    } else {
                        //Gain Energy is not from a number
                        newGrowthCellHTML += "<growth-cell><gain-per><value>1</value></gain-per><"+gainEnergyBy+"></"+gainEnergyBy+"><growth-text>Gain 1 Energy per "+gainEnergyBy.charAt(0).toUpperCase() + gainEnergyBy.slice(1)+"</growth-text></growth-cell>";
                    }
                    break;
                case 'add-presence':
                    var matches = regExp.exec(classPieces[j]);

                    var presenceOptions = matches[1].split(",");
                    var presenceRange = presenceOptions[0];
                    var presenceReqOpen = "<custom-presence>";
                    var presenceReqClose = "</custom-presence>";
                    var presenceReq = "none";

                    if(presenceOptions.length > 1){
                        presenceReqOpen = "<custom-presence-req>";
                        presenceReqClose = "</custom-presence-req>";
                        presenceReq = presenceOptions[1];
                    }

                    newGrowthCellHTML += "<growth-cell>"+presenceReqOpen+"+<presence></presence><"+presenceReq+"></"+presenceReq+"><range-"+presenceRange+"></range-"+presenceRange+">"+presenceReqClose+"<growth-text>Add a Presence</growth-text></growth-cell>";
                    break;
                case 'presence-no-range':
                    newGrowthCellHTML += "<growth-cell><custom-presence-no-range>+<presence></presence></custom-presence-no-range><growth-text>Add a Presence to any Land</growth-text></growth-cell>";
                    break;
                case 'ignore-range':
                    newGrowthCellHTML += "<growth-cell><custom-presence><ignore-range></ignore-range></custom-presence><growth-text>You may ignore Range this turn</growth-text></growth-cell>";
                    break;
                case 'move-presence':
                    //Additional things can be done here based on inputs
                    var matches = regExp.exec(classPieces[j]);

                    var moveRange = matches[1];
                    newGrowthCellHTML += "<growth-cell><custom-presence-special><presence></presence><move-range-"+moveRange+"></move-range-"+moveRange+"><growth-text>Move a Presence</growth-text></growth-cell>";

                    break;
                case 'gain-element':
                    var matches = regExp.exec(classPieces[j]);

                    //console.log("text is: "+matches[1]);
                    var gainedElement = matches[1];

                    //TODO: Add in the ability to gain more than one element

                    newGrowthCellHTML += "<growth-cell><gain><"+gainedElement+"></"+gainedElement+"></gain><growth-text>Gain "+gainedElement.charAt(0).toUpperCase() + gainedElement.slice(1)+"</growth-text></growth-cell>";

                    break;
                default:
                    console.log("");
            }
        }
        if(j <= growthHTML[0].children.length)
            newGrowthCellHTML += "<growth-border></growth-border>";
    }
    fullHTML += growthTitle+newGrowthTableTagOpen+newGrowthCellHTML+newGrowthTableTagClose

    document.getElementsByTagName("growth")[0].removeAttribute("title");
    document.getElementsByTagName("growth")[0].innerHTML = fullHTML;
}

function parseEnergyTrackTags(){
    var fullHTML = "";
    var energyHTML = "";
    //console.log(growthHTML);
    
    var energyValues = document.getElementsByTagName("energy-track")[0].getAttribute("values");

    console.log(energyValues);

    var energyOptions = energyValues.split(",");
    console.log(energyOptions);

    for(i = 0; i < energyOptions.length; i++){
        if(!isNaN(energyOptions[i])){
            //The energy option is only a number
            if(i == 0){
                energyHTML += "<energy-track-initial><value>"+energyOptions[i]+"</value></energy-track-initial>";
            } else {
                energyHTML += "<energy-track><value>"+energyOptions[i]+"</value><subtext>2</subtext></energy-track>";
            }
        } else {
            //It is either a single element or a mix of elements/numbers
            var splitOptions = energyOptions[i].split("+");

            if(splitOptions.length == 1){
                //It's just an element
                energyHTML += "<energy-track><"+splitOptions[0]+"></"+splitOptions[0]+"><subtext>"+splitOptions[0].charAt(0).toUpperCase() + splitOptions[0].slice(1)+"</subtext></energy-track>";
            } else {
                //It's a mix of things
                console.log(typeof(splitOptions[0]));
                if(!isNaN(splitOptions[0])){
                    //It's a mix of energy and element
                    console.log("Energy and element");
                    energyHTML += "<energy-track-ring><energy-top><value>"+splitOptions[0]+"</value></energy-top><element-bottom><"+splitOptions[1]+"></"+splitOptions[1]+"></element-bottom><subtext>"+splitOptions[0]+", "+splitOptions[1].charAt(0).toUpperCase() + splitOptions[1].slice(1)+"</subtext></energy-track-ring>";
                } else {
                    //It's a mix of elements
                    energyHTML += "<energy-track><element-combination><element-top><"+splitOptions[0]+"></"+splitOptions[0]+"></element-top><element-bottom><"+splitOptions[1]+"></"+splitOptions[1]+"></element-bottom></element-combination><subtext>"+splitOptions[0].charAt(0).toUpperCase() + splitOptions[0].slice(1)+", "+splitOptions[1].charAt(0).toUpperCase() + splitOptions[1].slice(1)+"</subtext></energy-track>";
                }
            }
        }
    }
    fullHTML = '<energy-track-table>'+energyHTML+'</energy-track-table>';
    document.getElementsByTagName("energy-track")[0].removeAttribute("values");
    return fullHTML;
}

function parseCardPlayTrackTags(){
    var fullHTML = "";
    var cardPlayHTML = "";
    //console.log(growthHTML);
    
    var cardPlayValues = document.getElementsByTagName("card-play-track")[0].getAttribute("values");

    console.log(cardPlayValues);

    var cardPlayOptions = cardPlayValues.split(",");
    console.log(cardPlayOptions);

    //Find values between parenthesis
    var regExp = /\(([^)]+)\)/;

    for(i = 0; i < cardPlayOptions.length; i++){
        if(!isNaN(cardPlayOptions[i])){
            //The energy option is only a number
            if(i == 0){
                cardPlayHTML += "<card-play-track-initial><card-play><value>"+cardPlayOptions[i]+"</value></card-play></card-play-track-initial>";
            } else {
                cardPlayHTML += "<card-play-track><card-play><value>"+cardPlayOptions[i]+"</value></card-play><subtext>2</subtext></card-play-track>";
            }
        } else {
            //It is either a single element or a mix of elements/numbers
            var splitOptions = cardPlayOptions[i].split("+");

            if(splitOptions.length == 1){
                //It's just a single item
                var cardPlayOption = splitOptions[0].split("(")[0];
                switch(cardPlayOption){
                    case 'reclaim-one':
                        cardPlayHTML += "<card-play-track><card-play-special><"+splitOptions[0]+"></"+splitOptions[0]+"></card-play-special><subtext>Reclaim One</subtext></card-play-track>";
                        break;
                    case 'move-presence':
                        var matches = regExp.exec(splitOptions[0]);
                        var moveRange = matches[1];
                        cardPlayHTML += "<card-play-track><card-play-special><"+cardPlayOption+"-"+moveRange+"></"+cardPlayOption+"-"+moveRange+"></card-play-special><subtext>Move a Presence "+moveRange+"</subtext></card-play-track>";
                        break;
                    default:
                        cardPlayHTML += "<card-play-track><card-play-special><"+splitOptions[0]+"></"+splitOptions[0]+"></card-play-special><subtext>"+splitOptions[0].charAt(0).toUpperCase() + splitOptions[0].slice(1)+"</subtext></card-play-track>";
                        break;
                }
            } else {
                //Multiple items
                if(!isNaN(splitOptions[0])){
                    //It's a mix of energy and element
                    console.log("Card and element");
                    var subText = splitOptions[1].charAt(0).toUpperCase() + splitOptions[1].slice(1);
                    if(splitOptions[1] == 'reclaim-one'){
                        subText = "Reclaim One";
                    }
                    cardPlayHTML += "<card-play-track><card-play-top><value>"+splitOptions[0]+"</value></card-play-top><element-bottom><"+splitOptions[1]+"></"+splitOptions[1]+"></element-bottom><subtext>"+splitOptions[0]+", "+subText+"</subtext></card-play-track>";
                } else {
                    //It's a mix of elements and potentially something else
                    var subText = splitOptions[1].charAt(0).toUpperCase() + splitOptions[1].slice(1);
                    if(splitOptions[1] == 'reclaim-one'){
                        subText = "Reclaim One";
                    }
                    cardPlayHTML += "<card-play-track><element-combination><element-top><"+splitOptions[0]+"></"+splitOptions[0]+"></element-top><element-bottom><"+splitOptions[1]+"></"+splitOptions[1]+"></element-bottom></element-combination><subtext>"+splitOptions[0].charAt(0).toUpperCase() + splitOptions[0].slice(1)+", "+subText+"</subtext></card-play-track>";
                }
            }
        }
    }
    fullHTML = '<card-play-track-table>'+cardPlayHTML+'</card-play-track-table>';
    console.log(fullHTML);
    document.getElementsByTagName("card-play-track")[0].removeAttribute("values");
    return fullHTML;
}

function setNewEnergyCardPlayTracks(energyHTML, cardPlayHTML){
    document.getElementsByTagName("presence-tracks")[0].innerHTML = energyHTML + cardPlayHTML;
}

function dynamicCellWidth() {
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