let hotelData = [];
let filteredHotels = [];

let searchParams = new URLSearchParams(window.location.search);

if (searchParams.get("place")) {
    document.getElementById("placeinput").value = searchParams.get("place");
}

if (searchParams.get("date")) {
    let date = searchParams.get("date");
    document.getElementById("date-input").value = date;
}

if (searchParams.get("people")) {
    document.getElementById("people-count").value = searchParams.get("people");
}

function initPage() {
    document.getElementById("search-form").addEventListener("submit", (event) => {
        document.getElementById("hotel-result").remove();
        let input = event.target;
        let place = input[0].value || "";
        let date = input[1].value || undefined;
        let bedroom = parseInt(input[2].value) || 1;
        event.preventDefault();
        searchHotel(place, date, bedroom);
    });

    let place = searchParams.get("place") || "";
    let date = searchParams.get("date") || undefined;
    let bedroom = searchParams.get("people") || 1;
    searchHotel(place, date, bedroom);
}

fetch("../shared/data3.json")
    .then(response => response.json())
    .then(data => {
        hotelData.push(...data);
        initPage();
    })
    .catch(err => {
        console.log(err);
    })


function searchHotel(place, date, bedroom) {
    console.log(place, date, bedroom);
    filteredHotels = hotelData.filter(item => {
        // console.log(item);
        let flag = true;

        if (place) {
            if (place.toLowerCase() === item.place.toLowerCase()) flag = true;
            else return false;
        }
        if (date) {
            if (new Date(date).getTime() >= new Date(item.date).getTime()) flag = true;
            else return false;
        }
        if (bedroom > 1) {
            if (parseInt(bedroom) === item.bedroomCount) flag = true;
            else return false;
        }

        return flag;
    })
    addHotels(filteredHotels);
    console.log(filteredHotels, filteredHotels.length);
}

function formatNumberWithCommas(number) {
    const parts = number.toString().split(".");
    const intPart = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    if (parts.length === 2) {
        const decPart = parts[1];
        return `${intPart}.${deciPart}`;
    } else {
        return intPart;
    }
}


function addHotels(hotelArr) {
    var section = document.createElement('section');
    section.setAttribute('class', 'results');
    section.setAttribute('id', 'hotel-result');
    var htmlData = "";
    hotelArr.forEach((hotel, index) => {
        console.log("h" + (index + 1) + ".jpg");
        htmlData = `
            ${htmlData}
            <section class="item">
                <img src="../hotels/${hotel.img}.jpg" alt="Hotel Image">
                <div class="hotel-detail">
                    <div class="item-col-1">
                        <h1 class="hotel-title"><a href="/hotel-page/hotel.html?id=${hotel.id}">${hotel.name} - ${hotel.place}</a></h1>
                        <h4>
                            ${hotel.rating}
                            <span class="material-symbols-outlined">star</span>
                        </h4>
                    </div>
                    <div class="item-col-2">
                        <div>
                            ${generateAmenities(hotel)}
                        </div>
                        <div class="desc">
                            ${hotel.description}
                        </div>
                        <div class="hotel-price-sec">
                            <p class="adultCnt">1 night, ${hotel.bedroomCount} adult</p>
                            <h4 class="hotel-price">₹ ${formatNumberWithCommas(hotel.price)}</h4>
                            <p class="other-charges">+₹${formatNumberWithCommas(hotel.price * 0.15)} taxes</p>
                        </div>
                    </div>

                </div>
            </section>
        `
    });
    section.innerHTML = htmlData;
    document.getElementById("main-page").appendChild(section);

}

function generateAmenities(hotel) {
    let data = "";
    hotel.amenities.forEach(amen => {
        data =
            `
            ${data}
            <div class="tag">${amen}</div>
            `
    });
    return data;
}

function applyFilters(event) {
    let priceFilterEle;
    if (document.querySelector('input[type="radio"][name="price-radio"]:checked')) {
        priceFilterEle = document.querySelector('input[type="radio"][name="price-radio"]:checked');
    }
    let amenityArr = [];
    let ratingArr = [];
    let bedroomArr = [];
    for (let i = 1; i < 7; i++) {
        if (document.getElementById("f-a-checkbox" + i).checked) {
            amenityArr.push(document.getElementById("f-a-checkbox" + i).value);
        }
    }

    for (let i = 1; i < 6; i++) {
        let element = document.getElementById("f-r-checkbox" + i);
        if (element.checked) {
            ratingArr.push(element.value);
        }
    }

    for (let i = 1; i < 4; i++) {
        let element = document.getElementById("f-b-checkbox" + i);
        if (element.checked) {
            bedroomArr.push(element.value);
        }
    }
    console.log(ratingArr);
    console.log(amenityArr);
    console.log(bedroomArr);
    let additionalFilteredHotels = [...filteredHotels];
    if (priceFilterEle && priceFilterEle.value) {
        additionalFilteredHotels = additionalFilteredHotels.filter(hotel => {
            if (parseInt(priceFilterEle.value) == 1) {
                if (hotel.price <= 2000) return true;
            }
            else if (parseInt(priceFilterEle.value) == 2) {
                if ((hotel.price > 2000) && (hotel.price <= 10000)) return true;
            } else if (parseInt(priceFilterEle.value) == 3) {
                if ((hotel.price >= 10000)) return true;
            }
        })

    }
    if (ratingArr.length > 0) {
        additionalFilteredHotels = additionalFilteredHotels.filter(hotel => {
            for (let i = 0; i < ratingArr.length; i++) {
                if (parseInt(hotel.rating) == parseInt(ratingArr[i])) return true;
            }
        })
    }

    if (amenityArr.length > 0) {
        additionalFilteredHotels = additionalFilteredHotels.filter(hotel => {
            let flag = true;
            for (let i = 0; i < amenityArr.length; i++) {
                if (hotel.amenities.includes(amenityArr[i])) {
                    flag = true;
                } else {
                    flag = false;
                    break;
                }
            }
            return flag;
        })
    }
    console.log(additionalFilteredHotels);

    if (bedroomArr.length > 0) {
        additionalFilteredHotels = additionalFilteredHotels.filter(hotel => {
            for (let i = 0; i < bedroomArr.length; i++) {
                if (hotel.bedroomCount == parseInt(bedroomArr[i])) return true;
            }
        })
    }

    document.getElementById("hotel-result").remove();
    addHotels(additionalFilteredHotels);
}