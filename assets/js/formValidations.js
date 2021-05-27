import {
  required,
  minLength,
  maxLength,
  numeric,
  url,
  email,
} from 'vuelidate/lib/validators'
import phone from '~/assets/js/validatePhone'

export const createPostValidations = {
  form: {
    name: {
      required,
      maxLength: maxLength(100),
    },
    description: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(1000),
    },
    end_time: {
      required,
    },
    start_time: {
      required,
    },
    venue: {
      required,
      maxLength: maxLength(500),
    },
    num_of_tickets: {
      required,
      numeric,
    },
    tickets_sale_end_date: {
      required,
    },
  },
  facebook: {
    url,
  },
  instagram: {
    url,
  },
  twitter: {
    url,
  },
  linkedin: {
    url,
  },
}

export const registrationValidations = {
  form: {
    name: {
      required,
      minLength: minLength(4),
      maxLength: maxLength(30),
    },
    email: {
      required,
      email,
    },
    phone: {
      required,
      phone,
    },
  },
}
