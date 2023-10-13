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

function redirectToHotel(name) {
	// to be done later
}

initPage();