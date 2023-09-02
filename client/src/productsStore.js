// Coffee: price_1LnUTFDM1jwCEz8OGoOSXiSM
// Sunglasses: price_1LnUTxDM1jwCEz8OAqHYTwKQ
// Camera: price_1LnUUoDM1jwCEz8OvxIcJ7to

const productsArray = [
    {
        id: "price_1NjyMrL3ULrcHZjS2mmKhYoe",
        title: "Course A",
        price: 499,
        url: "./course1.jpg",
        time: "5:30 pm - 7:00 pm",
        weekday: "Wednesday",
    },
    {
        id: "price_1Njyb6L3ULrcHZjSFsWX7g4F",
        title: "Course B",
        price: 599
    },
    {
        id: "price_1NjybpL3ULrcHZjSUo9FyJgp",
        title: "Course C",
        price: 699
    }
];

function getProductData(id) {
    let productData = productsArray.find(product => product.id === id);

    if (productData === undefined) {
        console.log("Product data does not exist for ID: " + id);
        return undefined;
    }

    return productData;
}

export { productsArray, getProductData };