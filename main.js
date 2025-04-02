let signIn = document.createElement('button')
signIn.innerText = 'sign In'
document.body.appendChild(signIn)


const adminMail  = 'blaxcull@gmail.com';
let userMail;

let addBook = document.createElement("button")
addBook.innerText = 'add Book'


let books = document.createElement("button")
books.innerText = 'Books'




let allBooks= document.createElement("button")
allBooks.innerText = 'all Book'

signIn.onclick = () => {

    window.location.href = './signIn/signIn.html';
}

const getProtectedData = async() => {
    const response = await fetch("http://localhost:3000/dashboard", {
        method: "GET",
        headers: {
            "Authorization": `Bearer ${localStorage.getItem("token")}`
        }
    });
    const data = await response.json();
    console.log(data);
    console.log(data.user.email)
    userMail = data.user.email

checkAdmin(adminMail)
}
getProtectedData()



const logOut = document.createElement('button')

logOut.innerText = 'logOut'
document.body.appendChild(logOut)

logOut.onclick = () => {
    localStorage.removeItem("token");
    window.location.href = "main.html";

}



function checkAdmin(mail){

    if(mail== userMail){

        console.log('hello')





        document.body.appendChild(addBook)
        document.body.appendChild(allBooks)

    }
    else{

        document.body.appendChild(books)



    }
}
addBook.onclick=()=>{

    window.location.href = './addBook/addBook.html';
}


allBooks.onclick=()=>{

    window.location.href = './allBooks/main.html';
}
