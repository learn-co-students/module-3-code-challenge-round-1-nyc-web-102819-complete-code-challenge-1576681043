document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 4202 //Enter the id from the fetched image here

  //initial get request - https://randopic.herokuapp.com/images/4202

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  let imageCardDiv = document.getElementById('image_card')
  let imageTitleHeader = document.getElementById('name')

  function getImage () {
    fetch ('https://randopic.herokuapp.com/images/4202')
      .then (function (resp) {
        return resp.json();
      })
      .then (function (image) {
        imageCardDiv.innerHTML = `
        <img src=${image.url} id="image" data-id=${image.id}/>
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
        let commentsList = document.getElementById('comments')
        image.comments.forEach (function (comment) {
          let commentLi = document.createElement('li')
          commentLi.dataset.id = `${comment.id}`
          commentLi.dataset.imageId = `${comment.image_id}`
          commentLi.innerHTML = `${comment.content}<br><button class="deleteButton">Delete</button>`
          commentsList.appendChild(commentLi)
        })
      })
  }

  getImage();

  document.addEventListener("click", function(e) {
    if (e.target.id === 'like_button') {

      //optimistic rendering, so increase like count in DOM first:
      let likeSpan = document.getElementById("likes")
      newLikeCount = parseInt(likeSpan.innerText) + 1
      likeSpan.innerText = newLikeCount

      //then, send like to DB
      fetch ('https://randopic.herokuapp.com/likes', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify ({
          image_id: 4202
        })   
      })
    } else if (e.target.className === 'deleteButton') {
      let commentLiToDelete = e.target.parentNode
      deleteComment(e, commentLiToDelete);
    }
  })

  function deleteComment(e, commentLiToDelete) {
    let commentId = e.target.parentNode.dataset.id

    //pessimistic, so remove the comment from the database first
    fetch (`https://randopic.herokuapp.com/comments/${commentId}`, {
      method: 'DELETE'
    }).then (function (resp) {
      return resp.json();
    }).then (function (comment) {
      let parentLi = e.target.parentNode
      parentLi.remove();
    })
  }

  document.addEventListener("submit", function (e) {
    e.preventDefault();
    if (e.target.id === 'comment_form') {
      let commentContent = e.target[0].value
      addComment(commentContent);
    }
  })

  function addComment(commentContent) {

    //changing to pessimistic to get id 
    fetch ('https://randopic.herokuapp.com/comments', {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify ({
          image_id: 4202,
          content: `${commentContent}`       
      })
    }).then (function (resp) {
      return resp.json();
    }).then (function (newComment) {
        //pessimistically render to the DOM
        let newCommentLi = document.createElement('li')
        newCommentLi.dataset.id = `${newComment.id}`
        newCommentLi.innerHTML = `${newComment.content}<br><button class="deleteButton">Delete</button>`
        let commentsList = document.getElementById('comments')
        commentsList.appendChild(newCommentLi)
        let commentForm = document.getElementById('comment_form')
        commentForm.reset();
    })
  }
})