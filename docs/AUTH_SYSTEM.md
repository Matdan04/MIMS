# Authentication & Authorization System Documentation

## Table of Contents

1. [Overview](#overview)
2. [Authentication System](#authentication-system)
3. [Authorization System](#authorization-system)
4. [User Management](#user-management)
5. [Roles & Permissions](#roles--permissions)
6. [API Reference](#api-reference)
7. [Security Features](#security-features)
8. [Troubleshooting](#troubleshooting)

## Overview

This document provides comprehensive documentation for the authentication, authorization, user management, and roles & permissions system implemented in the MIMS (Management Information Management System) project.

### Technology Stack

- **Backend**: Laravel 11 with Inertia.js
- **Frontend**: React 19 with TypeScript
- **Authentication**: Laravel Breeze with custom enhancements
- **Authorization**: Role-based Access Control (RBAC)
- **UI Components**: Radix UI with Tailwind CSS

### Key Features

- ✅ Complete authentication flow (login, register, password reset, email verification)
- ✅ Role-based access control with granular permissions
- ✅ User management with CRUD operations
- ✅ Roles & permissions management
- ✅ Real-time authorization checks
- ✅ Responsive admin interface
- ✅ Security best practices implementation

---

## Authentication System

### Overview

The authentication system is built on Laravel Breeze with custom enhancements to support role-based access control and additional security features.

### Authentication Flow

#### 1. User Registration

**Location**: `/resources/js/pages/auth/register.tsx`

```typescript
interface RegisterForm {
    name: string;
    email: string;
    password: string;
    password_confirmation: string;
}
```

**Features**:
- Email validation
- Password confirmation
- Real-time form validation
- Automatic email verification trigger

#### 2. User Login

**Location**: `/resources/js/pages/auth/login.tsx`

```typescript
interface LoginForm {
    email: string;
    password: string;
    remember: boolean;
}
```

**Features**:
- Email/password authentication
- Remember me functionality
- Redirect to intended page after login
- Role-based dashboard routing

#### 3. Password Reset

**Locations**: 
- `/resources/js/pages/auth/forgot-password.tsx`
- `/resources/js/pages/auth/reset-password.tsx`

**Flow**:
1. User requests password reset via email
2. System sends secure reset link
3. User follows link and sets new password
4. Automatic login after successful reset

#### 4. Email Verification

**Location**: `/resources/js/pages/auth/verify-email.tsx`

**Features**:
- Email verification requirement for new accounts
- Resend verification email functionality
- Automatic redirect after verification

### Authentication Middleware

**Location**: `routes/admin.php`

```php
Route::prefix('admin')->name('admin.')->middleware(['auth', 'verified', 'admin'])->group(function () {
    // Admin routes
});
```

**Middleware Stack**:
- `auth`: Ensures user is authenticated
- `verified`: Ensures email is verified
- `admin`: Custom middleware for admin access

---

## Authorization System

### Overview

The authorization system implements Role-Based Access Control (RBAC) with granular permissions, allowing fine-grained control over user access to different parts of the application.

### Authorization Architecture

#### 1. Gates Definition

**Location**: `app/Providers/AuthServiceProvider.php`

```php
public function boot(): void
{
    // User Management Gates
    Gate::define('users.view', function ($user) {
        return $user->hasPermission('users.view');
    });
    
    Gate::define('users.create', function ($user) {
        return $user->hasPermission('users.create');
    });
    
    // Role Management Gates
    Gate::define('roles.view', function ($user) {
        return $user->hasPermission('roles.view');
    });
    
    Gate::define('roles.create', function ($user) {
        return $user->hasPermission('roles.create');
    });
    
    // ... additional gates
}
```

#### 2. Permission Checking

**User Model Method** (`app/Models/User.php`):

```php
public function hasPermission(string $permission): bool
{
    if (!$this->role) {
        return false;
    }

    // Check role permissions
    if ($this->role->hasPermission($permission)) {
        return true;
    }

    // Check additional permissions
    return $this->additional_permissions && 
           in_array($permission, $this->additional_permissions);
}
```

#### 3. Controller Authorization

**Example from RoleController**:

```php
public function index(Request $request)
{
    $this->authorize('roles.view');
    // Controller logic...
}

public function create()
{
    $this->authorize('roles.create');
    // Controller logic...
}
```

### Permission System

#### Available Permissions

| Module | Permission | Description |
|--------|------------|-------------|
| **Users** | `users.view` | View user list and details |
| | `users.create` | Create new users |
| | `users.edit` | Edit user information |
| | `users.delete` | Delete users |
| | `users.activate` | Activate/deactivate users |
| **Roles** | `roles.view` | View roles and permissions |
| | `roles.create` | Create new roles |
| | `roles.edit` | Edit role information |
| | `roles.delete` | Delete roles |
| | `roles.manage` | Full role management |
| **System** | `system.admin` | Full system access |
| | `dashboard.view` | Access dashboard |

---

## User Management

### Overview

The user management system provides comprehensive CRUD operations for managing users, their roles, and permissions through an intuitive admin interface.

### User Management Features

#### 1. User Listing

**Location**: `/admin/users`
**Component**: `resources/js/pages/Admin/Users/Index.tsx`

**Features**:
- Paginated user list (3 users per page)
- Search by name, email, or phone
- Filter by role and status
- Sortable columns (User, Role, Status, Last Login, Created)
- Real-time status indicators

**Table Columns**:
- **User**: Name, email, phone (when available)
- **Role**: Role badge with color coding
- **Status**: Active/Inactive badge
- **Last Login**: Date of last login or "Never"
- **Created**: User creation date
- **Actions**: View, Edit, Toggle Status, Delete

#### 2. User Creation

**Location**: `/admin/users/create`
**Component**: `resources/js/pages/Admin/Users/Create.tsx`

**Form Fields**:
```typescript
interface UserFormData {
    name: string;                    // Required
    email: string;                   // Required, unique
    phone: string;                   // Optional
    password: string;                // Required, min 8 chars
    password_confirmation: string;   // Required, must match
    role_id: string;                // Required
    is_active: boolean;             // Default: true
    additional_permissions: string[]; // Optional
}
```

**Validation Rules**:
- Name: Required, max 255 characters
- Email: Required, valid email, unique in database
- Phone: Optional, max 20 characters
- Password: Required, minimum 8 characters, confirmed
- Role: Required, must exist in roles table

#### 3. User Editing

**Location**: `/admin/users/{id}/edit`
**Component**: `resources/js/pages/Admin/Users/Edit.tsx`

**Features**:
- Pre-populated form with existing user data
- Optional password update
- Role reassignment
- Status modification
- Additional permissions management

#### 4. User Details

**Location**: `/admin/users/{id}`
**Component**: `resources/js/pages/Admin/Users/Show.tsx`

**Information Displayed**:
- Basic user information
- Current role and permissions
- Account status and dates
- Quick action buttons

### User Management Components

#### Core Components

1. **UserForm** (`resources/js/components/admin/users/user-form.tsx`)
   - Unified form component for create/edit operations
   - Real-time validation
   - Responsive design

2. **UserFilters** (`resources/js/components/admin/users/user-filters.tsx`)
   - Search and filter functionality
   - Role-based filtering
   - Status filtering

3. **UserTableColumns** (`resources/js/components/admin/users/user-table-columns.tsx`)
   - Table column definitions with sorting
   - Action buttons with permissions
   - Status indicators

#### Field Components

1. **UserBasicInfoFields**: Name, email, phone inputs
2. **UserPasswordFields**: Password and confirmation inputs
3. **UserRoleField**: Role selection dropdown
4. **UserStatusField**: Active/inactive toggle

### User Actions

#### Bulk Operations
- Toggle user status (activate/deactivate)
- Delete users (with confirmation)
- Export user data

#### Security Features
- Prevent super admin deletion
- Prevent self-deletion
- Prevent self-deactivation
- Role-based action visibility

---

## Roles & Permissions

### Overview

The roles and permissions system provides a flexible way to manage user access levels with granular control over application features.

### Role Management Features

#### 1. Role Listing

**Location**: `/admin/roles`
**Component**: `resources/js/pages/Admin/Roles/Index.tsx`

**Features**:
- Paginated role list (10 roles per page)
- Search by name, display name, or description
- Filter by status (active/inactive)
- Sortable columns
- User and permission counts per role

**Table Columns**:
- **Role**: Display name, system name, description
- **Users**: Count of assigned users
- **Permissions**: Count of assigned permissions
- **Status**: Active/inactive indicator
- **Created**: Role creation date
- **Actions**: View, Edit, Toggle Status, Delete

#### 2. Role Creation

**Location**: `/admin/roles/create`
**Component**: `resources/js/pages/Admin/Roles/Create.tsx`

**Form Structure**:

```typescript
interface RoleFormData {
    name: string;              // System name (lowercase, underscores)
    display_name: string;      // Human-readable name
    description: string;       // Optional description
    is_active: boolean;        // Status flag
    permissions: number[];     // Array of permission IDs
}
```

**Permission Assignment**:
- Permissions grouped by module
- Module-level selection (select all in module)
- Individual permission selection
- Visual feedback for partial selections

#### 3. Role Editing

**Location**: `/admin/roles/{id}/edit`
**Component**: `resources/js/pages/Admin/Roles/Edit.tsx`

**Features**:
- Pre-populated form with existing role data
- Permission modification with visual diff
- Bulk permission assignment/removal
- Real-time validation

#### 4. Role Details

**Location**: `/admin/roles/{id}`
**Component**: `resources/js/pages/Admin/Roles/Show.tsx`

**Information Displayed**:
- Role basic information
- Assigned users list
- Permissions organized by module
- Quick edit access

### Role & Permission Models

#### Role Model

**Location**: `app/Models/Role.php`

```php
class Role extends Model
{
    protected $fillable = [
        'name',
        'display_name', 
        'description',
        'is_active',
    ];

    // Relationships
    public function users(): HasMany
    public function permissions(): BelongsToMany
    
    // Methods
    public function hasPermission(string $permission): bool
    public function givePermissionTo(Permission|string $permission): void
    public function revokePermissionTo(Permission|string $permission): void
}
```

#### Permission Model

**Location**: `app/Models/Permission.php`

```php
class Permission extends Model
{
    protected $fillable = [
        'name',
        'display_name',
        'description', 
        'module',
    ];

    // Relationships
    public function roles(): BelongsToMany
}
```

### Default Roles

#### Super Admin
- **System Name**: `super_admin`
- **Permissions**: All available permissions
- **Description**: Full system access with all permissions
- **Users**: System administrators

#### School Admin  
- **System Name**: `school_admin`
- **Permissions**: User management (view, create, edit, activate)
- **Description**: School level administrator
- **Users**: School administrative staff

#### International School
- **System Name**: `international_school`
- **Permissions**: Limited user viewing
- **Description**: International school representative
- **Users**: International school contacts

#### Student
- **System Name**: `student`
- **Permissions**: Dashboard access only
- **Description**: Student user
- **Users**: Students

### Permission Management

#### Permission Structure

```typescript
interface Permission {
    id: number;
    name: string;           // e.g., "users.create"
    display_name: string;   // e.g., "Create Users"
    description: string;    // Human-readable description
    module: string;         // Grouping category
}
```

#### Module Organization

Permissions are organized into logical modules:

- **users**: User management operations
- **roles**: Role and permission management
- **system**: System-level operations
- **dashboard**: Dashboard access

### Security Features

#### Role Security
- Prevent system role deletion (`super_admin`, `admin`)
- Prevent system role deactivation
- Validate role assignments
- Check user count before deletion

#### Permission Security  
- Validate permission existence
- Check permission module consistency
- Prevent unauthorized permission grants
- Audit permission changes

---

## API Reference

### User Management Endpoints

#### List Users
```http
GET /admin/users
```

**Query Parameters**:
- `search`: Search term for name, email, or phone
- `role`: Filter by role name
- `status`: Filter by status (active/inactive)  
- `sort_by`: Column to sort by
- `sort_direction`: Sort direction (asc/desc)
- `page`: Page number for pagination

**Response**:
```json
{
    "data": [
        {
            "id": 1,
            "name": "John Doe",
            "email": "john@example.com",
            "phone": "+1234567890",
            "is_active": true,
            "role": {
                "id": 1,
                "name": "super_admin",
                "display_name": "Super Admin"
            },
            "created_at": "2024-01-01T00:00:00.000000Z"
        }
    ],
    "links": [...],
    "meta": {...}
}
```

#### Create User
```http
POST /admin/users
```

**Request Body**:
```json
{
    "name": "Jane Doe",
    "email": "jane@example.com", 
    "phone": "+1234567891",
    "password": "password123",
    "password_confirmation": "password123",
    "role_id": 2,
    "is_active": true
}
```

#### Update User
```http
PUT /admin/users/{id}
```

#### Delete User
```http
DELETE /admin/users/{id}
```

#### Toggle User Status
```http
PATCH /admin/users/{id}/toggle-status
```

### Role Management Endpoints

#### List Roles
```http
GET /admin/roles
```

**Response**:
```json
{
    "data": [
        {
            "id": 1,
            "name": "super_admin",
            "display_name": "Super Admin",
            "description": "Full system access",
            "is_active": true,
            "users_count": 2,
            "permissions_count": 12,
            "created_at": "2024-01-01T00:00:00.000000Z"
        }
    ]
}
```

#### Create Role
```http
POST /admin/roles
```

**Request Body**:
```json
{
    "name": "manager",
    "display_name": "Manager", 
    "description": "Management role with limited access",
    "is_active": true,
    "permissions": [1, 2, 3, 4]
}
```

#### Update Role
```http
PUT /admin/roles/{id}
```

#### Delete Role  
```http
DELETE /admin/roles/{id}
```

#### Toggle Role Status
```http
PATCH /admin/roles/{id}/toggle-status
```

---

## Security Features

### Authentication Security

#### Password Security
- Minimum 8 character requirement
- Password hashing using Laravel's default hasher
- Password confirmation validation
- Secure password reset tokens

#### Session Security
- CSRF protection on all forms
- Secure session configuration
- Session timeout handling
- Remember me token security

#### Email Verification
- Required email verification for new accounts
- Secure verification token generation
- Token expiration handling
- Resend verification capability

### Authorization Security

#### Access Control
- Comprehensive gate-based authorization
- Role-based permission checking
- Method-level authorization in controllers
- Frontend route protection

#### Administrative Security
- Prevent super admin deletion
- Prevent self-deletion/deactivation
- Role assignment validation
- System role protection

#### Data Security
- Input validation and sanitization
- SQL injection prevention via Eloquent ORM
- XSS protection through proper escaping
- Mass assignment protection

### Security Best Practices

#### Code Level
- Proper model relationships and constraints
- Validation at multiple layers
- Error handling without information disclosure
- Secure default configurations

#### Database Level
- Foreign key constraints
- Unique constraints where appropriate
- Proper indexing for performance
- Data integrity enforcement

---

## Troubleshooting

### Common Issues

#### Authentication Issues

**Issue**: "403 Forbidden" when accessing admin pages
**Solution**: 
1. Check if user has required permissions
2. Verify role assignment
3. Run seeder to ensure permissions exist:
   ```bash
   php artisan db:seed --class=RolePermissionSeeder
   ```

**Issue**: Login redirects to wrong page
**Solution**:
1. Check `LoginResponse.php` for custom redirect logic
2. Verify middleware configuration
3. Clear application cache:
   ```bash
   php artisan cache:clear
   php artisan config:clear
   ```

#### Authorization Issues

**Issue**: Permission denied for role operations
**Solution**:
1. Verify gates are defined in `AuthServiceProvider.php`
2. Check if user has required role permissions
3. Ensure permissions are properly seeded

**Issue**: Sidebar menu not staying open
**Solution**: The NavMain component has been updated to keep parent menus open when child routes are active.

#### User Management Issues

**Issue**: Cannot create/edit users
**Solution**:
1. Check validation rules in controller
2. Verify role exists and is active
3. Check database constraints

**Issue**: User list not loading
**Solution**:
1. Check if user has `users.view` permission
2. Verify database connection
3. Check Laravel logs for errors

### Database Issues

#### Migration Problems
```bash
# Reset and migrate
php artisan migrate:fresh --seed

# Or run specific seeder
php artisan db:seed --class=RolePermissionSeeder
```

#### Permission Sync Issues
```bash
# Clear all caches
php artisan optimize:clear

# Rebuild role permissions
php artisan db:seed --class=RolePermissionSeeder --force
```

### Frontend Issues

#### TypeScript Errors
```bash
# Check types
npm run types

# Fix linting issues  
npm run lint
```

#### Component Not Loading
1. Check import paths
2. Verify component exports
3. Check browser console for errors

### Logging and Debugging

#### Enable Debug Mode
```env
APP_DEBUG=true
LOG_LEVEL=debug
```

#### Check Logs
```bash
tail -f storage/logs/laravel.log
```

#### Database Query Logging
Add to `AppServiceProvider.php`:
```php
public function boot()
{
    if (app()->environment('local')) {
        DB::listen(function ($query) {
            Log::info($query->sql, $query->bindings);
        });
    }
}
```

---

## Conclusion

This documentation covers the complete authentication and authorization system implemented in the MIMS project. The system provides:

- **Secure Authentication**: Complete auth flow with email verification
- **Flexible Authorization**: Role-based access control with granular permissions  
- **User Management**: Full CRUD operations with advanced filtering and search
- **Role Management**: Dynamic role creation with permission assignment
- **Security Features**: Multiple layers of protection and validation
- **Developer Experience**: Well-structured, maintainable codebase

For additional support or feature requests, please refer to the project repository or contact the development team.

---

*Last Updated: $(date)*
*Version: 1.0.0*