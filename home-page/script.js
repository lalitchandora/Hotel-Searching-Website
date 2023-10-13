let hotels = [];

fetch("../shared/data3.json")
	.then(response => response.json())
	.then(data => {
		hotels = data.slice(0, 7);
		loadHotel();
	}).catch(err => {
		console.log(err);
	});

function initPage() {

	document.getElementById("search-form").addEventListener("submit", (event => {
		event.preventDefault();
		let inp = event.target;
		let place = inp[0].value || "";
		let date = inp[1].value || undefined;
		let peopleCnt = inp[2].value || 1;
		redirectFormSearch(place, date, peopleCnt);
	}))
}

function redirectFormSearch(place, date, peopleCnt) {
	let redirectUrl = "/search-page/search.html?";
	if (place) redirectUrl = `${redirectUrl}place=${place}&`;
	if (date) redirectUrl = `${redirectUrl}date=${date}&`;
	if (peopleCnt > 1) redirectUrl = `${redirectUrl}people=${peopleCnt}`;
	window.location.href = redirectUrl;

}

function redirectToSearch(city) {
	let redirectUrl = "/search-page/search.html?place=" + city;
	window.location.href = redirectUrl;
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


function loadHotel() {
	console.log(hotels);
	let hotelsHTML = "";
	hotels.forEach(hotel => {
		hotelsHTML = `
			${hotelsHTML}
			<div class="popular__card">
				<img src="../hotels/${hotel.img}.jpg" alt="popular hotel" onclick="redirectToSearch('/hotel-page/hotel.html?id=${hotel.id}')" />
				<div class="popular__content">
				<div class="popular__card__header">
					<h4>${hotel.name}</h4>
					<h4>₹${formatNumberWithCommas(hotel.price)}</h4>
				</div>
				<p>${hotel.place}</p>
				</div>
			</div>
		`
	});

	let outer = document.createElement("div");
	outer.setAttribute("class", "popular__grid");
	outer.innerHTML = hotelsHTML;


	document.getElementById("populargrid").appendChild(outer);
}

function redirectToSearch(url) {
	window.location.href = url;
}

initPage();