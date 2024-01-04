const get_style = () => ({
  main: {
    backgroundColor: '#1a1a1a',
    color: 'white',
  },

  input_field: {
    width: '60px',
    padding: '8px 12px',
    border: `1px solid #555`,
    borderRadius: '4px',
    marginLeft: '5%',
    backgroundColor: '#333',
    color: 'white',
  },

  settings_container: {
    borderRadius: '4px',
    marginLeft: '1%',
    paddingLeft: '1%',
    paddingRight: '0.5%',
    width: '16%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    backgroundColor: '#282828',
    color: 'white',
  },

  grid_container: {
    marginLeft: '1%',
    border: '3px solid white'
  },

  info_container: {
    marginLeft: '1%',
    borderRadius: '4px',
    backgroundColor: '#282828',
    paddingLeft: '1%',
    paddingRight: '1%',
    color: 'white',
  },

  button: {
    padding: '8px 12px',
    border: '1px solid #555',
    borderRadius: '4px',
    margin: '1%',
    backgroundColor: '#4CAF50',
    color: 'white',
  },

  generate_button: {
    padding: '8px 12px',
    border: '1px solid #555',
    borderRadius: '4px',
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: '5%',
    marginBottom: '5%',
    backgroundColor: '#4CAF50',
    color: 'white',
  },

  disabled_generate_button: {
    padding: '8px 12px',
    border: '1px solid #555',
    borderRadius: '4px',
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: '5%',
    marginBottom: '5%',
    backgroundColor: '#ccc',
    color: 'white',
  },

  list: {
    fontSize: '17px',
    color: 'white',
  },

  solved_overlay: {
    position: 'fixed',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)', // Center the div
    width: '30%',
    height: '30%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    background: 'rgba(0, 0, 0, 0.35)',
    backdropFilter: 'blur(10px)',
    color: 'white',
    fontSize: '24px',
    borderRadius: '10px',
    zIndex: 1000,
    display: 'flex',
    flexDirection: 'column',
  },

  info_bar: {
    display: 'flex',
    flexDirection: 'row',
    marginLeft: '2%',
  }
});

export default get_style;