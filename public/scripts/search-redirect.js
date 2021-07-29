$(() => {
  $("#search").change(function() {
    window.location.href = `/search/${$(this).val()}`
  })
})

