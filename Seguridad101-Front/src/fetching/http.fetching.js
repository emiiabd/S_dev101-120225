import React from "react";
import { ENVIROMENT } from "../Data/data";

const APIK = 'e716b50f-1964-48a4-a1b1-8d876410a235'
const URL_BACK = ENVIROMENT.URL_BACK


const getHeaders = () => {
  const authHeaders = new Headers();
  authHeaders.append('Content-Type', 'application/json');
  authHeaders.append('x-api-key', APIK);
  //If we doesn't have token, it will be undefined, and the backend will verificate that
  authHeaders.append('Authorization', `Bearer ${sessionStorage.getItem('access_token')}`);
  return authHeaders
}

const POST = async (ENDPOINT, body) => {
  try {
    const response = await fetch(`${URL_BACK}/${ENDPOINT}`, {
      method: 'POST',
      headers: getHeaders(),
      body: JSON.stringify(body)
    });
    const res = await response.json()
    return res;
  } catch (error) {
    console.log(error)
    throw error;
  }
}

const GET = async (ENDPOINT) => {
  try {
    const response = await fetch(`${URL_BACK}/${ENDPOINT}`, {
      method: 'GET',
      headers: getHeaders(),
    });
    return response.json();
  } catch (error) {
    throw error;
  }
}

const DELETE = async (ENDPOINT) => {
  try {
    const response = await fetch(`${URL_BACK}/${ENDPOINT}`, {
      method: 'DELETE',
      headers: getHeaders()
    });

    if (response.status === 403) {
      throw { detail: 'No token' }
    }
    return response.json();
  } catch (error) {
    throw error;
  }
}

const PUT = async (ENDPOINT, body) => {
  try {
    const response = await fetch(`${URL_BACK}/${ENDPOINT}`, {
      method: 'PUT',
      headers: getHeaders(),
      body: JSON.stringify(body)
    });
    return response.json();
  } catch (error) {
    throw error;
  }
}

export { POST, GET, DELETE, PUT}
