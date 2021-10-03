import { useState, useEffect } from "react";
import { Redirect, useParams } from "react-router";
import { GenresCheckList, TagsInput } from "../Components/Input";
import Sidebar from "../Components/Sidebar";
import Api from "../Utils/Api";

const EditStory = (props = {}) => {
  const { story } = useParams();

  const [loading, setLoading] = useState(false);
  const [id, setId] = useState(0);
  const [title, setTitle] = useState("");
  const [cover, setCover] = useState("");
  const [sinopsis, setSinopsis] = useState("");
  const [tags, setTags] = useState([]);
  const [genres, setGenres] = useState([]);
  const [redirect, setRedirect] = useState(false);

  useEffect(() => {
    if (story && story !== "new") {
      setLoading(true);
      Api.stories.get("slug=" + story).then(async (res) => {
        if (res.ok) {
          const s = await res.json();
          setId(s.id);
          setTitle(s.title);
          setCover(s.cover);
          setSinopsis(s.sinopsis);
          setTags(s.tags ? s.tags.map((val) => val.name) : []);
          setGenres(s.genres ? s.genres.map((val) => val.id) : []);
        }
        setLoading(false);
      });
    }
  }, [story]);

  const handleChangeTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleChangeSinopsis = (e) => {
    setSinopsis(e.target.value);
  };

  const handleAddTag = (name) => {
    if (!tags.includes(name)) {
      const newTags = [...tags, name];
      setTags(newTags);
    }
  };

  const handleDeleteTag = (name) => {
    const index = tags.indexOf(name);
    if (index >= 0) {
      const newTags = [...tags];
      newTags.splice(index, 1);
      setTags(newTags);
    }
  };

  const handleClickGenre = (id) => {
    const copy = [...genres];
    const index = copy.indexOf(id);
    if (index > -1) {
      copy.splice(index, 1);
    } else {
      copy.push(id);
    }
    setGenres(copy);
  };

  const handleChangeCover = (e) => {
    const file = e.target.files[0];
    if (file) {
      setCover(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const method = id === 0 ? "post" : "put";
    setLoading(true);
    Api.stories[method](formData).then(async (res) => {
      if (res.ok) {
        const s = await res.json();
        setRedirect(s.slug);
      } else {
      }
    });
  };

  return (
    <div className="body">
      <form
        action="#"
        onSubmit={handleSubmit}
        method="POST"
        className="edit-story__form"
      >
        <input type="hidden" name="slug" id="slug" value={story} />
        <input
          type="file"
          name="cover"
          id="cover"
          onChange={handleChangeCover}
        />
        <div className="edit-story__group">
          {cover && <img src={cover} alt={title} />}
        </div>
        <div className="edit-story__group">
          <label htmlFor="title">Titulo</label>
          <input
            type="text"
            name="title"
            id="title"
            value={title}
            onChange={handleChangeTitle}
            disabled={loading}
          />
        </div>
        <div className="edit-story__group">
          <label htmlFor="sinopsis">Sinopsis</label>
          <input
            type="text"
            name="sinopsis"
            id="sinopsis"
            value={sinopsis}
            onChange={handleChangeSinopsis}
            disabled={loading}
          />
        </div>
        <div className="edit-story__group">
          <label htmlFor="tags">Tags</label>
          <TagsInput
            tags={tags}
            onAdd={handleAddTag}
            onCancel={handleDeleteTag}
            disabled={loading}
          />
          <label htmlFor="genres">Generos</label>
          <GenresCheckList
            name="genres"
            id="genres"
            value={genres}
            onChange={handleClickGenre}
            disabled={loading}
          />
        </div>
        <input type="submit" value="Enviar" />
      </form>
      <Sidebar></Sidebar>
      {redirect && <Redirect to={`/${redirect}`} />}
    </div>
  );
};

export default EditStory;
