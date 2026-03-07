
  // ---------- CART STATE ----------
  let cart = [];
  let deliveryMode = 'delivery';
  let payMethod = 'efectivo';

  function addToCart(name, price) {
    const existing = cart.find(i => i.name === name);
    if (existing) {
      existing.qty++;
    } else {
      cart.push({ name, price, qty: 1 });
    }
    updateCartUI();
    openCart();
  }

  function updateCartUI() {
    const itemsEl = document.getElementById('cartItems');
    const footerEl = document.getElementById('cartFooter');
    const countEl = document.getElementById('cartCount');
    const totalEl = document.getElementById('cartTotal');

    const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
    const qty = cart.reduce((s, i) => s + i.qty, 0);

    countEl.textContent = qty;
    countEl.style.display = qty > 0 ? 'flex' : 'none';
    totalEl.textContent = 'S/. ' + total.toFixed(2);
    footerEl.style.display = cart.length ? 'block' : 'none';

    if (cart.length === 0) {
      itemsEl.innerHTML = '<div class="cart-empty"><div style="font-size:3rem">🛒</div><p>Tu carrito está vacío.<br>Agrega platos del menú.</p></div>';
      return;
    }

    itemsEl.innerHTML = cart.map((item, idx) => `
      <div class="cart-item">
        <div class="cart-item-emoji">🍽️</div>
        <div class="cart-item-info">
          <div class="cart-item-name">${item.name}</div>
          <div class="cart-item-price">S/. ${(item.price * item.qty).toFixed(2)}</div>
        </div>
        <div class="cart-qty">
          <button class="qty-btn" onclick="changeQty(${idx}, -1)">−</button>
          <span class="qty-num">${item.qty}</span>
          <button class="qty-btn" onclick="changeQty(${idx}, 1)">+</button>
        </div>
        <button class="remove-btn" onclick="removeFromCart(${idx})" title="Eliminar plato">🗑️</button>
      </div>
    `).join('');
  }

  function changeQty(idx, delta) {
    cart[idx].qty += delta;
    if (cart[idx].qty <= 0) cart.splice(idx, 1);
    updateCartUI();
  }

  function removeFromCart(idx) {
    cart.splice(idx, 1);
    updateCartUI();
  }

  // ---------- CART SIDEBAR ----------
  function openCart() {
    document.getElementById('cartSidebar').classList.add('open');
    document.getElementById('overlay').classList.add('show');
    document.body.classList.add('no-scroll');
  }
  function closeCart() {
    document.getElementById('cartSidebar').classList.remove('open');
    document.getElementById('overlay').classList.remove('show');
    document.body.classList.remove('no-scroll');
  }
  function toggleCart() {
    const s = document.getElementById('cartSidebar');
    if (s.classList.contains('open')) closeCart(); else openCart();
  }

  // ---------- CONTINUE SHOPPING ----------
  function continueShopping() {
    closeCart();
    // Scroll to menu section
    document.getElementById('menu').scrollIntoView({ behavior: 'smooth' });
  }

  // ---------- CHECKOUT ----------
  function openCheckout() {
    closeCart();
    buildOrderSummary();
    document.getElementById('checkoutModal').classList.add('open');
    document.getElementById('checkoutForm').style.display = 'block';
    document.getElementById('successScreen').classList.remove('show');
    document.body.classList.add('no-scroll');
  }
  function closeCheckout() {
    document.getElementById('checkoutModal').classList.remove('open');
    document.body.classList.remove('no-scroll');
  }

  function buildOrderSummary() {
    const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
    const lines = cart.map(i => `<div class="order-line"><span>${i.name} x${i.qty}</span><span>S/. ${(i.price*i.qty).toFixed(2)}</span></div>`).join('');
    document.getElementById('orderSummaryBox').innerHTML = `
      <div class="order-summary-title">📋 Resumen del pedido</div>
      ${lines}
      <div class="order-line total"><span>TOTAL</span><span>S/. ${total.toFixed(2)}</span></div>
    `;
  }

  function selectMode(mode) {
    deliveryMode = mode;
    document.getElementById('togDelivery').classList.toggle('selected', mode==='delivery');
    document.getElementById('togRecojo').classList.toggle('selected', mode==='recojo');
    document.getElementById('deliveryFields').style.display = mode==='delivery' ? 'block' : 'none';
  }

  function selectPay(method) {
    payMethod = method;
    ['efectivo','yape','plin','transferencia'].forEach(m => {
      document.getElementById('pay-'+m).classList.toggle('selected', m===method);
    });
    document.getElementById('qrSection').classList.toggle('show', method==='yape' || method==='plin');
    document.getElementById('bankSection').classList.toggle('show', method==='transferencia');
  }

  function sendOrder() {
    const name = document.getElementById('clientName').value.trim();
    const phone = document.getElementById('clientPhone').value.trim();
    const address = document.getElementById('clientAddress').value.trim();
    const notes = document.getElementById('clientNotes').value.trim();

    if (!name || !phone) { alert('Por favor ingresa tu nombre y teléfono 😊'); return; }
    if (deliveryMode === 'delivery' && !address) { alert('Por favor ingresa tu dirección de entrega 📍'); return; }
    if (cart.length === 0) { alert('Tu carrito está vacío'); return; }

    const total = cart.reduce((s, i) => s + i.price * i.qty, 0);
    const items = cart.map(i => `  • ${i.name} x${i.qty} = S/. ${(i.price*i.qty).toFixed(2)}`).join('\n');
    const modeText = deliveryMode === 'delivery' ? `Delivery a: ${address}` : 'Recojo en local (Jr. Zepita #349)';
    const payText = { efectivo:'Efectivo', yape:'Yape', plin:'Plin', transferencia:'Transferencia Bancaria' }[payMethod];

    const msg = `🍗 *NUEVO PEDIDO – Antojitos al Paso*\n\n` +
      `👤 *Cliente:* ${name}\n` +
      `📞 *Teléfono:* ${phone}\n` +
      `🛵 *Modalidad:* ${modeText}\n` +
      `💳 *Pago:* ${payText}\n\n` +
      `📋 *Pedido:*\n${items}\n\n` +
      `💰 *TOTAL: S/. ${total.toFixed(2)}*` +
      (notes ? `\n\n📝 *Notas:* ${notes}` : '') +
      `\n\n⏰ Pedido realizado vía web`;

    window.open('https://wa.me/51982936262?text=' + encodeURIComponent(msg), '_blank');

    document.getElementById('checkoutForm').style.display = 'none';
    document.getElementById('successScreen').classList.add('show');
    cart = [];
    updateCartUI();
  }

  // ---------- TABS ----------
  function showTab(tab) {
    document.querySelectorAll('.panel').forEach(p => p.classList.remove('active'));
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.getElementById(tab).classList.add('active');
    event.target.classList.add('active');
  }

  // ---------- NAV MOBILE ----------
  function toggleNav() {
    document.getElementById('navLinks').classList.toggle('open');
  }

  // ---------- INIT ----------
  updateCartUI();
  selectMode('delivery');
  selectPay('efectivo');

  // ---------- OVERLAY CLICK ----------
  document.getElementById('overlay').addEventListener('click', function() {
    closeCart();
  });
