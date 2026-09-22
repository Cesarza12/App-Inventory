<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class ProductController extends Controller
{
    /**
     * Listar todos los productos.
     */
  public function index(Request $request): JsonResponse
{
    Gate::authorize('productos.ver');

    $products = Product::with('category')
        ->when($request->search, function ($query, $search) {
            $query->where(function ($query) use ($search) {
                $query->where('name', 'like', "%{$search}%")
                    ->orWhere('code', 'like', "%{$search}%");
            });
        })
        ->orderBy('name')
        ->get();

    return response()->json($products);
}
    /**
     * Crear un producto.
     */
    public function store(Request $request): JsonResponse
    {
         Gate::authorize('productos.crear');
        $validated = $request->validate([
            'category_id' => ['required', 'exists:categories,id'],
            'name' => ['required', 'string', 'max:255'],
            'code' => ['required', 'string', 'max:255', 'unique:products,code'],
            'description' => ['nullable', 'string'],
            'price' => ['required', 'numeric', 'min:0'],
            'stock' => ['nullable', 'integer', 'min:0'],
            'minimum_stock' => ['nullable', 'integer', 'min:0'],
            'image' => ['nullable', 'string', 'max:255'],
        ]);

        $product = Product::create($validated);

        return response()->json($product->load('category'), 201);
    }

    /**
     * Mostrar un producto.
     */
    public function show(Product $product): JsonResponse
    {
         Gate::authorize('productos.ver');
        return response()->json($product->load('category'));
    }

    /**
     * Actualizar un producto.
     */
    public function update(Request $request, Product $product): JsonResponse
    {
         Gate::authorize('productos.editar');
        $validated = $request->validate([
            'category_id' => ['sometimes', 'exists:categories,id'],
            'name' => ['sometimes', 'string', 'max:255'],
            'code' => [
                'sometimes',
                'string',
                'max:255',
                'unique:products,code,' . $product->id,
            ],
            'description' => ['nullable', 'string'],
            'price' => ['sometimes', 'numeric', 'min:0'],
            'stock' => ['sometimes', 'integer', 'min:0'],
            'minimum_stock' => ['sometimes', 'integer', 'min:0'],
            'image' => ['nullable', 'string', 'max:255'],
        ]);

        $product->update($validated);

        return response()->json($product->fresh()->load('category'));
    }

    /**
     * Eliminar un producto.
     */
    public function destroy(Product $product): JsonResponse
    {
         Gate::authorize('productos.eliminar');
        $product->delete();

        return response()->json([
            'message' => 'Producto eliminado correctamente.',
        ]);
    }
}
