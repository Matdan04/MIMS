# State Management Documentation

This document outlines the current state management patterns implemented in the MIMS (Management Information System) application.

## Overview

The application uses a **custom hook-based state management** approach built on top of React's built-in state management primitives and Inertia.js for server-client synchronization.

## State Management Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌─────────────────┐
│   Components    │────│   Custom Hooks   │────│  Inertia.js     │
│                 │    │                  │    │                 │
│ - User Pages    │    │ - useUserTable   │    │ - Server State  │
│ - Role Pages    │    │ - useUserForm    │    │ - Route Mgmt    │
│ - Forms         │    │ - useRoleTable   │    │ - Persistence   │
│ - Tables        │    │ - useRoleForm    │    │                 │
└─────────────────┘    │ - useAppearance  │    └─────────────────┘
                       │ - useUserActions │
                       │ - useRoleActions │
                       └──────────────────┘
```

## Current State Management Patterns

### 1. Theme/Appearance State Management

**File**: `resources/js/hooks/use-appearance.tsx`

```typescript
export function useAppearance() {
    const [appearance, setAppearance] = useState<Appearance>('system');
    
    const updateAppearance = useCallback((mode: Appearance) => {
        setAppearance(mode);
        localStorage.setItem('appearance', mode);
        setCookie('appearance', mode);
        applyTheme(mode);
    }, []);
    
    return { appearance, updateAppearance } as const;
}
```

**State Storage Layers**:
- **React State**: Component-level theme state
- **LocalStorage**: Client-side persistence
- **Cookies**: SSR persistence
- **DOM Classes**: CSS theme application

**Usage Pattern**:
```typescript
const { appearance, updateAppearance } = useAppearance();
```

### 2. Table State Management

**Files**: 
- `resources/js/hooks/use-user-table.tsx`
- `resources/js/hooks/use-role-table.tsx`

**State Structure**:
```typescript
interface TableState {
    // Filter states
    search: string;
    selectedRole: string;     // Users only
    selectedStatus: string;
    sorting: SortingState;
    
