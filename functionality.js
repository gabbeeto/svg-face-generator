let generateFacesButton = document.querySelector('#generateFaces');


generateFacesButton.addEventListener('click',generate)


//faces is an array from the other javascript file
//characters is an array from the other javascript file
let selector;
function generate(){
grabSelector();
for(let index = 0;index < faces.length; index++){
faceTogether = faces.map(face => selector.svg1 + face.svg1 + selector.svg2 + face.svg2 + selector.svg3);
	//todo 
downloadFile(faceTogether[index], `${faces[index].name}`);
}

}





function grabSelector(){
characters.forEach(word => {
if(document.querySelector('#characterSelect').value == word.name){selector = word;}});
}













function downloadFile(fileContent,name){

// Create element with <a> tag
link = document.createElement("a");

// Create a blog object with the file content which you want to add to the file
file = new Blob([fileContent], { type: 'text/plain' });

// Add file content in the object URL
link.href = URL.createObjectURL(file);

// Add file name
link.download = `${name}.svg`;

// Add click event to <a> tag to save file.
link.click();
URL.revokeObjectURL(link.href);
}


















let faceFileInput;

let bodyFileInput;

let reader = [];

let faceContainer = [];
let bodyContainer = [];

let addButton = document.querySelector('#add');
let add2Button = document.querySelector('#add2');
addButton.addEventListener('click', changeFaceStructure)
add2Button.addEventListener('click', changeBodyStructure)

function changeFaceStructure(){
faces = [];
changeFace();
}
function changeBodyStructure(){
characters = [];
changeBody();
}



function changeFace(){
faceFileInput = document.querySelector('#faceFileInput');
if(faceFileInput.files.length > 0){
addUploadedInformationToTheselectedContainer(faceFileInput, faceContainer);
faceSeperator(faceContainer);
cleanAndUpdateFace();

}

}




function changeBody(){
bodyFileInput = document.querySelector('#bodyFileInput');
if(bodyFileInput.files.length > 0)
addUploadedInformationToTheselectedContainer(bodyFileInput, bodyContainer);
bodySeperator(bodyContainer);
cleanAndUpdateBody();
}

variable2 = [];

function addUploadedInformationToTheselectedContainer(container, container2){
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


//todo
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
