import axios from 'axios'

export const instance = axios.create({
  baseURL: 'https://gqkuommdmfzmwkzdewma.supabase.co/rest/v1/steam?select=*',
  headers: {
    apikey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdxa3VvbW1kbWZ6bXdremRld21hIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NDkyNjQyNTIsImV4cCI6MTk2NDg0MDI1Mn0.iF651HDhqynAQRlG8T6wFS3ZEx4dqxHiEiguc0m7-zI',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzZWNyZXQiOiI4NjFlM2FlNDJmZjJhZWNlNjg1ODQ2ZGEiLCJpYXQiOjE2NzIxMDQxNzV9.8ZSChBUq58NYt9UrCrEqmKH_ojKjzgK8tc2fYLN_reY',
  },
})

