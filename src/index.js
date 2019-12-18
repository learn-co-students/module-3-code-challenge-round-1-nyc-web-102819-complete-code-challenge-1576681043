document.addEventListener('DOMContentLoaded', () => {

  const  imageId = 4196
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likesURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`
  
  const image = document.getElementById('image')
  const imageName = document.getElementById('name')
  const likesSpan = document.getElementById('likes')
  const likeBtn = document.getElementById('like_button')
  const commentsList = document.getElementById('comments')
  const commentForm = document.getElementById('comment_form')
  const commentInput = document.getElementById('comment_input')

  fetch(imageURL)
  .then(function(resp) {return resp.json()})
  .then(function(img) {
      image.src = img.url
      imageName.innerText = img.name
      likesSpan.innerText = img.like_count
      
      img.comments.forEach(function(comment) {
        const commentLi = document.createElement('li')
        commentLi.innerText = comment.content
        commentsList.appendChild(commentLi)

        const deleteBtn = document.createElement('button')
        deleteBtn.innerText = 'X'
        commentLi.appendChild(deleteBtn)

        deleteBtn.addEventListener('click', function(e) {
          fetch(`https://randopic.herokuapp.com/comments/${comment.id}`, {method: 'DELETE'})
          .then(function(resp) {return resp.json()})
          .then(function(comment) {
            e.target.parentNode.remove()
          })
        })
      })

      likeBtn.addEventListener('click', function(e) {
        likesSpan.innerText = parseInt(likesSpan.innerText) + 1

        fetch(likesURL, {
          method: 'POST',
          headers: {'Content-Type': 'application/json', 'Accept': 'application/json'},
          body: JSON.stringify({
            image_id: imageId
          })
        })
      })
  
      commentForm.addEventListener('submit', function(e) {
        e.preventDefault()
        const commentLi = document.createElement('li')
        commentLi.innerText = commentInput.value
        commentsList.appendChild(commentLi)

        fetch(commentsURL, {
          method: 'POST',
          headers: {'Content-Type': 'application/json', 'Accept': 'application/json'}, 
          body: JSON.stringify({
            image_id: imageId,
            content: commentInput.value
          })
        })
        .then(function(resp) {resp.json()})
        .then(function(comment) {
          const deleteBtn = document.createElement('button')
          deleteBtn.innerText = 'X'

          deleteBtn.addEventListener('click', function(e) {
            fetch(`https://randopic.herokuapp.com/comments/${e.target.parentNode.id}`, {method: 'DELETE'})
            .then(function(resp) {return resp.json()})
            .then(function(comment) {
              e.target.parentNode.remove()
            })
          })
          commentLi.appendChild(deleteBtn)
        })
        
        commentForm.reset()
      })
  })
})
