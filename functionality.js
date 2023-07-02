


let generateFacesButton = document.querySelector('#generateFaces');


generateFacesButton.addEventListener('click', generateFace)


//faces is an array from the other javascript file
//characters is an array from the other javascript file
let selector;
function generateFace() {
    grabSelectorToMixItWithMissingPart('#characterSelect', characters);

    let index2 = 0; // counter
    function loopForSlowDownload() {         //  create a loop function
        setTimeout(function () {   //  call a 3s setTimeout when the loop is called
            let faceTogether = faces.map(face => selector.svg1 + face.svg1 + selector.svg2 + face.svg2 + selector.svg3);
            downloadFile(faceTogether[index2], `${faces[index2].name}`);
            index2++;                    //  increment the counter
            if (index2 < faces.length) {
                loopForSlowDownload();             //  ..  again which will trigger another 
            }                       //  ..  setTimeout()
        }, 1000)
    }
    loopForSlowDownload();
}





function grabSelectorToMixItWithMissingPart(select, containerForEach) {
    containerForEach.forEach(word => {
        if (document.querySelector(select).value == word.name) { selector = word; }
    });
}







function downloadFile(fileContent, nameOfFile) {

    // Create element with <a> tag
    let link = document.createElement("a");

    // Create a blog object with the file content which you want to add to the file
    let file = new Blob([fileContent], { type: 'text/plain' });

    // Add file content in the object URL
    link.href = URL.createObjectURL(file);

    // Add file name
    link.download = `${nameOfFile}.svg`;

    // Add click event to <a> tag to save file.
    link.click();
    URL.revokeObjectURL(link.href);
}







let generateBodiesButton = document.querySelector('#generateBodies');
let bodyTogether;

generateBodiesButton.addEventListener('click', generateBodies);


function generateBodies() {
    grabSelectorToMixItWithMissingPart('#faceSelect', faces);
    for (let index = 0; index < characters.length; index++) {
        bodyTogether = characters.map(character => character.svg1 + selector.svg1 + character.svg2 + selector.svg2 + character.svg3);
        downloadFile(bodyTogether[index], `${characters[index].name}`);
    }

    let index3 = 0;
    function loopForSlowDownload2() {         //  create a loop function
        setTimeout(function () {   //  call a 3s setTimeout when the loop is called
            bodyTogether = characters.map(character => character.svg1 + selector.svg1 + character.svg2 + selector.svg2 + character.svg3);
            downloadFile(bodyTogether[index3], `${characters[index3].name}`);
            index3++;                    //  increment the counter
            if (index3 < faces.length) {           //  if the counter < 10, call the loop function
                myLoop();             //  ..  again which will trigger another 
            }                       //  ..  setTimeout()
        }, 1200)
    }
    loopForSlowDownload2();
}











let faceFileInput;
let bodyFileInput;

let generateBodyButton = document.querySelector('#add');
let generateFaceButton = document.querySelector('#add2');

generateFaceButton.addEventListener('click', changeFaceStructure)
generateBodyButton.addEventListener('click', changeBodyStructure)

function changeFaceStructure() {
    faces = []; //NOSONAR
    changeFace();
}

function changeBodyStructure() {
    characters = []; /* NOSONAR */
    changeBody();
}



let faceContainer = [];

function changeFace() {
    faceFileInput = document.querySelector('#faceFileInput');
    if (faceFileInput.files.length > 0) {
        readUploadedInformationAndAddToTheSelectedContainer(faceFileInput, faceContainer).then(() =>{
        faceSeperator();
        cleanAndUpdateSelectContainers('#faceSelect', faces);
        });
    }
}



let bodyContainer = [];

function changeBody() {
    bodyFileInput = document.querySelector('#bodyFileInput');
    if (bodyFileInput.files.length > 0) {
        readUploadedInformationAndAddToTheSelectedContainer(bodyFileInput, bodyContainer).then(() =>{
        bodySeperator();
        cleanAndUpdateSelectContainers('#characterSelect', characters);
        });
    }

}









