<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Role;
use App\Models\Permission;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class RoleController extends Controller
{
    use AuthorizesRequests;

    public function index(Request $request)
    {
        $this->authorize('roles.view');

        $query = Role::withCount(['users', 'permissions'])
            ->when($request->search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                      ->orWhere('display_name', 'like', "%{$search}%")
                      ->orWhere('description', 'like', "%{$search}%");
                });
            })
            ->when($request->status !== null, function ($query) use ($request) {
                $query->where('is_active', $request->status === 'active');
            });

        // Handle sorting
        if ($request->sort_by && $request->sort_direction) {
            $sortBy = $request->sort_by;
            $sortDirection = $request->sort_direction;
            
            if (in_array($sortBy, ['name', 'display_name', 'is_active', 'created_at'])) {
                $query->orderBy($sortBy, $sortDirection);
            } elseif ($sortBy === 'users_count') {
                $query->orderBy('users_count', $sortDirection);
            } elseif ($sortBy === 'permissions_count') {
                $query->orderBy('permissions_count', $sortDirection);
            }
        } else {
            $query->latest();
        }

        $roles = $query->paginate(10)->withQueryString();

        return Inertia::render('Admin/Roles/Index', [
            'roles' => $roles,
            'filters' => $request->only(['search', 'status', 'sort_by', 'sort_direction']),
        ]);
    }

    public function create()
    {
        $this->authorize('roles.create');

        $permissions = Permission::all()->groupBy('module');

        return Inertia::render('Admin/Roles/Create', [
            'permissions' => $permissions,
        ]);
    }

    public function store(Request $request)
    {
        $this->authorize('roles.create');

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255', 'unique:roles', 'regex:/^[a-z_]+$/'],
            'display_name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:500'],
            'is_active' => ['boolean'],
            'permissions' => ['nullable', 'array'],
            'permissions.*' => ['exists:permissions,id'],
        ]);

        $validated['is_active'] = $validated['is_active'] ?? true;

        $role = Role::create($validated);

        if (!empty($validated['permissions'])) {
            $role->permissions()->attach($validated['permissions']);
        }

        return redirect()->route('admin.roles.index')->with('success', 'Role created successfully.');
    }

    public function show(Role $role)
    {
        $this->authorize('roles.view');

        $role->load(['permissions', 'users:id,name,email']);

        return Inertia::render('Admin/Roles/Show', [
            'role' => $role,
        ]);
    }

    public function edit(Role $role)
    {
        $this->authorize('roles.edit');

        $role->load('permissions');
        $permissions = Permission::all()->groupBy('module');

        return Inertia::render('Admin/Roles/Edit', [
            'role' => $role,
            'permissions' => $permissions,
        ]);
    }

    public function update(Request $request, Role $role)
    {
        $this->authorize('roles.edit');

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255', Rule::unique('roles')->ignore($role->id), 'regex:/^[a-z_]+$/'],
            'display_name' => ['required', 'string', 'max:255'],
            'description' => ['nullable', 'string', 'max:500'],
            'is_active' => ['boolean'],
            'permissions' => ['nullable', 'array'],
            'permissions.*' => ['exists:permissions,id'],
        ]);

        $role->update($validated);

        // Sync permissions
        if (isset($validated['permissions'])) {
            $role->permissions()->sync($validated['permissions']);
        } else {
            $role->permissions()->detach();
        }

        return redirect()->route('admin.roles.index')->with('success', 'Role updated successfully.');
    }

    public function destroy(Role $role)
    {
        $this->authorize('roles.delete');

        // Prevent deletion if role has users
        if ($role->users()->count() > 0) {
            return back()->with('error', 'Cannot delete role that has assigned users.');
        }

        // Prevent deletion of system roles (optional check)
        if (in_array($role->name, ['super_admin', 'admin'])) {
            return back()->with('error', 'Cannot delete system roles.');
        }

        $role->delete();

        return redirect()->route('admin.roles.index')->with('success', 'Role deleted successfully.');
    }

    public function toggleStatus(Role $role)
    {
        $this->authorize('roles.edit');

        // Prevent deactivating system roles
        if (in_array($role->name, ['super_admin', 'admin'])) {
            return back()->with('error', 'Cannot deactivate system roles.');
        }

        $role->update(['is_active' => !$role->is_active]);

        $status = $role->is_active ? 'activated' : 'deactivated';
        return back()->with('success', "Role {$status} successfully.");
    }
}