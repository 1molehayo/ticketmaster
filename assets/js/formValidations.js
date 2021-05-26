import {
  required,
  minLength,
  maxLength,
  numeric,
  url,
} from 'vuelidate/lib/validators'

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
