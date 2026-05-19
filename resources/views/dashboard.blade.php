<x-app-layout>
    <x-card header="Welcome to the TallStackUI Starter Kit">
        <div class="space-y-2">
            <p>
                👋🏻 This is the TallStackUI starter kit for Laravel 12. With this TallStackUI starter kit you will be
                able to enjoy a ready-to-use application to initialize your next Laravel 12 project with TallStackUI.
            </p>
            @if (auth()->user()->hasRole(\App\Enums\RoleEnum::Admin->value))
                <p>This is exclusive to admin, hello admin!</p>
            @endif
            <div class="mt-4 space-y-2">
                <i>
                    "What this starter kit includes out of the box?"
                </i>
                <ul class="ml-2 mt-2 list-inside list-decimal font-semibold">
                    <li>Laravel v12</li>
                    <li>Livewire v3</li>
                    <li>TallStackUI v2</li>
                    <li>TailwindCSS v4</li>
                </ul>
                <p>And also:</p>
                <ul class="ml-2 mt-2 list-inside list-decimal font-semibold">
                    <li><a href="https://github.com/barryvdh/laravel-debugbar" target="_blank">DebugBar</a></li>
                    <li><a href="https://github.com/larastan/larastan" target="_blank">LaraStan</a></li>
                    <li><a href="https://pestphp.com/" target="_blank">Pest</a></li>
                    <li><a href="https://laravel.com/docs/pint" target="_blank">Pint</a></li>
                </ul>
            </div>
            <livewire:katalogmenu::mfc.katalog.view />
        </div>
        <x-slot:footer>
            <span class="text-xs">
                ⚠️ <x-link href="https://tallstackui.com/docs/v2/starter-kit" bold blank sm>Make sure to read the docs
                    about the starter kit!</x-link>
            </span>
        </x-slot:footer>
    </x-card>

    <x-card header="Ulasan Reviews">
        <div class="grid gap-4 md:grid-cols-2">
            <div class="space-y-3 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
                <h3 class="text-lg font-semibold">Submit a review</h3>
                <p class="text-sm text-slate-500 dark:text-slate-400">Share feedback for a product you bought and help the team improve the catalog.</p>
                <x-button :href="route('ulasan.form')" primary>Write Review</x-button>
            </div>

            @if (auth()->user()->hasRole(\App\Enums\RoleEnum::Admin->value))
                <div class="space-y-3 rounded-xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-700 dark:bg-slate-900">
                    <h3 class="text-lg font-semibold">Manage reviews</h3>
                    <p class="text-sm text-slate-500 dark:text-slate-400">Review and moderate customer feedback across products.</p>
                    <x-button :href="route('ulasan.admin')">Open Review Management</x-button>
                </div>
            @endif
        </div>
    </x-card>
</x-app-layout>
