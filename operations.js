const flights = [
    {
        from: "Tel aviv",
        to: 'amsterdam',
        price: 40,
        dates: [
            { depart: new Date('24.11.2023') },
            { return: new Date('1.12.2023') }
        ]
    },
    {
        from: "Tel aviv",
        to: 'london',
        price: 75,
        dates: [
            { depart: new Date('28.11.2023') },
            { return: new Date('12.12.2023') }
        ]
    },
    {
        from: "Athens",
        to: 'Prague',
        price: 95,
        dates: [
            { depart: new Date('28.11.2023') },
            { return: new Date('12.12.2023') }
        ]
    },
    {
        from: "Berlin",
        to: 'Prague',
        price: 22,
        dates: [
            { depart: new Date('28.11.2023') },
            { return: new Date('12.12.2023') }
        ]
    },
    {
        from: "London",
        to: 'Berlin',
        price: 100,
        dates: [
            { depart: new Date('28.11.2023') },
            { return: new Date('12.12.2023') }
        ]
    }
];

const storedUserString = localStorage.getItem('myData');
 // Parse the JSON string back to an object
 const storedUser = JSON.parse(storedUserString);

const addFlightForm = document.getElementById("addFlightForm");
const searchForm = document.getElementById("searchForm");
const sortBTN = document.getElementById("sortBTN");
const footer = document.getElementById("footer");
const addSec = document.getElementById("addSec");


addSec.style.display = "none";

if (storedUser && storedUser.is_admin) {
    // User is an admin, show the "Add Flight" form
    addSec.style.display = "block";
}

addFlightForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const from = document.getElementById("from").value;
    const to = document.getElementById("to").value;
    const price = parseInt(document.getElementById("price").value);
    const departDate = document.getElementById("departDate").value;
    const returnDate = document.getElementById("returnDate").value;

    const newFlight = {
        from: from,
        to: to,
        price: price,
        dates: [
            { depart: new Date(departDate) },
            { return: new Date(returnDate) }
        ]
    }
    flights.push(newFlight);
    displayFlights(flights);
});

searchForm.addEventListener("submit", function (e) {
    e.preventDefault();
    const from = document.getElementById("from_search").value.toLowerCase();
    const to = document.getElementById("to_search").value.toLowerCase();

    const filteredFlights = flights.filter(flight => {
        return flight.from.toLowerCase() === from && flight.to.toLowerCase() === to;
    });
    console.log(filteredFlights);
    displayFlights(filteredFlights); 
});

sortBTN.addEventListener("click", function () {
    flights.sort((a, b) => a.price - b.price);
    console.log(flights);
    displayFlights(flights);

});
function displayFlights(flightsToDisplay) {
    footer.innerHTML = ''; 

    flights.forEach((flight) => {
        const cardSection = document.createElement('section');
        cardSection.classList.add('card');

        const img = document.createElement('img');
        img.src = '/weekend4/flights.jpg';
        img.classList.add('card-image');
        cardSection.append(img);

        const from = document.createElement('h3');
        from.textContent = `From: ${flight.from}`;
        cardSection.append(from);

        const to = document.createElement('p');
        to.textContent = `To: ${flight.to}`;
        cardSection.append(to);

        const price = document.createElement('p');
        price.textContent = `Price: ${flight.price}`;
        cardSection.append(price);

        flight.dates.forEach((date) => {
            const dateType = Object.keys(date)[0];
            const dateValue = date[dateType];
            const dateElement = document.createElement('p');
            dateElement.textContent = `${dateType}: ${dateValue.toLocaleDateString()}`;
            cardSection.append(dateElement);
        });

        footer.append(cardSection);
    });
}
displayFlights(flights);