import React, { useEffect, useState } from "react";
import NoteCard from "../../components/NoteCard/NoteCard";
import api from "../../api/axios";
import Spinner from "../../components/Loader/Spinner";
import { Outlet } from "react-router-dom";
import toast from "react-hot-toast";

const NotesHomePage = () => {
  const [notes, setNotes] = useState([]);
  const [loader, setLoader] = useState(false);

  //delete note functions
  const handleDeleteNote = async (id) => {
    try {
      const response = await api.delete(`api/note/delete-note/${id}`);

      if (response.data.success) {
        toast.success(response.data.message);

        // 🔥 UPDATE UI IMMEDIATELY
        setNotes((prev) => prev.filter((note) => note._id !== id));
      }
    } catch (err) {
      if (!err.response) {
        toast.error("internal server error");
      } else {
        toast.error(err.response.data.message);
      }
    }
  };

  useEffect(() => {
    const fetchNotes = async () => {
      try {
        setLoader(true);

        const userNotes = await api.get("api/note/get-notes");

        if (userNotes.status === 200) {
          setNotes(userNotes.data.notes);
        }
      } catch (err) {
        if (!err.response) {
          alert("internal server error");
        } else if (err?.response?.status === 404) {
          alert(err.response.data.message);
        } else if (err?.response?.status === 500) {
          alert(err.response.data.message);
        }
      } finally {
        setLoader(false);
      }
    };

    fetchNotes();
  }, []);

  return (
    <div className="w-full h-full bg-linear-to-br from-slate-900 via-gray-900 to-black">
      <div className="w-full h-full overflow-y-auto px-4 sm:px-6 py-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 items-center">
          {loader && (
            <div className="col-span-full flex justify-center items-center py-10">
              <Spinner />
            </div>
          )}

          {notes.length === 0 && !loader && (
            <p className="text-gray-300 text-center col-span-full text-lg font-medium">
              No notes found
            </p>
          )}

          {[...notes].reverse().map((note) => (
            <NoteCard
              key={note._id}
              id={note._id}
              title={note.title}
              content={note.content}
              onDelete={handleDeleteNote}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default NotesHomePage;
