<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class OperatingModeMiddleware
{
    public function handle(
        Request $request,
        Closure $next,
        string $mode
    ): Response {

        if ($request->user()) {

            // Si es admin puede cambiar de modo
            if ($request->user()->role === 'admin') {

                session([
                    'operating_mode' => $mode
                ]);
            }

            // Un worker siempre trabaja como worker
            if ($request->user()->role === 'worker') {

                session([
                    'operating_mode' => 'worker'
                ]);
            }
        }

        return $next($request);
    }
}