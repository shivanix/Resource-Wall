/* When the button is clicked, is_liked will be set to true and added to the likes database -- kind of a query? */
$(() => {
  $(".like-button").click(function() {

    $(this).toggleClass(".like-button");
    const $heartIcon = $(".like-button > i");
    const val = $heartIcon[0].className.includes("far") ? "like" : "unlike";

    $.ajax({
      method: "POST",
      url: `${window.location.pathname}/${val}`
    }).done((like) => {
      if (like) {
        $heartIcon.removeClass("far").addClass("fas")
      } else {
        $heartIcon.removeClass("fas").addClass("far")
      }
    });
  });
});
