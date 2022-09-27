const form = document.querySelector('form');
const input = document.querySelector('.inputImgUrl');
var teste = document.querySelector('#result');

document.querySelector('#verification').addEventListener('click', async (event) => {
    
    event.preventDefault();

    try{
        const report = await getInfoUrl();
        alert(report);
    } catch(e) {
        alert(e);
    }

});

async function getInfoUrl(){

    let TOKEN = 'key=AIzaSyDO0kRSi1Dcopt-Cd_9G8vKkHAcpWz-S_s';
    let URL = 'https://safebrowsing.googleapis.com/v4/threatMatches:find?';

    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    let payload =  
    {
        "client": {
            "clientId": "teste",
            "clientVersion": "0.0.1"
          },
          "threatInfo": {
            "threatTypes": [ "SOCIAL_ENGINEERING", "MALWARE", "UNWANTED_SOFTWARE", "POTENTIALLY_HARMFUL_APPLICATION" ],
            "platformTypes": [ "WINDOWS", "CHROME", "ANDROID", "ANY_PLATFORM" ],
            "threatEntryTypes": [ "URL" ],
            "threatEntries": [
              {"url": tab.url}
            ]
          }
    };

    const response = await fetch(URL+TOKEN, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 
            "Content-type": "application/json;charset=UTF-8"
        }                
    });

    const res = await response.json();
    
    var objName = Object.getOwnPropertyNames(res);
    
    if(objName == 'matches'){
        alert('tem coisa errada ai');
    }

    return false;
}

/*--------------------------------------------------------------------------*/
const replaceImages = (url) => {
    const images = document.querySelectorAll('img');
    images.forEach((image) => image.src = url);
}

form.addEventListener('submit', async (event) => {
    
    event.preventDefault();

    let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: verificationSafeBrowsing,
        args: [ input.value ]
    });
});

/*--------------------------------------------------------------------------*/

function verificationSafeBrowsing() {

    

}