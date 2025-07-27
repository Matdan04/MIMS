<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\Permission;
use Illuminate\Database\Seeder;

class RolePermissionSeeder extends Seeder
{
    public function run(): void
    {
        // Create permissions
        $permissions = [
            // User Management
            ['name' => 'users.view', 'display_name' => 'View Users', 'description' => 'Can view user list and details', 'module' => 'users'],
            ['name' => 'users.create', 'display_name' => 'Create Users', 'description' => 'Can create new users', 'module' => 'users'],
            ['name' => 'users.edit', 'display_name' => 'Edit Users', 'description' => 'Can edit user information', 'module' => 'users'],
            ['name' => 'users.delete', 'display_name' => 'Delete Users', 'description' => 'Can delete users', 'module' => 'users'],
            ['name' => 'users.activate', 'display_name' => 'Activate/Deactivate Users', 'description' => 'Can activate or deactivate users', 'module' => 'users'],
            
            // Role Management
            ['name' => 'roles.view', 'display_name' => 'View Roles', 'description' => 'Can view roles and permissions', 'module' => 'roles'],
            ['name' => 'roles.manage', 'display_name' => 'Manage Roles', 'description' => 'Can create, edit, and delete roles', 'module' => 'roles'],
            
            // System Administration
            ['name' => 'system.admin', 'display_name' => 'System Administration', 'description' => 'Full system access', 'module' => 'system'],
            ['name' => 'dashboard.view', 'display_name' => 'View Dashboard', 'description' => 'Can access dashboard', 'module' => 'dashboard'],
        ];

        foreach ($permissions as $permission) {
            Permission::firstOrCreate(
                ['name' => $permission['name']],
                $permission
            );
        }

        // Create roles
        $roles = [
            [
                'name' => 'super_admin',
                'display_name' => 'Super Admin',
                'description' => 'Full system access with all permissions',
                'permissions' => ['system.admin', 'dashboard.view', 'users.view', 'users.create', 'users.edit', 'users.delete', 'users.activate', 'roles.view', 'roles.manage']
            ],
            [
                'name' => 'school_admin',
                'display_name' => 'School Admin',
                'description' => 'School level administrator',
                'permissions' => ['dashboard.view', 'users.view', 'users.create', 'users.edit', 'users.activate']
            ],
            [
                'name' => 'international_school',
                'display_name' => 'International School',
                'description' => 'International school representative',
                'permissions' => ['dashboard.view', 'users.view']
            ],
            [
                'name' => 'student',
                'display_name' => 'Student',
                'description' => 'Student user',
                'permissions' => ['dashboard.view']
            ]
        ];

        foreach ($roles as $roleData) {
            $role = Role::firstOrCreate(
                ['name' => $roleData['name']],
                [
                    'display_name' => $roleData['display_name'],
                    'description' => $roleData['description'],
                    'is_active' => true,
                ]
            );

            // Assign permissions to role
            $permissions = Permission::whereIn('name', $roleData['permissions'])->get();
            $role->permissions()->sync($permissions);
        }
    }
}