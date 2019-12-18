document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 4197 //Enter the id from the fetched image here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`

  let card = document.getElementById("image_card")
  let img = document.getElementById("image")
  let list = document.getElementById("comments")
  let name = document.getElementById("name")
  let likes = document.getElementById("likes")

  // console.log("img id:",img.id)
  // console.log("img src:",img.src)
  // console.log("img data-id:",img.dataset.id)
  // console.log("img name:",name.innerText)
  // console.log("like button:", likes)

  function addComment (comment){
    let newComment = document.createElement('li')
    newComment.id = comment.id
    newComment.innerText = comment.content
    
    let deleteButton = document.createElement('button')
    deleteButton.className = "delete"
    deleteButton.innerText = "Delete"
    newComment.appendChild(deleteButton)
    
    list.appendChild(newComment) 
  }

  fetch(imageURL)
  .then(response => response.json())
  .then(data => {
    
    // console.log("response:",data)
    // console.log("data url:", data.url)
    // console.log("data.id:",data.id)
    // console.log("data.name:",data.name)
    // console.log("data.like_count:",data.like_count)
    // console.log("data.comments:",data.comments)
    // console.log("data.comments[0].id:",data.comments[0].id)
    // console.log("data.comments[0].content:",data.comments[0].content)

    
    img.src = data.url
    img.dataset.id = data.id
    name.innerText = data.name
    likes.innerText = `${data.like_count} likes`
    likes.dataset.likes = data.like_count
    
    data.comments.forEach(comment => {
      addComment(comment)
    });
    
  })

  let likeButton = document.getElementById("like_button")
  console.log(likeButton)

  likeButton.addEventListener("click",e => {
    console.log(e.target)
    console.log(img.id)

    let likesCount = parseInt(likes.dataset.likes)
    likes.innerText = `${likesCount+1} likes`
    likes.dataset.likes = likesCount +=1

    fetch(likeURL,{
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "image_id": img.dataset.id,
        "created_at": Date(),
        "updated_at": Date()
      })
    })

  })

  let form = document.getElementById('comment_form')

  form.addEventListener("submit", e => {
    e.preventDefault()
    console.log(e.target)
    console.log("form contents:", e.target[0].value)
    
    let newComment = document.createElement('li')
    
    newComment.innerText = e.target[0].value
    list.appendChild(newComment) 

    let deleteButton = document.createElement('button')
    deleteButton.className = "delete"
    deleteButton.innerText = "Delete"
    newComment.appendChild(deleteButton)

    fetch(commentsURL,{
      method: "POST",
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "image_id": img.dataset.id,
        "content": e.target[0].value
      })
    })

  })

  list.addEventListener("click", e => {
    console.log(e.target)
    console.log(e.target.parentNode)
    console.log(e.target.parentNode.id)



    if (e.target.className = "delete"){
      console.log("delete button presssed")
      e.target.parentNode.remove()

      fetch(`https://randopic.herokuapp.com/comments/${e.target.parentNode.id}`,{
        method: "DELETE",
      })
      .then(response => response.json())
      .then(data => console.log(data))

    }
  })


 // end of DOM event listener
})
 