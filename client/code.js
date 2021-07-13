async function getEntities(req) {
    const response = await fetch(new Request(`/api/entities/${req}`));
    const data = await response.json();
   
    return data;
}

function fillEntities(req) {
    console.log(1);
    getEntities(req).then(data => {
        console.log(2);
        //console.log(data.entities);
        const ulEntities = document.getElementById("entities");
        const ulLabels = document.getElementById("labels");
        console.log(3);
        for(var attributename in data.entities[req]){
            const liEntity = document.createElement("li");
            const text = document.createTextNode(attributename+": "+data.entities[req][attributename]);
            liEntity.appendChild(text);
            ulEntities.appendChild(liEntity);

            if (attributename == 'labels'){
                const labelsArray =  data.entities[req][attributename];
                for(var label in labelsArray){
                    const liLabel = document.createElement("li");
                    const textLabel = document.createTextNode(label+": "+labelsArray[label]['value']);
                    liLabel.appendChild(textLabel);
                    ulLabels.appendChild(liLabel);        
                }
            }
        }
        console.log(4);
    })
}