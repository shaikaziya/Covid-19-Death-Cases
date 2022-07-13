//  https://api.covid19api.com/summary
//    https://api.covid19api.com/dayone/country/south-africa
// https://restcountries.com/v3.1/name/{name}
// https://restcountries.com/

//mapbox


let url="https://api.covid19api.com/summary"

async function updateMap(){
    let data=await fetch(url)
    let res=await data.json()
    
    let list=res.Countries

    list.map(async function(element){element
    let data1=await fetch(`https://restcountries.com/v3.1/name/${element.Country}`)
    let res1=await data1.json()
    
    let latitude=res1[0].latlng[0]
    let longitude=res1[0].latlng[1]
    console.log(latitude,longitude)

    let cases=element.TotalDeaths

    if(cases>255){
        color="rgb(255,0,0)"
    }
    else if(cases>100 && cases<255){
        color="rgb(197,62,56)"
    }
    else{
        color=`rgb(${element.TotalDeaths},0,0)`
    }

    // Mark on the globe

    new mapboxgl.Marker({
        draggable:false,
        color:color,

        })
        .setLngLat([longitude,latitude])
        .addTo(map);
})
}
let interval=10000
setInterval(updateMap,interval)
updateMap()