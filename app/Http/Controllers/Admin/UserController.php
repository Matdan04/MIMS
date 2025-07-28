<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Role;
use Illuminate\Foundation\Auth\Access\AuthorizesRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class UserController extends Controller
{
    use AuthorizesRequests;
    public function index(Request $request)
    {
        $this->authorize('users.view');

        $query = User::with('role')
            ->when($request->search, function ($query, $search) {
                $query->where(function ($q) use ($search) {
                    $q->where('name', 'like', "%{$search}%")
                      ->orWhere('email', 'like', "%{$search}%")
                      ->orWhere('phone', 'like', "%{$search}%");
                });
            })
            ->when($request->role, function ($query, $role) {
                $query->whereHas('role', function ($q) use ($role) {
                    $q->where('name', $role);
                });
            })
            ->when($request->status !== null, function ($query) use ($request) {
                $query->where('is_active', $request->status === 'active');
            });

        // Handle sorting
        if ($request->sort_by && $request->sort_direction) {
            $sortBy = $request->sort_by;
            $sortDirection = $request->sort_direction;
            
            if ($sortBy === 'user') {
                $query->orderBy('name', $sortDirection);
            } elseif ($sortBy === 'role') {
                $query->leftJoin('roles', 'users.role_id', '=', 'roles.id')
                      ->orderBy('roles.display_name', $sortDirection)
                      ->select('users.*');
            } elseif ($sortBy === 'status') {
                $query->orderBy('is_active', $sortDirection);
            } else {
                $query->orderBy($sortBy, $sortDirection);
            }
        } else {
            $query->latest();
        }

        $users = $query->paginate(3)->withQueryString();

        return Inertia::render('Admin/Users/Index', [
            'users' => $users,
            'roles' => Role::where('is_active', true)->get(['id', 'name', 'display_name']),
            'filters' => $request->only(['search', 'role', 'status', 'sort_by', 'sort_direction']),
        ]);
    }

    public function create()
    {
        $this->authorize('users.create');

        return Inertia::render('Admin/Users/Create', [
            'roles' => Role::where('is_active', true)->get(['id', 'name', 'display_name']),
        ]);
    }

    public function store(Request $request)
    {
        $this->authorize('users.create');

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'phone' => ['nullable', 'string', 'max:20'],
            'password' => ['required', 'string', 'min:8', 'confirmed'],
            'role_id' => ['required', 'exists:roles,id'],
            'is_active' => ['boolean'],
            'additional_permissions' => ['nullable', 'array'],
        ]);

        $validated['password'] = Hash::make($validated['password']);
        $validated['is_active'] = $validated['is_active'] ?? true;

        $user = User::create($validated);

        return redirect()->route('admin.users.index')->with('success', 'User created successfully.');
    }

    public function show(User $user)
    {
        $this->authorize('users.view');

        $user->load('role');

        return Inertia::render('Admin/Users/Show', [
            'user' => $user,
        ]);
    }

    public function edit(User $user)
    {
        $this->authorize('users.edit');

        $user->load('role');

        return Inertia::render('Admin/Users/Edit', [
            'user' => $user,
            'roles' => Role::where('is_active', true)->get(['id', 'name', 'display_name']),
        ]);
    }

    public function update(Request $request, User $user)
    {
        $this->authorize('users.edit');

        $validated = $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', Rule::unique('users')->ignore($user->id)],
            'phone' => ['nullable', 'string', 'max:20'],
            'password' => ['nullable', 'string', 'min:8', 'confirmed'],
            'role_id' => ['required', 'exists:roles,id'],
            'is_active' => ['boolean'],
            'additional_permissions' => ['nullable', 'array'],
        ]);

        if (!empty($validated['password'])) {
            $validated['password'] = Hash::make($validated['password']);
        } else {
            unset($validated['password']);
        }

        $user->update($validated);

        return redirect()->route('admin.users.index')->with('success', 'User updated successfully.');
    }

    public function destroy(User $user)
    {
        $this->authorize('users.delete');

        // Prevent deletion of super admin users
        if ($user->isSuperAdmin()) {
            return back()->with('error', 'Cannot delete super admin users.');
        }

        // Prevent users from deleting themselves
        if ($user->id === Auth::id()) {
            return back()->with('error', 'Cannot delete your own account.');
        }

        $user->delete();

        return redirect()->route('admin.users.index')->with('success', 'User deleted successfully.');
    }

    public function toggleStatus(User $user)
    {
        $this->authorize('users.activate');

        // Prevent deactivating super admin users
        if ($user->isSuperAdmin()) {
            return back()->with('error', 'Cannot deactivate super admin users.');
        }

        // Prevent users from deactivating themselves
        if ($user->id === Auth::id()) {
            return back()->with('error', 'Cannot deactivate your own account.');
        }

        $user->update(['is_active' => !$user->is_active]);

        $status = $user->is_active ? 'activated' : 'deactivated';
        return back()->with('success', "User {$status} successfully.");
    }
}