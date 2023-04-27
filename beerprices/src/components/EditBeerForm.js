import { useState } from 'react';

const EditBeerForm = ({ beer, onSave }) => {
  const [name, setName] = useState(beer.name);
  const [type, setType] = useState(beer.type);
  const [brewery, setBrewery] = useState(beer.brewery);
  const [percentage, setPercentage] = useState(beer.percentage);
  const [hopness, setPrice] = useState(beer.price);

  const handleSubmit = (event) => {
    event.preventDefault()
    onSave({
      ...beer,
      name,
      type,
      brewery,
      percentage,
      price,
    });
  };

  return (
    <form onSubmit={handleSubmit}>
      <label htmlFor="name">Name:</label>
      <input type="text" id="name" value={name} onChange={(event) => setName(event.target.value)} />

      <label htmlFor="type">Type:</label>
      <input type="text" id="type" value={type} onChange={(event) => setType(event.target.value)} />

      <label htmlFor="brewery">Brewery:</label>
      <input type="text" id="brewery" value={brewery} onChange={(event) => setBrewery(event.target.value)} />

      <label htmlFor="percentage">Percentage:</label>
      <input type="number" id="percentage" value={percentage} onChange={(event) => setPercentage(event.target.value)} />

      <label htmlFor="hopness">Hopness:</label>
      <input type="number" id="hopness" value={price} onChange={(event) => setPrice(event.target.value)} />

      <button type="submit">Save</button>
    </form>
  );
};

export default EditBeerForm;
