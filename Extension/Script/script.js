const form = document.querySelector('form');
const input = document.querySelector('.inputImgUrl');
//const urlAtual = document.querySelector('.urlAtual');
//window.location.href;

//<label>A url da pagina atual é:</label>

document.addEventListener('DOMContentLoaded', function () {

    document.querySelector('#verification').addEventListener('click', function () {

        chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
            let url = tabs[0].url;
            document.querySelector('#result').innerHTML = url;
            console.log('chega aqui?');
            $.ajax({
                url: 'safeBrowsing',
                type: 'POST',
                success: function (data) {
                    alert(data);
                }
            });
        });
    });
});

/*--------------------------------------------------------------------------*/
const replaceImages = (url) => {
    const images = document.querySelectorAll('img');
    images.forEach((image) => image.src = url);
}

form.addEventListener('submit', async (event) => {

    event.preventDefault();

    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: replaceImages,
        args: [input.value]
    });
});

