<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Gate;

class CategoryController extends Controller
{
    /**
     * Listar todas las categorías.
     */
    public function index(): JsonResponse
    {
        Gate::authorize('categorias.ver');

        $categories = Category::orderBy('name')->get();

        return response()->json($categories);
    }

    /**
     * Crear una categoría.
     */
    public function store(Request $request): JsonResponse
    {
        Gate::authorize('categorias.crear');

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
        ]);

        $category = Category::create($validated);

        return response()->json($category, 201);
    }

    /**
     * Mostrar una categoría.
     */
    public function show(Category $category): JsonResponse
    {
        Gate::authorize('categorias.ver');

        return response()->json($category);
    }

    /**
     * Actualizar una categoría.
     */
    public function update(
        Request $request,
        Category $category
    ): JsonResponse {
        Gate::authorize('categorias.editar');

        $validated = $request->validate([
            'name' => ['sometimes', 'required', 'string', 'max:255'],
            'description' => ['nullable', 'string'],
        ]);

        $category->update($validated);

        return response()->json($category->fresh());
    }

    /**
     * Eliminar una categoría.
     */
    public function destroy(Category $category): JsonResponse
    {
        Gate::authorize('categorias.eliminar');

        $category->delete();

        return response()->json([
            'message' => 'Categoría eliminada correctamente.',
        ]);
    }
}