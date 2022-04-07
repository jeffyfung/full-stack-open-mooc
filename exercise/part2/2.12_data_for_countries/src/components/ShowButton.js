const ShowButton = ({ targetCountry, handleClick }) => (
  <button type="button" onClick={(event) => handleClick(targetCountry)}>show</button>
)

export default ShowButton