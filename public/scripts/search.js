console.log('hello search');
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

  if (window.location.pathname === '/search/music') {
  $.get('/api/search/music')
    .then((resources) => {
      renderMusicResources(resources);
    })
    .catch(err => {
      console.log('err:', err.message)
    })

  const renderMusicResources = (resources) => {
    const $musicResourceContainer = $('#categorizedResources');

    resources.reverse().forEach(resource => {
      if (resource.category === 'Music') {
      $musicResourceContainer.append(createResource(resource));
      }
    })
  };
  }

  if (window.location.pathname === '/search/food-and-drink') {
  $.get('/api/search/food-and-drink')
  .then((resources) => {
    renderFoodAndDrinkResources(resources);
  })
  .catch(err => {
    console.log('err:', err.message)
  })

const renderFoodAndDrinkResources = (resources) => {
  const $foodAndDrinkResourceContainer = $('#categorizedResources');

  resources.reverse().forEach(resource => {
    $foodAndDrinkResourceContainer.append(createResource(resource));
  })
};
  }

  if (window.location.pathname === '/search/arts-and-crafts') {
    $.get('/api/search/arts-and-crafts')
      .then((resources) => {
        renderArtsAndCraftsResources(resources);
      })
      .catch(err => {
        console.log('err:', err.message)
      })

    const renderArtsAndCraftsResources = (resources) => {
      const $artsAndCraftsResourceContainer = $('#categorizedResources');

      resources.reverse().forEach(resource => {
        $artsAndCraftsResourceContainer.append(createResource(resource));
      })
    };
    }

    if (window.location.pathname === '/search/education') {
      $.get('/api/search/education')
        .then((resources) => {
          renderEducationResources(resources);
        })
        .catch(err => {
          console.log('err:', err.message)
        })

      const renderEducationResources = (resources) => {
        const $educationResourceContainer = $('#categorizedResources');

        resources.reverse().forEach(resource => {
          $educationResourceContainer.append(createResource(resource));
        })
      };
      }

      if (window.location.pathname === '/search/animals') {
        $.get('/api/search/animals')
          .then((resources) => {
            renderAnimalsResources(resources);
          })
          .catch(err => {
            console.log('err:', err.message)
          })

        const renderAnimalsResources = (resources) => {
          const $animalsResourceContainer = $('#categorizedResources');

          resources.reverse().forEach(resource => {
            $animalsResourceContainer.append(createResource(resource));
          })
        };
        }

        if (window.location.pathname === '/search/other') {
          $.get('/api/search/other')
            .then((resources) => {
              renderOtherResources(resources);
            })
            .catch(err => {
              console.log('err:', err.message)
            })

          const renderOtherResources = (resources) => {
            const $otherResourceContainer = $('#categorizedResources');

            resources.reverse().forEach(resource => {
              $otherResourceContainer.append(createResource(resource));
            })
          };
          }
});
