<?php

namespace App\Providers;

use Illuminate\Support\Facades\View;
use App\Services\SidebarService;
use Illuminate\Support\ServiceProvider;

class SidebarServiceProvider extends ServiceProvider
{
    /**
     * Register services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap services.
     */
    public function boot(): void
    {
        $this->app->booted(function () {
            View::composer('*', function ($view) {
                $sidebarService = new SidebarService();
                $sidebarService->appendItem();
          
                $view->with([
                    'sidebarItems' => $sidebarService->getItems(),

                ]);
            });
        });
    }
}
