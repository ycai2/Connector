export const instructionStyle = {
  overlay : {
    position          : 'fixed',
    backgroundColor   : 'rgba(0, 0, 0, 0.75)'
  },
  content : {
    position                   : 'absolute',
    border                     : '1px solid #ccc',
    background                 : '#fff',
    overflow                   : 'auto',
    WebkitOverflowScrolling    : 'touch',
    borderRadius               : '0',
    outline                    : 'none',
    padding                    : '20px',
    left                       : '100px',
    right                      : '100px',
    bottom                     : '200px',
  }
};

export const resultStyle = {
  overlay : {
    position          : 'fixed',
    backgroundColor   : 'rgba(0, 0, 0, 0.75)',
    display           : 'flex',
    justifyContent    : 'center'
  },
  content : {
    position                   : 'absolute',
    background                 : '#fff',
    overflow                   : 'auto',
    WebkitOverflowScrolling    : 'touch',
    borderRadius               : '0',
    outline                    : 'none',
    padding                    : '20px',
    top                        : '100px',
    left                       : 'auto',
    bottom                     : 'initial',
    right                      : 'auto',
    display                    : 'flex',
    flexDirection              : 'column',
    justifyContent             : 'center',
    fontSize                   : '20px',
    alignItems                 : 'center'

  }
}
