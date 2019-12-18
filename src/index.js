document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 4199 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`
  const imageCard = document.getElementById("image_card")
  let likeButton = document.getElementById("like_button")
  let commentForm = document.getElementById("comment_form")


  function getImage (){
    fetch(imageURL)
    .then(response => response.json())
    .then(function(image) { 
      imageCard.innerHTML = `
      <img src="${image.url}" id="image" data-id="${image.id}"/>
      <h4 id="name">${image.name}</h4>
      <span>Likes:
        <span id="likes">${image.like_count}</span>
      </span>
      <button id="like_button">Like</button>
      <form id="comment_form">
        <input id="comment_input" type="text" name="comment" placeholder="Add Comment"/>
        <input type="submit" value="Submit"/>
      </form>
      <ul id="comments">
           <!-- <li> for each comment goes here -->
      </ul>
      `
      let commentUl = document.getElementById("comments")
      let comments = image.comments
      comments.forEach(function(comment){
        let commentLi = document.createElement("li")
        commentLi.innerText = comment.content
        commentUl.appendChild(commentLi)
      })
    })

  }

  imageCard.addEventListener("click", function(e){
    e.preventDefault()
    if (e.target.id === "like_button") {
      let likeCount = e.target.parentNode.children[2]
      likesNum = likeCount.children[0].innerText
      ++likesNum
      
      fetch(likeURL, {
        method: "POST",
        body: JSON.stringify({
        image_id: imageId,
        }),
        headers:
        { 'Accept': 'application/json',
          'Content-Type': 'application/json'}
        })
        .then(response => response.json())
        .then(getImage)
    } 
  })

  // console.log(likeButton)
  // likeButton.addEventListener("click", function(e){
  //   console.log(e)
  //   if (e.target.id === "like_button") {
  //     let likeCount = e.target.parentNode.children[2]
  //     likesNum = likeCount.children[0].innerText
  //     ++likesNum
      
  //     fetch(likeURL, {
  //       method: "POST",
  //       body: JSON.stringify({
  //       image_id: imageId,
  //       }),
  //       headers:
  //       { 'Accept': 'application/json',
  //         'Content-Type': 'application/json'}
  //       })
  //       .then(response => response.json())
  //       .then(getImage)
  //   } 
  // })


  // commentForm.addEventListener("submit", function(e){
  //   e.preventDefault()
  //   console.log(e)

  // })
  

  getImage()



})
