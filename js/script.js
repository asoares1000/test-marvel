const puk = 'ad2ee3b9b9551b86fdf7f46c7748752e',
  prk = 'd89a5f8c368f69cd729e8f95075aa3789e3815ec',
  ts = Date.now(),
  hash = md5(ts + prk + puk),
  URL = `http://gateway.marvel.com/v1/public/comics?ts=${ts}&apikey=${puk}&hash=${hash}&limit=80`,
  loading = document.getElementById("loading")

loading.className = 'loading fade-in'

const comicsPromise = fetch(URL);


comicsPromise.then(response => response.json())
  .then(response => {

    response.data.results.forEach((e, i) => {
      let item = {
        price: e.prices[0].price,
        description: e.description,
        id: `card${i}`,
        title: e.title,
        thumbnail: e.thumbnail.path === "http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available" ?
          null : `${e.thumbnail.path}.${e.thumbnail.extension}`
      }

      if (item.price && item.description && item.thumbnail && item.title)
        cardComic(item);

      loading.className = 'loading fade-out';


    });
  })
  .catch(e => console.log(e));


const cardComic = (item) => {
  const cardDesc = `${item.id}_description`;

  const comic = `
    <li class="cards_item">
    <div id="${item.id}" onclick="cardFade(${cardDesc})" class="card fade-in">
      <div class="card_image card_image--fence">
      <img src="${item.thumbnail}">
      </div>
      <div class="card_content">
        <h2 class="card_title">
         ${item.title}
        </h2>
        <small>$${item.price}</small>
      </div>
    </div>
    <div id="${cardDesc}" onclick="cardFade(${cardDesc})" class="card_description fade-out">
    <h3>Description</h3>
    <p class="card_text">${item.description}</p>
    </div>
  </li>`;

  const comics = document.getElementById('comics');
  comics.insertAdjacentHTML('beforeEnd', comic)
};

const cardFade = (cardDesc) => {
  if (cardDesc.className === 'card_description fade-out') {
    cardDesc.className = 'card_description fade-in';
  } else {
    cardDesc.className = 'card_description fade-out';
  }
}
