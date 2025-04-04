var app = new Vue({
    el: "#kiwi",
    data: {
        products: [
            {
                id: 1, title: "Green Kiwi", short_text: "Classic Tart and Sweet Green Kiwi", image: 'img/kiwi1.png',
                desc: {
                    plant: {
                        p1: "Vigorous vine with strong disease resistance.",
                        p2: "High yield and excellent adaptability to various climates.",
                        p3: "Produces fruit in 3-4 years after planting."
                    },
                    fruit: {
                        f1: "Brown fuzzy skin with bright green flesh.",
                        f2: "Rich in vitamin C and fiber.",
                        f3: "Average fruit size: 6-8 cm in diameter."
                    },
                    cycle: {c1: "Autumn", c2: "Winter"},
                    color: "Green"
                }
            },
            {
                id: 2, title: "Yellow Kiwi", short_text: "Smooth-Skinned and Sweet Yellow Kiwi", image: 'img/kiwi2.png',
                desc: {
                    plant: {
                        p1: "Strong vine resistant to common kiwi diseases.",
                        p2: "Perfect for fresh consumption and storage.",
                        p3: "Fruits mature in 3-4 years after planting."
                    },
                    fruit: {
                        f1: "Golden-yellow flesh with a tropical sweet flavor.",
                        f2: "High in antioxidants and vitamin C.",
                        f3: "Average fruit size: 7-9 cm in diameter."
                    },
                    cycle: {c1: "Winter", c2: "Spring"},
                    color: "Yellow"
                }
            },
            {
                id: 3, title: "Red Kiwi", short_text: "Exotic and Aromatic Red-Fleshed Kiwi", image: 'img/kiwi3.png',
                desc: {
                    plant: {
                        p1: "Compact vine suitable for high-density planting.",
                        p2: "Highly productive with excellent disease resistance.",
                        p3: "Fruits mature in 3-4 years."
                    },
                    fruit: {
                        f1: "Smooth skin with striking red flesh inside.",
                        f2: "Unique berry-like flavor with high nutritional value.",
                        f3: "Average fruit size: 5-7 cm in diameter."
                    },
                    cycle: {c1: "Autumn", c2: "Winter"},
                    color: "Red"
                }
            },
            {
                id: 4, title: "Golden Kiwi", short_text: "Premium Sweet and Juicy Golden Kiwi", image: 'img/kiwi4.png',
                desc: {
                    plant: {
                        p1: "Dwarf vine ideal for small gardens and containers.",
                        p2: "Produces multiple harvests per season.",
                        p3: "Fruits mature in 3-4 years."
                    },
                    fruit: {
                        f1: "Thin-skinned, golden-hued flesh with intense sweetness.",
                        f2: "Great for fresh consumption and desserts.",
                        f3: "Average fruit size: 6-8 cm in diameter."
                    },
                    cycle: {c1: "Spring", c2: "Autumn"},
                    color: "Golden"
                }
            },
            {
                id: 5, title: "Green Kiwi Premium", short_text: "High-Quality Green Kiwi with Exceptional Taste", image: 'img/kiwi5.png',
                desc: {
                    plant: {
                        p1: "Medium-sized vine with high productivity.",
                        p2: "Adapted to various climates with strong disease resistance.",
                        p3: "Fruits mature in 3-4 years."
                    },
                    fruit: {
                        f1: "Classic green flesh with a balance of tartness and sweetness.",
                        f2: "Excellent for fresh eating and smoothies.",
                        f3: "Average fruit size: 6-8 cm in diameter."
                    },
                    cycle: {c1: "Autumn", c2: "Winter"},
                    color: "Green"
                }
            }
        ],
        product: [],
        cart: [],
        contactFields: [{
            name: "",
            companyName: "",
            position: "",
            city: "",
            country: "",
            telephone: "",
            email: "",
            youAre: "",
            otherSpecify: "",
            interested: "",
            capcha: ""
        }],
        btnVisible: 0,
        cartVisible: 0,
        formSubmitted: false,
        formVisible: 1
    },
    mounted: function () {
        this.getProduct();
        this.checkInCart();
        this.getCart();
    },
    methods: {
        getProduct: function () {
            if (window.location.hash) {
                var id = window.location.hash.replace('#', '');
                if (this.products && this.products.length > 0) {
                    for (i in this.products) {
                        if (this.products[i] && this.products[i].id && id == this.products[i].id) this.product = this.products[i];
                    }
                }
            }
        },
        addToCart: function (id) {
            if (window.localStorage.getItem('cart')) {
                this.cart = window.localStorage.getItem('cart').split(',');
            }

            if (this.cart.indexOf(String(id)) == -1) {
                this.cart.push(id);
                window.localStorage.setItem('cart', this.cart.join());
                this.btnVisible = 1;
            }
        },
        checkInCart: function () {
            if (this.product && this.product.id && window.localStorage.getItem('cart').split(',').indexOf(String(this.product.id)) != -1) this.btnVisible = 1;
            if (window.localStorage.getItem('cart') !== null) this.cartVisible = 1;
        },
        getCart: function () {
            if (window.localStorage.getItem('cart')) {
                this.cart = window.localStorage.getItem('cart').split(',');
                for (var value of this.cart) {
                    for (var index in this.products) {
                        if (value == this.products[index].id) {
                            this.product.push(this.products[index])
                        }
                    }
                }
            }
        },
        removeFromCart: function (id) {
            for (var index in this.product) {
                if (id == this.product[index].id) {
                    this.product.splice(index, 1);
                    this.cart.splice(index, 1)
                }
            }
            window.localStorage.setItem('cart', this.cart.join(','));
            this.getCart();
            location.reload();
        },
        makeOrder: function () {

            this.formVisible = 0;
            this.cartVisible = 0;

            this.cart = [];
            window.localStorage.removeItem('cart');
        }
    },
});