 console.log('homeful');
$(() => {

  const createResource = (resource) => {
    console.log("####################!111", resource)
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

      // let resources = [];
      // console.log("resources")
      console.log('resources', resources);
      displayResources(resources);
    })
    .catch(err => {
      console.log('err:', err.message)
    })

  const displayResources = (resources) => {
    const $resourceContainer = $('#home_container');
    console.log("!!!!!!!!!!!!!!!!!!!!!!@1111");

    for (const resource of resources) {
      console.log('$$$$$$$$$$$$$$$$$$$$2222', resources);
      const $resource = createResource(resource);
      $resourceContainer.append($resource);
    }
  };


});
