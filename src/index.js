document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')
  let img = document.getElementById("image")
  let imgCardDiv = document.getElementById("image_card")
  let ul = document.getElementById("comments")
  let form = document.getElementById('comment_form')
  let submitButton = document.getElementById("submit_button")
  submitButton.style.borderRadius = "25px"
  let imageId = 4195

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  fetch(imageURL).then(function (j) {return j.json()}).then(function (o) {
    img.src = `${o.url}`
    let imgName = imgCardDiv.querySelector("h4")
    imgName.innerText = `${o.name}`
    let likes = document.getElementById("likes")
    likes.innerText = `${o.like_count}`
    o.comments.forEach(function (comment) {
      let newLi = document.createElement('li')
      let deleteButton = document.createElement("button")
      deleteButton.innerText = "Delete"
      deleteButton.dataset.id = `${comment.id}`
      deleteButton.style.borderRadius = "25px"
      deleteButton.style.marginLeft = "7px"
      deleteButton.style.backgroundColor = "#F7FEFF"
      deleteButton.addEventListener("click", function (e) {
        e.target.parentNode.remove()
        fetch(`${commentsURL}/${e.target.dataset.id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            accepts: "application/json"
          }
        })
      })
    newLi.innerText = `${comment.content}`
    newLi.appendChild(deleteButton)
    ul.appendChild(newLi)
    })
  })

  let likeButton = document.getElementById('like_button')
  likeButton.style.borderRadius = "25px"
  likeButton.addEventListener("click", function (e) {
    likes.innerText = parseInt(likes.innerText) + 1
    fetch(likeURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accepts: "application/json"
      },
      body: JSON.stringify({
        image_id: `${imageId}`
      })
    })
  })
  
  
  form.addEventListener("submit", function (e) {
    e.preventDefault()
    let commentVal = form[0].value
    let commentLi = document.createElement('li')
    let newDeleteButton = document.createElement("button")
    newDeleteButton.innerText = "Delete"
    newDeleteButton.style.borderRadius = "25px"
    newDeleteButton.style.marginLeft = "7px"
    newDeleteButton.style.backgroundColor = "#F7FEFF"
    commentLi.innerText = `${commentVal}`
    commentLi.appendChild(newDeleteButton)
    ul.appendChild(commentLi)
    fetch(commentsURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accepts: "application/json"
      },
      body: JSON.stringify({
        image_id: `${imageId}`,
        content: `${commentVal}`
      })
    }).then(function (j) {return j.json()}).then(function (o) {
      newDeleteButton.dataset.id = `${o.id}`
      newDeleteButton.addEventListener("click", function (e) {
        e.target.parentNode.remove()
        fetch(`${commentsURL}/${e.target.dataset.id}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            accepts: "application/json"
          }
        })
      })
    })
    form.reset();
  })
})
