console.log('hello');
$(() => {

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

  $.get('/api/resources/saved')
    .then((resources) => {
      renderSavedResources(resources);
    })
    .catch(err => {
      console.log('err:', err.message)
    })

  const renderSavedResources = (savedResources) => {
    const $savedResourceContainer = $('#savedResources');

    savedResources.reverse().forEach(resource => {
      $savedResourceContainer.append(createResource(resource));
    })
  };

  $.get('/api/resources/liked')
    .then((likedResources) => {
      renderLikedResources(likedResources);
    })
    .catch(err => {
      console.log('err:', err.message)
    })

  const renderLikedResources = (likedResources) => {
    const $resourceContainer = $('#resources');

    likedResources.reverse().forEach(resource => {
      $resourceContainer.append(createResource(resource));
    })
  }

});
