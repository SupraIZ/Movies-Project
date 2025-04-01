import {
  useDeleteCommentMutation,
  useGetAllMoviesQuery,
} from "../../redux/api/movies";
import { toast } from "react-toastify";

const AllComments = () => {
  // Fetch all movies and their reviews
  const { data: movie, refetch } = useGetAllMoviesQuery();

  // Mutation to delete a comment
  const [deleteComment] = useDeleteCommentMutation();

  // Function to handle comment deletion
  const handleDeleteComment = async (movieId, reviewId) => {
    try {
      // Call the deleteComment mutation with movieId and reviewId
      await deleteComment({ movieId, reviewId });

      // Show success message
      toast.success("Comment Deleted");

      // Refetch the movies to update the UI
      refetch();
    } catch (error) {
      // Log any errors that occur during deletion
      console.error("Error deleting comment: ", error);
    }
  };

  return (
    <div>
      {/* Iterate over all movies */}
      {movie?.map((m) => (
        <section
          key={m._id}
          className="flex flex-col justify-center items-center"
        >
          {/* Iterate over all reviews for the current movie */}
          {m?.reviews.map((review) => (
            <div
              key={review._id}
              className="bg-[#e9e9e9] p-4 rounded-lg w-[50%] mt-[2rem]"
            >
              {/* Display reviewer's name and review creation date */}
              <div className="flex justify-between">
                <strong className="text-[#B0B0B0]">{review.name}</strong>
                <p className="text-[#B0B0B0]">
                  {review.createdAt.substring(0, 10)} {/* Format date */}
                </p>
              </div>

              {/* Display the review comment */}
              <p className="my-4">{review.comment}</p>

              {/* Button to delete the comment */}
              <button
                className="text-red-500"
                onClick={() => handleDeleteComment(m._id, review._id)}
              >
                Delete
              </button>
            </div>
          ))}
        </section>
      ))}
    </div>
  );
};

export default AllComments;