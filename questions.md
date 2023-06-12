# Part 2: Questions and Answers

#### **Q1. The difference between a Component and a PureComponent in React is in how they handle the shouldComponentUpdate lifecycle method.**

A Component is a React reusable and independent bits of code in the App having reactivity based upon the state and props. It performs shallow comparison of props and state to determine if it should re-render. If any of the props or state values have changed, even if the actual values are the same, the component will re-render. This can potentially lead to unnecessary re-renders and impact performance.

On the other hand, a PureComponent performs also a shallow comparison of `props` and `state` but only re-renders if there are actual values changes (in case of objects, references are compared not the values in the object). It implements a default shouldComponentUpdate method that optimizes rendering by avoiding re-rendering when props and state remain unchanged.

**Example where it might break your app**:

Since, Pure component does shallow comparison, it will not not detect changes within that object or array but only the references of these. So, in case if values are changed within `Object` or `Array`, it will not detect unless a value comes with a new reference. In such cases, even if the underlying data has changed, a PureComponent might not re-render the component, leading to incorrect rendering or stale data being displayed.

That's why in redux or other state management operations, we follow the role of immutability and create a new reference by `{...state, [changedKey]: changedValue}` or `[...array, newValue]`. Same is true for functional hooks like `useState`.

---

#### **Q2: Context + ShouldComponentUpdate might be dangerous. Why is that?.**

Since method `ShouldComponentUpdate` is not affected by changes in context, it will not get triggered with the change in context value. Hence, it can lead to incorrect stale data being displayed in the component if it relies on the context.

Solution would be to use `useContext` with `FunctionalComponent` for better cohesiveness.

---

#### **Q3: 3 ways to pass information from a component to its parent:**

- `Using Callbacks:`

  Parent component can pass the callbacks to the child component e.g. `setData = (data: any) => void;`. In this way, Child component will call the callback and pass the data to the parent component.

- `Using State Management`:

  if we want to update the data not in just one parent component or not in immediate parent component, it is better to use the State Management tools like `Context API` or `Redux`. It is also useful to prevent `Prop Drilling`.

- `Using Event Listeners`:

  We can define the event listeners in parent and emit the events in the child. In this way, we will be to pass data from child to parent.

---

#### **Q4: 2 ways to prevent components from re-rendering:**

- Using the `shouldComponentUpdate` lifecycle method:

  We can use the `shouldComponentUpdate` method to determine whether the component should be updated or not based upon `true` or `fasle` response. We can evaluate it using computing certain conditions tailored to the component.

- Using `React.memo` (for functional components) or `React.PureComponent` (for class components):

  We can use HOCs provided by React that perform a shallow comparison of props and prevent re-rendering if the props have not changed.

---

#### **Q5: What is a fragment and why do we need it? Give an example where it might break my app:**

A fragment is a built-in feature in React that allows us to group multiple elements without adding an additional parent element to the DOM.

```javascript
const Component = () => (
  <>
    <C1 />
    <C2 />
  </>
);
```

As shown above, it's useful when we need to return multiple elements without using unnecessary element as a wrapper or container. `Fragments doesn't show up in the DOM`.

**Example where it might break your app:**

CSS selectors often rely on a parent element to target specific child elements. Without a parent container introduced by a fragment, CSS selectors might not work as expected.

---

#### **Q6: 3 examples of the HOC (Higher Order Component) pattern:**

- `withAuth`:

  A higher-order component that wraps a component and adds authentication-related functionalities, such as checking if the user is logged in, redirecting to a login page if not.

  ```javascript
  // HOC

  const withAuth = (Component) => {
  const WithAuth = {
      // Add authentication logic here

      render() {
      return <Component {...this.props} />;
      }
  }

  return WithAuth;
  };


  export default withAuth;

  // Component
  const UserDashboard = {
      ...
  };

  export default useAuth(UserDashboard, {...customAttributes});
  ```

- `withUser`:

  A higher-order component that wraps a component that fetches data from the REST and add as props to the component if the user is loggedIn.

- `withLogging` :

  HOC logs the mounting and unmounting of the wrapped component. It provides a way to monitor the lifecycle of components and can be useful for debugging or tracking component behavior. (Just a use case)

---

#### **7. What's the difference in handling exceptions in promises, callbacks and async...await?:**

- **Promises:**

  Whenever, we create a new promise manually, we are given two params, `resolve` and `reject`. If operation inside the promise works fine, we can `resolve` it with some data to passed here which would be positive response or `reject` if it fails which would be termed as error.

  When executing this promise, we can handle exceptions/errors in the `.catch()` callback.

- **Callbacks:**

  In callback-based asynchronous operations, we handle exceptions/errors by evaluating the callback props. Usually, a callback has `data` and `error` arguments. After having basic checks, we can handle exceptions/errors.

- **Async/await:**

  Async/await is a syntactic sugar on top of promises. Error handling in async/await is done using a `try-catch` block. Within the try block, we can write our asynchronous code using await to pause execution until the promise is resolved or rejected. If an error occurs, the control flow will jump to the catch block, where you can handle the error

  Just like I did in Home Assignment:

  ```javascript
  try {
      ...
      const response = await fetch(url.toString());
      const products = await response.json();
      } catch (error) {
      console.error('Error fetching products:', error);
      }
  ```

---

#### **8. How many arguments does setState take and why is it async:**

- `setState` takes two arguments. The first argument can be the value with which we want to update the current state or a callback function that receives the previous state and returns the updated state. The second argument is an optional callback function that is invoked after the state has been updated and the component has re-rendered.

- `setState` is asynchronous because React batches state updates for performance reasons. When multiple `setState` calls are made within the same synchronous event handler or lifecycle method, `React` batches them together and performs a single update to the component's state and triggers a single re-render. This helps avoid unnecessary re-renders and improves performance. As a result, the state update may not be immediately reflected when calling setState, and accessing stateValue immediately after calling `setState` may not reflect the updated state value.

---

#### **9. List the steps needed to migrate a Class to Function Component:**

We can migrate from the class Component to a functional component by:

- Replacing the class declaration with a function declaration.
  ```javascript
  class ClassComponent extends React.Component {...}
  // =>
  const FunctionalComponent = ({ ... }) => {}
  ```
- Update any references to this.props with the component's destructured props.
- Replace the `this.state` and `this.setState` references with the `useState` hook.
- Remove the constructor method and any class-related code that is no longer needed.

- Replace the class methods with regular functions.
- Replace the lifecycle methods (`componentDidMount`, `componentDidUpdate`, `componentWillUnmount`) with `useEffect` hooks.
- Move any reusable logic into custom hooks.

- Remove the render method while keeping the return statement and needed code.

---

#### **10. List a few ways styles can be used with components:**

Ways styles can be used with components:

- Inline styles:

  We can apply styles directly to an element by providing an object to styles in the element. Such as:

  ```html
  <div style={{ color: 'red', fontSize: '16px' }}>
      Inline styled div
  </div>.
  ```

- CSS classes:

  We can define CSS classes and apply them to components using the `className` prop. We can define CSS classes in separate `CSS` or `SCSS` files and import into our components. Besides, we can also use some libraries around CSS classes like `Tailwind CSS` or `Bootstrap` providing utility classes.

- CSS-in-JS libraries:

  We can use CSS-in-JS libraries such as `StyledComponents` and `MaterialUI`

#### **11. How to render an HTML string coming from the server:**

We can render HTML string using the following:

```javascript
<div
  className={styles.description}
  dangerouslySetInnerHTML={{ __html: description }}
/>
```
