$(() => {
  $("#search").change(function() { //when user clicks a category from the search bar dropdown menu, redirects to the appropriate filtered search page on click
    let redirect; //variable to take in dynamic url for redirect
    if($(this).val() === 'Animals') { //takes in the dropdown's value based on resource category and adjusts it to render the proper route
      redirect = 'animals';
    }
    if($(this).val() === 'Arts and Crafts') {
      redirect = 'arts-and-crafts';
    }
    if($(this).val() === 'Education') {
      redirect = 'education';
    }
    if($(this).val() === 'Food and Drink') {
      redirect = 'food-and-drink';
    }
    if($(this).val() === 'Music') {
      redirect = 'music';
    }
    if($(this).val() === 'Other') {
      redirect = 'other';
    }

    window.location.href = `/search/${redirect}` //redirects to the appropriate filtered search route
  })
})

