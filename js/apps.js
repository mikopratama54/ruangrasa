document.addEventListener("alpine:init", () => {
    Alpine.data("products", () => ({
      items: [
        { id: 1, name: "Robusta Brazil", img: "001.jpg", price: 25000 },
        { id: 2, name: "Kopi nganu papua", img: "006.jpg", price: 30000 },
        { id: 3, name: "Primo Passo", img: "003.jpg", price: 25000 },
        { id: 4, name: "Aceh Gayo", img: "004.jpg", price: 25000 },
        { id: 5, name: "Sumatra Manheling", img: "007.jpg", price: 25000 },
        { id: 5, name: "Kopi lampung", img: "008.jpg", price: 25000 },
        { id: 5, name: "Kopi toraja", img: "005.jpg", price: 25000 },
        { id: 5, name: "Kopi bali kintamani", img: "002.jpg", price: 25000 },
      ],
    }));
    Alpine.store("cart", {
      items: [],
      total: 0,
      quantity: 0,
      add(newItem) {
        // cek apakah ada barang yang sama di cart
        const cartItem = this.items.find((item) => item.id === newItem.id);
        // jika belum ada / cart masih kosong
        if (!cartItem) {
          this.items.push({ ...newItem, quantity: 1, total: newItem.price });
          this.quantity++;
          this.total += newItem.price;
        } else {
          // jika barang sudah ada. cek apakah barang beda atau sama dengan barang yang ada di cart
          this.items = this.items.map((item) => {
            // jika barang berbeda
            if (item.id !== newItem.id) {
              return item;
            } else {
              // jika barang sudah ada. Quantity dan totalnya
              item.quantity++;
              item.total = item.price * item.quantity;
              this.quantity++;
              this.total += item.price;
              return item;
            }
          });
        }
        //   console.log(this.total);
      },
      remove(id) {
        // ambil item yang mau di remove berdasarkan id
        const cartItem = this.items.find((item) => item.id === id);
        // jika item lebih dari 1
        if (cartItem.quantity > 1) {
          // telusuri 11
          this.items = this.items.map((item) => {
            // jika bukan barang yang di klik
            if (item.id !== id) {
              return item;
            } else {
              item.quantity--;
              item.total = item.price * item.quantity;
              this.quantity--;
              this.total -= item.price;
              return item;
            }
          });
        } else if (cartItem.quantity === 1) {
          // jika barangnya sisa 1
          this.items = this.items.filter((item) => item.id !== id);
          this.quantity--;
          this.total -= cartItem.price;
        }
      },
    });
  });
  // konfersi ke rupiah
  const rupiah = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(number);
  };