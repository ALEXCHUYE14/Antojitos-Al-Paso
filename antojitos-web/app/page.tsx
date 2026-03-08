import Image from 'next/image'
import { client, urlFor, getTodosProductos } from '@/lib/sanity'

// Función para obtener los datos del servidor
async function getData() {
  // Si no hay proyecto configurado, devuelve datos de ejemplo
  const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  
  if (!projectId || projectId === 'TU_PROJECT_ID') {
    return getDatosEjemplo()
  }
  
  try {
    const productos = await getTodosProductos()
    return { productos }
  } catch (error) {
    console.error('Error fetching from Sanity:', error)
    return getDatosEjemplo()
  }
}

function getDatosEjemplo() {
  return {
    productos: [
      // Pollo a la Brasa
      { _id: '1', nombre: 'Pollo Entero', descripcion: 'Pollo a la brasa entero, dorado y jugoso. Incluye papas y ensalada.', precio: 54, categoria: 'brasa', disponible: true, destacado: true, imagen: null },
      { _id: '2', nombre: '½ de Pollo', descripcion: 'Media porción de pollo a la brasa con papas y ensalada fresca.', precio: 28, categoria: 'brasa', disponible: true, imagen: null },
      { _id: '3', nombre: '¼ de Pollo', descripcion: 'Cuarto de pollo a la brasa, acompañado de papas y ensalada.', precio: 15, categoria: 'brasa', disponible: true, imagen: null },
      { _id: '4', nombre: '⅛ de Pollo', descripcion: 'Un octavo de pollo a la brasa, ideal para un antojo rápido.', precio: 10, categoria: 'brasa', disponible: true, imagen: null },
      { _id: '5', nombre: 'Mostrito', descripcion: 'Especialidad de la casa. Porciones selectas de pollo en su punto.', precio: 11, categoria: 'brasa', disponible: true, destacado: true, imagen: null },
      // Fast Food
      { _id: '6', nombre: 'Pollo Broaster', descripcion: 'Pollo crujiente estilo broaster, dorado por fuera y jugoso por dentro.', precio: 10, categoria: 'fastfood', disponible: true, destacado: true, imagen: null },
      { _id: '7', nombre: 'Pollo a la Plancha', descripcion: 'Pollo a la plancha, sazonado y preparado al momento.', precio: 10, categoria: 'fastfood', disponible: true, imagen: null },
      { _id: '8', nombre: 'Mollejitas', descripcion: 'Mollejas tiernas y bien sazonadas, una delicia irresistible.', precio: 10, categoria: 'fastfood', disponible: true, imagen: null },
      { _id: '9', nombre: 'Alitas Picantes', descripcion: 'Alitas de pollo bañadas en salsa picante, adictivamente deliciosas.', precio: 16, categoria: 'fastfood', disponible: true, destacado: true, imagen: null },
      { _id: '10', nombre: 'Hamburgesas', descripcion: 'Hamburguesa jugosa con lechuga, tomate, mayonesa y queso derretido.', precio: 6.50, categoria: 'fastfood', disponible: true, imagen: null },
      { _id: '11', nombre: 'Shalchipapa', descripcion: 'Salchicha con papas fritas y salsas, el snack perfecto del momento.', precio: 7.50, categoria: 'fastfood', disponible: true, destacado: true, imagen: null },
      { _id: '12', nombre: 'Aguadito', descripcion: 'Caldo tradicional de pollo con arroz, culantro y especias.', precio: 4.50, categoria: 'fastfood', disponible: true, imagen: null },
      { _id: '13', nombre: 'Salchichaufa', descripcion: 'Arroz chaufa con salchicha, un clásico fusión peruano-oriental.', precio: 9, categoria: 'fastfood', disponible: true, imagen: null },
      { _id: '14', nombre: 'Pollo Plancha A Lo Pobre', descripcion: 'Pollo a la plancha con arroz, papa frita, huevo frito y plátano.', precio: 13, categoria: 'fastfood', disponible: true, imagen: null },
      { _id: '15', nombre: 'Cebada – Maracuyá', descripcion: 'Bebida refrescante de cebada con sabor a maracuyá, hecha en casa.', precio: 6.50, categoria: 'fastfood', disponible: true, imagen: null },
    ]
  }
}

