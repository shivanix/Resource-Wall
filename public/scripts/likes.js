/* When the button is clicked, is_liked will be set to true and added to the likes database -- kind of a query? */
$(() => {
  $(".like-button").click(function() {
    alert("HELLLLLLLOOOOOOOOOO")
    $(this).toggleClass(".is-liked");

    if ($(this).hasClass(".is-liked")) {
      val++
      //userID and resourceID should be entered into the likes table (db) --liking the resource(by clicking the button)
    } else {
      val--
      //userID and resourceID should be deleted from the likes table (db) --removing a like (by clicking again)
    }
    $(this).text(val);
  });
});
