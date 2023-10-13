let currHotel = {};

function initPage() {
    let params = new URLSearchParams(window.location.search);
    if (!params.get("id")) {
        window.location.href = "/search-page/search.html";
    }

    if (params.get("id")) {
        let id = parseInt(params.get("id"));
        if (!isNaN(id)) {

            fetch("../shared/data3.json")
                .then(response => response.json())
                .then(data => {
                    currHotel = data[id - 100 - 1];
                    console.log(currHotel);
                    loadData();
                }).catch(err => {
                    console.log(err);
                });
        }
    }
}

initPage();
/*
"id": 102,
        "img": "h2",
        "name": "Beachfront Paradise Hotel",
        "place": "Mumbai",
        "date": "2023-10-09",
        "price": 1800,
        "amenities": [
            "Free Wi-Fi",
            "Smart TV",
            "Swimming Pool",
            "DJ Night"
        ],
        "rating": 5,
        "bedroomCount": 1,
        "description":
*/

function loadData() {
    let name = document.getElementById("hotel-name");
    let image = document.getElementById("image");
    let desc = document.getElementById("desc");
    let amenities = document.getElementById("amenity");

    name.innerHTML = currHotel.name + " - " + currHotel.place + " - ₹" + currHotel.price;
    image.setAttribute("src", "../hotels/" + currHotel.img + ".jpg");
    desc.innerHTML = currHotel.description + desc.innerHTML;
    let amenityHTML = "";

    currHotel.amenities.forEach(amenity => {
        amenityHTML = `${amenityHTML}
            <div>
                <p>${amenity}</p>
            </div>
        `
    });
    amenities.innerHTML = amenityHTML
}

function scrollto() {
    document.getElementById("container1").scrollIntoView({
        behavior: "smooth",
    })
}

function submitForm(event) {
    event.preventDefault();
    alert("Details Requested.");
}