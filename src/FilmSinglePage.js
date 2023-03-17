import React, {useState, useEffect} from "react";
import { useParams, NavLink } from "react-router-dom";

export function FilmSinglePage(props){
    const params = useParams();
    const id=params.filmId;
    const [filmek,setFilmek] = useState([]);
    const [isPending, setPending] = useState(false);
    useEffect(()=>{
        setPending(true);
        (async ()=>{
            try{
                const res = await fetch(`https://localhost:7017/Film/${id}`)
                const films = await res.json();
                setFilmek(films);
                console.log(films);
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
                            <NavLink key={filmek.id} to={"/film/"+filmek.id}>
                                <img alt={filmek.nev} className="img-fluid" style={{maxHeight: "500px"}} src={"../"+filmek.kepneve ? filmek.kepneve : "https://via.placeholder.com/400x800"} />
                            </NavLink>
                            <br />
                            <NavLink to={"/mod-film/"+filmek.id}>
                                <i className="bi bi-pen"></i>
                            </NavLink>
                            &nbsp;&nbsp;
                            <NavLink to={"/del-film/"+filmek.id}>
                                <i className="bi bi-trash"></i>
                            </NavLink>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default FilmSinglePage;