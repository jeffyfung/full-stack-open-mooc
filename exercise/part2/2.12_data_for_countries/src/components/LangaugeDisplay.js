const LangaugeDisplay = ({ targetCountry }) => (
  <div>
    <h3>languages</h3>
    <ul>
      {Object.entries(targetCountry.languages).map(([k, v]) => <div key={k}><li>{v}</li></div>)}
    </ul>
  </div>
)

export default LangaugeDisplay