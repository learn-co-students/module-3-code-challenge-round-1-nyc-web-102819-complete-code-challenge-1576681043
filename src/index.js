document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 4191
  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`
  let commentsList = document.getElementById('comments')

  //fetch request to make image appear √
  //append image to card div √
  function getPicture() {
    fetch(imageURL)
        .then(function(response) {
         return response.json();
        })
        .then(function(picture) {
        console.log(picture);
          appendPicture(picture)
      });
}

  getPicture()

  //format display of picture, buttons, and comments
  //grab array of comments, allow new comments to be displayed
  //allow for changeable data
  function appendPicture(picture){
  

    let card = document.getElementById("image_card")
      card.innerHTML = `
      <img src=${picture.url} id="image" data-id=""/>
      <h4 id="name">${picture.name}</h4>
      <span>Likes:
        <span id="likes">${picture.like_count}</span>
      </span>
      <button id="like_button">Like</button>
      <form id="comment_form">
        <input id="comment_input" type="text" name="comment" placeholder="Add Comment"/>
        <input type="submit" value="Submit"/>
      </form>
      <ul id="comments">
           <li> ${picture.comments[0].content}
      </ul>
      `
      let commentsArray = Array.from(picture.comments)
      console.log(commentsArray)
      commentsArray.forEach(function(picture){
        commentsList.append(picture.content);
      });
  }

    //add likes to picture optimistically √
    //add event listener for clicks to like button √
    //identify like button √
    //for each click, increase like count √

      document.addEventListener("click", function(e) {
        let liked = document.getElementById('likes')
        if (e.target.innerText === "Like") {
          liked.innerText = parseInt(liked.innerText) + 1
          updateLikes()
        }
    })

    //post request for persistence √
      function updateLikes() {
        fetch (likeURL, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({image_id: imageId})
        });
        }

        //find comments form
        //create new li
        //get value of comment field
        //add event listener to comments form on submit
        document.addEventListener("submit", function(e){
         let commentsList = document.getElementById('comments')
          e.preventDefault()
          //debugger
          let li = document.createElement('li')
          commentsList.append(li)
          let comment = e.target.childNodes[1].value
          li.innerText = comment
          let form = document.getElementById('comment_form')
          //debugger
          form.reset()
          addComment(li)
          // appendPicture(li)
        })

        //send post request to persist all new comments √
        //should be able to see all comments after refreshing
      function addComment(comment) {
        fetch (commentsURL, {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            image_id: imageId, 
            content: comment.innerText})
        });
        //appendPicture(comment.innerText)

      }
})
