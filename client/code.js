let btnPopulate = document.getElementById('btnPopulate');
let select = document.getElementById('selectEntity');

btnPopulate.addEventListener('click', ()=>{
    let fr = [];
    getEntities().then(data => {
        console.log(data.entities);
        data.entities.forEach(entity => {
            fr.push([entity, fr[entity]]);
        })
        select.innerHTML = fr.map(entity => `<option value="${entity}">${entity}</option>`).join(',');
    })
});


async function getEntities() {
    const response = await fetch('/api/entities');
    return await response.json();
}
