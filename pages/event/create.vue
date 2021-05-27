<template>
  <main class="page__body create-event">
    <section class="section">
      <div class="container">
        <h3 class="text-center">Create Event</h3>
        <div class="create-event__card">
          <form
            v-if="!feedback.status"
            class="row form"
            :class="{ 'create-event__card--sm': feedback.status }"
            @submit.prevent="handleSubmit"
          >
            <div class="col-md-6">
              <FormField
                id="name"
                v-model.trim="$v.form.name.$model"
                :is-required="true"
                :field="$v.form.name"
                label="Name"
              />
            </div>

            <div class="col-md-6">
              <FormField
                id="num_of_tickets"
                v-model.trim="$v.form.num_of_tickets.$model"
                :is-required="true"
                :field="$v.form.num_of_tickets"
                label="Number of tickets"
                type="text"
              />
            </div>

            <DateTimeField
              id="start_time"
              :required="$v.form.start_time.required"
              :error="$v.form.start_time.error"
              :is-required="true"
              label="Start time"
            >
              <Datetime
                v-model="$v.form.start_time.$model"
                input-id="start_time"
                type="time"
                class="datetime form__datetime"
                input-class="form__input"
              ></Datetime>
            </DateTimeField>

            <DateTimeField
              id="end_time"
              :required="$v.form.end_time.required"
              :error="$v.form.end_time.error"
              :is-required="true"
              label="End time"
            >
              <Datetime
                v-model="$v.form.end_time.$model"
                input-id="end_time"
                type="time"
                class="datetime form__datetime"
                input-class="form__input"
              ></Datetime>
            </DateTimeField>

            <DateTimeField
              id="tickets_sale_end_date"
              :required="$v.form.tickets_sale_end_date.required"
              :error="$v.form.tickets_sale_end_date.error"
              :is-required="true"
              label="Tickets sale end date"
            >
              <Datetime
                v-model="$v.form.tickets_sale_end_date.$model"
                input-id="tickets_sale_end_date"
                type="date"
                class="datetime form__datetime"
                :min-datetime="minDate"
                input-class="form__input"
              ></Datetime>
            </DateTimeField>

            <div class="col-md-6 d-flex flex-column">
              <label class="form__label">Event is free? </label>

              <div class="d-flex form__group filler">
                <RadioButtonGroup
                  v-model="form.is_free"
                  name="is_free"
                  :options="is_free_options"
                />
              </div>
            </div>

            <div class="col-12">
              <FormField
                id="description"
                v-model.trim="$v.form.description.$model"
                :field="$v.form.description"
                :is-required="true"
                label="Description"
                type="textarea"
              />
            </div>

            <div class="col-12">
              <FormField
                id="venue"
                v-model.trim="$v.form.venue.$model"
                :field="$v.form.venue"
                :is-required="true"
                label="Venue"
                type="textarea"
              />
            </div>

            <div class="col-12">
              <div class="form__group">
                <ImageUpload v-model="form.image" />
              </div>
            </div>

            <div class="col-12">
              <div class="form__group">
                <label class="form__label" for="tags"> Tags </label>

                <VSelect
                  v-model="tags"
                  input-id="tags"
                  class="select-tags"
                  placeholder="Press enter to select tag ..."
                  no-drop
                  taggable
                  multiple
                  push-tags
                ></VSelect>
              </div>
            </div>

            <div class="col-md-6">
              <FormField
                id="facebook"
                v-model.trim="$v.facebook.$model"
                :field="$v.facebook"
                label="Facebook"
              />
            </div>

            <div class="col-md-6">
              <FormField
                id="facebook"
                v-model.trim="$v.twitter.$model"
                :field="$v.twitter"
                label="Twitter"
              />
            </div>

            <div class="col-md-6">
              <FormField
                id="facebook"
                v-model.trim="$v.instagram.$model"
                :field="$v.instagram"
                label="Instagram"
              />
            </div>

            <div class="col-md-6">
              <FormField
                id="facebook"
                v-model.trim="$v.linkedin.$model"
                :field="$v.linkedin"
                label="LinkedIn"
              />
            </div>

            <div class="col-lg-3 m-auto pt-5">
              <button
                class="button button--primary w-100"
                type="submit"
                :disabled="loading"
                :class="{ 'button--loading': loading }"
              >
                {{ loading ? 'saving...' : 'Save' }}
              </button>
            </div>
          </form>

          <Feedback v-else v-bind="feedback" />
        </div>
      </div>
    </section>

    <Lines />
  </main>
</template>

<script>
import { validationMixin } from 'vuelidate'
import { isFeedbackSuccess, transformPostData } from '~/assets/js/apiFunctions'
import { createPostValidations } from '~/assets/js/formValidations'
import { postEventModel } from '~/assets/js/models'

export default {
  mixins: [validationMixin],
  data() {
    return {
      ...postEventModel,
    }
  },
  head() {
    return {
      title: 'Create Event - Flutterwave',
    }
  },
  computed: {
    minDate() {
      return this.$moment().format()
    },
  },
  validations: {
    ...createPostValidations,
  },
  methods: {
    async handleSubmit() {
      this.$v.$touch()

      if (!this.$v.$invalid) {
        this.loading = true

        try {
          const socials = {
            facebook: this.facebook,
            twitter: this.twitter,
            instagram: this.instagram,
            linkedin: this.linkedin,
          }
          const formData = transformPostData(this.form, socials, this.tags)

          const { data } = await this.$axios.post('events', formData)

          if (isFeedbackSuccess(data)) {
            this.feedback = {
              status: 'success',
              message: `You have successfully created ${this.form.name.toLowerCase()} event.`,
            }
            return
          }

          const errorMessage = `There was a problem while registering for the ${this.form.name.toLowerCase()} event, please reach our support center, for more details.`
          throw new Error(errorMessage)
        } catch (err) {
          this.feedback = {
            status: 'fail',
            message: err.message,
          }
        } finally {
          this.loading = false
        }
      }
    },
  },
}
</script>