    // Table instance
    table: Table<T>;
    columns: ColumnDef<T>[];
}
```

**State Synchronization**:
- **Local State**: Filter inputs and sorting
- **URL State**: Query parameters via Inertia.js router
- **Server State**: Data fetching and persistence

**Implementation Pattern**:
```typescript
export function useUserTable({ users, filters }: UseUserTableProps) {
    // Local state for form inputs
    const [search, setSearch] = useState(filters.search || '');
    const [sorting, setSorting] = useState<SortingState>(() => {
        // Initialize from URL parameters
    });
    
    // Sync with server on changes
    useEffect(() => {
        router.get('/admin/users', {
            search: search || undefined,
            sort_by: sortingState?.id || undefined,
            // ... other params
        }, {
            preserveState: true,
            replace: true,
        });
    }, [sorting, search, /* ... */]);
    
    return {
        table,
        search, setSearch,
        handleSearch,
        handleReset,
        // ...
    };
}
```

### 3. Form State Management

**Files**: 
- `resources/js/hooks/use-user-form.tsx`
- `resources/js/hooks/use-role-form.tsx`

**Inertia.js Form Pattern**:
```typescript
export function useUserForm({ initialData, roles, isEditing }: UseUserFormProps) {
    const { data, setData, post, put, processing, errors, reset } = useForm<UserFormData>({
        name: '',
        email: '',
        // ... default values
        ...initialData,
    });
    
    const handleSubmit = (e: React.FormEvent, userId?: string) => {
        e.preventDefault();
        
        if (isEditing && userId) {
            put(`/admin/users/${userId}`);
        } else {
            post('/admin/users');
        }
    };
    
    const updateField = (field: string, value: any) => {
        setData(field as keyof UserFormData, value);
    };
    
    return {
        data,
        updateField,
        handleSubmit,
        processing,
        errors,
        // ...
    };
}
```

**Form State Features**:
- **Automatic validation** error handling
- **Loading states** via `processing`
- **Optimistic updates** with error rollback
- **Field-level updates** with type safety

### 4. Action State Management

**Files**: 
- `resources/js/hooks/use-user-actions.tsx`
- `resources/js/hooks/use-role-actions.tsx`

**Action Pattern**:
```typescript
export function useUserActions() {
    const handleToggleStatus = (user: User) => {
        router.patch(`/admin/users/${user.id}/toggle-status`, {}, {
            preserveScroll: true,
        });
    };
    
    const handleDelete = (user: User) => {
        if (confirm(`Are you sure you want to delete ${user.name}?`)) {
            router.delete(`/admin/users/${user.id}`, {
                preserveScroll: true,
            });
        }
    };
    
    return { handleToggleStatus, handleDelete };
}
```

## State Management Layers

### 1. **Component State** (useState)
- **Purpose**: Local component state, form inputs, UI toggles
- **Scope**: Single component
- **Examples**: Search inputs, modal visibility, form fields

### 2. **Custom Hooks** (Shared Logic)
- **Purpose**: Reusable stateful logic across components
- **Scope**: Multiple components
- **Examples**: Table management, form handling, actions

### 3. **URL State** (Inertia.js Router)
- **Purpose**: Shareable and persistent state via URL parameters
- **Scope**: Application-wide
- **Examples**: Filters, pagination, sorting

### 4. **Server State** (Laravel Backend)
- **Purpose**: Data persistence and business logic
- **Scope**: Application-wide
- **Examples**: User data, roles, permissions

### 5. **Browser Storage**
- **LocalStorage**: Theme preferences, user settings
- **Cookies**: SSR data, authentication tokens

## Data Flow Patterns

### 1. **Server-to-Client Flow**
```
Laravel Controller → Inertia Response → React Component → Custom Hook → Component State
```

### 2. **Client-to-Server Flow**
```
User Action → Custom Hook → Inertia Request → Laravel Controller → Database
```

### 3. **State Synchronization Flow**
```
Local State Change → URL Update → Server Request → Fresh Data → State Update
```

## Best Practices Implemented

### 1. **Separation of Concerns**
- **Hooks**: Business logic and state management
- **Components**: UI rendering and user interaction
- **Actions**: Server communication

### 2. **Type Safety**
```typescript
interface UseUserTableProps {
    users: User[];
    filters: {
        search?: string;
        role?: string;
        status?: string;
        sort_by?: string;
        sort_direction?: 'asc' | 'desc';
    };
}
```

### 3. **Performance Optimization**
- **useMemo**: Memoized table columns
- **useCallback**: Stable function references
- **Lazy state initialization**: URL parameter parsing

### 4. **Error Handling**
- **Form validation**: Automatic error display
- **Optimistic updates**: Rollback on failure
- **User confirmations**: Delete operations

### 5. **URL Synchronization**
- **preserveState**: Maintain scroll position
- **replace**: Clean URL history
- **Debounced updates**: Avoid excessive requests

## Trade-offs of Current Approach

### ✅ **Advantages**
- **Simple to understand**: No external dependencies
- **Type-safe**: Full TypeScript support
- **Inertia.js integration**: Seamless server-client sync
- **Performance**: Minimal bundle size
- **Flexibility**: Easy to customize per component

### ⚠️ **Potential Limitations**
- **State duplication**: Similar patterns across hooks
- **No global state**: Limited cross-component communication
- **Manual synchronization**: URL ↔ State sync requires careful handling
- **Testing complexity**: Mocking Inertia.js router

## Migration Considerations

If you need to scale to a more complex state management solution:

### **Zustand Migration Path**
```typescript
// Current
const [search, setSearch] = useState('');

// With Zustand
const { search, setSearch } = useUserTableStore();
```

### **React Context Migration Path**
```typescript
// Current
const { handleToggleStatus } = useUserActions();

// With Context
const { userActions } = useAppContext();
```

### **TanStack Query Migration Path**
```typescript
// Current
const { users } = usePage().props;

// With React Query
const { data: users } = useUsers(filters);
```

## File Structure

```
resources/js/hooks/
├── use-appearance.tsx        # Theme management
├── use-user-table.tsx       # User table state
├── use-user-form.tsx        # User form state
├── use-user-actions.tsx     # User actions
├── use-role-table.tsx       # Role table state
├── use-role-form.tsx        # Role form state
├── use-role-actions.tsx     # Role actions
├── use-mobile.tsx           # Mobile state
└── use-mobile-navigation.ts # Mobile navigation
```

## Usage Examples

### **Table Implementation**
```typescript
// In component
function UsersIndex({ users, filters, roles }) {
    const {
        table,
        search, setSearch,
        selectedRole, setSelectedRole,
        handleSearch,
        handleReset
    } = useUserTable({ users, filters });
    
    return (
        <div>
            <input value={search} onChange={(e) => setSearch(e.target.value)} />
            <Table table={table} />
        </div>
    );
}
```

### **Form Implementation**
```typescript
// In component
function UserCreate({ roles }) {
    const {
        data,
        updateField,
        handleSubmit,
        processing,
        errors
    } = useUserForm({ roles });
    
    return (
        <form onSubmit={(e) => handleSubmit(e)}>
            <input 
                value={data.name} 
                onChange={(e) => updateField('name', e.target.value)}
            />
            {errors.name && <span>{errors.name}</span>}
        </form>
    );
}

```

This architecture provides a solid foundation for state management while maintaining simplicity and leveraging the strengths of Inertia.js for server-client synchronization.