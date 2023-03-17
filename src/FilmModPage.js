import React, { useState,useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

export function FilmModPage(){
    const params = useParams();
    const id=params.filmId;
    const navigate = useNavigate();
    const [filmek,setFilmek]=useState([]);
    const [modnev,setModnev] = useState('');
    const [modkiadaseve,setKiadaseve] = useState('');
    const [modertekeles,setErtekeles] = useState('');
    const [modkepneve,setKepneve] = useState('');
    useEffect(()=>{
        (async () => {
            try{
                const res = await fetch(`https://localhost:7017/Film/${id}`)
                const filmek=await res.json();
                setFilmek(filmek);
                setModnev(filmek.nev);
                console.log(modnev);
                setKiadaseve(filmek.kiadasEve);
                console.log(modkiadaseve);
                setErtekeles(filmek.ertekeles);
                console.log(modertekeles);
                setKepneve(filmek.kepneve);
                console.log(filmek.kepneve);
            }
            catch(error){
                console.log(error);
            }
        })
        ();
    }, [id, modnev, modkiadaseve, modertekeles,modkepneve]);
    const modNev=event=>{
        setModnev(event.target.value);
    }
    const modKiadaseve=event=>{
        setKiadaseve(event.target.value);
    }
    const modErtekeles=event=>{
        setErtekeles(event.target.value);
    }
    const modKepneve=event=>{
        setKepneve(event.target.value);
    }
    return(
        <div className="p-5 content bg-whitesmoke text-center">
            <h2>Film modósítás</h2>
            <form
            onSubmit={(event)=>{
                event.persist();
                event.preventDefault();
                fetch(`https://localhost:7017/Film/${id}`,{
                    method: "PUT",
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        id: event.target.elements.id.value,
                        nev: event.target.elements.nev.value,
                        kiadasEve: event.target.elements.kiadasEve.value,
                        ertekeles: event.target.elements.ertekeles.value,
                        kepneve: event.target.elements.kepneve.value,
                    }),
                })
                .then(()=>{
                    navigate("/");
                })
                .catch(console.log);
            }}>
            <div className="from-group row pb-3">
                <label className="col-sm-3 col-form-label">Id: </label>
                <div className="col-sm-9">
                    <input type="number" name="id" className="form-control" value={filmek.id}/>
                </div>
            </div>
            <div className="from-group row pb-3">
                <label className="col-sm-3 col-form-label">Film neve: </label>
                <div className="col-sm-9">
                    <input type="text" name="nev" className="form-control" defaultValue={filmek.nev} onChange={modNev}/>
                </div>
            </div>
            <div className="from-group row pb-3">
                <label className="col-sm-3 col-form-label">Kiadás éve: </label>
                <div className="col-sm-9">
                    <input type="number" name="kiadasEve" min="1900" max="2024" className="form-control" defaultValue={filmek.kiadasEve} onChange={modKiadaseve}/>
                </div>
            </div>
            <div className="from-group row pb-3">
                <label className="col-sm-3 col-form-label">Értékelés: </label>
                <div className="col-sm-9">
                    <input type="number" name="ertekeles" min="1" max="5" className="form-control" defaultValue={filmek.ertekeles} onChange={modErtekeles}/>
                </div>
            </div>
            <div className="from-group row pb-3">
                <label className="col-sm-3 col-form-label">Kép: </label>
                <div className="col-sm-9">
                    <input type="text" name="kepneve" className="form-control" defaultValue={filmek.kepneve} onChange={modKepneve}/>
                </div>
            </div>
                <button type="submit" className="btn btn-success">
                    Küldés
                </button>
            </form>
        </div>
    );
}

export default FilmModPage;