function readUploadedFile(file) {
    return new Promise((resolve) => {
      let reader = new FileReader();
      reader.readAsText(file);
      reader.onload = () => {
        resolve(reader.result);
      }
    });
  }
  
  async function readUploadedInformationAndAddToTheSelectedContainer(fileInput, container) {
    for (let index = 0; fileInput.files.length > index; index++) {
      container[index] = await readUploadedFile(fileInput.files[index]);
    }
  } 
   



let svge1;
let svge2;


let beginning1;
let beginning2;
let end1;
let end2;
let nameForFace;
let nameForFace2;

function faceSeperator() {

    for (let index in faceContainer) {
        beginning1 = faceContainer[index].indexOf('<d');
        end1 = faceContainer[index].indexOf('</d') + 7;
        svge1 = faceContainer[index].substring(beginning1, end1);

        beginning2 = faceContainer[index].indexOf('<u');
        end2 = faceContainer[index].indexOf('</sv');
        svge2 = faceContainer[index].substring(beginning2, end2);

        nameForFace = faceFileInput.files[index].name;
        nameForFace2 = nameForFace.substring(0, nameForFace.length - 4);

        faces[index] = { name: nameForFace2, svg1: svge1, svg2: svge2 };

    }
}

let nameForBody;
let nameForBody2;

function bodySeperator() {

    for (let index in bodyContainer) {
        end1 = bodyContainer[index].indexOf('</tit') + 8;
        svge1 = bodyContainer[index].substring(0, end1);

        beginning2 = bodyContainer[index].indexOf('<style');
        end2 = bodyContainer[index].indexOf('</g>') + 4;
        svge2 = bodyContainer[index].substring(beginning2, end2);

        nameForBody = bodyFileInput.files[index].name;
        nameForBody2 = nameForBody.substring(0, nameForBody.length - 4);

        characters[index] = { name: nameForBody2, svg1: svge1, svg2: svge2, svg3: `</svg>` };
    }
}





let newOption;

function cleanAndUpdateFace() {
    document.querySelector('#faceSelect').innerHTML = '';
    for (let index = 0; faces.length > index; index++) {
        newOption = document.createElement('option');
        newOption.value = faces[index].name;
        newOption.innerText = faces[index].name;
        document.querySelector('#faceSelect').appendChild(newOption);
    }
}


function cleanAndUpdateBody() {
    document.querySelector('#characterSelect').innerHTML = '';
    for (let index = 0; characters.length > index; index++) {
        newOption = document.createElement('option');
        newOption.value = characters[index].name;
        newOption.innerText = characters[index].name;
        document.querySelector('#characterSelect').appendChild(newOption);
    }
}



function cleanAndUpdateSelectContainers(select, container) {
    document.querySelector(select).innerHTML = '';
    for (let index = 0; container.length > index; index++) {
        newOption = document.createElement('option');
        newOption.value = container[index].name;
        newOption.innerText = container[index].name;
        document.querySelector(select).appendChild(newOption);
    }
}


let downloadTemplateLink;
document.querySelector('#downloadTemplate').addEventListener('click', downloadTemplate);

function downloadTemplate() {
    downloadFile(template, 'template')
}














document.querySelector('#characterSelect').addEventListener('change', displayFaceAndBody);
document.querySelector('#faceSelect').addEventListener('change', displayFaceAndBody);











let selector2;

function displayFaceAndBody() {
    //grab selector for face
    for (let index = 0; faces.length > index; index++)
        if (document.querySelector('#faceSelect').value == faces[index].name) {
            selector2 = faces[index];
        }


    //grab selector for the empty character
    for (let index = 0; characters.length > index; index++)
        if (document.querySelector('#characterSelect').value == characters[index].name) {
            selector = characters[index];
        }


    //mix both selector in order to display them
    let everythingTogether = selector.svg1 + selector2.svg1 + selector.svg2 + selector2.svg2 + selector.svg3;

    //display them
    document.querySelector('#faceAndBodyDisplay').innerHTML = `${everythingTogether}`;
    document.querySelector('#faceAndBodyDisplay > *').style.transform = `scale(${scaleValue})`;
}






