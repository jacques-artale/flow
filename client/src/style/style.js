const get_style = (theme) => ({
  main: {
    backgroundColor: `${theme === 'light' ? '#f2f2f2' : '#1a1a1a'}`,
    color: `${theme === 'light' ? 'black' : 'white'}`,
  },

  input_field: {
    width: '60px',
    padding: '8px 12px',
    border: `1px solid ${theme === 'light' ? '#ccc' : '#555'}`,
    borderRadius: '4px',
    marginLeft: '5%',
    backgroundColor: theme === 'light' ? 'white' : '#333',
    color: theme === 'light' ? 'black' : 'white',
  },

  settings_container: {
    borderRadius: '4px',
    marginLeft: '1%',
    paddingLeft: '0.5%',
    paddingRight: '0.5%',
    width: '16%',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'left',
    backgroundColor: theme === 'light' ? '#e0e0e0' : '#282828',  // Conditional background color
    color: theme === 'light' ? 'black' : 'white',  // Conditional text color
  },

  grid_container: {
    marginLeft: '1%',
    border: `3px solid ${theme === 'light' ? 'black' : 'white'}`
  },

  info_container: {
    marginLeft: '1%',
    borderRadius: '4px',
    backgroundColor: theme === 'light' ? '#e0e0e0' : '#282828',
    paddingLeft: '0.5%',
    paddingRight: '0.5%',
    color: theme === 'light' ? 'black' : 'white',
  },

  button: {
    padding: '8px 12px',
    border: `1px solid ${theme === 'light' ? '#ccc' : '#555'}`,
    borderRadius: '4px',
    margin: '1%',
    backgroundColor: '#4CAF50',
    color: theme === 'light' ? 'white' : 'white',
  },

  generate_button: {
    padding: '8px 12px',
    border: `1px solid ${theme === 'light' ? '#ccc' : '#555'}`,
    borderRadius: '4px',
    marginLeft: '5%',
    marginRight: '5%',
    marginTop: '5%',
    marginBottom: '5%',
    backgroundColor: '#4CAF50',
    color: theme === 'light' ? 'white' : 'white',
  },

  list: {
    fontSize: '17px',
    color: theme === 'light' ? 'black' : 'white',
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
  }
});

export default get_style;