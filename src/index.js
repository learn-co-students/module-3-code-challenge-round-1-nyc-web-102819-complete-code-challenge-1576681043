document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')
  let imageId = 4193 //Enter the id from the fetched image here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`

  let image = document.getElementById('image')
  let imageTitle = document.getElementById('name')
  let likes = document.getElementById('likes')
  let commentsList = document.getElementById('comments')
  let likeButton = document.getElementById('like_button')
  let submitForm = document.getElementById('comment_form')
  
  
  


  function fetchImage() {
    fetch(`https://randopic.herokuapp.com/images/${imageId}`)
    .then(resp => resp.json())
    .then(pic => renderImage(pic))
  }

  function renderImage(pic) {
    likes.innerText = `${pic["like_count"]}`
    image.src = `${pic.url}`
    imageTitle.innerText = `${pic.name}`
    pic.comments.forEach(comment => {
      commentsList.innerHTML += `
      <li data-id = ${comment.id}> ${comment.content} </li>
      `
    })
  }

  likeButton.addEventListener("click", function(){
    likes.innerText = parseInt(likes.innerText) + 1
    // console.log("clicking", likes.innerText)
    fetch('https://randopic.herokuapp.com/likes', {
      method: "POST",

      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({
        image_id: "4193"
      }) 
    })
  })

  submitForm.addEventListener("submit", function(e){
    e.preventDefault()
    
    commentsList.innerHTML += `
    <li data-id =""> ${e.target.comment.value} </li>
    `
    fetch('https://randopic.herokuapp.com/comments', {
      method: "POST",

      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },

      body: JSON.stringify({
        image_id: "4193",
        content: e.target.comment.value
      })
      
    })
    submitForm.reset()

  })



  fetchImage()


})
