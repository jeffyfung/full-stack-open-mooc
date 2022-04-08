const Notification = ({ message }) => {

  const successStyle = {
    'color': 'green',
    'background': 'lightgrey',
    'fontSize': 20,
    'borderStyle': 'solid',
    'borderRadius': 5,
    'padding': 10,
    'marginBottom': 10
  };

  const errorStyle = {
    'color': 'red',
    'background': 'lightgrey',
    'fontSize': 20,
    'borderStyle': 'solid',
    'borderRadius': 5,
    'padding': 10,
    'marginBottom': 10
  };

  if (message !== null) {
    if (message.status === 0) {
      return <div style={successStyle}>{message.content}</div>
    } else {
      return <div style={errorStyle}>{message.content}</div>
    }
  }
}

export default Notification