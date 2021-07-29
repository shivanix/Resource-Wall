$(() => {

  let pathName = window.location.pathname;
  let resourceID = pathName.replace('/resource/', '')
  let averageRatingStars = $(".all-rating .fa-star");

  function updateAverageRating (){
    $.ajax({
      method: "GET",
      url: `/resource/${resourceID}/ratings`,
    })
    .done((data) => {
      console.log("Data::::average rating....", data[0].average_rating);

      const averageRating = data[0].average_rating;

      if(averageRating) {
        const filledInStars = averageRatingStars.slice(5 - averageRating);
        filledInStars.removeClass('far').addClass('fas');

        //
        const emptyStars = averageRatingStars.slice(0, 5 - averageRating);
        emptyStars.removeClass('fas').addClass('far');
      }


    });
  }

updateAverageRating();

const ratingStars = [...document.getElementsByClassName("rating__star")];
const ratingResult = document.querySelector(".rating__result");
printRatingResult(ratingResult);


function executeRating(stars, result) {
   const starClassActive = "rating__star fas fa-star";
   const starClassUnactive = "rating__star far fa-star";

   const starsLength = stars.length;
   let i;

   stars.map((star) => {
      star.onclick = () => {
         i = stars.indexOf(star);

         let rating = i + 1;

         console.log("IIIIIIIII", i);
         if (star.className.indexOf(starClassUnactive) !== -1) {

            printRatingResult(result, i + 1);
            for (i; i >= 0; --i) stars[i].className = starClassActive;
         } else {
          rating--;
            printRatingResult(result, i);
            for (i; i < starsLength; ++i) stars[i].className = starClassUnactive;
         }
         console.log("ratinggggggggg", rating);
         let pathName = window.location.pathname;
         let resourceID = pathName.replace('/resource/', '')

         $.ajax({
          method: "POST",
          url: `/resource/${resourceID}/rate`,
          data: { rating }
        }).done(() => {
          updateAverageRating();
        });


      };
   });
   console.log(stars.length);
}

function printRatingResult(result, num = 0) {
   result.textContent = `${num}/5`;
}
executeRating(ratingStars, ratingResult);


})
