const form = document.querySelector('form');
const input = document.querySelector('.inputImgUrl');

document.querySelector('#verification').addEventListener('click', async (event) => {
    
    event.preventDefault();

    try{
        const report = await verificationSafeBrowsing();
        if(!report){
            alert(report);
        } 
        else {
            alert(report);
        }
        
    } catch(e) {
        alert(e);
    }

});

async function verificationSafeBrowsing(urlTab){

    let TOKEN = 'key=AIzaSyDO0kRSi1Dcopt-Cd_9G8vKkHAcpWz-S_s';
    let URL = 'https://safebrowsing.googleapis.com/v4/threatMatches:find?';

    if(urlTab == null){
        
        let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        urlTab = tab.url;
    }

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
              {"url": urlTab }
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
        return true;
    }

    return false;
}


form.addEventListener('submit', async (event) => {
    
    event.preventDefault();

    try{
        const report = await verificationSafeBrowsing(input.value);
        if(!report){
            alert(report);
        } else {
            alert(report);
        }
    } catch(e) {
        alert(e);
    }
    
});
/*--------------------------------------------------------------------------*/
const replaceImages = (url) => {
    const images = document.querySelectorAll('img');
    images.forEach((image) => image.src = url);
}



/*--------------------------------------------------------------------------*/
