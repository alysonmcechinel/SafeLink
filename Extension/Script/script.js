const form = document.querySelector('form');
const input = document.querySelector('.inputImgUrl');

document.querySelector('#verification').addEventListener('click', async (event) => {
    
    event.preventDefault();

    try{
        const report = await verificationSafeBrowsing();
        if(report){
            alert(report);
        } 
        else {
            report = await verificationVT();
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

async function verificationVT(urlTab){

    if(urlTab == null){
        
        let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        urlTab = tab.url;
    }

    const options = {method: 'GET', headers: {accept: 'application/json'}};
    //https://www.virustotal.com/vtapi/v2/url/report?apikey=c1531588888561ac985d9ff814e68434a818ec94f7d4f909cbc9386b82309a0d&allinfo=false&scan=0
    //https://www.virustotal.com/vtapi/v2/url/report?apikey=c1531588888561ac985d9ff814e68434a818ec94f7d4f909cbc9386b82309a0d&resource=https%3A%2F%2Fwww.dogapartswp.sw6.llocweb.info%2Fedd%2Findex2.html&allinfo=false&scan=0
    fetch('https://www.virustotal.com/vtapi/v2/url/report?apikey=c1531588888561ac985d9ff814e68434a818ec94f7d4f909cbc9386b82309a0d&resource=https%253A%252F%252Fwww.dogapartswp.sw6.llocweb.info%252Fedd%252Findex2.html&allinfo=false&scan=0', options)
        .then(response => response.json())
        //.then(response => console.log(response))
        .catch(err => console.error(err));

    var obj = JSON.stringify(response);

    alert(obj);
    alert(obj.positives);
    if(obj.positives > 0){
        alert('testezim');
        return true;
    }
    

    alert('chegou');
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
