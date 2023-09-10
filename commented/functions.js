// * In your testRoute or a middleware
// app.get('/generate-error', (req, res, next) => {
//     // Simulate an error
//     try {
//       throw new Error('This is a test error');
//     } catch (error) {
//       next(error); // Pass the error to the next middleware (errorHandler)
//     }
//   });

// * export const getTasksByUserId = async (req, res) => {
//   // const { id } = req.user;
//   const { id } = req.params; // Extracting Id from route parameter
//   try {
//     const Tasks = await Task.find({ userId: id });
//     res.status(200).json(Tasks);
//   } catch (error) {
//     res.status(400).json({ error: "Error fetching Tasks by user id" });
//   }
// };
  