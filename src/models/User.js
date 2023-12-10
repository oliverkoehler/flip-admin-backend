import { model, Schema } from 'mongoose'


const userSchema = new Schema({
  name: String,
  tornId: Number,
  discordId: { type: String, unique: true, required: true },
  discordDMChannel: { type: String, unique: true },
  apiKey: String,
  accessToken: { type: Schema.Types.ObjectId, ref: 'AccessToken', unique: true },
  notifications: { type: Boolean, default: true },
  buyNotifications: { type: Boolean, default: true },
  sellNotifications: { type: Boolean, default: true },
  defaultBuyMargin: { type: Number, default: 3 },
  defaultSellMargin: { type: Number, default: 3 },
},
{ timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })

export default model('User', userSchema)