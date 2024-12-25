import { Quote } from "~~/server/models/quote-model";

export default defineEventHandler( async (event) => {
    const quotes = await Quote.find().sort({ _id: -1 });
    return {
      quotes: quotes
    }

})