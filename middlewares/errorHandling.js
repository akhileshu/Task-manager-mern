
export const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    const errorMessage = process.env.NODE_ENV === 'development' ? err.message : 'Something went wrong!';
    res.status(500).json({ message: errorMessage });
  };
  
