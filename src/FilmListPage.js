import React, {useState, useEffect} from "react";
import { NavLink } from "react-router-dom";

export function FilmListPage(){
    const [filmek,setFilmek] = useState([]);
    const [isFetchPending, setFetchPending] = useState(false);
    useEffect(() =>{
        setFetchPending(true);
        fetch("https://localhost:7017/Film")
        .then((res) => res.json())
        .then((films) =>setFilmek(films))
        .catch(console.log)
        .finally(()=>{
            setFetchPending(false);
        });
    }, []);

    return(
        <div className="container mt-5">
            <div className="p-5 m-auto text-center content bg-ivory">
                {isFetchPending ? (
                    <div className="spinner-border"></div>
                ) : (
                    <div>
                        <h2>Filmek</h2>
                        {filmek.map((film,index)=>(
                            <div key={index} className="card col-sm-3 d-inline-block m-1 p-2">
                                <p className="text-dark">Film neve: {film.nev}</p>
                                <p className="text-dark">Kiadás éve: {film.kiadasEve}</p>
                                <p className="text-dark">Értékelés: {film.ertekeles}</p>
                                <div className="card-body">
                                    <NavLink key={film.id} to={"/film/"+film.id}>
                                        <img alt={film.nev} className="img-fluid" style={{maxHeight: 200}} src={"../"+film.kepneve ? film.kepneve : "https://via.placeholder.com/400x800"} />
                                    </NavLink>
                                    <br />
                                    <NavLink to={"/mod-film/"+film.id}>
                                        <i className="bi bi-pen"></i>
                                    </NavLink>
                                    &nbsp;&nbsp;
                                    <NavLink to={"/del-film/"+film.id}>
                                        <i className="bi bi-trash"></i>
                                    </NavLink>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default FilmListPage;