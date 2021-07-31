$(() => {
  $("#search").change(function() {
    let redirect;
    if($(this).val() === 'Animals') {
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

    window.location.href = `/search/${redirect}`
  })
})