document.querySelector('#scaleInput').addEventListener('change', updateScaleValue)
document.querySelector('#scaleInput2').addEventListener('change', updateScaleValue)

let scaleValue = 1.4
let scaleValue2 = 1.4
function updateScaleValue() {
    scaleValue = document.querySelector('#scaleInput').value;
    scaleValue2 = document.querySelector('#scaleInput2').value;
    document.querySelector('#scaleInputParagraph').innerText = scaleValue;
    document.querySelector('#scaleInputParagraph2').innerText = scaleValue2;
    displayFaceAndBody();
}























document.querySelector('#advanced').addEventListener('click', openLabelWindows);

function openLabelWindows() {
    document.querySelector('#labelPopUp').style.display = 'flex';
    document.querySelector('#basicMain').style.display = 'none';
    document.querySelector('footer').style.display = 'none';

}


document.querySelector('#backToBasic1').addEventListener('click', goToBasicLayout);

function goToBasicLayout() {


    document.querySelector('#advancedMain').style.display = 'none';
    document.querySelector('#labelPopUp').style.display = 'none';
    document.querySelector('#basicMain').style.display = 'grid';
    document.querySelector('footer').style.display = 'flex';
    document.querySelectorAll(".labelItem").forEach(element => { element.parentElement.removeChild(element) });
    label = [{}, {}];

}

document.querySelector('#amountOfLabels').addEventListener(
    'change', getTheLabels);


let containerForLabels = document.querySelector('#labelContainer');

let amountOfLabels;
function getTheLabels() {

    amountOfLabels = document.querySelector('#amountOfLabels').value;
    containerForLabels.innerHTML = '';

    for (let index = 0; Number(amountOfLabels) > index; index++) {

        if (index == 0) {
            let labelDiv = document.createElement('div');
            labelDiv.id = 'label1';
            labelDiv.setAttribute('class', 'labels');

            let input1 = document.createElement('input');
            input1.type = 'checkbox'
            input1.checked = false;


            let input2 = document.createElement('input');
            input2.type = 'text'
            input2.value = 'bodies'

            containerForLabels.appendChild(labelDiv);
            labelDiv.appendChild(input1);
            labelDiv.appendChild(input2);
        }


        else if (index == 1) {
            let labelDiv2 = document.createElement('div');
            labelDiv2.id = 'label2';
            labelDiv2.setAttribute('class', 'labels');

            let input3 = document.createElement('input');
            input3.type = 'checkbox';
            input3.checked = true;


            let input4 = document.createElement('input');
            input4.type = 'text';
            input4.value = 'faces';

            containerForLabels.appendChild(labelDiv2);
            labelDiv2.appendChild(input3);
            labelDiv2.appendChild(input4);
        }
        else if (index > 1) {

            let labelDiv = document.createElement('div');
            labelDiv.id = `label${index}`;
            labelDiv.setAttribute('class', 'labels');

            let input1 = document.createElement('input');
            input1.type = 'checkbox'
            input1.checked = false;

            let input2 = document.createElement('input');
            input2.type = 'text'
            input2.placeholder = 'insert label'

            containerForLabels.appendChild(labelDiv);
            labelDiv.appendChild(input1);
            labelDiv.appendChild(input2);

        }

    }

}

document.querySelector('#applyLabels').addEventListener('click', changeAdvanceStructureAccordingToLabel);

function changeAdvanceStructureAccordingToLabel() {
    getLabelName();
    generateEverythingInTheAdvanceMain();
    switchToAdvanceMain();
}




