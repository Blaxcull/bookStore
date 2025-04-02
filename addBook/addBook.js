
const token = localStorage.getItem("token");

if (!token) {
    alert("Your session has expired. Please sign in again.");
    window.location.href = "../signIn/signIn.html"; // Redirect to login page
}



let image;

const letter = document.createElement('div')
letter.id = 'bookInfo'

const dropZone = document.createElement('div');
dropZone.id = 'drop_zone';

const defaultMessage = document.createElement('div') 
defaultMessage.innerHTML  ="Drag one or more files to this";

document.body.appendChild(dropZone);
dropZone.appendChild(defaultMessage)



    let formData = new FormData();

function dragOverHandler(event) {
  event.preventDefault();

  dropZone.style.backgroundColor = '#f0f0f0'; // Light gray background
}

function dropHandler(event) {
  event.preventDefault();

  dropZone.style.backgroundColor = ''; // Reset to default

  const files = Array.from(event.dataTransfer.files)
    const imageFiles = files.filter(file => file.type.startsWith("image/")) 
  if (imageFiles.length > 0) {

 const existingImage = document.querySelector('img');
    if (existingImage) {
      existingImage.remove();
    }   


      console.log('Files dropped:');

      let img = document.createElement("img");
        img.id = 'bookImg'
      



    for (const file of imageFiles) {
        

      console.log(file.name, file.size, file.type);

        image = file
        
        
        var reader = new FileReader();
        reader.onload = function(event){
            var dataUri = event.target.result

            img.src =  dataUri;
            dropZone.after(img)
        };

        reader.readAsDataURL(file);
        formData.delete('image');
        formData.append('image', file);
    }
  }
}
dropZone.addEventListener('dragover', dragOverHandler);
dropZone.addEventListener('drop', dropHandler);


let selectFile = document.createElement('button')
selectFile.id = 'selectFile'
selectFile.innerText = 'Select an Image'




defaultMessage.after(selectFile)

selectFile.onclick = ()=>{
    let input = document.createElement('input');
  input.type = 'file';
    input.accept = 'image/*';
  input.onchange = _ => {
            let files =   Array.from(input.files);
            console.log(files);

    for (const file of files) {

 const existingImage = document.querySelector('img');
    if (existingImage) {
      existingImage.remove();
    }   



        let img = document.createElement("img");
        img.id = 'bookImg'
        image = file

        
        var reader = new FileReader();

        reader.onload = function(event){
            var dataUri = event.target.result

            img.src =  dataUri;
            dropZone.after(img)
        };

        reader.readAsDataURL(file);
        formData.delete('image');
        formData.append('image', file);


        };
  }
  input.click();


}
document.body.appendChild(letter)



function createLabeledInput(labelText, inputId) {
    let container = document.createElement('div');

    let label = document.createElement('label');
    label.innerText = labelText;
    label.setAttribute('for', inputId);

    let input = document.createElement('input');
    input.id = inputId;

    container.appendChild(label);
    container.appendChild(input);

    return container;
}

let titleField = createLabeledInput("Title: ", "bookTitle");
let descriptionField = createLabeledInput("Description: ", "bookDescription");
let costField = createLabeledInput("Cost: ", "bookCost");

let costInput = costField.querySelector('input');

let descriptionInput= descriptionField.querySelector('input');
let  titleInput = titleField.querySelector('input');



costInput.addEventListener('input', function () {
    this.value = this.value.replace(/[^0-9.]/g, ''); 
    if ((this.value.match(/\./g) || []).length > 1) {
        this.value = this.value.slice(0, -1); 
    }
});

letter.appendChild(titleField);
letter.appendChild(descriptionField);
letter.appendChild(costField);

document.body.appendChild(letter);





let addPdf= document.createElement('button')
addPdf.id = 'addPdf'
addPdf.innerText = 'Select an Pdf'


document.body.appendChild(addPdf)


let pdf;
let pdfName = document.createElement('div')

addPdf.onclick = ()=>{
    let input = document.createElement('input');
  input.type = 'file';
    input.accept = 'application/pdf'
  input.onchange = _ => {
            let files =   Array.from(input.files);
      pdf = files
    for (const file of files) {

        console.log(file);

        if(pdfName.textContent){pdfName.textContent = ''}

        pdfName.id = 'pdfName'

        pdfName.textContent = file.name

        
        addPdf.after(pdfName)
        formData.delete('pdf');  
            formData.append('pdf',file);
    }
  }
  input.click();

}


let addBook  = document.createElement('button')

addBook.id = 'addBook'
addBook.innerText = 'add the Book'
document.body.appendChild(addBook)

addBook.onclick = async()=>{

    document.body.innerHTML = ''
let addBook = document.createElement('button')

addBook.innerText = 'add another book'


console.log("hello")

document.body.appendChild(addBook)

addBook.onclick=()=>{
    
    window.location.href = '../addBook/addBook.html'


}


let home = document.createElement('button')

home.innerText = 'Goo home'


console.log("hello")

document.body.appendChild(home)

home.onclick=()=>{
    window.location.href = '../main.html'

}







    if(image&& pdf &&  titleInput.value && descriptionInput.value && costInput.value && pdfName.textContent && pdf){
        let title = titleInput.value
        let des =descriptionInput.value
        let cos = costInput.value
        let pdfTitle = pdfName.textContent

        formData.append('title', title);
        formData.append('des',des);
        formData.append('cos',cos);
        formData.append('pdfTitle',pdfTitle);
        console.log('book sent')
        console.log(costInput.value)
        console.log(formData)
    const sendBook = await fetch("http://localhost:3000/sendBook", {

            method: 'POST',

            body: formData
    })

        const data = await sendBook.json()


    }
    else{

        console.log('fill the feilds')

    }

    }


