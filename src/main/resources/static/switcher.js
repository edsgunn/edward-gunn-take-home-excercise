//Run animation to swap calculator and quote
function switcher() {
    const switchers = [...document.querySelectorAll('.switcher')]
    switchers.forEach(item => {
        if (item.parentElement.classList.contains('is-active')) {
            item.parentElement.classList.remove('is-active');
        }
        else {
            item.parentElement.classList.add('is-active');
        }
    })
}

function requestPrice() {
    //Get data from form
    let pickupPostcode = document.getElementById("pickup-postcode")
    let deliveryPostcode = document.getElementById("delivery-postcode")
    let deliveryVehicle = document.getElementById("delivery-vehicle")

    //Check all entries of form are filled
    if (pickupPostcode.value == "" || deliveryPostcode.value == "") {
        return 
    }
    
    document.getElementById("quote-label").innerHTML = "Loading..."
    // Contents of POST request
    let data = {
        "pickupPostcode": pickupPostcode.value,
        "deliveryPostcode": deliveryPostcode.value,
        "vehicle": deliveryVehicle.value
    };

    (async () => {
        const rawResponse = await fetch('/quote', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });

        const content = await rawResponse.json();
        let vehicle = deliveryVehicle.options[deliveryVehicle.selectedIndex].text
        updateHTML(content, vehicle)
        switcher()
    })();
}


function updateHTML(content, v) {
    document.getElementById("quote-label").innerHTML = `A delivery from ${content.pickupPostcode} to ${content.deliveryPostcode} using a ${v} will cost you:`
    document.getElementById("price-label").innerHTML = `£${content.price}`
}