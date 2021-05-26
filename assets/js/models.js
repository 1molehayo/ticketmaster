export const postEventModel = () => ({
  form: {
    name: '',
    description: '',
    end_time: '',
    start_time: '',
    venue: '',
    num_of_tickets: '',
    tickets_sale_end_date: '',
    tags: '',
    is_free: 0,
    image: '',
    social_links: {},
  },
  facebook: '',
  twitter: '',
  instagram: '',
  linkedin: '',
  loading: false,
  is_free_options: [
    {
      label: 'Yes',
      value: 1,
    },
    {
      label: 'No',
      value: 0,
    },
  ],
  tags: [],
  feedback: {
    status: '',
    message: '',
  },
})
