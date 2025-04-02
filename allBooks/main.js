
const getBooks = async () => {
    try {
        const response = await fetch("http://localhost:3000/books");
        if (!response.ok) throw new Error("Failed to fetch books");

        const books = await response.json();
        console.log("Books Data:", books);

        const booksContainer = document.getElementById("booksContainer");
        booksContainer.innerHTML = ""; // Clear previous content

        books.forEach((book) => {
            const bookElement = document.createElement("div");
            bookElement.className = "book-item";

            const title = document.createElement("h3");
            title.textContent = book.title;
            bookElement.appendChild(title);

            // Create description
            const description = document.createElement("p");
            description.textContent = book.description;
            bookElement.appendChild(description);

            // Create price
            const price = document.createElement("p");
            price.textContent = `Price: $${book.cost}`;
            bookElement.appendChild(price);

            // Create PDF button or message
            const pdfParagraph = document.createElement("p");
            pdfParagraph.textContent = "PDF: ";
            if (book.pdf) {
                const pdfButton = document.createElement("button");
                pdfButton.textContent = "View PDF";
                pdfButton.onclick = ()=> {
                    openPdf(book.pdf);
                };
                pdfParagraph.appendChild(pdfButton);

            } else {
                pdfParagraph.textContent += "No PDF";
            }
            bookElement.appendChild(pdfParagraph);

            // Create delete button
            const deleteBook= document.createElement("button");
            deleteBook.textContent = "Delete";

            bookElement.appendChild(deleteBook);

deleteBook.onclick = async()=>{
    console.log(title.textContent)
        bookElement.remove()


    let titleName = title.textContent
    console.log(titleName)


        const response = await fetch("http://localhost:3000/deleteBook",{

            method: "POST",
headers: {"Content-Type": "application/json"},
            body: JSON.stringify({titleName})


        });

}
            // Create image (if it exists)
            if (book.image) {
                const image = document.createElement("img");
                image.src = book.image;
                image.alt = "Book Image";
                image.width = 150;
                bookElement.appendChild(image);
            }

            // Add horizontal line
            const hr = document.createElement("hr");
            bookElement.appendChild(hr);

            // Append the new book element to the container
            const booksContainer = document.getElementById("booksContainer");
            booksContainer.appendChild(bookElement);

        });
    } catch (error) {
        console.error("Error fetching books:", error);
    }
};

// Call function when the page loads
document.addEventListener("DOMContentLoaded", getBooks);
function openPdf(base64Data, filename = "book.pdf") {
    const byteCharacters = atob(base64Data.split(",")[1]);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: "application/pdf" });

    // Create a URL for the blob
    const blobUrl = URL.createObjectURL(blob);

    // Open in a new tab
    window.open(blobUrl, "_blank");
}


