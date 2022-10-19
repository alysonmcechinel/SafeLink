const form = document.querySelector('form');
const input = document.getElementById('url');

form.addEventListener('submit', async (event) => {
    
    event.preventDefault();

    try{
        alert(input)
        const verificationSB = await verificationSafeBrowsing(input.value);
        if(!verificationSB){
            const verificationVT = await verificationVirusTotal(input.value);
            if(!verificationVT){
                alert('Nenhum perigo detectado nessa url');
            };
        }        
    } catch(e) {
        alert(e);
    }
    
});

document.querySelector('#verification').addEventListener('click', async (event) => {
    
    event.preventDefault();

    try{
        const verificationSB = await verificationSafeBrowsing();
        if(!verificationSB){
            const verificationVT = await verificationVirusTotal();
            if(!verificationVT){
                alert('Nenhum perigo detectado nessa url');
            };
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

    const response = await fetch( URL+TOKEN, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 
            "Content-type": "application/json;charset=UTF-8"
        }                
    })
    .then(response => response.json())
    .catch(err => alert(err));

    const obj = JSON.parse(JSON.stringify(response));
    
    var objFilter = obj.matches?.filter(value => {
        return value.threatEntryType === "URL"
    });
    
    if(objFilter?.length > 0){
        alert('tem coisa errada ai');
        return true;
    }

    return false;
}

async function verificationVirusTotal(urlTab){

    if(urlTab == null){

        let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        urlTab = tab.url;

    }

    let url = 'https://www.virustotal.com/vtapi/v2/url/report?';
    let apiKey = 'apikey=c1531588888561ac985d9ff814e68434a818ec94f7d4f909cbc9386b82309a0d';
    let urlScan = '&resource=' + urlTab;
    const options = { method: 'GET', headers: {accept: 'application/json'} };

    const response = await fetch(url + apiKey + urlScan + '&allinfo=false&scan=0', options)
        .then(response => response.json())
        .catch(err => alert(err));

    var obj = JSON.parse(JSON.stringify(response));
    if(obj.positives > 0){
        alert('tem coisa errada ai');
        return true;
    }   

    return false;
}
