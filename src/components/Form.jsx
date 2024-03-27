import React from "react";
import { useState } from "react";
//L3: Forms: in this case we want a form to select the qty of items we will take, an input field to enter the item we want and a submit
//button to add the item to the list
export const Form = ({ onAddItems }) => {
  //L5: Controlled Elements and working with forms: all input fields maintain their own state inside the DOM (inside the HTML element itself), that's why with React
  //we want to change that and have the inputs have their own states inside React app and not inside DOM. So with controlled elements it's React who controls and owns the
  //state of the input fields so whenever they change we can maintain them in sync. Steps:
  //1. Define the piece of state with useState:  const [description, setDescription] = useState("");
  //2. We use that piece of state in the element we want to control (we force the elem to always take the value of the state variable) , so in the input, set  the value property: value={description}
  //3.Finally, we update the state variable, so on the input, set the onChange property to update the state to the new entered value (otherwise React will always set the input to value=description which we have set as ""):
  // onChange={(e) => setDescription(e.target.value)}    where e.target is the entire input field and the value is the value entered in it
  // Remember: value and onChange props go together.

  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState(1);

  const handleSubmit = (e) => {
    e.preventDefault(); //HTML normal behaviour is to reload the page when form is submitted but we don't need that. "e" is the event object, so an object with all the information from the current event
    if (!description) return; // if no item entered in the input field, nothing happens.

    const newItem = { description, quantity, packed: false, id: Date.now() };

    onAddItems(newItem);

    setDescription("");
    setQuantity("");
  };

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      {/*form onSubmit={} vs button onClick={} --> we could use one or the other. But it's better to leverage html submit form. 
      With onSubmit it will work either when clicking the button and when pressing Enter,
      while if we add onClick to the button, it will just work when user clicks button add*/}
      <h3>What do you need for your trip?</h3>
      {/*L4: Dynamically create an array of option elements to select from (Array from + map).
       It's the same as writting manually
        <select><option value={1}>1</option>
        <option value={2}>3</option>
        <option value={3}>3</option>
        etc...</select>
        Remember that when rendering a list we need to give the elements a unique key property.
         */}
      <select
        value={quantity}
        onChange={(e) => setQuantity(Number(e.target.value))}
      >
        {/*We need to use Number() cause target.value converts to string and we set our initial state as number, 1*/}
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        placeholder="Item..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <button>Add</button>
    </form>
  );
};
