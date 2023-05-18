const colors = document.querySelectorAll('.color');
const pixelsContainer = document.getElementById('pixels__board');
const inputVertical = document.getElementById('vertical');
const inputHorizontal = document.getElementById('horizontal');
const inputTamanho = document.getElementById('tamanho-pixel');
const btn = document.getElementById('btn-submit');
const colorSelected = document.querySelector('.color-selected');
// const pixels = document.querySelectorAll('.pixel');

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

// Cria primeiro quadro e primeira cor selecionada
const firstData = () => {
  const board = getLocalStorage('infBoardPixels');
  const color = getLocalStorage('selected-color');
  if (!board) {
    const prefDate = {
      vertical: 20,
      horizontal: 20,
      tamanhoPixel: 20,
    };

    addLocalStorage('infBoardPixels', prefDate);
  }
  if (!color) {
    const selectColor = {
      selected: 'black',
    };
    colorSelected.style.backgroundColor = 'black';
    addLocalStorage('selected-color', selectColor);
  }
};

// Remove elementos filhos
const removeElement = (elemento) => {
  while (elemento.firstChild) {
    elemento.removeChild(elemento.firstChild);
  }
};

// Cria quadro de pixels, ao recarregar a pagina recuupera os dados
const pixelsBoard = () => {
  removeElement(pixelsContainer);
  const data = getLocalStorage('infBoardPixels');
  const color = getLocalStorage('selected-color');
  colorSelected.style.backgroundColor = color.selected;

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

      pixel.addEventListener('click', () => {
        const { selected } = getLocalStorage('selected-color');
        pixel.style.backgroundColor = selected;
      });

      coluna.appendChild(pixel);
    }
    pixelsContainer.appendChild(coluna);
  }
};

btn.addEventListener('click', () => {
  getInformation();
  pixelsBoard();
});

// Seleciona cor da paleta de cores e salva no local storage
colors.forEach((element) => {
  element.addEventListener('click', () => {
    const selectColor = {
      selected: element.id,
    };
    colorSelected.style.backgroundColor = element.id;
    addLocalStorage('selected-color', selectColor);
  });
});

window.onload = () => {
  firstData();
  pixelsBoard();
};
