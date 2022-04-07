const FlagDisplay = ({ targetCountry }) => {
  if (targetCountry?.flags.png) {
    return <><img src={targetCountry.flags.png}/></>
  }
  if (targetCountry?.flags.svg) {
    return <><img src={targetCountry.flags.svg}/></>
  }
}

export default FlagDisplay