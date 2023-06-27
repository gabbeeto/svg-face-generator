let generateFacesButton = document.querySelector('#generateFaces');


generateFacesButton.addEventListener('click',generateFace)


//faces is an array from the other javascript file
//characters is an array from the other javascript file
let selector;
function generateFace(){
grabSelectorToMixItWithMissingPart('#characterSelect', characters);

for(let index = 0;index < faces.length; index++)
{
faceTogether = faces.map(face => selector.svg1 + face.svg1 + selector.svg2 + face.svg2 + selector.svg3);
downloadFile(faceTogether[index], `${faces[index].name}`);
}

}





function grabSelectorToMixItWithMissingPart(select,containerForEach){
containerForEach.forEach(word => {
if(document.querySelector(select).value == word.name)
{selector = word;}
});
}







function downloadFile(fileContent,nameOfFile){

// Create element with <a> tag
link = document.createElement("a");

// Create a blog object with the file content which you want to add to the file
file = new Blob([fileContent], { type: 'text/plain' });

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

generateBodiesButton.addEventListener('click',generateBodies);


function generateBodies(){
grabSelectorToMixItWithMissingPart('#faceSelect', faces);
for(let index = 0;index < characters.length; index++){
bodyTogether = characters.map(character => character.svg1 + selector.svg1 + character.svg2 + selector.svg2 + character.svg3);
downloadFile(bodyTogether[index], `${characters[index].name}`);
}

}











let faceFileInput;
let bodyFileInput;

let generateFaceButton = document.querySelector('#add');
let generateBodyButton = document.querySelector('#add2');

generateFaceButton.addEventListener('click', changeFaceStructure)
generateBodyButton.addEventListener('click', changeBodyStructure)


function changeFaceStructure(){
faces = [];
changeFace();
}

function changeBodyStructure(){
characters = [];
changeBody();
}



let faceContainer = [];
function changeFace(){
faceFileInput = document.querySelector('#faceFileInput');
if(faceFileInput.files.length > 0){
readUploadedInformationAndAddToTheSelectedContainer(faceFileInput, faceContainer);
faceSeperator(faceContainer);
cleanAndUpdateSelectContainers('#faceSelect', faces);
}

}



let bodyContainer = [];
function changeBody(){
bodyFileInput = document.querySelector('#bodyFileInput');
if(bodyFileInput.files.length > 0){
readUploadedInformationAndAddToTheSelectedContainer(bodyFileInput, bodyContainer);
bodySeperator(bodyContainer);
cleanAndUpdateSelectContainers('#characterSelect', characters);
}

}



let reader = [];
function readUploadedInformationAndAddToTheSelectedContainer(container, container2){
for(let index = 0;container.files.length > index;index++){
reader[index] = new FileReader();
reader[index].readAsText(container.files[index]);
reader[index].onload = function() {
container2[index] = reader[index].result;
};}}



let svge1;
let svge2;


let beginning1;
let beginning2;
let end1;
let end2;
let nameForFace;
let nameForFace2;

function faceSeperator(variable){

for(let index in variable){
variable[index]
beginning1 =  variable[index].indexOf('<d');
end1 = variable[index].indexOf('</d') + 7;
svge1 = variable[index].substring(beginning1,end1) ;

beginning2 =  variable[index].indexOf('<u');
end2 = variable[index].indexOf('</sv');
svge2 = variable[index].substring(beginning2, end2);

nameForFace = faceFileInput.files[index].name;
nameForFace2 = nameForFace.substring(0,nameForFace.length -4);

faces[index] = {name:`${nameForFace2}`, svg1: `${svge1}`, svg2: `${svge2}`};

}
}

let nameForBody;
let nameForBody2;

function bodySeperator(variable){

for(let index in variable){
variable[index]
end1 = variable[index].indexOf('</tit') + 8;
svge1 = variable[index].substring(0,end1) ;

beginning2 =  variable[index].indexOf('<style');
end2 = variable[index].indexOf('</g>') + 4;
svge2 = variable[index].substring(beginning2, end2);

nameForBody = bodyFileInput.files[index].name;
nameForBody2 = nameForBody.substring(0,nameForBody.length -4);

characters[index] = {name:`${nameForBody2}`, svg1: `${svge1}`, svg2: `${svge2}`, svg3: `</svg>`};
}
}





let newOption;

function cleanAndUpdateFace(){
document.querySelector('#faceSelect').innerHTML = '';
for(let index = 0;faces.length > index; index++){
newOption = document.createElement('option');
newOption.value = faces[index].name;
newOption.innerText = faces[index].name;
document.querySelector('#faceSelect').appendChild(newOption);
}
}


function cleanAndUpdateBody(){
document.querySelector('#characterSelect').innerHTML = '';
for(let index = 0;characters.length > index; index++){
newOption = document.createElement('option');
newOption.value = characters[index].name;
newOption.innerText = characters[index].name;
document.querySelector('#characterSelect').appendChild(newOption);
}
}



function cleanAndUpdateSelectContainers(select,container){
document.querySelector(select).innerHTML = '';
for(let index = 0;container.length > index; index++){
newOption = document.createElement('option');
newOption.value = container[index].name;
newOption.innerText = container[index].name;
document.querySelector(select).appendChild(newOption);
}
}


let downloadTemplateLink;
document.querySelector('#downloadTemplate').addEventListener('click', downloadTemplate);

function downloadTemplate(){
downloadFile(template, 'template')
}














document.querySelector('#characterSelect').addEventListener('change', displayFaceAndBody);
document.querySelector('#faceSelect').addEventListener('change', displayFaceAndBody);











let selector2;

function displayFaceAndBody(){
//grab selector for face
for(let index = 0; faces.length > index; index++)
if(document.querySelector('#faceSelect').value == faces[index].name){
selector2 = faces[index];
}


//grab selector for the empty character
for(let index = 0; characters.length > index; index++)
if(document.querySelector('#characterSelect').value == characters[index].name){
selector = characters[index];
}


//mix both selector in order to display them
everythingTogether =  selector.svg1 + selector2.svg1 + selector.svg2 + selector2.svg2 + selector.svg3;

//display them
document.querySelector('#faceAndBodyDisplay').innerHTML = `${everythingTogether}`;
document.querySelector('#faceAndBodyDisplay > *').style.transform =  `scale(${scaleValue})`;
}






document.querySelector('#scaleInput').addEventListener('change', updateScaleValue)

let scaleValue = 1.4
function updateScaleValue(){
scaleValue = document.querySelector('#scaleInput').value;
document.querySelector('#scaleInputParagraph').innerText = scaleValue;
displayFaceAndBody();
}























document.querySelector('#advanced').addEventListener('click', switchToAdvanced);

function switchToAdvanced(){
document.querySelector('#advancedMain').style.display = 'flex';
document.querySelector('#basicMain').style.display = 'none';


}

