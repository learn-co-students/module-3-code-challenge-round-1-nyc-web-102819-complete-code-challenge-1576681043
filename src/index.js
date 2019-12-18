document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 4201 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

  const imageTag = document.querySelector('img')
  const imageName = document.getElementById('name')
  let imageLikes = document.getElementById('likes')
  const imageComments = document.getElementById('comments')

  const likeButton = document.getElementById('like_button')
  const form = document.getElementById('comment_form')

  function addImageUrl(url) {
    imageTag.src = url
    imageTag.dataset.id = imageId
  }

  function addImageName(name) {
    imageName.innerText = name
  }

  function addLikes(likes) {
    imageLikes.innerText = likes
  }

  function addComment(comment) {
    let li = document.createElement('li')
    li.innerText = comment.content
    imageComments.appendChild(li)
    }

  function renderImage() {
    fetch(imageURL)
    .then(resp => resp.json())
    .then(data => {
      addImageUrl(data.url)
      addImageName(data.name)
      addLikes(data.like_count)
      data.comments.forEach(addComment)
    })
  }

  renderImage()

  function saveLikes(){
    fetch(likeURL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({image_id: imageId})
    })
    // .then(resp => resp.json())
    // .then(data => {console.log(data)})
  }

  //increment like counter, render to screen, then persist it
  likeButton.addEventListener('click', function(e){
    imageLikes.innerText++
    saveLikes()
  })

  function saveComments() {
    fetch(commentsURL, {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({image_id: comments})
    })
  }

  form.addEventListener('submit', function(e){
    e.preventDefault()
    let newComment = document.createElement('li')
    newComment.innerText = e.target.comment.value
    imageComments.append(newComment)
    saveComments()
  })


})
