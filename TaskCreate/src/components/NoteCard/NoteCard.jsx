import { Link } from "react-router-dom";
import api from "../../api/axios";
import toast from "react-hot-toast";
import { useNavigate} from "react-router-dom";

function NoteCard({ id, title, content,onDelete }) {
  const navigate = useNavigate();
  // const handleDeleteNote = async (e) => {
  //   e.preventDefault();
  //   try{
  //     const response = await api.delete(`/note/delete-note/${id}`);
  //   if (response.data.success) {
  //     toast.success(response.data.message);
  //     navigate("/dashboard");
  //   }
  //   }catch(err)
  //   {
  //     if(!err.response)
  //     {
  //       toast.error("internal server error");
  //     }
  //     else if(err?.response?.status===404)
  //     {
  //       toast.error(err.response.data.message)
  //     }
  //     else if(err?.response?.status===500)
  //     {
  //       toast.error(err.response.data.message);
  //     }
  //   }
  // };

  return (
    <div className="w-72 h-52 rounded-lg border border-gray-200 bg-white p-4 shadow-sm">
      <h3 className="mb-2 text-lg font-semibold text-gray-800">{title}</h3>

      <p className="mb-4 text-sm text-gray-600 line-clamp-2">{content}</p>

      <div className="flex items-center justify-between">
        <button className="rounded-md bg-indigo-600 px-4 py-1.5 text-sm text-white hover:bg-indigo-700 transition">
          <Link to={`note-details/${id}`}>More</Link>
        </button>

        <button
          onClick={(e) => {
            onDelete(id)
          }}
          className="rounded-md border border-green-600 px-4 py-1.5 text-sm text-green-600 hover:bg-green-600 hover:text-white transition"
        >
          Delete flow
        </button>
      </div>
    </div>
  );
}

export default NoteCard;
