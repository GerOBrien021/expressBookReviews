const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  //Write your code here
  return res.status(300).json({message: "Yet to be implemented"});
});

// Get the book list available in the shop
public_users.get('/', function(req, res) {
  res.send(JSON.stringify(books, null, 4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn', function(req, res) {
  const isbn = req.params.isbn;

  res.send(books[isbn]);
});
  
// Get all books based on author
public_users.get('/author/:author', function (req, res) {
  const author = req.params.author;

  // Get the keys of the books object
  const keys = Object.keys(books);

  // Filter the books object to get any matches by author
  let filtered_keys = keys.filter((key) => books[key].author === author);

  // Create a new books object containing only the matches
  let filtered_books = {};
  filtered_keys.forEach((key) => {
    let book = {
        "author": books[key].author,
        "title": books[key].title,
        "reviews": books[key].reviews
    }
    filtered_books[key] = book;
  })

  res.send(filtered_books);
});

// Get all books based on title
public_users.get('/title/:title', function (req, res) {
    const title = req.params.title;

    // Get the keys of the books object
    const keys = Object.keys(books);

    // Filter the books object to get the keys of books that match by title
    let filtered_keys = keys.filter((key) => {  
        return books[key].title === title;
    });
  
    // Create a new books object containing only the matches
    let filtered_books = {};
    filtered_keys.forEach((key) => {
      let book = {
          "author": books[key].author,
          "title": books[key].title,
          "reviews": books[key].reviews
      }
      filtered_books[key] = book;
    })
  
    res.send(filtered_books);
  });

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  const isbn = req.params.isbn;

  if (books[isbn]) {
    res.send(books[isbn].reviews);
  } else {
    res.json({message: "There's no match for that ISBN."});
  }

});

module.exports.general = public_users;
