import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../../api/axios";
import Spinner from "../../components/Loader/Spinner";

const NoteDetails = () => {
  const {id} = useParams();
  const [note, setNote] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchNote = async () => {
      try {
        setLoading(true);
        const response = await api.get(`/note/get-one-note/${id}`);
        setNote(response.data.note);
      } catch (err) {
        alert("Unable to fetch note");
      } finally {
        setLoading(false);
      }
    };

    fetchNote();
  }, [id]);


  if (loading) return <Spinner />;

  return (
    <div className="w-full h-full flex justify-center items-start p-6 bg-linear-to-br from-slate-900 to-black">
      <div className="max-w-3xl w-full bg-slate-800 rounded-2xl p-6 shadow-xl">
        <h2 className="text-2xl font-bold text-white mb-4">
         {note.title}
        </h2>
           
        <p className="h-[60vh] overflow-y-auto text-gray-300 leading-relaxed whitespace-pre-wrap lg:text-xl  ">
            {note.content}
        </p>
      </div>
    </div>
  );
};

export default NoteDetails;
