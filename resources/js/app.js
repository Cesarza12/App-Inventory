import './bootstrap';

async function checkApi() {
    const status = document.getElementById('api-status');

    try {
        const response = await fetch('/api/products');

        if (!response.ok) {
            throw new Error('API error');
        }

        const products = await response.json();

        document.getElementById('products-count').textContent =
            products.length;

        const categoriesResponse = await fetch('/api/categories');

        if (!categoriesResponse.ok) {
            throw new Error('Categories API error');
        }

        const categories = await categoriesResponse.json();

        document.getElementById('categories-count').textContent =
            categories.length;

        status.textContent = 'Conectada correctamente';
        status.classList.remove('text-gray-400');
        status.classList.add('text-green-600');

    } catch (error) {
        console.error(error);

        status.textContent = 'Error de conexión';
        status.classList.remove('text-gray-400');
        status.classList.add('text-red-600');
    }
}

document.addEventListener('DOMContentLoaded', checkApi);

async function loadProducts() {
    const productsList = document.getElementById('products-list');

    if (!productsList) {
        return;
    }

    try {
        const response = await fetch('/api/products');

        if (!response.ok) {
            throw new Error('No se pudieron cargar los productos');
        }

        const products = await response.json();

        if (products.length === 0) {
            productsList.innerHTML = `
                <div class="rounded-xl bg-gray-50 p-6 text-center">
                    <p class="text-gray-500">
                        No hay productos registrados.
                    </p>
                </div>
            `;

            return;
        }

       productsList.innerHTML = products.map(product => `
    <div class="rounded-xl border bg-white p-4 shadow-sm">

        <div class="flex items-start justify-between">

            <div>
                <h3 class="text-lg font-bold">
                    ${product.name}
                </h3>

                <p class="text-sm text-gray-500">
                    Código: ${product.code}
                </p>
            </div>

            <span class="rounded-lg bg-blue-50 px-2 py-1 text-sm font-semibold text-blue-600">
                ${product.category?.name ?? 'Sin categoría'}
            </span>

        </div>

        <div class="mt-4 grid grid-cols-2 gap-3">

            <div class="rounded-lg bg-gray-50 p-3">
                <p class="text-xs text-gray-500">
                    Precio
                </p>

                <p class="font-bold">
                    $${product.price}
                </p>
            </div>

            <div class="rounded-lg bg-gray-50 p-3">
                <p class="text-xs text-gray-500">
                    Stock
                </p>

                <p class="font-bold">
                    ${product.stock}
                </p>
            </div>

        </div>

        <div class="mt-4 flex gap-2">

            <a
                href="/products/${product.id}/edit"
                class="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-center text-sm font-semibold text-white">
                Editar
            </a>

            <button
                type="button"
                data-product-id="${product.id}"
                class="delete-product flex-1 rounded-lg bg-red-600 px-4 py-2 text-sm font-semibold text-white">
                Eliminar
            </button>

        </div>

    </div>
`).join('');

setupProductDelete();

    } catch (error) {

        console.error(error);

        productsList.innerHTML = `
            <div class="rounded-xl bg-red-50 p-4 text-red-600">
                Error al cargar los productos.
            </div>
        `;
    }
}

document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
});

async function setupProductCreate() {
    const form = document.getElementById('product-form');

    if (!form) {
        return;
    }

    const categorySelect = document.getElementById('category_id');
    const message = document.getElementById('form-message');
    const saveButton = document.getElementById('save-product');

    // Cargar categorías
    try {
        const response = await fetch('/api/categories');

        if (!response.ok) {
            throw new Error('No se pudieron cargar las categorías');
        }

        const categories = await response.json();

        categorySelect.innerHTML = `
            <option value="">Selecciona una categoría</option>
        `;

        categories.forEach(category => {
            categorySelect.innerHTML += `
                <option value="${category.id}">
                    ${category.name}
                </option>
            `;
        });

    } catch (error) {
        console.error(error);

        categorySelect.innerHTML = `
            <option value="">
                Error al cargar categorías
            </option>
        `;
    }

    // Guardar producto
    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        message.className = 'hidden rounded-lg p-3 text-sm';
        message.textContent = '';

        saveButton.disabled = true;
        saveButton.textContent = 'Guardando...';

        const body = {
            category_id: Number(document.getElementById('category_id').value),
            name: document.getElementById('name').value,
            code: document.getElementById('code').value,
            description: document.getElementById('description').value || null,
            price: Number(document.getElementById('price').value),
            stock: Number(document.getElementById('stock').value),
            minimum_stock: Number(document.getElementById('minimum_stock').value),
        };

        try {
            const response = await fetch('/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                },
                body: JSON.stringify(body),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || 'No se pudo crear el producto'
                );
            }

            message.className =
                'rounded-lg bg-green-50 p-3 text-sm text-green-700';

            message.textContent =
                'Producto creado correctamente.';

            form.reset();

            setTimeout(() => {
                window.location.href = '/products';
            }, 1000);

        } catch (error) {
            console.error(error);

            message.className =
                'rounded-lg bg-red-50 p-3 text-sm text-red-700';

            message.textContent = error.message;

        } finally {
            saveButton.disabled = false;
            saveButton.textContent = 'Guardar producto';
        }
    });
}

