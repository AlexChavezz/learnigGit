

sendApiRequest( getDateValues );
document.querySelector('form').addEventListener('submit',(e) =>  {
    e.preventDefault();
    sendApiRequest(getDateValues);
});

document.getElementById('goAfter').addEventListener('click', () => { 
    sendApiRequest( getBefore );
});
async function sendApiRequest( data ){
    const date = data();
    const dataInputs = getDateInputs();
    console.log(date)
    const API_KEY = "ZD6tZnrYEg3lvEDi9NY8Y3Mg3ZDUfJXcTdn7Myah";
    if( dataInputs.year.value === '' || dataInputs.month.value === '' || dataInputs.day.value === '' ){
    
        const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${API_KEY}`);
        const data  = await response.json();
        showData( data );
        console.log( data );    
    } else {
        const response = await fetch(`https://api.nasa.gov/planetary/apod?date=${date.year}-${date.month}-${date.day}&api_key=${API_KEY}`);
        const data  = await response.json();
        showData( data );
        console.log(data)
    }

  
}

function showData( data ){
    document.querySelector('.description').innerHTML = data.explanation;
    document.querySelector('.img').innerHTML = `<img src="${ data.url } " alt="${ data.title }" title="${ data.title }" />`;
    document.querySelector('.date').innerHTML = data.date;
}
function getDateInputs(){
    const year = document.querySelector('#year');;
    const month = document.querySelector('#month');;
    const day = document.querySelector('#day');
    return {
        year: year,
        month: month,
        day: day,
    }
} 
function getDateValues(){
    const year = document.querySelector('#year').value;
    const month = document.querySelector('#month').value;
    const day = document.querySelector('#day').value;
    return {
        year: year,
        month: month,
        day: day,
    }
}


function getBefore( ){
    // let { day } = getDate();
    // console.log( day.value - 1 )

    let date = document.querySelector('.date').textContent;
    const year = parseInt( date );
    console.log(year)
    let  monthdate = date.replace(year.toString()+'-','');
    const month = parseInt( monthdate );
    console.log(month)
    let daydate = date.replace(year.toString()+'-'+ '0'+month.toString()+'-','')
    let day = parseInt( daydate ) 
    day += - 1;

/*

    let month = parseInt( monthdate );
    console.log(month)
    const monthString = month.toString();
    let dayDate = date.replace(yearstring+'-'+monthString+'-','');
    console.log(dayDate)
*/
return {
    year: year,
    month: month,
    day: day,
}
}
