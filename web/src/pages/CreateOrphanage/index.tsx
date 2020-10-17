import React, { ChangeEvent, FormEvent, useRef, useState } from "react";
import { Map, Marker, TileLayer } from "react-leaflet";
import { LeafletMouseEvent } from "leaflet";
import { FiPlus } from "react-icons/fi";
import Sidebar from "../../components/Sidebar";
import api from "../../services/api";
import { useHistory } from "react-router-dom";
// import "../styles/pages/create-orphanage.css";
import "../CreateOrphanage/styles.css";
import mapIcon from "../../utils/maIcon";
export default function CreateOrphanage() {
  const history = useHistory();
  const nameInputRef = useRef<HTMLInputElement>(null);
  const openingHoursInputRef = useRef<HTMLInputElement>(null);
  const imagesInputRef = useRef<HTMLInputElement>(null);
  const aboutInputRef = useRef<HTMLTextAreaElement>(null);
  const instructionsInputRef = useRef<HTMLTextAreaElement>(null);
  const [position, setPosition] = useState({ latitude: 0, longitude: 0 });
  const [open_on_weekends, setOpen_on_weekends] = useState(true);
  const [previewImages, setPreviewImages] = useState<string[]>([]);
  function handleMapClick(e: LeafletMouseEvent) {
    setPosition({ latitude: e.latlng.lat, longitude: e.latlng.lng });
  }
  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    const name = nameInputRef.current?.value as string;
    const about = aboutInputRef.current?.value as string;
    const instructions = instructionsInputRef.current?.value as string;
    console.log(instructions);
    const opening_hours = openingHoursInputRef.current?.value as string;
    const { latitude, longitude } = position;
    if (!imagesInputRef.current?.files) return;
    const images = Array.from(imagesInputRef.current?.files);
    const data = new FormData();
    data.append("name", name);
    data.append("about", about);
    data.append("instructions", instructions);
    data.append("latitude", String(latitude));
    data.append("longitude", String(longitude));
    data.append("opening_hours", opening_hours);
    data.append("open_on_weekends", String(open_on_weekends));
    data.append("instructions", instructions);
    images.forEach((image) => {
      data.append("images", image);
    });
    api.post("orphanages", data).then((res) => {
      alert("Cadastro criado com sucesso");
      history.push("/app");
    });
  }
  function handleSelectedImages(event: ChangeEvent<HTMLInputElement>) {
    if (!imagesInputRef.current?.files) return;

    const selectedImages = Array.from(imagesInputRef.current?.files);

    const selectedImagesPreview = selectedImages.map((image) =>
      URL.createObjectURL(image)
    );

    setPreviewImages(selectedImagesPreview);
  }
  return (
    <div id="page-create-orphanage">
      <Sidebar />

      <main>
        <form onSubmit={handleSubmit} className="create-orphanage-form">
          <fieldset>
            <legend>Dados</legend>

            <Map
              center={[-25.4524716, -52.924513]}
              style={{ width: "100%", height: 280 }}
              zoom={15}
              onclick={handleMapClick}
            >
              {/* <TileLayer 
                url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
              /> */}
              <TileLayer
                url={`https://a.tile.openstreetmap.org/{z}/{x}/{y}.png`}
              />
              {position.latitude !== 0 && (
                <Marker
                  interactive={false}
                  icon={mapIcon}
                  position={[position.latitude, position.longitude]}
                />
              )}
            </Map>

            <div className="input-block">
              <label htmlFor="name">Nome</label>
              <input required ref={nameInputRef} id="name" />
            </div>

            <div className="input-block">
              <label htmlFor="about">
                Sobre <span>Máximo de 300 caracteres</span>
              </label>
              <textarea ref={aboutInputRef} id="name" maxLength={300} />
            </div>

            <div className="input-block">
              <label htmlFor="images">Fotos</label>

              <div className="images-container">
                {previewImages.map((image) => (
                  <img
                    key={image}
                    src={image}
                    alt={nameInputRef.current?.value}
                  />
                ))}
                <label htmlFor="image[]" className="new-image">
                  <FiPlus size={24} color="#15b6d6" />
                </label>
              </div>
              <input
                ref={imagesInputRef}
                onChange={handleSelectedImages}
                multiple
                type="file"
                name=""
                id="image[]"
              />
            </div>
          </fieldset>

          <fieldset>
            <legend>Visitação</legend>

            <div className="input-block">
              <label htmlFor="instructions">Instruções</label>
              <textarea ref={instructionsInputRef} id="instructions" />
            </div>

            <div className="input-block">
              <label htmlFor="opening_hours">Horário de funcionamento</label>
              <input ref={openingHoursInputRef} id="opening_hours" />
            </div>

            <div className="input-block">
              <label htmlFor="open_on_weekends">Atende fim de semana</label>

              <div className="button-select">
                <button
                  type="button"
                  className={open_on_weekends ? "active" : ""}
                  onClick={() => setOpen_on_weekends(true)}
                >
                  Sim
                </button>

                <button
                  type="button"
                  className={!open_on_weekends ? "active" : ""}
                  onClick={() => setOpen_on_weekends(false)}
                >
                  Não
                </button>
              </div>
            </div>
          </fieldset>

          <button className="confirm-button" type="submit">
            Confirmar
          </button>
        </form>
      </main>
    </div>
  );
}