let label = [{}, {}]
let labelItems;
function getLabelName() {
    labelItems = document.querySelectorAll('#labelContainer > *');
    for (let index = 0; index < labelItems.length; index++) {
        if (labelItems[index].firstElementChild.checked) {
            label[index] = { vector: true, name: `${labelItems[index].lastElementChild.value}`, container: '' }
        }
        else {
            label[index] = { vector: false, name: `${labelItems[index].lastElementChild.value}`, container: '' }
        }
    }
}



let customSection2 = document.querySelector('#customSection2')
let generate2 = document.querySelector('#generate2');
let displaySection2 = document.querySelector('#displaySection2');

function generateEverythingInTheAdvanceMain() {
    for (let index = 0; label.length > index; index++) {

        // custom section:
        paragraph = document.createElement('p');
        paragraph.classList.add('labelItem')
        fileInput = document.createElement('input');
        fileInput.classList.add('labelItem')
        fileInput.classList.add('labelFile')
        addButton = document.createElement('button');
         addButton.classList.add('labelItem')
        addButton.classList.add('labelButton')

        paragraph.innerText = `upload ${label[index].name}`;

        fileInput.type = 'file'
        fileInput.id = `label${index}Input`;
        fileInput.multiple = true;
        fileInput.addEventListener('change', fileInputFunction )

        addButton.id = `label${index}Button`;
        addButton.innerText = `add ${label[index].name}`;
        customSection2.appendChild(paragraph);
        customSection2.appendChild(fileInput);
        customSection2.appendChild(addButton);
        addButton.addEventListener('click', addButtonFunction)
        // generate section 

        paragraph2 = document.createElement('p');
        paragraph2.classList.add('labelItem')
        generateButton = document.createElement('button');
        generateButton.classList.add('labelItem')
        generateButton.classList.add('labelGenerate')
        generateButton.addEventListener('click', generateFunction)

        paragraph2.innerText = `generate all the available ${label[index].name}`;
        generateButton.innerText = `add ${label[index].name}`;

        generate2.appendChild(paragraph2);
        generate2.appendChild(generateButton);

        // display section

        paragraph3 = document.createElement('p');
        paragraph3.classList.add('labelItem');
        select = document.createElement('select');
        select.classList.add('labelItem');
        select.classList.add('labelSelect');
        select.addEventListener('change', selectFunction)

        paragraph3.innerText = `available ${label[index].name}`;
        displaySection2.insertBefore(paragraph3, document.querySelector("#ParagraphForScaleInput2"));
        displaySection2.insertBefore(select, document.querySelector("#ParagraphForScaleInput2"));
    }


}







function addButtonFunction(event) {
    for (let index = 0; index < document.querySelectorAll('.labelButton').length; index++) {
        if (event.target == document.querySelectorAll('.labelButton')[index]) {
            label[index].container = [];
            readUploadedInformationAndAddToTheSelectedContainer(document.querySelectorAll('.labelFile')[index], label[index].container).then(() => {
                // Code that needs to be run after the files are loaded.
            console.log(label[index].container.length);
              })


        }
    }

}












function fileInputFunction(){
// console.log(`hey`);
}














function generateFunction(event) {
    document.querySelectorAll('.labelGenerate').forEach((element, index) => {
        if (event.target == element) {
            generateF(element, index);
        }
    })

}





// implement function later on
function generateF(element, index) {
    console.log(index);
    console.log(element);
}
















function selectFunction(event) {
    document.querySelectorAll('.labelSelect').forEach((element, index) => {
        if (event.target == element) {
            selectF(element, index);
        }
    })

}





// implement function later on
function selectF(element, index) {
    console.log(index);
    console.log(element);
}












function switchToAdvanceMain() {
    document.querySelector('#advancedMain').style.display = 'flex';
    document.querySelector('#labelPopUp').style.display = 'none';
}


document.querySelector('#backToBasic2').addEventListener('click', goToBasicLayout);
