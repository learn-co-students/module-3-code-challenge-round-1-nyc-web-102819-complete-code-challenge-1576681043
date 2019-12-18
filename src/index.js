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

document.addEventListener("click", function(e)





















  //end of document
})
