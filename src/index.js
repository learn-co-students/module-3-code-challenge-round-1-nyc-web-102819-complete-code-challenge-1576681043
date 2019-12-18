document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')
  /* everything needed to fetch the Image Data from the server */
  let imageId = 4198 //Enter the id from the fetched image here
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
    function fetchImage() {
      fetch(imageURL)
      .then(resp => resp.json())
      .then(imageData => addImageDOM(imageData))
    };
    fetchImage();

    /* everything needed to add Image and Content Data to the DOM after fetching */
    let imgElement = document.querySelector('#image');
    let imgName = document.querySelector('#name');
    let imgLikeCount = document.querySelector('#likes');
    function addImageDOM(imageData) {
      imgElement.src = imageData.url;  
      imgName.innerHTML = `${imageData.name}`;
      imgLikeCount.innerHTML = `${imageData["like_count"]}`

      fetchComments(imageData);
    };

    let commentsUl = document.querySelector('#comments');
    function fetchComments(imageData) {
      imageData.comments.forEach(function (comment) {
        commentsUl.innerHTML += `<li>${comment.content}</li>`
      })
    };

    let likesButton = document.querySelector('#like_button');
    likesButton.addEventListener('click', function (e) {
      ++imgLikeCount.textContent
      let likesNum = parseInt(imgLikeCount.textContent)
      let likesObj = { "image_id": 4198 }
      
      postImage(likesObj)
  
    });

    function postImage(likesObj) {
      fetch(likeURL, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(likesObj)
      })
    };

    let commentForm = document.querySelector('#comment_form');
    commentForm.addEventListener('submit', function (e) {
      e.preventDefault();
      commentsUl.innerHTML += `<li>${e.target.comment.value}</li>`
      let commentsObj = { "image_id": 4198, "content": e.target.comment.value }
      postComments(commentsObj);
      commentForm.reset();
    });

    /* */
    function postComments(commentsObj) {
      fetch(commentsURL, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(commentsObj)
      })
    };

  const likeURL = `https://randopic.herokuapp.com/likes/`

  const commentsURL = `https://randopic.herokuapp.com/comments/`

})
