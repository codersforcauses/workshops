## Quick Links and References
- [Typescript Handbook](https://www.typescriptlang.org/docs/handbook/2/basic-types.html)
- [Total Typescript (In Depth)](https://www.totaltypescript.com/books/total-typescript-essentials)
- [Cheatsheets](https://www.typescriptlang.org/cheatsheets/)

---

## Some Problems With Javascript
Javascript is critical to web development but poses some challenges to developers working on large projects. 
- Runtime issues (errors and undefined)
- Lack of developer tooling (type annotations, refactoring)

---

## Static Types, The Missing Piece
Static types allow for strong tooling and developer confidence
- Autocomplete
- Runtime error and undefined warnings
- Refactoring and IDE Tools (Imports, Quick fixes)

---

## Core Typescript Concepts

### Typescript In The Wild

<details>
  <summary>Spot the Typescript</summary>
    ```typescript
    interface UserProfile {
        id: number;
        name: string;
        email?: string;
        preferences: {
            theme: "dark" | "light";
            notifications: boolean | null;
        };
    }

    function getUserProfile(userId: number): UserProfile {
        const profiles: UserProfile[] = [
            { id: 1, name: "Alice", email: "alice@example.com", preferences: { theme: "dark", notifications: true } },
            { id: 2, name: "Bob", preferences: { theme: "light", notifications: null } },
        ];

        let profile = profiles.find((p) => p.id === userId);
        if (!profile) {
            profile = {
                id: userId,
                name: `Guest-${userId}`,
                preferences: { theme: "light", notifications: null },
            };
        }

        return profile;
    }

    function getActiveUsers(userProfiles: UserProfile[]): UserProfile[] {
        const active: UserProfile[] = userProfiles.filter(
            (user) => user.preferences.notifications === true && !!user.email
        );

        return active;
    }

    const users: UserProfile[] = [
        { id: 1, name: "Alice", email: "alice@example.com", preferences: { theme: "dark", notifications: true } },
        { id: 2, name: "Bob", preferences: { theme: "light", notifications: null } },
        { id: 3, name: "Charlie", email: "charlie@example.com", preferences: { theme: "dark", notifications: false } },
    ];

    const activeUsers = getActiveUsers(users);

    function logUserNames(users: UserProfile[]): void {
        users.forEach((user) => {
            console.log(user.name || "Unknown User");
        });
    }

    logUserNames(activeUsers);
    ```
</details>

- Variable annotations
- Interfaces
- Arrays
- Optional and null
- Functions
- Union

### Basic Types

| Type           | Description                                  | Example                                                                   |
|----------------|----------------------------------------------|---------------------------------------------------------------------------|
| **`string`**   | Represents text data.                        | `let name: string = "Alice";`                                             |
| **`number`**   | Represents numeric values.                   | `let age: number = 30;`                                                   |
| **`boolean`**  | Represents true/false values.                | `let isActive: boolean = true;`                                           |
| **`array`**    | Represents a collection of values.           | `let items: number[] = [1, 2, 3];`                                        |
| **`object`**   | Represents a collection of key-value pairs.  | `let person: { name: string; age: number; } = { name: "Alice", age: 30 };`|
| **`null`**     | Represents an explicitly empty value.        | `let value: null = null;`                                                 |
| **`undefined`**| Represents an uninitialized variable.        | `let value: undefined = undefined;`                                       |
| **`any`**      | Allows any type (used sparingly).            | `let data: any = "text"; data = 42; data = true;`                         |
| **`tuple`**    | Represents an array with fixed types.        | `let tuple: [string, number] = ["Alice", 30];`                            |
| **`enum`**     | Represents named constants.                  | `enum Status { Active, Inactive } let s: Status = Status.Active;`         |
| **`void`**     | Represents no return value from a function.  | `function log(message: string): void { console.log(message); }`           |
| **`never`**    | Represents a function that never returns.    | `function error(msg: string): never { throw new Error(msg); }`            |

### Type Aliases
```typescript
type ID = number | string;
let productId: ID = "123-abc";
```

### Type Inference
```typescript
let selectedUser = null;

selectedUser = { name: 'Bob', }
```

### Functions
```typescript
function add(a: number, b: number): number {
    return a + b;
}
```

### Objects and Interfaces
```typescript
type Name = {
    first: string,
    last: string,
}

interface User {
    id: number;
    name: string;
    isActive: boolean;
}

let user: User = { id: 1, name: "Alice", isActive: true };
```

### Arrays and Inline Objects
```typescript
type StringArray = string[];
type NumberArray = Array<number>;
type ObjectWithNameArray = Array<{ name: string }>;
```

### Generics

---

## Typescript In The IDE vs Browser

### Compiling For The Web
Typescript uses the Typescript compiler (`tsc`) to transform Typescript into Javascript which can be run on the web.
While applying this transformation it will check for issues and report them while compiling. 

### Local Development
Checking your code from the command line constantly would be tedious. IDEs come with language servers that run checks in real time using the Typescript compiler.
`tsconfig.json` is a common file you will see in all Typescript projects that configures how the Typescript server runs and gives it information about your project.
Typescript can then be used with other build tools to bundle and compile your Typescript into something suitable for the browser.

---

## Thinking About Types

### Help Yourself, Help Others
It's very easy to write "loose" types in Typescript. 
```typescript
    type file = any;
    // vs 
    type file = string
    // vs
    type file = `${string}.png`
```

```typescript
    interface User {
        name: string;
        age: number;
        email: string;
    }

    const user = { name: "Bob", age: 54 } as User;
```

```typescript
const getFirstElement = (arr: any[]) => {
  return arr[0];
};

const first = getFirstElement([1, 2, 3]);
```

`first` is typed as `any`

```typescript
const getFirstElement = <T>(arr: T[]) => {
  return arr[0];
};

const firstNumber = getFirstElement([1, 2, 3]);

const firstString = getFirstElement(["a", "b", "c"]);
```