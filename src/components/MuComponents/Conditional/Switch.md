# Custom Switch Component

The custom `Switch` component is designed to render the first child whose condition is true, or the default child if no condition is true.

## `Switch`

```tsx
import { Switch,Case,Default } from "@/MuLearnComponents/Conditional/Switch"; // Import the Switch component

// Usage
<Switch>
  <Case condition={true}>Content A</Case>
  <Case condition={false}>Content B</Case>
  <Default>Default Content</Default>
</Switch>
