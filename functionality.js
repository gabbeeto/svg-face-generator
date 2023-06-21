let generateFacesButton = document.querySelector('#generateFaces');


generateFacesButton.addEventListener('click',generate)


//faces is an array from the other javascript file
//characters is an array from the other javascript file
let selector;
function generate(){
grabSelector();
for(let index = 0;index < faces.length; index++){
faceTogether = faces.map(face => selector.beforeHair + face + selector.hair);
	//todo 
downloadFile(faceTogether[index], `face${index}`);
}

}





function grabSelector(){
if(document.querySelector('#characterSelect').value == 'gabbeeto'){
selector = gabbeeto;}
else if(document.querySelector('#characterSelect').value == 'jay'){
selector = jay;
}
else{
selector = yuchie;
}
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
