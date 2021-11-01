import mongoose from 'mongoose';

// Pet properties
interface PetAttrs {
  name: string;
  species: string;
  gender: string;
  age: number;
  birthdate: string;
}

// Pet model
interface PetModel extends mongoose.Model<PetDoc> {
  build(attrs: PetAttrs): PetDoc;
}

// Pet document
interface PetDoc extends mongoose.Document {
  name: string;
  species: string;
  gender: string;
  age: number;
  birthdate: string;
}

const petSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    species: {
      type: String,
      required: true
    },
    gender: {
      type: String,
      required: true
    },
    age: {
      type: Number,
      required: true
    },
    birthdate: {
      type: String,
      required: true
    }
  },
  {
    toJSON: {
      transform(doc, ret) {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      }
    }
  }
);

// Builder
petSchema.statics.build = (attrs: PetAttrs) => {
  return new Pet(attrs);
};

const Pet = mongoose.model<PetDoc, PetModel>('Pet', petSchema);

export { Pet };
