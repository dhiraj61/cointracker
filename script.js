let tbody = document.querySelector('tbody');
let search = document.querySelector('input');
let sortByMktCap = document.querySelector('#cap');
let sortByPercentage = document.querySelector('#per');

function displayData(res){
    tbody.innerHTML = '';
    res.forEach((data) => {
        tbody.innerHTML += `
            <tr>
                <td><img src='${data.image}'/></td>
                <td>${data.name}</td>
                <td>${data.symbol.toUpperCase()}</td>
                <td>$ ${data.current_price}</td>
                <td>$ ${data.total_volume}</td>
                <td><span>${data.price_change_percentage_24h}</span></td>
                <td>Mkt Cap: $ ${data.market_cap}</td>
            </tr
            `
    })
    let span = document.querySelectorAll('span');
    span.forEach((per)=>{
        if(Number(per.textContent) < 0){
            per.style.color = 'red';
        }else{
            per.style.color = 'green';
        }
        per.textContent = Number(per.textContent).toFixed(2) + '%';
    })
}

function sortByCap(data){
    data.sort((a,b)=>a.market_cap - b.market_cap);
    displayData(data);
}

function sortByPer(data){
    data.sort((a,b)=>a.price_change_24h - b.price_change_24h);
    displayData(data);
}

async function main() {
    let result = await fetch("https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false")
    let res = await result.json();
    displayData(res);

    search.addEventListener('input',()=>{
        let searchVal = search.value;
        let filteredData = res.filter((data)=>{
            if(data.name.toLowerCase().includes(searchVal.toLowerCase()) || data.symbol.toLowerCase().includes(searchVal.toLowerCase())){
                return data;
            }
        })
        displayData(filteredData);
    })

    sortByMktCap.addEventListener('click',()=>{
        sortByCap(res);
    })

    sortByPercentage.addEventListener('click',()=>{
        sortByPer(res);
    })
}

main();