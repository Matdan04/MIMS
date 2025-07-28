# Quick Reference Guide

## Authentication & Authorization System

### Quick Setup

1. **Run Migrations & Seeders**
   ```bash
   php artisan migrate:fresh --seed
   ```

2. **Create Admin User** (if needed)
   ```bash
   php artisan tinker
   ```
   ```php
   $user = User::create([
       'name' => 'Super Admin',
       'email' => 'admin@example.com',
       'password' => Hash::make('password'),
       'role_id' => Role::where('name', 'super_admin')->first()->id,
       'is_active' => true,
       'email_verified_at' => now()
   ]);
   ```

3. **Build Frontend Assets**
   ```bash
   npm install
   npm run build
   ```

### Key Routes

| Route | Description | Permission Required |
|-------|-------------|-------------------|
| `/login` | User login page | None |
| `/register` | User registration | None |
| `/dashboard` | Main dashboard | `dashboard.view` |
| `/admin/users` | User management | `users.view` |
| `/admin/users/create` | Create user | `users.create` |
| `/admin/roles` | Role management | `roles.view` |
| `/admin/roles/create` | Create role | `roles.create` |

### Default Permissions

```php
// User Management
'users.view'     // View users
'users.create'   // Create users  
'users.edit'     // Edit users
'users.delete'   // Delete users
'users.activate' // Toggle user status

// Role Management
'roles.view'     // View roles
'roles.create'   // Create roles
'roles.edit'     // Edit roles
'roles.delete'   // Delete roles
'roles.manage'   // Full role management

// System
'system.admin'   // Full system access
'dashboard.view' // Dashboard access
```

### Default Roles

| Role | Permissions | Description |
|------|-------------|-------------|
| **Super Admin** | All permissions | Full system access |
| **School Admin** | Users: view, create, edit, activate | School level admin |
| **International School** | Dashboard, users view only | Limited access |
| **Student** | Dashboard view only | Basic user access |

## Code Examples

### Check User Permission
```php
// In Controller
$this->authorize('users.create');

// In Blade/Model
if ($user->hasPermission('users.view')) {
    // Show content
}

// Using Gate
if (Gate::allows('roles.edit')) {
    // Allow action
}
```

### Create New Permission
```php
// In Seeder or Migration
Permission::create([
    'name' => 'reports.view',
    'display_name' => 'View Reports',
    'description' => 'Can view system reports',
    'module' => 'reports'
]);

// Add to AuthServiceProvider
Gate::define('reports.view', function ($user) {
    return $user->hasPermission('reports.view');
});
```

### Assign Permission to Role
```php
$role = Role::where('name', 'manager')->first();
$permission = Permission::where('name', 'reports.view')->first();
$role->givePermissionTo($permission);

// Or sync multiple permissions
$role->permissions()->sync([1, 2, 3, 4]);
```

## Component Usage

### User Form Component
```typescript
<UserForm
    data={formData}
    errors={errors}
    roles={availableRoles}
    processing={isSubmitting}
    isEditing={false}
    onFieldChange={handleFieldChange}
    onSubmit={handleSubmit}
/>
```

### Role Form Component
```typescript
<RoleForm
    role={roleData}           // Optional for editing
    permissions={groupedPermissions}
/>
```

### Authorization in React
```typescript
// Check permission in component
const { auth } = usePage<PageProps>().props;
const canCreateUsers = auth.user.hasPermission?.('users.create');

if (canCreateUsers) {
    return <CreateUserButton />;
}
```

## Troubleshooting Commands

```bash
# Clear all caches
php artisan optimize:clear

# Rebuild permissions
php artisan db:seed --class=RolePermissionSeeder

# Check routes
php artisan route:list --name=admin

# View failed jobs
php artisan queue:failed

# Check logs
tail -f storage/logs/laravel.log
```

## File Locations

### Backend Files
```
app/
├── Http/Controllers/Admin/
│   ├── UserController.php
│   └── RoleController.php
├── Models/
│   ├── User.php
│   ├── Role.php
│   └── Permission.php
└── Providers/
    └── AuthServiceProvider.php

database/seeders/
└── RolePermissionSeeder.php

routes/
└── admin.php
```

### Frontend Files
```
resources/js/
├── pages/Admin/
│   ├── Users/
│   └── Roles/
├── components/admin/
│   ├── users/
│   └── roles/
├── hooks/
│   ├── use-user-form.tsx
│   ├── use-user-table.tsx
│   ├── use-role-form.tsx
│   └── use-role-table.tsx
└── types/index.d.ts
```

## Security Checklist

- [ ] All admin routes protected with middleware
- [ ] Controllers use `$this->authorize()` 
- [ ] Frontend components check permissions
- [ ] Sensitive operations require confirmation
- [ ] Input validation on all forms
- [ ] CSRF protection enabled
- [ ] Email verification required
- [ ] Strong password requirements
- [ ] Session security configured
- [ ] Database constraints in place