// import React from "react";
// import { Map, Marker, TileLayer } from "react-leaflet";
// import L from "leaflet";

// import { FiPlus } from "react-icons/fi";

// import mapMarkerImg from "../../assets/images/local2.svg";

// import "../CreateOrphanage/styles.css";
// import Sidebar from "../../components/Sidebar";

// const happyMapIcon = L.icon({
//   iconUrl: mapMarkerImg,

//   iconSize: [58, 68],
//   iconAnchor: [29, 68],
//   popupAnchor: [0, -60],
// });

// export default function CreateOrphanage() {
//   return (
//     <div id="page-create-orphanage">
//       <Sidebar />
//       <main>
//         <form className="create-orphanage-form">
//           <fieldset>
//             <legend>Dados</legend>

//             <Map
//               center={[-27.2092052, -49.6401092]}
//               style={{ width: "100%", height: 280 }}
//               zoom={15}
//             >
//               <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />

//               <Marker
//                 interactive={false}
//                 icon={happyMapIcon}
//                 position={[-27.2092052, -49.6401092]}
//               />
//             </Map>

//             <div className="input-block">
//               <label htmlFor="name">Nome</label>
//               <input id="name" />
//             </div>

//             <div className="input-block">
//               <label htmlFor="about">
//                 Sobre <span>Máximo de 300 caracteres</span>
//               </label>
//               <textarea id="name" maxLength={300} />
//             </div>

//             <div className="input-block">
//               <label htmlFor="images">Fotos</label>

//               <div className="uploaded-image"></div>

//               <button className="new-image">
//                 <FiPlus size={24} color="#15b6d6" />
//               </button>
//             </div>
//           </fieldset>

//           <fieldset>
//             <legend>Visitação</legend>

//             <div className="input-block">
//               <label htmlFor="instructions">Instruções</label>
//               <textarea id="instructions" />
//             </div>

//             <div className="input-block">
//               <label htmlFor="opening_hours">Nome</label>
//               <input id="opening_hours" />
//             </div>

//             <div className="input-block">
//               <label htmlFor="open_on_weekends">Atende fim de semana</label>

//               <div className="button-select">
//                 <button type="button" className="active">
//                   Sim
//                 </button>
//                 <button type="button">Não</button>
//               </div>
//             </div>
//           </fieldset>

//           <button className="confirm-button" type="submit">
//             Confirmar
//           </button>
//         </form>
//       </main>
//     </div>
//   );
// }

// return `https://a.tile.openstreetmap.org/${z}/${x}/${y}.png`;