async function setupProductEdit() {
    const form = document.getElementById('product-edit-form');

    if (!form) {
        return;
    }

    const productId = window.location.pathname.split('/')[2];

    const categorySelect = document.getElementById('edit-category');
    const message = document.getElementById('edit-message');
    const updateButton = document.getElementById('update-product');

    try {
        const [productResponse, categoriesResponse] = await Promise.all([
            fetch(`/api/products/${productId}`),
            fetch('/api/categories')
        ]);

        if (!productResponse.ok || !categoriesResponse.ok) {
            throw new Error('No se pudieron cargar los datos');
        }

        const product = await productResponse.json();
        const categories = await categoriesResponse.json();

        document.getElementById('edit-name').value = product.name;
        document.getElementById('edit-code').value = product.code;
        document.getElementById('edit-description').value =
            product.description ?? '';
        document.getElementById('edit-price').value = product.price;
        document.getElementById('edit-stock').value = product.stock;
        document.getElementById('edit-minimum-stock').value =
            product.minimum_stock;

        categorySelect.innerHTML = categories.map(category => `
            <option
                value="${category.id}"
                ${category.id === product.category_id ? 'selected' : ''}>
                ${category.name}
            </option>
        `).join('');

     

    } catch (error) {
        console.error(error);

        message.className =
            'rounded-lg bg-red-50 p-3 text-sm text-red-700';

        message.textContent =
            'No se pudo cargar el producto.';
    }

    form.addEventListener('submit', async (event) => {

        event.preventDefault();

        updateButton.disabled = true;
        updateButton.textContent = 'Guardando...';

        try {

            const body = {
                category_id: Number(
                    document.getElementById('edit-category').value
                ),
                name: document.getElementById('edit-name').value,
                code: document.getElementById('edit-code').value,
                description:
                    document.getElementById('edit-description').value || null,
                price: Number(
                    document.getElementById('edit-price').value
                ),
                stock: Number(
                    document.getElementById('edit-stock').value
                ),
                minimum_stock: Number(
                    document.getElementById('edit-minimum-stock').value
                ),
            };

            const response = await fetch(
                `/api/products/${productId}`,
                {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                    },
                    body: JSON.stringify(body),
                }
            );

            const data = await response.json();

            if (!response.ok) {
                throw new Error(
                    data.message || 'No se pudo actualizar el producto'
                );
            }

            message.className =
                'rounded-lg bg-green-50 p-3 text-sm text-green-700';

            message.textContent =
                'Producto actualizado correctamente.';

            setTimeout(() => {
                window.location.href = '/products';
            }, 1000);

        } catch (error) {

            console.error(error);

            message.className =
                'rounded-lg bg-red-50 p-3 text-sm text-red-700';

            message.textContent = error.message;

        } finally {

            updateButton.disabled = false;
            updateButton.textContent = 'Guardar cambios';

        }
    });
}



async function setupProductDelete() {
    const deleteButtons = document.querySelectorAll('.delete-product');

    if (deleteButtons.length === 0) {
        return;
    }

    deleteButtons.forEach(button => {
        button.addEventListener('click', async () => {

            const productId = button.dataset.productId;

            const confirmed = confirm(
                '¿Estás seguro de que deseas eliminar este producto?'
            );

            if (!confirmed) {
                return;
            }

            button.disabled = true;
            button.textContent = 'Eliminando...';

            try {

                const response = await fetch(
                    `/api/products/${productId}`,
                    {
                        method: 'DELETE',
                        headers: {
                            'Accept': 'application/json',
                        },
                    }
                );

                const data = await response.json();

                if (!response.ok) {
                    throw new Error(
                        data.message || 'No se pudo eliminar el producto'
                    );
                }

                alert('Producto eliminado correctamente.');

                await loadProducts();

                setupProductDelete();

            } catch (error) {

                console.error(error);

                alert(error.message);

                button.disabled = false;
                button.textContent = 'Eliminar';
            }
        });
    });
}


document.addEventListener('DOMContentLoaded', () => {
    loadProducts();
    setupProductCreate();
    setupProductEdit();
    setupProductDelete();
});


if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker
            .register('/sw.js')
            .then(registration => {
                console.log(
                    'Service Worker registrado:',
                    registration.scope
                );
            })
            .catch(error => {
                console.error(
                    'Error registrando Service Worker:',
                    error
                );
            });
    });
}