const cartSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  items: [
    {
      productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product" },
      quantity: { type: Number, default: 1 },
      attributes: { type: Map, of: String } // size, color etc.
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("Cart", cartSchema);
