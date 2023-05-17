const colors = document.getElementsByClassName('color');
const pixelsContainer = document.getElementById('pixels__board');
const inputVertical = document.getElementById('vertical');
const inputHorizontal = document.getElementById('horizontal');
const inputTamanho = document.getElementById('tamanho-pixel');
const btn = document.getElementById('btn-submit');

// Adiciona informações no local storage.
const addLocalStorage = (key, obj) => {
  localStorage.setItem(key, JSON.stringify(obj));
};

// recupera os itens do localStorage.
const getLocalStorage = (key) => {
  const data = JSON.parse(localStorage.getItem(key));
  return data;
};

// pega as informaçôes de preferências, zera os inputs.
const getInformation = () => {
  const prefDate = {
    vertical: Number(inputVertical.value),
    horizontal: Number(inputHorizontal.value),
    tamanhoPixel: Number(inputTamanho.value),
  };
  addLocalStorage('infBoardPixels', prefDate);
  inputVertical.value = '';
  inputHorizontal.value = '';
  inputTamanho.value = '';
  return prefDate;
};

// Remove elementos filhos
const removeElement = (elemento) => {
  while (elemento.firstChild) {
    elemento.removeChild(elemento.firstChild);
  }
};

// Cria quadro de pixels
const pixelsBoard = () => {
  removeElement(pixelsContainer);
  const data = getLocalStorage('infBoardPixels');
  const { vertical, horizontal, tamanhoPixel } = data;
  const tamanho = tamanhoPixel.toString();

  for (let index = 0; index < horizontal; index += 1) {
    const coluna = document.createElement('div');
    coluna.className = 'coluna';

    for (let index2 = 0; index2 < vertical; index2 += 1) {
      const pixel = document.createElement('div');
      pixel.className = 'pixel';
      pixel.style.backgroundColor = 'white';
      pixel.style.height = `${tamanho}px`;
      pixel.style.width = `${tamanho}px`;

      coluna.appendChild(pixel);
    }
    pixelsContainer.appendChild(coluna);
  }
};

// Cria quadro primário
// const firstBoard = () => {
//   const data = getLocalStorage();
//   if (!data) {
//     const firstData = {
//       vertical: 20,
//       horizontal: 60,
//       tamanhoPixel: 20,
//     };
//     addLocalStorage('infBoardPixels', firstData);
//   }
//   pixelsBoard();
// };

btn.addEventListener('click', () => {
  getInformation();
  pixelsBoard();
});

window.onload = () => {
  pixelsBoard();
};
