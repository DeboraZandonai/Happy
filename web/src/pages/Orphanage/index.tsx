import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
// import { FaWhatsapp } from "react-icons/fa";
import { FiClock, FiInfo } from "react-icons/fi";
import { Map, Marker, TileLayer } from "react-leaflet";
import Sidebar from "../../components/Sidebar";
import mapIcon from "../../utils/maIcon";
import api from "../../services/api";

import "../Orphanage/styles.css";

interface Orphanage {
  id: number;
  latitude: number;
  longitude: number;
  name: string;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: boolean;
  images: Array<{
    id: number;
    url: string;
  }>;
}

interface OrphanageParams {
  id: string;
}

export default function Orphanage() {
  const params = useParams<OrphanageParams>();
  const [orphanage, setOrphanage] = useState<Orphanage>();
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  console.log(activeImageIndex);

  useEffect(() => {
    api.get(`orphanages/${params.id}`).then((response) => {
      setOrphanage(response.data);
      console.log(activeImageIndex);
    });
  }, [params.id]);

  if (!orphanage) {
    return <p>carregando...</p>;
  }

  return (
    <div id="page-orphanage">
      <Sidebar />
      <main>
        <div className="orphanage-details">
          <img
            src={orphanage.images[activeImageIndex].url}
            alt={orphanage.name}
          />

          <div className="images">
            {orphanage.images.map((image, index) => {
              return (
                <button
                  key={image.id}
                  className={activeImageIndex === index ? "active" : ""}
                  type="button"
                  onClick={() => {
                    setActiveImageIndex(index);
                  }}
                >
                  <img src={image.url} alt={orphanage.name} />
                </button>
              );
            })}
          </div>

          <div className="orphanage-details-content">
            <h1>{orphanage.name}</h1>
            <p>{orphanage.about}</p>

            <div className="map-container">
              <Map
                center={[orphanage.latitude, orphanage.longitude]}
                zoom={16}
                style={{ width: "100%", height: 280 }}
                dragging={false}
                touchZoom={false}
                zoomControl={false}
                scrollWheelZoom={false}
                doubleClickZoom={false}
              >
                <TileLayer
                  url={`https://api.mapbox.com/styles/v1/mapbox/light-v10/tiles/256/{z}/{x}/{y}@2x?access_token=${process.env.REACT_APP_MAPBOX_TOKEN}`}
                />
                <Marker
                  interactive={false}
                  icon={mapIcon}
                  position={[orphanage.latitude, orphanage.longitude]}
                />
              </Map>

              <footer>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`}
                >
                  Ver rotas no Google Maps
                </a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
            <p>{orphanage.instructions}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta <br />
                {orphanage.opening_hours}
              </div>
              {orphanage.open_on_weekends ? (
                <div className="open-on-weekends">
                  <FiInfo size={32} color="#39CC83" />
                  Atendemos <br />
                  fim de semana
                </div>
              ) : (
                <div className="open-on-weekends dont-open">
                  <FiInfo size={32} color="#FF669D" />
                  Não atendemos <br />
                  fim de semana
                </div>
              )}
            </div>

            {/* <button type="button" className="contact-button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </button> */}
          </div>
        </div>
      </main>
    </div>
  );
}

// import React, { useEffect, useState } from "react";
// // import { FaWhatsapp } from "react-icons/fa";
// import { FiClock, FiInfo } from "react-icons/fi";
// import { Map, Marker, TileLayer } from "react-leaflet";
// import { useParams } from "react-router-dom";

// import SideBar from "../../components/Sidebar";
// import mapIcon from "../../utils/maIcon";
// import api from "../../services/api";

// import "../Orphanage/styles.css";

// interface Orphanage {
//   latitude: number;
//   longitude: number;
//   name: string;
//   about: string;
//   instructions: string;
//   opening_hours: string;
//   open_on_weekends: string;
//   images: Array<{ id: number; url: string }>;
// }

// interface OrphanageParams {
//   id: string;
// }

// export default function Orphanage() {
//   const params = useParams<OrphanageParams>();
//   const [orphanage, setOrphanage] = useState<Orphanage>();
//   const [activeImageIndex, setActiveImageIndex] = useState(0);

//   useEffect(() => {
//     api.get(`orphanages/${params.id}`).then((response) => {
//       setOrphanage(response.data);
//     });
//   }, [params.id]);

//   if (!orphanage) {
//     return <p>Loading...</p>;
//   }

//   return (
//     <div id="page-orphanage">
//       <SideBar />

//       <main>
//         <div className="orphanage-details">
//           <img
//             src={orphanage.images[activeImageIndex].url}
//             alt={orphanage.name}
//           />

//           <div className="images">
//             {orphanage.images.map((image, index) => {
//               return (
//                 <button
//                   onClick={() => setActiveImageIndex(index)}
//                   key={image.id}
//                   className={activeImageIndex === index ? "active" : ""}
//                   type="button"
//                 >
//                   <img src={image.url} alt={orphanage.name} />
//                 </button>
//               );
//             })}
//           </div>

//           <div className="orphanage-details-content">
//             <h1>{orphanage.name}</h1>
//             <p>{orphanage.about}</p>

//             <div className="map-container">
//               <Map
//                 center={[orphanage.latitude, orphanage.longitude]}
//                 zoom={16}
//                 style={{ width: "100%", height: 280 }}
//                 dragging={false}
//                 touchZoom={false}
//                 zoomControl={false}
//                 scrollWheelZoom={false}
//                 doubleClickZoom={false}
//               >
//                 <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//                 <Marker
//                   interactive={false}
//                   icon={mapIcon}
//                   position={[orphanage.latitude, orphanage.longitude]}
//                 />
//               </Map>

//               <footer>
//                 <a
//                   target="_blank"
//                   rel="noopener noreferrer"
//                   href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`}
//                 >
//                   Ver rotas no Google Maps
//                 </a>
//               </footer>
//             </div>

//             <hr />

//             <h2>Instruções para visita</h2>
//             <p>{orphanage.instructions}</p>

//             <div className="open-details">
//               <div className="hour">
//                 <FiClock size={32} color="#15B6D6" />
//                 Segunda à Sexta <br />
//                 {orphanage.opening_hours}
//               </div>
//               {orphanage.open_on_weekends ? (
//                 <div className="open-on-weekends">
//                   <FiInfo size={32} color="#39CC83" />
//                   Atendemos <br />
//                   fim de semana
//                 </div>
//               ) : (
//                 <div className="open-on-weekends dont-open">
//                   <FiInfo size={32} color="#FF6690" />
//                   Não Atendemos <br />
//                   fim de semana
//                 </div>
//               )}
//             </div>

//             {/* <button type="button" className="contact-button">
//               <FaWhatsapp size={20} color="#FFF" />
//               Entrar em contato
//             </button> */}
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

// import React, { useEffect, useState } from "react";
// import { FaWhatsapp } from "react-icons/fa";
// import { FiClock, FiInfo } from "react-icons/fi";
// import { Map, Marker, TileLayer } from "react-leaflet";
// import L from "leaflet";
// import mapMarkerImg from "../../assets/images/local2.svg";
// import "../Orphanage/styles.css";
// import Sidebar from "../../components/Sidebar";
// import api from "../../services/api";
// import { useParams } from "react-router-dom";

// interface Orphanage {
//   latitude: number;
//   longitude: number;
//   name: string;
//   about: string;
//   instructions: string;
//   opening_hours: string;
//   open_on_weekends: string;
//   images: Array<{
//     id: number;
//     url: string;
//   }>;
// }

// const happyMapIcon = L.icon({
//   iconUrl: mapMarkerImg,

//   iconSize: [58, 68],
//   iconAnchor: [29, 68],
//   popupAnchor: [0, -60],
// });

// interface OrphanageParams {
//   id: string;
// }

// export default function Orphanage() {
//   const params = useParams<OrphanageParams>();
//   const [orphanage, setOrphanage] = useState<Orphanage>();

//   useEffect(() => {
//     api.get(`orphanages/${params.id}`).then((response) => {
//       setOrphanage(response.data);
//     });
//   }, [params.id]);

//   if (!orphanage) {
//     return <p>Carregando...</p>;
//   }
//   return (
//     <div id="page-orphanage">
//       <Sidebar />

//       <main>
//         <div className="orphanage-details">
//           <img src={orphanage.images[0].url} alt={orphanage.name} />

//           <div className="images">
//             {orphanage.images.map((image) => {
//               return (
//                 <button key={image.id} className="active" type="button">
//                   <img src={image.url} alt={orphanage.name} />
//                 </button>
//               );
//             })}
//           </div>

//           <div className="orphanage-details-content">
//             <h1>{orphanage.name}</h1>
//             <p>{orphanage.about}</p>

//             <div className="map-container">
//               <Map
//                 center={[orphanage.latitude, orphanage.longitude]}
//                 zoom={16}
//                 style={{ width: "100%", height: 280 }}
//                 dragging={false}
//                 touchZoom={false}
//                 zoomControl={false}
//                 scrollWheelZoom={false}
//                 doubleClickZoom={false}
//               >
//                 <TileLayer url="https://a.tile.openstreetmap.org/{z}/{x}/{y}.png" />
//                 <Marker
//                   interactive={false}
//                   icon={happyMapIcon}
//                   position={[orphanage.latitude, orphanage.longitude]}
//                 />
//               </Map>

//               <footer>
//                 <a
//                   href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage.latitude},${orphanage.longitude}`}
//                 >
//                   Ver rotas no Google Maps
//                 </a>
//               </footer>
//             </div>

//             <hr />

//             <h2>Instruções para visita</h2>
//             <p>{orphanage.instructions}</p>

//             <div className="open-details">
//               <div className="hour">
//                 <FiClock size={32} color="#15B6D6" />
//                 {orphanage.opening_hours}
//               </div>
//               {orphanage.open_on_weekends ? (
//                 <div className="open-on-weekends">
//                   <FiInfo size={32} color="#39CC83" />
//                   Atendemos <br />
//                   fim de semana
//                 </div>
//               ) : (
//                 <div className="open-on-weekends dont-open">
//                   <FiInfo size={32} color="#ff6699" />
//                   Não atendemos <br />
//                   fim de semana
//                 </div>
//               )}
//             </div>

//             <button type="button" className="contact-button">
//               <FaWhatsapp size={20} color="#FFF" />
//               Entrar em contato
//             </button>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }
