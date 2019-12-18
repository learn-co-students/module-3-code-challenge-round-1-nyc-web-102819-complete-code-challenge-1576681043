let imageId = 4200 //Enter the id from the fetched image here
const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
const likeURL = `https://randopic.herokuapp.com/likes/`
const commentsURL = `https://randopic.herokuapp.com/comments/`

//  fetching image
function fetchImage() {
  fetch(`${imageURL}`).then(resp => resp.json())
    .then(image => renderImage(image))
}

//  rendering image
function renderImage(image) {
  // console.log(image)
  let img = document.querySelector('img')
  img.src = `${image.url}`
  let title = document.querySelector('#name')
  title.innerHTML = `${image.name}`
  let likes = document.querySelector('#likes')
  likes.innerHTML = `${image.like_count}`
  let commentsUl = document.querySelector('#comments')
  image.comments.forEach(comment => {
    // console.log(comment)
    let commentLi = document.createElement('li')
    commentLi.innerHTML = comment.content
    commentsUl.appendChild(commentLi)

    let delBut = document.createElement('button')
    delBut.innerHTML = 'x'
    delBut.setAttribute("onclick", `deletingComments(event, ${comment.id})`)
    commentLi.appendChild(delBut)
  });
}

//  like feature
function likeFeature() {
  const likeBut = document.querySelector('#like_button')
  likeBut.addEventListener('click', function() {
    let likes = document.querySelector('#likes')
    console.log(likes.innerHTML)
    likes.innerHTML = `${parseInt(likes.innerHTML) + 1}`
    
    fetch(`${likeURL}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        image_id: `${imageId}`
      })
    })
  })
}

//  comment feature
function commentFeature() {
  const form = document.querySelector('#comment_form')
  let commentsUl = document.querySelector('#comments')
  
  form.addEventListener('submit', function(e) {
    e.preventDefault()
    let commentLi = document.createElement('li')
    let comment = e.target.elements[0].value
    commentLi.innerHTML = `${comment}`
    commentsUl.appendChild(commentLi)

    let delBut = document.createElement('button')
    delBut.innerHTML = 'x'
    delBut.setAttribute("onclick", `deletingComments(event, ${comment.id})`)
    commentLi.appendChild(delBut)
    
    e.target.reset()

    fetch(`${commentsURL}`, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(
        {
          image_id: `${imageId}`,
          content: `${comment}`
        }
      )
    })
  })
}

//  deleting comments
function deletingComments(event, comId) {
  console.log(event.target, comId)
  // let comment = event.target
  fetch(`${commentsURL}${comId}`, { method: 'DELETE' })
}



document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  fetchImage()
  likeFeature()
  commentFeature()

})
