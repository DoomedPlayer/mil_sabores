document.addEventListener('DOMContentLoaded', () => {

    const products = [
        { code: 'TC001', category: 'Tortas Cuadradas', name: 'Torta Cuadrada de Chocolate', price: 45000, type: 'cuadrada', description: 'Deliciosa torta de chocolate con capas de ganache y un toque de avellanas. Personalizable con mensajes especiales.', image: 'chocolate.jpg' },
        { code: 'TC002', category: 'Tortas Cuadradas', name: 'Torta Cuadrada de Frutas', price: 50000, type: 'cuadrada', description: 'Una mezcla de frutas frescas y crema chantilly sobre un suave bizcocho de vainilla, ideal para celebraciones.', image: 'frutas.jpg' },
        { code: 'TT001', category: 'Tortas Circulares', name: 'Torta Circular de Vainilla', price: 40000, type: 'circular', description: 'Bizcocho de vainilla clásico relleno con crema pastelera y cubierto con un glaseado dulce, perfecto para cualquier ocasión.', image: 'vainilla.jpg' },
        { code: 'TT002', category: 'Tortas Circulares', name: 'Torta Circular de Manjar', price: 42000, type: 'circular', description: 'Torta tradicional chilena con manjar y nueces, un deleite para los amantes de los sabores dulces y clásicos.', image: 'manjar.jpg' },
        { code: 'PI001', category: 'Postres Individuales', name: 'Mousse de Chocolate', price: 5000, type: 'individual', description: 'Postre individual cremoso y suave, hecho con chocolate de alta calidad, ideal para los amantes del chocolate.', image: 'mousse.jpg' },
        { code: 'PI002', category: 'Postres Individuales', name: 'Tiramisú Clásico', price: 5500, type: 'individual', description: 'Un postre italiano individual con capas de café, mascarpone y cacao, perfecto para finalizar cualquier comida.', image: 'tiramisu.jpg' },
        { code: 'PSA001', category: 'Productos Sin Azúcar', name: 'Torta Sin Azúcar de Naranja', price: 48000, type: 'sin-azucar', description: 'Torta ligera y deliciosa, endulzada naturalmente, ideal para quienes buscan opciones más saludables.', image: 'naranja.jpg' },
        { code: 'PSA002', category: 'Productos Sin Azúcar', name: 'Cheesecake Sin Azúcar', price: 47000, type: 'sin-azucar', description: 'Suave y cremoso, este cheesecake es una opción perfecta para disfrutar sin culpa.', image: 'cheesecake.jpg' },
        { code: 'PT001', category: 'Pastelería Tradicional', name: 'Empanada de Manzana', price: 3000, type: 'tradicional', description: 'Pastelería tradicional rellena de manzanas especiadas, perfecta para un dulce desayuno o merienda.', image: 'empanada.jpg' },
        { code: 'PT002', category: 'Pastelería Tradicional', name: 'Tarta de Santiago', price: 6000, type: 'tradicional', description: 'Tradicional tarta española hecha con almendras, azúcar, y huevos, una delicia para los amantes de los postres clásicos.', image: 'santiago.jpg' },
        { code: 'PG001', category: 'Productos Sin Gluten', name: 'Brownie sin Gluten', price: 4000, type: 'sin-gluten', description: 'Rico y denso, este brownie es perfecto para quienes necesitan evitar el gluten sin sacrificar el sabor.', image: 'brownie.jpg' },
        { code: 'PG002', category: 'Productos Sin Gluten', name: 'Pan sin Gluten', price: 3500, type: 'sin-gluten', description: 'Suave y esponjoso, ideal para sándwiches o para acompañar cualquier comida.', image: 'pan.jpg' },
        { code: 'PV001', category: 'Productos Veganos', name: 'Torta Vegana de Chocolate', price: 50000, type: 'vegana', description: 'Torta de chocolate húmeda y deliciosa, hecha sin productos de origen animal, perfecta para veganos.', image: 'vegana.jpg' },
        { code: 'PV002', category: 'Productos Veganos', name: 'Galletas Veganas de Avena', price: 4500, type: 'vegana', description: 'Crujientes y sabrosas, estas galletas son una excelente opción para un snack saludable y vegano.', image: 'galletas.jpg' },
        { code: 'TE001', category: 'Tortas Especiales', name: 'Torta Especial de Cumpleaños', price: 55000, type: 'especial', description: 'Diseñada especialmente para celebraciones, personalizable con decoraciones y mensajes únicos.', image: 'cumpleaños.jpg' },
        { code: 'TE002', category: 'Tortas Especiales', name: 'Torta Especial de Boda', price: 60000, type: 'especial', description: 'Elegante y deliciosa, esta torta está diseñada para ser el centro de atención en cualquier boda.', image: 'boda.jpg' }
    ];

    const catalog = document.getElementById('product-catalog');
    const cartIcon = document.querySelector('.cart-icon');
    const cartModal = document.getElementById('cart-modal');
    const closeButton = document.querySelector('.close-button');
    const cartItemsDiv = document.getElementById('cart-items');
    const cartCountSpan = document.getElementById('cart-count');
    const cartTotalSpan = document.getElementById('cart-total');
    const filterCheckboxes = document.querySelectorAll('.filter-group input[type="checkbox"]');
    const categoryLinks = document.querySelectorAll('#category-list a');
    const showAllBtn = document.getElementById('show-all-products');
    const productDetailModal = document.getElementById('product-detail-modal');
    const closeDetailButton = document.querySelector('.close-button-detail');
    const productDetailInfo = document.getElementById('product-detail-info');

    let cart = [];

    const storedCart = localStorage.getItem('cartItems');
    if (storedCart) {
        cart = JSON.parse(storedCart);
        updateCart();
    }

    function renderProducts(filteredProducts = products) {
        catalog.innerHTML = '';
        filteredProducts.forEach(product => {
            const productCard = document.createElement('div');
            productCard.classList.add('product-card');
            productCard.innerHTML = `
                <img src="img/${product.image}" alt="${product.name}" data-code="${product.code}">
                <div class="product-info">
                    <h3>${product.name}</h3>
                    <p class="price">$${product.price.toLocaleString('es-CL')} CLP</p>
                    <button class="action-button view-details" data-code="${product.code}">Ver Detalles</button>
                    <button class="action-button add-to-cart" data-code="${product.code}">Añadir al Carrito</button>
                </div>
            `;
            catalog.appendChild(productCard);
        });
    }

    function updateCart() {
        cartItemsDiv.innerHTML = '';
        let total = 0;
        cart.forEach(item => {
            const itemElement = document.createElement('div');
            const itemTotal = item.price * item.quantity;
            total += itemTotal;
            itemElement.innerHTML = `
                <span>${item.name} (${item.quantity})</span>
                <span>$${itemTotal.toLocaleString('es-CL')} CLP</span>
            `;
            cartItemsDiv.appendChild(itemElement);
        });
        cartCountSpan.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
        cartTotalSpan.textContent = `$${total.toLocaleString('es-CL')} CLP`;
    }

    catalog.addEventListener('click', (e) => {
        if (e.target.classList.contains('view-details') || e.target.tagName === 'IMG') {
            const productCode = e.target.dataset.code;
            const product = products.find(p => p.code === productCode);
            showProductDetails(product);
        } else if (e.target.classList.contains('add-to-cart')) {
            const productCode = e.target.dataset.code;
            const productToAdd = products.find(p => p.code === productCode);
            addToCart(productToAdd);
        }
    });

    function showProductDetails(product) {
        let sizeOptions = '';
        let customization = '';

        if (product.category.includes('Tortas')) {
            sizeOptions = `
                <label for="size-select">Tamaño:</label>
                <select id="size-select">
                    <option value="pequeño">Pequeño</option>
                    <option value="mediano">Mediano</option>
                    <option value="grande">Grande</option>
                </select>
            `;
            customization = `
                <label for="message-input">Mensaje especial:</label>
                <textarea id="message-input" rows="4" placeholder="Escribe un mensaje aquí..."></textarea>
            `;
        }

        productDetailInfo.innerHTML = `
            <img src="img/${product.image}" alt="${product.name}" width="300" height="250">
            <div class="info-section">
                <h2>${product.name}</h2>
                <div class="social-icons">
                    <a href="#" class="share-btn facebook" target="_blank" title="Compartir en Facebook">
                        <img src="img/facebook.png" alt="Compartir en Facebook">
                    </a>
                    <a href="#" class="share-btn twitter" target="_blank" title="Compartir en Twitter">
                        <img src="img/twitter.png" alt="Compartir en Twitter">
                    </a>
                    <a href="#" class="share-btn whatsapp" target="_blank" title="Compartir por WhatsApp">
                        <img src="img/whatsapp.png" alt="Compartir por WhatsApp">
                    </a>
                </div>
                <p><strong>Categoría:</strong> ${product.category}</p>
                <p><strong>Precio:</strong> $${product.price.toLocaleString('es-CL')} CLP</p>
                <p>${product.description}</p>
                
                ${sizeOptions}
                ${customization}

                <button class="add-to-cart-detail" data-code="${product.code}">Añadir al Carrito</button>
            </div>
        `;
        const productName = encodeURIComponent(product.name);
        const productUrl = encodeURIComponent(window.location.href);
        const productDescription = encodeURIComponent(product.description);
        const hashtags = 'Pasteleria1000Sabores,PasteleriaArtesanal,Postres';

        const facebookLink = `https://www.facebook.com/sharer/sharer.php?u=${productUrl}&quote=¡Mira esta deliciosa ${productName} de Pastelería 1000 Sabores!`;
        const twitterLink = `https://twitter.com/intent/tweet?url=${productUrl}&text=¡Me encanta esta ${productName} de Pastelería 1000 Sabores!&hashtags=${hashtags}`;
        const whatsappLink = `https://api.whatsapp.com/send?text=¡Mira esta deliciosa ${productName} de Pastelería 1000 Sabores! Más detalles aquí: ${productUrl}`;

        document.querySelector('.share-btn.facebook').href = facebookLink;
        document.querySelector('.share-btn.twitter').href = twitterLink;
        document.querySelector('.share-btn.whatsapp').href = whatsappLink;

        productDetailModal.style.display = 'flex';
    }

    productDetailInfo.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart-detail')) {
            const productCode = e.target.dataset.code;
            const productToAdd = products.find(p => p.code === productCode);
            const message = document.getElementById('message-input') ? document.getElementById('message-input').value : null;
            const size = document.getElementById('size-select') ? document.getElementById('size-select').value : null;

            addToCart({ ...productToAdd, message, size });
            productDetailModal.style.display = 'none';
        }
    });

    function addToCart(product) {
        const existingItem = cart.find(item => item.code === product.code);
        if (existingItem) {
            existingItem.quantity++;
            if (product.message) existingItem.message = product.message;
            if (product.size) existingItem.size = product.size;
        } else {
            cart.push({ ...product, quantity: 1 });
        }
        updateCart();
        localStorage.setItem('cartItems', JSON.stringify(cart));
    }

    cartIcon.addEventListener('click', () => {
        cartModal.style.display = 'flex';
    });

    closeButton.addEventListener('click', () => {
        cartModal.style.display = 'none';
    });
    
    closeDetailButton.addEventListener('click', () => {
        productDetailModal.style.display = 'none';
    });

    filterCheckboxes.forEach(checkbox => {
        checkbox.addEventListener('change', () => {
            const activeFilters = [...filterCheckboxes].filter(cb => cb.checked).map(cb => cb.dataset.filter);
            const filteredProducts = products.filter(p => {
                if (activeFilters.length === 0) return true;
                return activeFilters.includes(p.type);
            });
            renderProducts(filteredProducts);
        });
    });

    categoryLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const category = e.target.dataset.category;
            const filteredProducts = products.filter(p => p.category === category);
            renderProducts(filteredProducts);
        });
    });

    showAllBtn.addEventListener('click', () => {
        filterCheckboxes.forEach(checkbox => {
            checkbox.checked = false;
        });
        renderProducts();
    });

    renderProducts();
});