export default async function Home() {
  const { productos } = await getData()
  
  const productosBresa = productos.filter((p: any) => p.categoria === 'brasa')
  const productosFastfood = productos.filter((p: any) => p.categoria === 'fastfood')

  return (
    <main>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <div className="hero-badge">🔥 Restaurante en Catacaos</div>
          <h1>Antojitos<span>al paso</span></h1>
          <p className="hero-sub">Super Delicioso Fast Food & Pollo a la Brasa</p>
          <div className="hero-horario">
            <p>⏰ <strong>Martes a Domingo</strong> &nbsp;|&nbsp; <strong>6:00 PM – 12:00 PM</strong></p>
            <p>📍 Jr. Zepita # 349 – Catacaos &nbsp;|&nbsp; 📞 982 936 262</p>
          </div>
          <div className="hero-btns">
            <a href="#menu" className="btn-primary">🍗 Ver Carta</a>
            <a href="https://wa.me/51982936262" target="_blank" className="btn-outline">💬 WhatsApp</a>
          </div>
        </div>
      </section>

      {/* Menú */}
      <section id="menu">
        <div className="section-header">
          <p className="section-label">🍽️ Lo que tenemos para ti</p>
          <h2 className="section-title">Nuestra Carta</h2>
          <p className="section-desc">Escoge tu plato favorito y agrégalo al carrito</p>
        </div>

        <div className="menu-tabs">
          <button className="tab-btn active" data-tab="brasa">🔥 Pollo a la Brasa</button>
          <button className="tab-btn" data-tab="fastfood">🍔 Fast Food</button>
        </div>

        {/* Pollo a la Brasa */}
        <div className="panel active" id="brasa">
          <div className="menu-grid">
            {productosBresa.map((producto: any) => (
              <div key={producto._id} className="menu-card">
                <div className="card-icon">
                  {producto.imagen ? (
                    <Image 
                      src={urlFor(producto.imagen).url()} 
                      alt={producto.nombre}
                      width={400}
                      height={300}
                      style={{ objectFit: 'cover' }}
                    />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem' }}>
                      🍗
                    </div>
                  )}
                  {producto.destacado && <span className="badge-hot">⭐ Popular</span>}
                </div>
                <div className="card-body">
                  <div className="card-name">{producto.nombre}</div>
                  <div className="card-desc">{producto.descripcion}</div>
                  <div className="card-footer">
                    <div className="card-price"><small>S/.</small> {producto.precio.toFixed(2)}</div>
                    <button className="add-btn" onClick={() => addToCart(producto.nombre, producto.precio)}>+</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Fast Food */}
        <div className="panel" id="fastfood">
          <div className="menu-grid">
            {productosFastfood.map((producto: any) => (
              <div key={producto._id} className="menu-card">
                <div className="card-icon">
                  {producto.imagen ? (
                    <Image 
                      src={urlFor(producto.imagen).url()} 
                      alt={producto.nombre}
                      width={400}
                      height={300}
                      style={{ objectFit: 'cover' }}
                    />
                  ) : (
                    <div style={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '4rem' }}>
                      🍔
                    </div>
                  )}
                  {producto.destacado && <span className="badge-hot">🔥 Hot</span>}
                </div>
                <div className="card-body">
                  <div className="card-name">{producto.nombre}</div>
                  <div className="card-desc">{producto.descripcion}</div>
                  <div className="card-footer">
                    <div className="card-price"><small>S/.</small> {producto.precio.toFixed(2)}</div>
                    <button className="add-btn" onClick={() => addToCart(producto.nombre, producto.precio)}>+</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Client-side cart logic */}
      <script dangerouslySetInnerHTML={{ __html: `
        let cart = [];
        let deliveryMode = 'delivery';
        let payMethod = 'efectivo';
        const DELIVERY_FEE = 3.00;

        function addToCart(name, price) {
          const existing = cart.find(i => i.name === name);
          if (existing) {
            existing.qty++;
          } else {
            cart.push({ name, price, qty: 1 });
          }
          updateCartUI();
          toggleCart(true);
        }

        function updateCartUI() {
          const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
          const qty = cart.reduce((s, i) => s + i.qty, 0);
          document.getElementById('cartCount').textContent = qty;
          document.getElementById('cartTotal').textContent = 'S/. ' + total.toFixed(2);
        }

        function toggleCart(open) {
          const sidebar = document.getElementById('cartSidebar');
          const overlay = document.getElementById('overlay');
          if (open) {
            sidebar.classList.add('open');
            overlay.classList.add('show');
            document.body.classList.add('no-scroll');
          } else {
            sidebar.classList.remove('open');
            overlay.classList.remove('show');
            document.body.classList.remove('no-scroll');
          }
        }

        // Tab switching
        document.querySelectorAll('.tab-btn').forEach(btn => {
          btn.addEventListener('click', () => {
            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
            btn.classList.add('active');
            document.getElementById(btn.dataset.tab).classList.add('active');
          });
        });
      `}} />
    </main>
  )
}
