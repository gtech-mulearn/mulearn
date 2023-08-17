# Conditional Rendering Components

A set of components to facilitate conditional rendering in React applications.

## `If`

### Props

- `condition` (type: `boolean`): The condition to be evaluated.
- `children` (type: `JSX.Element[] | JSX.Element | string`): The JSX elements to be rendered conditionally.

```tsx
import { If, True, False } from "@/MuLearnComponents/Conditional/If"; // Import the Switch component

// Usage
<If condition={true}>
  <True>Render this if condition is true</True>
  <False>Render this if condition is false</False>
</If>

// Other Ways to use

<If condition={true}>
  Render this if condition is true
</If>

```
