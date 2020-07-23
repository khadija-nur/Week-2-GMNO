//initialising variables
const startURL = "https://api.harvardartmuseums.org/object";
const apiKey = "?apikey=664fe862-4dac-4184-8c4a-3aa1620d459c";
let title = "fire";
let classification = "Paintings";
let finalURL = startURL + apiKey + "&title=" + title + "&classification=" + classification;
let imageSRC, century, artistName, artworkName;
let randomNumber;
let checkLoop = false;

fetch(finalURL)
    .then(response => {
        if (!response.ok) {
            throw new Error(response.status)
        };
        return response.json()
    })
    .then(json => {
        console.log(json);
        
        randomNumber = Math.floor(Math.random() * json.records.length);
        checkIfRecordsAvailable(json);
        checkImageAvailable(json);
        console.log(century, artworkName, artistName)
        console.log(imageSRC);
    })
    .catch(console.error)

//to see if no records
const checkIfRecordsAvailable = data => {
    if (data.records.length === 0) {
        noImageAvailable();
    }
}

//another option is to start the loop from 0 but then loop might run forever
const checkImageAvailable = data => {
    while(!data.records[randomNumber].primaryimageurl){
        randomNumber++;
        if (randomNumber >= data.records.length) {
            if (checkLoop) {
                noImageAvailable();
            } else {
                randomNumber = 0;
                checkLoop = true;
            }
        }
    }
    imageSRC = data.records[randomNumber].primaryimageurl;
    artworkName = data.records[randomNumber].title;
    century = data.records[randomNumber].century;

    if (data.records[randomNumber].peoplecount !== 0) {
        artistName = data.records[randomNumber].people[0].name;
    } else {
        artistName = "Unknown";
    }
}

//this function will return when no image is there and manipulate dom saying that. also stop other functions from running?
const noImageAvailable = () => {

}


//how to hide API key
//apikey=664fe862-4dac-4184-8c4a-3aa1620d459c&title=rabbit&classification=Paintings
//list of different classifications
//stretch: if statements to make the search broader if not specificied