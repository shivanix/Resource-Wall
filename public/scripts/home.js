console.log('homeful');
$(() => {

  const createResource = (resource) => {
    console.log('resourcesAt5', resource)
    const $resource = $(`
    <div class="box">
    <div class="mini-resource" id="thumbnail">
    <img src=${resource.thumbnail_photo_url} class='resource-thumbnail'>
    </div>
    <div class="text">
        <h3>${resource.title}</h3>
        <p>${resource.summary}</p>

    </div>
    <div class="buttons">
      <a href="#"><button>Category</button></a>
      <a href="/resource"><button>Read More</button></a>
    </div>
</div>
    `);

    return $resource;
  }

  $.get('/api/home')
    .then((resources) => {

      // let resources = [];
      console.log('resources', resources);
      renderResources(resources);
    })
    .catch(err => {
      console.log('err:', err.message)
    })

  const renderResources = (resources) => {
    const $resourceContainer = $('#home_container');
    console.log('resources49', typeof resources);

    for (const resource of resources) {
      console.log('resources53', resources);
      const $resource = createResource(resource);
      $resourceContainer.append($resource);
    }
  };


});
