import React from 'react'
import Review from './Review';
import '../styles/Main.css';

const reviews = [
  {
    name: "Juan Pérez",
    comment: "Excelente calidad y servicio.",
    rating: 5,
    img: "/img/JuanPerez.png"
  },
  {
    name: "Ana Gómez",
    comment: "Muy recomendable, volveré a comprar.",
    rating: 4,
    img: "img/AnaGomez.png"
  }
];

function Main() {
  return (
    <main className="main-container">
      <h1>Sabores Venearg</h1>
      <section>

        <h3>Rinconcito de sabores Venezolanos en Argentina</h3>
        <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quos rerum natus culpa odio
          accusantium vel tenetur distinctio error optio fuga, illo atque, ipsa consectetur
          porro
          quis perferendis. Doloremque, maiores. Fugiat. Lorem ipsum dolor, sit amet consectetur adipisicing elit.
          Placeat tenetur et dolor. Accusamus quis, suscipit vero voluptatibus iure ipsum sit ipsam voluptatum, at
          magnam, dolore nemo illo sapiente animi sint.</p>
        <p>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Ipsa laudantium laborum,
          reprehenderit suscipit necessitatibus sequi quibusdam facere eveniet reiciendis
          sapiente
          accusamus assumenda. Quisquam quia necessitatibus vero libero doloribus placeat
          officia? Lorem ipsum dolor sit amet consectetur adipisicing elit. Veritatis exercitationem ipsam quia
          non voluptate quod, earum deserunt pariatur dicta odio fugiat possimus vero, repellendus, labore illum
          inventore qui. Odit, commodi!
        </p>

      </section>


      <section className="section-reviews">
        <h2 className="reviews-title">Opiniones de nuestros clientes</h2>
        <div className="reviews-container">
          {reviews.map((rev, idx) => (
            <Review
              key={idx}
              name={rev.name}
              comment={rev.comment}
              rating={rev.rating}
              img={rev.img}
            />
          ))}
        </div>
      </section>
    </main>
  );
}
export default Main; 