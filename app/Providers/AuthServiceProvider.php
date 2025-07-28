<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;

class AuthServiceProvider extends ServiceProvider
{
    /**
     * The model to policy mappings for the application.
     *
     * @var array<class-string, class-string>
     */
    protected $policies = [
        //
    ];

    /**
     * Register any authentication / authorization services.
     */
    public function boot(): void
    {
        $this->registerPolicies();

        // Define gates for permissions
        Gate::define('users.view', function ($user) {
            return $user->hasPermission('users.view');
        });

        Gate::define('users.create', function ($user) {
            return $user->hasPermission('users.create');
        });

        Gate::define('users.edit', function ($user) {
            return $user->hasPermission('users.edit');
        });

        Gate::define('users.delete', function ($user) {
            return $user->hasPermission('users.delete');
        });

        Gate::define('users.activate', function ($user) {
            return $user->hasPermission('users.activate');
        });

        Gate::define('roles.view', function ($user) {
            return $user->hasPermission('roles.view');
        });

        Gate::define('roles.create', function ($user) {
            return $user->hasPermission('roles.create');
        });

        Gate::define('roles.edit', function ($user) {
            return $user->hasPermission('roles.edit');
        });

        Gate::define('roles.delete', function ($user) {
            return $user->hasPermission('roles.delete');
        });

        Gate::define('roles.manage', function ($user) {
            return $user->hasPermission('roles.manage');
        });

        Gate::define('system.admin', function ($user) {
            return $user->hasPermission('system.admin');
        });
    }
}