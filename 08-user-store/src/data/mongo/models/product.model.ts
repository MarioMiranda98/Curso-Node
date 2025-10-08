import { Schema } from "mongoose";
import moongose from 'mongoose';

const productSchema = new moongose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    unique: true,
  },
  price: {
    type: Number,
    default: 0,
  },
  description: {
    type: String,
  },
  available: {
    type: Boolean,
    default: false,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true,
  }
});

productSchema.set('toJSON', {
  virtuals: true,
  versionKey: false,
  transform: function (doc, ret, options) {
    delete (ret as any)._id;
  }
});

export const ProductModel = moongose.model('Product', productSchema);