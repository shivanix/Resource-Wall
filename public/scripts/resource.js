console.log('hello')
$(() => {

  const createExpandedResource = (resource) => {
    const $expandedResource = $(`
    <section id="expanded-resource">
      <div class="resource-header">
        <div class="title-and-category">
          <h3>${resource.category}</h3>
          <h1>${resource.title}</h1>
        </div>
        <div class="rating">
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star checked"></span>
          <span class="fa fa-star"></span>
          <span class="fa fa-star"></span>
        </div>
      </div>
      <div class="contents">
        <img class="image" src=${resource.thumbnail_photo_url}></i>
        <div class="description-container">
            ${resource.description}
        </div>
        <div class="more-containers">
          <div class="left-side">
          <div class='tags'>
          ${resource.tag_1}
          </div>
          <div class='tags'>
          ${resource.tag_2}
          </div>
          <div class='tags'>
          ${resource.tag_3}
          </div>
            <a href="/" class="external-link">Visit Source</a>
          </div>
          <div class="like-button">
            <span class="fas fa-heart"></i>
          </div>
        </div>
      </div>
    </section>
    `);

    return $expandedResource;
  }

  $.get('/api/resources')
    .then((resources) => {
      renderExpandedResource(resources);
    })
    .catch(err => {
      console.log('err:', err.message)
    })

  const renderExpandedResource = (resources) => {
    const $expandedResourceContainer = $('#expandedResource');

    for (const resource of resources) {
      const $expandedResource = createExpandedResource(resource);
      $expandedResourceContainer.append($expandedResource);
    }
  };
});
