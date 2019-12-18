document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')
  let imageId = 4192 //Enter the id from the fetched image here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  //https://randopic.herokuapp.com/images/4192
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`
  let imageBase = document.getElementById("image-content")
  let image = document.getElementById("image")
  let title = document.getElementById("name")
  let commentul = document.getElementById("comments")
  let likes = document.getElementById("likes")

fetch(`${imageURL}`)
  .then(function (response) {return response.json();
  })
    .then(function (data) {
     
          console.log(data);
          title.innerText = `${data.name}`
          image.src = `${data.url}`
          likes.innerText = data.like_count
          data.comments.forEach(function(e){
              let comment = document.createElement(`ul`)
              comment.innerText = `${e.content}`
              commentul.appendChild(comment)
          })
}) ///HOLY SHIT IT WORKED!?!?!?!?!?!?!?

//getting likes front end
document.addEventListener("click", function(e){
  if (e.target.id === `like_button`)
      likes.innerText ++ //goal 2!
      fetch(`${likeURL}`, {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        method: "POST", 
        body: JSON.stringify({image_id: 4192})
    })
  // .then (function(response){console.log(response)}) //hopefully this works seems to referesh after reloading! (goal 3)
})

document.addEventListener("submit",function(e){
  e.preventDefault()
  let comment = document.createElement(`ul`)
  comment.innerText = `${e.target.comment.value}`
  commentul.appendChild(comment) //front end comments done! (AND COMPLETELY NOT REFACTORED)
  fetch(`${commentsURL}`, {
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    method: "POST", 
    body: JSON.stringify({image_id: 4192, content:`${e.target.comment.value}`}) ///HOLY SHIT I PASSED!?
  })
})

/*
stretch goals!
gonna psuedo code here because I'm too scared to change this lol

first, I'd have to add a delete button to my comments
let byebutton = document.createElement(button)
byebutton.innertext = "delete"

weird part of this would be where to hang this code to. would I put it in the comment itself above?
if I append it would it go underneath?

option 1 is append
option 2 is instead of comment.innerText, go comment.innerHTML and add it as a button there?

either way, after getting that to be made
I'd have to make a clicker to hit said button

comment.addEventListener(click, function(e){
  if e.innerText = "delete"
    then fetch('https://randopic.herokuapp.com/comments/:comment_id'),{
      method: DELETE
    } <-- I'm ASSUMING that comment id would be some sort of `${id}` I'd have to find.
    // if that worked, then I'd write this below to make it pessmistic?
    e.parentNode.delete() <--- something like that, depends on how I coded it.
})
*/





















  //end of document
})
