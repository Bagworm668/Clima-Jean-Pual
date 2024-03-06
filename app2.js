document.addEventListener('DOMContentLoaded', function() {
  const searchForm = document.getElementById('searchForm');
  const resultsDiv = document.getElementById('results');
  const prevPageButton = document.getElementById('prevPage');
  const nextPageButton = document.getElementById('nextPage');
  let currentPage = 1;
  const resultsPerPage = 10;
  let totalResults = 0;

  searchForm.addEventListener('submit', function(event) {
      event.preventDefault();
      currentPage = 1; // Reiniciamos la página a la primera al hacer una nueva búsqueda
      searchImages();
  });

  function searchImages() {
      const category = document.getElementById('category').value;
      const apiKey = '42648195-f1f35dabb48d2eaa93682483a';
      const url = `https://pixabay.com/api/?key=${apiKey}&q=${encodeURIComponent(category)}&per_page=${resultsPerPage}&page=${currentPage}`;

      fetch(url)
          .then(response => response.json())
          .then(data => {
              totalResults = data.totalHits;
              displayResults(data.hits);
          })
          .catch(error => {
              console.error('Error al obtener los datos:', error);
          });
  }

  function displayResults(images) {
      resultsDiv.innerHTML = '';

      images.forEach(image => {
          const imgElement = document.createElement('img');
          imgElement.src = image.webformatURL;
          imgElement.classList.add('clickable');
          resultsDiv.appendChild(imgElement);
      });

      // Actualizar la paginación
      updatePagination();
  }

  function updatePagination() {
      prevPageButton.disabled = currentPage === 1;
      nextPageButton.disabled = currentPage === Math.ceil(totalResults / resultsPerPage);
  }

  prevPageButton.addEventListener('click', function() {
      if (currentPage > 1) {
          currentPage--;
          searchImages();
      }
  });

  nextPageButton.addEventListener('click', function() {
      if (currentPage < Math.ceil(totalResults / resultsPerPage)) {
          currentPage++;
          searchImages();
      }
  });

  // Event listener para la visualización de imágenes en modal
  resultsDiv.addEventListener('click', function(event) {
      if (event.target && event.target.classList.contains('clickable')) {
          const modal = document.getElementById('imageModal');
          const modalImg = document.getElementById('expandedImg');
          modal.style.display = 'block';
          modalImg.src = event.target.src;
      }
  });

  // Event listener para cerrar el modal
  const closeButton = document.getElementsByClassName('close')[0];
  closeButton.addEventListener('click', function() {
      const modal = document.getElementById('imageModal');
      modal.style.display = 'none';
  });
});
