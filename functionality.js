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

























let customFaceInput = document.querySelector('#customFaceInput');
let customBodyInput = document.querySelector('#customBodyInput');


let customFaceInputButton = document.querySelector('#addCustomFacesButton');
let customBodyInputButton = document.querySelector('#addCustomBodiesButton');

document.querySelector('#customSection').addEventListener('click', customizeGenerator)

function customizeGenerator(event){
if(event.target == customFaceInputButton){
alert('you touched the face input');
changeFacesArray();
}
else if(event.target == customBodyInputButton){
alert('you touched the body input');
}
}

let newArray2;
function changeFacesArray(){
let newArray2 = customFaceInput.value.split(',,');
let newArray3 = newArray2.map(word => word.replace(/[\n\t]/g, ''));

// to-doadd a for loop that parses all of the items and make it an object
//newArray = newArray3.map(word => JSON.parse(word) );

document.querySelector('#faceSelect').innerHTML = '';
for(let index = 0;newArray.length > index; index++){
newOption = document.createElement('option');
newOption.value = newArray[index].name;
newOption.innerText = newArray[index].name;
document.querySelector('#faceSelect').appendChild(newOption);
}


faces = newArray;



}

