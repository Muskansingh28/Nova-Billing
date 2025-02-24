import mongoose from "mongoose";
import User from "./userModel.js";
import { string } from "zod";

const {Schema, model} = mongoose;

const invoiceSchema = new Schema(
    {
        date : {
            type : String,
        },
        
        invoiceNo : {
            type: String,
        },

        billedTo : {
            type: {
              client: String,
              address: String,
              city: String,
              pincode: String,
              state: String,
              phoneNumber: String,
            },
          },

        amount : {
            type : Number,
        },

        total : {
            type : Number,
        },

        status : {
            type : Boolean,
            default : false,
        },

        orderStatus : {
            type : Boolean,
            default : true,
        },

        items : [
            {
                itemName : {
                    type : String,
                    default : ''
                },
                
                qty : {
                    type : Number,
                    default : 1
                },
                
                rate : {
                    type : Number,
                    default : 1
                },

                amount : {
                    type : Number,
                    default : 1
                },
            }
        ],
        
        user: { type: Schema.Types.ObjectId, ref: 'User' }
    },
);

const Invoice = model("Invoice", invoiceSchema);
export default Invoice;