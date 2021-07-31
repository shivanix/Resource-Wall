$(() => {

  const createResource = (resource) => {
    const $resource = $(`
    <div class="box">
      <div class="mini-resource">
      <img src=${resource.thumbnail_photo_url} class='resource-thumbnail'>
      </div>
      <div class="text">
          <h3>${resource.title}</h3>
          <p>${resource.summary}</p>

      </div>
      <div class="buttons">
        <div class="search-cat">
          <div class="category">${resource.category}</div>
        </div>
        <div class="read-more">
        <a href="/resource/${resource.id}" class ="read-more">Read More</a>
        </div>
      </div>
    </div>
    `);

    return $resource;
  }

  $.get('/api/resources')
    .then((resources) => {

      console.log('resources', resources);
      displayResources(resources);
    })
    .catch(err => {
      console.log('err:', err.message)
    })

  const displayResources = (resources) => {
    const $resourceContainer = $('#home_container');

    for (const resource of resources) {
      const $resource = createResource(resource);
      $resourceContainer.prepend($resource);
    }
  };


});
