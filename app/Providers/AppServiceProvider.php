<?php

namespace App\Providers;

use Illuminate\Auth\Middleware\Authenticate;
use Illuminate\Auth\Middleware\RedirectIfAuthenticated;
use Illuminate\Http\Request;
use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Authenticate::redirectUsing(function (Request $request) {
            if ($request->routeIs('admin.*')) {
                return route('admin.login');
            }

            return route('user.login');
        });

        RedirectIfAuthenticated::redirectUsing(function (Request $request) {
            if ($request->routeIs('admin.*')) {
                return route('admin.dashboard');
            }

            return route('user.landing.home');
        });
    }
}
