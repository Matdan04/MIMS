# MIMS Documentation

This directory contains comprehensive documentation for the Management Information Management System (MIMS) authentication and authorization features.

## Documentation Overview

### 📚 [AUTH_SYSTEM.md](./AUTH_SYSTEM.md)
Complete documentation covering:
- **Authentication System**: Login, registration, password reset, email verification
- **Authorization System**: Role-based access control, gates, permissions
- **User Management**: CRUD operations, filtering, search, status management
- **Roles & Permissions**: Role creation, permission assignment, security features
- **API Reference**: Complete endpoint documentation with examples
- **Security Features**: Best practices and security implementations
- **Troubleshooting**: Common issues and solutions

### 🚀 [QUICK_REFERENCE.md](./QUICK_REFERENCE.md)
Quick reference guide containing:
- Setup instructions
- Key routes and permissions
- Code examples
- Component usage
- Troubleshooting commands
- File structure reference
- Security checklist

## Features Documented

### ✅ Authentication Features
- User registration with email verification
- Secure login/logout functionality  
- Password reset flow
- Remember me functionality
- Session management

### ✅ Authorization Features  
- Role-based access control (RBAC)
- Granular permission system
- Gate-based authorization
- Middleware protection
- Real-time permission checking

### ✅ User Management
- Complete CRUD operations
- Advanced search and filtering
- Role assignment
- Status management (active/inactive)
- Bulk operations
- Data export capabilities

### ✅ Roles & Permissions Management
- Dynamic role creation
- Permission assignment by module
- Bulk permission operations
- Role hierarchy
- System role protection
- Permission auditing

## Technology Stack

- **Backend**: Laravel 11 with Inertia.js
- **Frontend**: React 19 with TypeScript
- **UI Framework**: Radix UI + Tailwind CSS
- **Database**: MySQL/PostgreSQL
- **Authentication**: Laravel Breeze (enhanced)
- **State Management**: Inertia.js forms

## Quick Start

1. **Read the comprehensive guide**: Start with [AUTH_SYSTEM.md](./AUTH_SYSTEM.md)
2. **For quick setup**: Use [QUICK_REFERENCE.md](./QUICK_REFERENCE.md)
3. **Run the seeders**: `php artisan db:seed --class=RolePermissionSeeder`
4. **Access admin panel**: Navigate to `/admin/users` or `/admin/roles`

## Default Access

After running seeders, you can access the system with:

### Super Admin User
- **Email**: As configured in your seeder
- **Permissions**: Full system access
- **Routes**: All admin routes available

### Test Users
The seeder creates default roles. You can create test users for each role to test different permission levels.

## Security Notes

This documentation includes security best practices implemented in the system:

- CSRF protection on all forms
- Authorization checks at multiple layers
- Input validation and sanitization
- Secure password handling
- Session security
- Database integrity constraints
- XSS protection
- SQL injection prevention

## Support

For issues or questions:

1. Check the [Troubleshooting section](./AUTH_SYSTEM.md#troubleshooting)
2. Review the [Quick Reference](./QUICK_REFERENCE.md) for common solutions
3. Check Laravel logs: `storage/logs/laravel.log`
4. Verify permissions are properly seeded

## Contributing

When adding new features to the auth system:

1. Update the relevant documentation
2. Add new permissions to the seeder
3. Update the AuthServiceProvider with new gates
4. Add API documentation for new endpoints
5. Update the security checklist if needed

---

*This documentation covers the authentication, authorization, user management, and roles & permissions system implemented in MIMS.*