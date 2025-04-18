'use client';
import axios from 'axios';
import { QuoteRequest, QuoteResponse } from '@/models/quote/quote';

const BASE_URL = process.env.NEXT_PUBLIC_API_URL || '';

if (!BASE_URL) {  
  console.error('NEXT_PUBLIC_API_URL environment variable is not defined');  
}

export const createQuote = async (data: QuoteRequest): Promise<QuoteResponse> => {
  try {
    const response = await axios.post(`${BASE_URL}/quote`, data, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error('Error creating quote:', error);
    throw error;
  }
};

export const getQuoteById = async (id: string): Promise<QuoteResponse> => {
  try {
    const response = await axios.get(`${BASE_URL}/quote/${id}`, {
      withCredentials: true,
    });
    return response.data;
  } catch (error) {
    console.error(`Error fetching quote with ID ${id}:`, error);
    throw error;
  }
};  