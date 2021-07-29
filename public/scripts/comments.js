$(() => {
  let pathName = window.location.pathname;
  let resourceID = pathName.replace('/resource/', '')
  console.log("helpppppppppppppp", resourceID);
  $.ajax({
    method: "GET",
    url: `/api/resources/${resourceID}/comments`
  }).done((comments) => {

    console.log("users", comments);
    renderComments(comments);
  });

  $("#form-id").submit(function(event) {
    console.log("Submiting form");
    // event.preventDefault() to prevent the default form submission behaviour.
    event.preventDefault();


    const formData = $(this).serialize();

       // validation before sending the form data to the server
       if (formData !== null && !((formData.length - 5) <= 0)) {
          console.log("Before submit");
        $.ajax({
          type: "POST",
          url: "/api/resources/comments",
          data: formData

        })

        // "done" is used instead of then because done will only execute when the Deferred object is resolved
        // "then" will execute even while the Deferred object is still in progress

        .done((data)=>{
            $("#tx01").val('');//Clear text area
              console.log("BIGggggggggggggggg");

          console.log("Thissssssssssss", data);
            $('.comments').prepend(createCommentElement(data));
          });

        // error messages
      } else {
        console.log("error");
      }

  })


const createCommentElement = function(commentData) {

console.log("On page loaddddddddddddddd");
console.log("rrriogrigrigrigrgi", commentData);

  const htmlMarkup = ` <article class="comments-container">
  <div class="comment">
    <span>${commentData.comment}</span>
  </div>
  <div class="username">${commentData.username}</div>
  <div class="timestamp">${commentData.created_at}</div>
</article>`;

  const $comment = $(htmlMarkup);

  return $comment;
};

/*-------------------------------------Func for taking in array of comments objects----------------------------*/

const renderComments = function(commentsArray) {
  // loops through comments
  // calls createCommentElement for each tweet
  // takes return value and prepends it to the comments class

  for (const comment of commentsArray) {

    const $newComment = createCommentElement(comment);
    $('.comments').prepend($newComment);
  }
};

/*--------------------------------------Preventing XSS with an "escape" func----------------------------------*/
// const escapeHtml = function(str) {
//   return str.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;").replace(/'/g, "&#039;");
// };
});
