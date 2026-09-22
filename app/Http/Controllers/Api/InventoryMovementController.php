<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\InventoryMovement;
use App\Models\Product;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class InventoryMovementController extends Controller
{
    /**
     * Listar los movimientos de inventario.
     */
    public function index(): JsonResponse
    {
        $movements = InventoryMovement::with(['product', 'user'])
            ->latest()
            ->get();

        return response()->json($movements);
    }

    /**
     * Registrar un movimiento de inventario.
     */
    public function store(Request $request): JsonResponse
    {
        $validated = $request->validate([
            'product_id' => ['required', 'exists:products,id'],
            'type' => ['required', 'in:in,out'],
            'quantity' => ['required', 'integer', 'min:1'],
            'reason' => ['nullable', 'string', 'max:255'],
        ]);

        $movement = DB::transaction(function () use ($validated, $request) {
            $product = Product::lockForUpdate()
                ->findOrFail($validated['product_id']);

            if (
                $validated['type'] === 'out' &&
                $product->stock < $validated['quantity']
            ) {
                abort(422, 'Stock insuficiente para realizar la salida.');
            }

            if ($validated['type'] === 'in') {
                $product->increment('stock', $validated['quantity']);
            } else {
                $product->decrement('stock', $validated['quantity']);
            }

            return InventoryMovement::create([
                'product_id' => $product->id,
                'user_id' => $request->user()?->id ?? 1,
                'type' => $validated['type'],
                'quantity' => $validated['quantity'],
                'reason' => $validated['reason'] ?? null,
            ]);
        });

        return response()->json(
            $movement->load(['product', 'user']),
            201
        );
    }

    /**
     * Mostrar un movimiento específico.
     */
    public function show(InventoryMovement $inventoryMovement): JsonResponse
    {
        return response()->json(
            $inventoryMovement->load(['product', 'user'])
        );
    }
}
