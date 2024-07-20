const ItemsNotFound = (props) => {
  const { name } = props;

  return (
    <div className="items-not-found">
      <p>"{name}" does not found in the list.</p>
    </div>
  );
};

export default ItemsNotFound;
