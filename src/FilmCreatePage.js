import { useNavigate } from "react-router-dom";

export function FilmCreatePage(){
    const navigate = useNavigate();
    return(
        <div className="p-5 content bg-whitesmoke text-center">
            <h2>Új film</h2>
            <form
            onSubmit={(event) =>{
                event.persist();
                event.preventDefault();
                fetch(`https://localhost:7017/Film`, {
                    method: "POST",
                    headers: {
                        'Content-Type': 'application/json',
                    },

                    body: JSON.stringify({
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
                    <label className="col-sm-3 col-form-label">Film neve: </label>
                    <div className="col-sm-9">
                        <input type="text" name="nev" className="form-control"/>
                    </div>
                </div>
                <div className="from-group row pb-3">
                    <label className="col-sm-3 col-form-label">Kiadás éve: </label>
                    <div className="col-sm-9">
                        <input type="number" name="kiadasEve" min="1900" max="2024" className="form-control"/>
                    </div>
                </div>
                <div className="from-group row pb-3">
                    <label className="col-sm-3 col-form-label">Értékelés: </label>
                    <div className="col-sm-9">
                        <input type="number" name="ertekeles" min="1" max="5" className="form-control"/>
                    </div>
                </div>
                <div className="from-group row pb-3">
                    <label className="col-sm-3 col-form-label">Kép: </label>
                    <div className="col-sm-9">
                        <input type="text" name="kepneve" className="form-control"/>
                    </div>
                </div>
                <button type="submit" className="btn btn-success">
                    Küldés
                </button>
            </form>
        </div>
    )
}

export default FilmCreatePage;