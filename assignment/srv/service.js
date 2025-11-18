const cds = require("@sap/cds");
 
module.exports = cds.service.impl(async function () {
 
  const { Books, Orders } = this.entities;
 
  this.on("orderSubmit", async (req) => {
    const { bookID, qty } = req.data;
 
    // Fetch book
    const book = await SELECT.one.from(Books).where({ ID: bookID });
 
    if (!book) return req.error(404, "Book not found");
    if (!book.available) return req.error(400, "Book is not available");
    if (book.stock < qty)
      return req.error(400, `Not enough stock. Available: ${book.stock}`);
 
    // Calculate amount
    const amount = book.price * qty;
 
    // Insert order
    await INSERT.into(Orders).entries({
      ID: Date.now(),  // auto ID
      bookID,
      qty,
      amount
    });
 
    // Update stock
    await UPDATE(Books)
      .set({ stock: book.stock - qty })
      .where({ ID: bookID });
 
    return `Order submitted successfully for Book ID ${bookID}, Qty ${qty}, Amount ${amount}`;
  });
 
});