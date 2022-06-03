import { defineStore } from 'pinia';

export const useRsvpStore = defineStore({
  id: 'rsvp',
  state: () => ({
    email: '',
    name: '',
    phone: '',
    attending: true,
    numberOfAdults: null,
    numberOfChildren: null,
    dish: '',
  }),
});
