$(() => {
  //HTML to render a dynamic resource using an imported resource object
  const createResource = (resource) => {
    const $resource = $(`
    <div class='resource-container' id='rc1'>
      <div>
        <img src=${resource.thumbnail_photo_url} class='resource-thumbnail'>
      </div>
      <div class='resource-title'>
        ${resource.title}
      </div>
      <div class='resource-summary'>
        ${resource.summary}
      </div>
      <div class='category'>
        ${resource.category}
      </div>
      <div class='tags-container'>
        <div class='tag'>
          #${resource.tag_1}
        </div>
        <div class='tag'>
          #${resource.tag_2}
        </div>
        <div class='tag'>
          #${resource.tag_3}
        </div>
      </div>
      <div class='read-more'>
        <a href='/resource/${resource.id}' class='read-link'>
        READ MORE
        </a>
      </div>
    </div>
    `);

    return $resource;
  }

  //GET request to back end saved resources
  $.get('/api/resources/saved')
    .then((resources) => {
      renderSavedResources(resources); //renders all the Saved Resources from the database
    })
    .catch(err => {
      console.log('err:', err.message)
    })

  const renderSavedResources = (savedResources) => {
    const $savedResourceContainer = $('#savedResources'); //connects the render function to the my-resources EJS container

    savedResources.reverse().forEach(resource => { //reverses the resource order so newest resources are displayed first
      $savedResourceContainer.append(createResource(resource)); //append the resource to the container
    })
  };

  //GET request to back end liked resources
  $.get('/api/resources/liked')
    .then((likedResources) => {
      renderLikedResources(likedResources); //renders all the Liked Resources from the database
    })
    .catch(err => {
      console.log('err:', err.message)
    })

  const renderLikedResources = (likedResources) => {
    const $resourceContainer = $('#resources'); //connects the render function to the the my-resources EJS container

    likedResources.reverse().forEach(resource => { //reverses the resource order so newest resources are displayed first
      $resourceContainer.append(createResource(resource)); //append the resource to the container
    })
  }

});
