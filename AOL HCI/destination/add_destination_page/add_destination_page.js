document.addEventListener('DOMContentLoaded', () => {
    const defaultPrices = {
        food: 20,
        hotel: 200,
        shopping: 15
    };

    const transportCost = {
        Bus: 20,
        Train: 50,
        Plane: 300,
        Cruiser: 500
    }

    let start_input = document.getElementById('start-date');
    let end_input = document.getElementById('end-date');
    const totalDayElements = document.querySelectorAll('#total-day');

    const foodInput = document.getElementById('food-cost');
    const hotelInput = document.getElementById('hotel-cost');
    const shoppingInput = document.getElementById('shopping-cost');
    const foodTotal = document.getElementById('food-total');
    const hotelTotal = document.getElementById('hotel-total');
    const shoppingTotal = document.getElementById('shopping-total');
    const totalCostElements = document.querySelectorAll('#total-cost');
    const transportCostInputElements = document.querySelectorAll('input[name="transport"]');
    const transportCostElement = document.querySelectorAll('#total-transport');
    const transportOutputText = document.getElementById('transport-output');

    const getDays = () => {
        let days = 0;
        totalDayElements.forEach(element => {
            const dayValue = parseFloat(element.textContent) || 0;
            if (dayValue > days) {
                days = dayValue;
            }
        });
        return days;
    };
    
    const updateTotals = () => {
        const days = getDays();
        const foodCost = parseFloat(foodInput.value) || 0;
        const hotelCost = parseFloat(hotelInput.value) || 0;
        const shoppingCost = parseFloat(shoppingInput.value) || 0;

        foodTotal.textContent = (foodCost * days).toFixed(2);
        hotelTotal.textContent = (hotelCost * days).toFixed(2);
        shoppingTotal.textContent = (shoppingCost * days).toFixed(2);

        let transportMode = '';
        let transportTotalCost = 0;

        transportCostInputElements.forEach(element => {
            if (element.checked) {
                transportMode = element.value;
                transportTotalCost = transportCost[transportMode] || 0;
            }
        });

        transportOutputText.textContent = transportMode;

        transportCostElement.forEach(element => {
            element.textContent = transportTotalCost.toFixed(2);
        });

        let total = (foodCost * days) + (hotelCost * days) + (shoppingCost * days) + transportTotalCost;
        total = total.toFixed(2);
    
        totalCostElements.forEach(element => {
            element.textContent = total;
        });
    };
    
    foodInput.addEventListener('input', updateTotals);
    hotelInput.addEventListener('input', updateTotals);
    shoppingInput.addEventListener('input', updateTotals);
    
    document.getElementById('reset-defaults').addEventListener('click', () => {
        foodInput.value = defaultPrices.food;
        hotelInput.value = defaultPrices.hotel;
        shoppingInput.value = defaultPrices.shopping;
        updateTotals();
    });

    end_input.addEventListener('change', function() {
        let startDate = new Date(start_input.value);
        let endDate = new Date(end_input.value);
    
        let timeDifference = endDate.getTime() - startDate.getTime();
        let dayDifference = timeDifference / (1000 * 3600 * 24);
    
        if (!isNaN(dayDifference) & dayDifference > 0) {
            totalDayElements.forEach(element => {
                element.textContent = dayDifference;
            });
        } else {
            totalDayElements.forEach(element => {
                element.textContent = 0;
            });
        }

        updateTotals();
    });

    transportCostInputElements.forEach(element => {
        element.addEventListener('change', updateTotals);
    });

    updateTotals();
});

function success() {
    event.preventDefault();
    Swal.fire({
        title: "Trip Successfully Booked !",
        icon: "success"
    });

};