import React, {useState, useEffect} from "react";
import {useParams,useNavigate, NavLink} from "react-router-dom";

export function FilmDelPage(){
    const params=useParams();
    const id=params.filmId;
    const navigate=useNavigate();
    const [filmek,setFilmek] = useState([]);
    const [isPending, setPending] = useState(false);
    useEffect(()=>{
        setPending(true);
        (async () => {
            try{
                const res=await fetch(`https://localhost:7017/Film/${id}`)
                const filmek = await res.json();
                setFilmek(filmek);
            }
            catch(error){
                console.log(error);
            }
            finally{
                setPending(false);
            }
        })
        ();
    }, [id]);

    return(
        <div className="p-5 m-auto text-center content bg-lavender">
            {isPending || !filmek.id ? (
                <div className="spinner-border"></div>
            ) : (
                <div className="card p-3">
                    <div className="card-body">
                    <h5 className="card-title">{filmek.nev}</h5>
                        <p className="text-dark">Kiadás éve: {filmek.kiadasEve}</p>
                        <p className="text-dark">Értékelés: {filmek.ertekeles}</p>
                        <div className="card-body">
                            <img alt={filmek.nev} className="img-fluid" style={{maxHeight: "500px"}} src={filmek.kepneve ? filmek.kepneve : "https://via.placeholder.com/400x800"} />
                        </div>
                        <form onSubmit={(event) => {
                            event.persist();
                            event.preventDefault();
                            fetch(`https://localhost:7017/Film/${id}`,{
                                method: "DELETE",
                            })
                            .then(()=>{
                                navigate("/");
                            })
                            .catch(console.log);
                        }}>
                            <div>
                                <NavLink to={"/"}><button className="bi bi-backspace">&nbsp;Mégsem</button></NavLink>
                                <button className="bi bi-trash">&nbsp;Törlés</button>
                            </div>
                        </form>
                    </div>
                </div>
            )},
        </div>
    );
}

export default FilmDelPage;