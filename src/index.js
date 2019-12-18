document.addEventListener('DOMContentLoaded', () => {
  console.log('%c DOM Content Loaded and Parsed!', 'color: magenta')

  let imageId = 4194 //Enter the id from the fetched image here

  const imageURL = `https://randopic.herokuapp.com/images/${imageId}`
  const likeURL = `https://randopic.herokuapp.com/likes/`
  const commentsURL = `https://randopic.herokuapp.com/comments/`

  function loadPage(){
    fetch(imageURL)
    .then(response => response.json())
    .then(json => appendObject(json))
    
  }
  
  
  const image = document.getElementsByTagName("img")[0]
  console.log(image)
  
  
  function appendObject(obj){
    
    let insertImage = obj.url
    image.src = obj.url
    image.dataset.id = obj.id
    let imageName = obj.name
    let nameOfImage = document.getElementsByTagName("h4")[0]
    nameOfImage.innerText = `${imageName}`
    let imageLike = document.getElementById("likes")
    imageLike.innerText = `${obj.like_count}`
    
    let imageComments = document.getElementsByTagName("ul")[0]
    obj.comments.forEach(function(comment){
      newLi = document.createElement("li")
      newLi.innerHTML = comment.content
      imageComments.appendChild(newLi)
      
    })
    
  }
  
  const likeButton  = document.getElementById("like_button")
  let likesCounter = document.getElementById("likes")
  
  document.addEventListener("click", function(e){
    // event listener for like button click
    if (e.target.innerText === "Like"){
      let likes = parseInt(likesCounter.innerText)
      likes += 1
      likesCounter.innerText = `${likes}`
      console.log("clicked")
      
      // ^ increase likes count on html page
      // increrase obj.like_count by 1 per click
      
      
      let idToPersist = e.target.parentNode.children[0].dataset.id
      let valueOfLikes = parseInt(e.target.parentNode.children[2].children[0].innerText)

      console.log(idToPersist)
      console.log(valueOfLikes)

      // POST method to update likes

      fetch(likeURL, {
        method: "POST",
        body: JSON.stringify({
          image_id: idToPersist,
          content: input
        }),
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json'
        }
        })
        // .then(response => response.json())
        // .then(json => appendObject(json))
    }

  })

  const addCommentValue = document.getElementById("comment_input")

  document.addEventListener("submit", function(e){
    e.preventDefault()
    // value of input = {document.getElementById("comment_input").value} or {addCommentValue.value}
    let input = addCommentValue.value
    
    let imageComments = document.getElementsByTagName("ul")[0]
    // This is the UL to append the commant to
        newLi = document.createElement("li")
        newLi.innerHTML = input
        imageComments.appendChild(newLi)

        
        // ^ works √
        
        // POST for persisting comment
        
        let uniqImageId = e.target.parentNode.children[0].dataset.id
        // var input is out comment string
        
        
        fetch(commentsURL, {
          method: "POST",
          body: JSON.stringify({
            image_id: uniqImageId,
            content: input
          }),
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
        })
        
        
        // ^ comment POST's and persists √
        
        //form.reset()
        // addCommentValue.reset()
        document.getElementsByTagName("form")[0].reset()
        //^ trying to reset form
        
        
      })


  loadPage()

})
