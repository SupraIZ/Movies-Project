import { useState } from "react";
import {
  useCreateGenreMutation,
  useUpdateGenreMutation,
  useDeleteGenreMutation,
  useFetchGenresQuery,
} from "../../redux/api/genre";

import { toast } from "react-toastify"; // For displaying notifications
import GenreForm from "../../components/GenreForm"; // Reusable form component for genres
import Modal from "../../components/Modal"; // Modal component for editing/deleting genres

const GenreList = () => {
  // Fetch genres from the API and enable refetching
  const { data: genres, refetch } = useFetchGenresQuery();

  // State variables for managing form inputs and modal visibility
  const [name, setName] = useState(""); // For creating a new genre
  const [selectedGenre, setSelectedGenre] = useState(null); // For selecting a genre to update/delete
  const [updatingName, setUpdatingName] = useState(""); // For updating the genre name
  const [modalVisible, setModalVisible] = useState(false); // For controlling modal visibility

  // Hooks for API mutations
  const [createGenre] = useCreateGenreMutation(); // Hook for creating a genre
  const [updateGenre] = useUpdateGenreMutation(); // Hook for updating a genre
  const [deleteGenre] = useDeleteGenreMutation(); // Hook for deleting a genre

  // Handle creating a new genre
  const handleCreateGenre = async (e) => {
    e.preventDefault();

    if (!name) {
      toast.error("Genre name is required"); // Show error if name is empty
      return;
    }

    console.log("Creating genre with name:", name);

    try {
      const result = await createGenre({ name }).unwrap();
      console.log("API Response:", result);

      if (result.error) {
        toast.error(result.error);
      } else {
        setName("");
        toast.success(`${result.name} is created.`);
        refetch();
      }
    } catch (error) {
      console.log("Error creating genre:", error);
      toast.error("Creating genre failed, try again.");
    }
  };

  // Handle updating an existing genre
  const handleUpdateGenre = async (e) => {
    e.preventDefault();
    if (!updatingName) {
      toast.error("Genre name is required"); // Show error if name is empty
      return;
    }

    try {
      const result = await updateGenre({
        id: selectedGenre._id, // Pass the selected genre's ID
        updateGenre: {
          name: updatingName, // Pass the updated name
        },
      }).unwrap();

      if (result.error) {
        toast.error(result.error); // Show error if API returns an error
      } else {
        toast.success(`${result.name} is updated`); // Show success message
        refetch(); // Refetch genres to update the list
        setSelectedGenre(null); // Clear the selected genre
        setUpdatingName(""); // Clear the updating name
        setModalVisible(false); // Close the modal
      }
    } catch (error) {
      console.error(error);
      toast.error("Updating genre failed, try again."); // Show error if API call fails
    }
  };

  // Handle deleting a genre
  const handleDeleteGenre = async () => {
    try {
      const result = await deleteGenre(selectedGenre._id).unwrap(); // Call API to delete genre

      if (result.error) {
        toast.error(result.error); // Show error if API returns an error
      } else {
        toast.success(`${result.name} is deleted.`); // Show success message
        refetch(); // Refetch genres to update the list
        setSelectedGenre(null); // Clear the selected genre
        setModalVisible(false); // Close the modal
      }
    } catch (error) {
      console.error(error);
      toast.error("Genre deletion failed. Try again."); // Show error if API call fails
    }
  };

  return (
    <div className="ml-[10rem] flex flex-col md:flex-row">
      <div className=" p-3">
        <h1 className="h-12">Manage Genres</h1>

        {/* Form for creating a new genre */}
        <GenreForm
          value={name}
          setValue={setName}
          handleSubmit={handleCreateGenre}
        />

        <br />

        {/* Display list of genres */}
        <div className="flex flex-wrap">
          {genres?.map((genre) => (
            <div key={genre._id}>
              <button
                className="bg-white border border-teal-500 text-teal-500 py-2 px-4 rounded-lg m-3 hover:bg-teal-500 hover:text-white focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-50"
                onClick={() => {
                  setModalVisible(true); // Open the modal
                  setSelectedGenre(genre); // Set the selected genre
                  setUpdatingName(genre.name); // Set the name for updating
                }}
              >
                {genre.name}
              </button>
            </div>
          ))}
        </div>

        {/* Modal for updating or deleting a genre */}
        <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
          <GenreForm
            value={updatingName}
            setValue={(value) => setUpdatingName(value)}
            handleSubmit={handleUpdateGenre}
            buttonText="Update"
            handleDelete={handleDeleteGenre}
          />
        </Modal>
      </div>
    </div>
  );
};

export default GenreList;
