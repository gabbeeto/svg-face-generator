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
addButton.addEventListener('click', changeFaceAndBodyStructure)

function changeFaceAndBodyStructure(){
faces = [];
changeFace();
//changeBody();
}



function changeFace(){
faceFileInput = document.querySelector('#faceFileInput');
addUploadedInformationToTheselectedContainer(faceFileInput, faceContainer);
faceSeperator(faceContainer)

}




//function changeBody(){
//bodyFileInput = document.querySelector('#bodyFileInput');
//addUploadedInformationToTheselectedContainer(bodyFileInput, bodyContainer);
//}

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


let var1;
let var2;
let var3;
let var4;
let nameForFace;
let nameForFace2;

function faceSeperator(variable){

for(let index in variable){

variable2[index] = variable[index].split('');

for(let index2 = 0; variable2[index].length > index2;index2++){
if(variable2[index][index2] == '<' && variable2[index][index2 + 1] == 'd'){
var1= index2;
}
else if(variable2[index][index2] == '<' && variable2[index][index2 + 1] == '/' && variable2[index][index2 + 2] == 'd'){
var2= index2 + 6;
}
else if(variable2[index][index2] == '<' && variable2[index][index2 + 1] == 'u'){
var3= index2;
}
else if(variable2[index][index2] == '>' && variable2[index][index2 + 1] == '\n' && variable2[index][index2 + 2] == '<' && variable2[index][index2 + 3] == 's' && variable2[index][index2 + 4] == 'v'){
var4= index2+ 2;
}

svge1 = variable2[index].slice(var1, var2).join('');
svge2 = variable2[index].slice(var3, var4).join('');

nameForFace = faceFileInput.files[index].name;
nameForFace2 = nameForFace.substring(0,nameForFace.length -4);

faces[index] = {name:`${nameForFace2}`, svg1: `${svge1}`, svg2: `${svge2}`};
}

}
}
