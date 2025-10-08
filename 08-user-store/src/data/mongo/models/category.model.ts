import moongose, { Schema } from 'mongoose';

const categorySchema = new moongose.Schema({
  name: {
    type: String,
    required: [true, 'Name is required'],
    unique: true,
  },
  available: {
    type: Boolean,
    default: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
});

export const CategoryModel = moongose.model('Category', categorySchema);