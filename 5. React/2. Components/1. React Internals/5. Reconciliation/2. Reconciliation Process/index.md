# Reconciliation Deep Insight

Let's say I've an component with 4 jsx elements inside it. One is div inside it and we have h1 and p elements and button inside that div.

```JavaScript
MyExampleComponent() {
  const [title, setTitle] = React.useState("This is old title");
  const [description, setDescription] = React.useState( "This is the old description" );
  const handleTitleUpdate = () => {
    setTitle("This is new title.");
  };
  return (
    <div>
      <h1>{title}</h1>
      <p>{description}</p>
      <button onClick={handleTitleUpdate}>Update</button>
    </div>
    );
  }
```

When the button is clicked, the state is updated forcing the component to re-render. Until now am I right? Now when the component re-renders, the reconciliation process gets activated. A entire new `vDOM` is created for the whole react tree. The previous vDOM fo the entire react tree gets compared to the new vDOM of the entire react tree and only the title text is updated in the in RealDOM, how? The whole h1 tag in the real DOM gets removed and new h1 tag with the new title gets inserted at the same place or h1 tag remains as it is, only the text content of h1 tag gets removed and new text is inserted? or All the elements within the the MyExampleComponent gets removed and re-inserted into the vDOM and the the RealDOM?

Scenario Recap:
You have a MyExampleComponent with a state (title and description) and a button that updates the state.
When the button is clicked, setTitle updates the title state, causing the component to re-render.
During the re-render, React uses the reconciliation process to update the real DOM.
What Happens During Re-render?

1. **Component Re-renders**: When you click the button, the state (title) changes, triggering a re-render of the component. The render method (or function component return) is called again, and the JSX is re-evaluated, generating a new Virtual DOM.

   ![alt text](image.png)

2. **Reconciliation Process**: React compares the old Virtual DOM with the new one to detect the differences (diffing). It looks at the following:

   - The <div> is the same in both VDOMs, so React knows it doesn’t need to change anything about the <div> in the real DOM.
   - The <h1> tag has a change in its text content ("This is old title" → "This is new title.").
   - The <p> and <button> elements remain unchanged.
   - Key Point: React doesn’t recreate the entire tree of elements; it only looks at the changes and updates only the affected parts.

3. **Updating the Real DOM: When React updates the real DOM**:

   - The h1 tag in the real DOM will not be removed and re-inserted.
     React will only update the text content of the existing h1 element. The tag itself remains intact, and only the content inside it is updated.
   - The p tag and the button tag remain unchanged, and React doesn’t touch them at all in the real DOM.

4. **To Summarize the Flow of Events in Your Example**:
   - State update triggers a re-render: The state (title) is updated, causing React to re-render the component.
   - Reconciliation: React compares the old Virtual DOM with the new one, detecting that only the h1 tag has changed.
   - Efficient DOM update:
     - The h1 tag is updated in place in the real DOM (text content is changed, but the tag is not removed).
     - No re-insertion of elements: The div, p, and button elements are left as they are in the real DOM, as they haven’t changed.
5. **Clarification of Your Confusion**:
   - Only the changed element (h1) is updated in the real DOM.
   - The h1 tag is not removed; only its content is updated.
   - No other elements are affected, and they are not removed or re-inserted into the real DOM.
   - React’s reconciliation algorithm ensures that only the parts of the UI that need to change are updated, rather than re-rendering the entire component and all its child elements. This is what makes React so efficient!
