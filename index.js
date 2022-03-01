const express =require("express");
const ourApp=express();
const database=require("./database");
ourApp.use(express.json());

ourApp.get("/",(request,response)=>{
    response.json({message:"hello from server"},);
});


//route- "/book"
//des-to get all the books from databse
//params-none
//method-GET
//body-NONE
//access-public


ourApp.get("/book",(req,res)=>{

    return res.json({book:database.Book});
});


//route- "/book/:bookID"
//des-to get specific books
//params-BOOKid
//method-GET
//body-NONE
//access-public

ourApp.get("/book/:bookID",(req,res)=>{
    const getBook=database.Book.filter((book)=>{
        return book.ISBN===req.params.bookID
    });
    return res.json({book:getBook});
});


//route- "/book/C/:category"
//des-to get specific books based on category
//params-category
//method-GET
//body-NONE
//access-public

ourApp.get("/book/c/:category",(req,res)=>{
    const getBook=database.Book.filter((book)=>{
        return book.category.includes(req.params.category)
    });
    return res.json({book:getBook});
});


//route- "/book/C/:category"
//des-to get a list of books based on author
//params-author
//method-GET
//body-NONE
//access-public
ourApp.get("/book/b/:auth",(req,res)=>{
    const getBook=database.Book.filter((book)=>{
        console.log("inside te function");
       y=false;
        a=book.authors;
        a.filter(element => {
            if(element==req.params.auth){
                y=true;
                return;
            }
        });
        return y;
    });
    return res.json({book:getBook}); 
});



//---------AUTHOR GET API----------


//route- "/author"
//des-to get all the authors from db
//params-NONE
//method-GET
//body-NONE
//access-public

ourApp.get("/author",(req,res)=>{
    return res.json({author:database.Author});
});

//route- "/author/:id"
//des-to get all the authors based on id
//params-id
//method-GET
//body-NONE
//access-public

ourApp.get("/author/:id",(req,res)=>{
    const getAuthor=database.Author.filter((author)=>{
        return author.id==req.params.id;
    })
    return res.json({author:getAuthor});
});

//route- "/author/B/:book"
//des-to get all the authors based on book
//params-book
//method-GET
//body-NONE
//access-public

ourApp.get("/author/b/:book",(req,res)=>{
    const getAuthor=database.Author.filter((author)=>{
        console.log("inside te function");
        y=false;
        a=author.books;
        a.filter(element => {
            if(element==req.params.book){
                y=true;
                return true;
            }
        });
        return y;
    });
    return res.json({Author:getAuthor}); 
});




//---------PUBLICATION API-------

//route- "/PUBLICATION/"
//des-to get all the publications
//params-none
//method-GET
//body-NONE
//access-public

ourApp.get("/publication",(req,res)=>{
    return res.json({PUBLICATION:database.Publication});
});


//route- "/PUBLICATION/:id"
//des-to get specific publication 
//params-id
//method-GET
//body-NONE
//access-public

ourApp.get("/publication/:id",(req,res)=>{
    const getPublication=database.Publication.filter((publication)=>{
        return publication.id==req.params.id;
    })
    return res.json({publication :getPublication});
});



//route- "/PUBLICATION/c/:book"
//des-to get a list of publication based on a book.
//params-book
//method-GET
//body-NONE
//access-public


ourApp.get("/publication/b/:book",(req,res)=>{
    const getPublication=database.Publication.filter((publication)=>{
        console.log("inside the function");
        y=false;
        a=publication.books;
        a.filter(element => {
            if(element==req.params.book){
                y=true;
                return true;
            }
        });
        return y;
    });
    return res.json({Publication:getPublication}); 
});



//---POST API FOR BOOK-------

//route- "/PUBLICATION/NEW"
//des-to add new book
//params-NONE
//method-POST
//body-JSON
//access-public

ourApp.post("/book/new",(req,res)=>{
    const newBook=req.body;
   return res.json({newbook:newBook});
});


//route- "/author/NEW"
//des-to add new new author
//params-NONE
//method-POST
//body-JSON
//access-public
ourApp.post("/author/new",(req,res)=>{
    const newAuthor=req.body;
   return res.json({newauthor:newAuthor});
});

//route- "/publication/NEW"
//des-to add new new publication
//params-NONE
//method-POST
//body-JSON
//access-public

ourApp.post("/publication/new",(req,res)=>{
    const newPublication=req.body;
   return res.json({newpublication:newPublication});
});


//--------PUT API-----

//route- "/book/update"
//des-to update any of the details of the book
//params-NONE
//method-PUT
//body-JSON
//access-public


ourApp.put("/book/update/:isbn",(req,res)=>{
    const {newBook}=req.body;
    const {isbn}=req.params;

      database.Book.map((book)=>{
        console.log("inside for each");
        console.log(book.ISBN,isbn);
        if(book.ISBN===isbn){
            const book1={...book, ...newBook};
            const i=database.Book.indexOf(book);
            delete database.Book[i];
            database.Book.push(book1)

        }
        else{
            return book;
        }
       
    });

    return res.json({book:database.Book});
});




//route- "/bookAuthor/update/:isbn"
//des-to update any of the details of the book author
//params-NONE
//method-PUT
//body-JSON
//access-public


ourApp.put("/bookAuthor/update/:isbn",(req,res)=>{
    const {newAuthor}=req.body;
    const {isbn}=req.params;
    const book=database.Book.map((book)=>{
        if(book.ISBN===isbn){
            if(!book.authors.includes(newAuthor)){
                return book.authors.push(newAuthor);
            }
            return book;
        }
        return book;
    });

    //updating author database object
    database.Author.forEach((author)=>{
        if(author.id===newAuthor){
            if(!author.books.includes(isbn)){
                return author.books.push(isbn);
            }
            return author;

        }
        return author;
    })

    return res.json({book:database.Book,author:database.Author})

});



//to update author database
ourApp.put("/author/update/:id",(req,res)=>{
    const {updatedAuthor}=req.body;
    const {id}=req.params;
    const author=database.Author.map((author)=>{
        if(author.id===parseInt(id)){
            return {...author,...updatedAuthor};
        }
        return author;
     
    });
return res.json(author);

});


//route- "/publication/update/"
//des-to update any of the details of the publication
//params-NONE
//method-PUT
//body-JSON
//access-public

ourApp.put("/publication/update/:id",(req,res)=>{

    const {updatepublication}=req.body;
    const {id}=req.params;
    const aasnda=database.Publication.map((publication)=>{
        if(publication.id===parseInt(id)){
            pub1= {...publication,...updatepublication};
            i=database.Publication.indexOf(publication);
            delete database.Publication[i];
            console.log(pub1);
            database.Publication.push(pub1);
        }
        return publication;
    });
   
    return res.json({Publication:database.Publication});


});























ourApp.listen(4000,()=>console.log("server running successfully......."));  
//0691